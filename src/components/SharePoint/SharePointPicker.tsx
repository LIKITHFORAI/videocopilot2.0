'use client';

import { useMsal } from "@azure/msal-react";
import { useState, useCallback, useEffect } from "react";
import { getApiPath } from '@/lib/apiPath';

const GRAPH_BASE = "https://graph.microsoft.com/v1.0";
const VIDEO_EXTENSIONS = ['.mp4', '.avi', '.mov', '.mkv', '.webm', '.m4v', '.wmv'];

interface DriveItem {
    id: string;
    name: string;
    size?: number;
    folder?: { childCount: number };
    file?: { mimeType: string };
    lastModifiedDateTime?: string;
    '@microsoft.graph.downloadUrl'?: string;
    remoteItem?: {
        id: string;
        parentReference?: { driveId?: string };
        folder?: { childCount: number };
        file?: { mimeType: string };
    };
}

interface SiteInfo {
    id: string;
    displayName: string;
    webUrl?: string;
}

interface DriveInfo {
    id: string;
    name: string;
    driveType?: string;
    description?: string;
}

interface BreadcrumbItem {
    id: string;
    name: string;
    driveId?: string; // Track which drive we're in
}

// The different "views" or sources the user can browse
type BrowseSource = 'home' | 'myfiles' | 'shared' | 'sites' | 'site-drives' | 'drive-browse';

/** Result returned when a file is imported server-side from SharePoint */
export interface ServerImportResult {
    mediaId: string;
    fileName: string;
    fileSize: number;
    isServerImport: true;
}

interface SharePointPickerProps {
    onFileSelected: (file: File | ServerImportResult) => void;
    isOpen: boolean;
    onClose: () => void;
}

export default function SharePointPicker({ onFileSelected, isOpen, onClose }: SharePointPickerProps) {
    const { instance, accounts } = useMsal();
    const [items, setItems] = useState<DriveItem[]>([]);
    const [sites, setSites] = useState<SiteInfo[]>([]);
    const [drives, setDrives] = useState<DriveInfo[]>([]);
    const [loading, setLoading] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<DriveItem | null>(null);
    const [browseSource, setBrowseSource] = useState<BrowseSource>('home');
    const [currentDriveId, setCurrentDriveId] = useState<string | null>(null);
    const [currentSiteId, setCurrentSiteId] = useState<string | null>(null);
    const [currentSiteName, setCurrentSiteName] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isSearchMode, setIsSearchMode] = useState<boolean>(false);
    const [originalSites, setOriginalSites] = useState<SiteInfo[]>([]);
    const [originalDrives, setOriginalDrives] = useState<DriveInfo[]>([]);

    // Get a Graph API token
    const getToken = useCallback(async (): Promise<string> => {
        const scopes = ["Files.Read.All", "Sites.Read.All"];
        try {
            const resp = await instance.acquireTokenSilent({ scopes, account: accounts[0] });
            return resp.accessToken;
        } catch {
            const resp = await instance.acquireTokenPopup({ scopes, account: accounts[0] });
            return resp.accessToken;
        }
    }, [instance, accounts]);

    // Generic Graph API fetch
    const graphFetch = useCallback(async (url: string) => {
        const token = await getToken();
        const resp = await fetch(url, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (!resp.ok) {
            const errBody = await resp.text();
            console.error('Graph API error:', resp.status, errBody);
            throw new Error(`Graph API error (${resp.status})`);
        }
        return resp.json();
    }, [getToken]);

    // Filter and sort items (folders + video files)
    const processItems = (allItems: DriveItem[]): DriveItem[] => {
        const filtered = allItems.filter(item => {
            if (item.folder) return true;
            // For shared items, check remoteItem
            if (item.remoteItem?.folder) return true;
            if (item.file || item.remoteItem?.file) {
                const ext = '.' + item.name.split('.').pop()?.toLowerCase();
                return VIDEO_EXTENSIONS.includes(ext);
            }
            return false;
        });
        filtered.sort((a, b) => {
            const aIsFolder = !!(a.folder || a.remoteItem?.folder);
            const bIsFolder = !!(b.folder || b.remoteItem?.folder);
            if (aIsFolder && !bIsFolder) return -1;
            if (!aIsFolder && bIsFolder) return 1;
            return a.name.localeCompare(b.name);
        });
        return filtered;
    };

    // Fetch items from personal OneDrive
    const fetchMyFiles = useCallback(async (folderId?: string) => {
        setLoading(true);
        setError(null);
        setSelectedItem(null);
        try {
            const url = folderId
                ? `${GRAPH_BASE}/me/drive/items/${folderId}/children?$top=200&$orderby=name`
                : `${GRAPH_BASE}/me/drive/root/children?$top=200&$orderby=name`;
            const data = await graphFetch(url);
            setItems(processItems(data.value || []));
        } catch (err: any) {
            setError(err.message || 'Failed to load files');
        } finally {
            setLoading(false);
        }
    }, [graphFetch]);

    // Fetch "Shared with Me" items
    const fetchSharedWithMe = useCallback(async () => {
        setLoading(true);
        setError(null);
        setSelectedItem(null);
        try {
            const data = await graphFetch(`${GRAPH_BASE}/me/drive/sharedWithMe?$top=200`);
            setItems(processItems(data.value || []));
        } catch (err: any) {
            setError(err.message || 'Failed to load shared files');
        } finally {
            setLoading(false);
        }
    }, [graphFetch]);

    // Fetch SharePoint sites
    const fetchSites = useCallback(async () => {
        setLoading(true);
        setError(null);
        setSelectedItem(null);
        try {
            const data = await graphFetch(`${GRAPH_BASE}/sites?search=*&$top=100`);
            const sitesList = data.value || [];
            setSites(sitesList);
            setOriginalSites(sitesList);
        } catch (err: any) {
            setError(err.message || 'Failed to load sites');
        } finally {
            setLoading(false);
        }
    }, [graphFetch]);

    // Fetch drives within a SharePoint site
    const fetchSiteDrives = useCallback(async (siteId: string) => {
        setLoading(true);
        setError(null);
        setSelectedItem(null);
        try {
            const data = await graphFetch(`${GRAPH_BASE}/sites/${siteId}/drives`);
            const drivesList = data.value || [];
            setDrives(drivesList);
            setOriginalDrives(drivesList);
        } catch (err: any) {
            setError(err.message || 'Failed to load document libraries');
        } finally {
            setLoading(false);
        }
    }, [graphFetch]);

    // Fetch items from a specific drive (SharePoint library or shared drive)
    const fetchDriveItems = useCallback(async (driveId: string, folderId?: string) => {
        setLoading(true);
        setError(null);
        setSelectedItem(null);
        setIsSearchMode(false);
        try {
            const url = folderId
                ? `${GRAPH_BASE}/drives/${driveId}/items/${folderId}/children?$top=200&$orderby=name`
                : `${GRAPH_BASE}/drives/${driveId}/root/children?$top=200&$orderby=name`;
            const data = await graphFetch(url);
            setItems(processItems(data.value || []));
        } catch (err: any) {
            setError(err.message || 'Failed to load files');
        } finally {
            setLoading(false);
        }
    }, [graphFetch]);

    // Search for items across the current context
    const performSearch = useCallback(async (query: string) => {
        if (!query.trim()) {
            setIsSearchMode(false);
            setSearchQuery('');
            // Restore original lists or reload current view
            if (browseSource === 'sites') {
                setSites(originalSites);
            } else if (browseSource === 'site-drives') {
                setDrives(originalDrives);
            } else if (browseSource === 'myfiles') {
                if (breadcrumbs.length > 0) {
                    await fetchMyFiles(breadcrumbs[breadcrumbs.length - 1].id);
                } else {
                    await fetchMyFiles();
                }
            } else if (browseSource === 'shared') {
                await fetchSharedWithMe();
            } else if (browseSource === 'drive-browse' && currentDriveId) {
                if (breadcrumbs.length > 0) {
                    await fetchDriveItems(currentDriveId, breadcrumbs[breadcrumbs.length - 1].id);
                } else {
                    await fetchDriveItems(currentDriveId);
                }
            }
            return;
        }

        setSelectedItem(null);
        setIsSearchMode(true);

        // Client-side filter for sites and drives
        if (browseSource === 'sites') {
            const filtered = originalSites.filter(site =>
                site.displayName.toLowerCase().includes(query.toLowerCase())
            );
            setSites(filtered);
            return;
        }

        if (browseSource === 'site-drives') {
            const filtered = originalDrives.filter(drive =>
                drive.name.toLowerCase().includes(query.toLowerCase())
            );
            setDrives(filtered);
            return;
        }

        // Graph API search for files
        setLoading(true);
        setError(null);

        try {
            let url: string;
            if (currentDriveId) {
                url = `${GRAPH_BASE}/drives/${currentDriveId}/root/search(q='${encodeURIComponent(query)}')?$top=200`;
            } else {
                url = `${GRAPH_BASE}/me/drive/root/search(q='${encodeURIComponent(query)}')?$top=200`;
            }
            const data = await graphFetch(url);
            setItems(processItems(data.value || []));
        } catch (err: any) {
            setError(err.message || 'Search failed');
        } finally {
            setLoading(false);
        }
    }, [graphFetch, browseSource, breadcrumbs, currentDriveId, fetchMyFiles, fetchDriveItems]);

    // Auto-load home when opened
    useEffect(() => {
        if (isOpen && accounts[0]) {
            goHome();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, accounts]);

    // Go to the home/source picker view
    const goHome = () => {
        setBrowseSource('home');
        setBreadcrumbs([]);
        setItems([]);
        setSites([]);
        setDrives([]);
        setSelectedItem(null);
        setError(null);
        setCurrentDriveId(null);
        setCurrentSiteId(null);
        setCurrentSiteName('');
    };

    // Navigate into "My Files"
    const openMyFiles = async () => {
        setBrowseSource('myfiles');
        setBreadcrumbs([]);
        setCurrentDriveId(null);
        await fetchMyFiles();
    };

    // Navigate into "Shared with Me"
    const openSharedWithMe = async () => {
        setBrowseSource('shared');
        setBreadcrumbs([]);
        setCurrentDriveId(null);
        await fetchSharedWithMe();
    };

    // Navigate into "SharePoint Sites"
    const openSites = async () => {
        setBrowseSource('sites');
        setBreadcrumbs([]);
        setCurrentDriveId(null);
        await fetchSites();
    };

    // Open a specific SharePoint site's document libraries
    const openSiteDrives = async (site: SiteInfo) => {
        setBrowseSource('site-drives');
        setCurrentSiteId(site.id);
        setCurrentSiteName(site.displayName);
        setBreadcrumbs([]);
        await fetchSiteDrives(site.id);
    };

    // Open a specific drive (document library)
    const openDrive = async (drive: DriveInfo) => {
        setBrowseSource('drive-browse');
        setCurrentDriveId(drive.id);
        setBreadcrumbs([{ id: 'root', name: drive.name, driveId: drive.id }]);
        await fetchDriveItems(drive.id);
    };

    // Navigate into a folder
    const navigateToFolder = async (item: DriveItem) => {
        // For shared items with remoteItem, we need to switch to that drive
        if (item.remoteItem?.folder && item.remoteItem.parentReference?.driveId) {
            const remoteDriveId = item.remoteItem.parentReference.driveId;
            const remoteItemId = item.remoteItem.id;
            setBrowseSource('drive-browse');
            setCurrentDriveId(remoteDriveId);
            setBreadcrumbs(prev => [...prev, { id: remoteItemId, name: item.name, driveId: remoteDriveId }]);
            await fetchDriveItems(remoteDriveId, remoteItemId);
            return;
        }

        const driveId = currentDriveId;
        setBreadcrumbs(prev => [...prev, { id: item.id, name: item.name, driveId: driveId || undefined }]);

        if (driveId) {
            await fetchDriveItems(driveId, item.id);
        } else {
            await fetchMyFiles(item.id);
        }
    };

    // Navigate via breadcrumb
    const navigateToBreadcrumb = async (index: number) => {
        if (index < 0) {
            // Go back to root of current source
            if (browseSource === 'myfiles') {
                setBreadcrumbs([]);
                await fetchMyFiles();
            } else if (browseSource === 'shared') {
                setBreadcrumbs([]);
                await fetchSharedWithMe();
            } else if (browseSource === 'drive-browse' && currentDriveId) {
                const rootBc = breadcrumbs[0]; // Keep the drive name
                setBreadcrumbs(rootBc ? [rootBc] : []);
                await fetchDriveItems(currentDriveId);
            }
        } else {
            const target = breadcrumbs[index];
            setBreadcrumbs(prev => prev.slice(0, index + 1));
            const driveId = target.driveId || currentDriveId;
            if (target.id === 'root' && driveId) {
                await fetchDriveItems(driveId);
            } else if (driveId) {
                await fetchDriveItems(driveId, target.id);
            } else {
                await fetchMyFiles(target.id);
            }
        }
    };

    // Import file via server-side download (On-Behalf-Of flow)
    const selectFile = async (item: DriveItem) => {
        setDownloading(true);
        setError(null);

        try {
            const token = await getToken();

            // Determine the effective driveId and itemId for the Graph API call
            let effectiveDriveId: string;
            let effectiveItemId: string;

            if (item.remoteItem?.parentReference?.driveId) {
                // Shared items have a remote reference with the source drive
                effectiveDriveId = item.remoteItem.parentReference.driveId;
                effectiveItemId = item.remoteItem.id;
            } else if (currentDriveId) {
                // Browsing a specific drive (SharePoint site or selected drive)
                effectiveDriveId = currentDriveId;
                effectiveItemId = item.id;
            } else {
                // My Files — resolve the user's default drive ID
                const meResp = await fetch(`${GRAPH_BASE}/me/drive`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (!meResp.ok) throw new Error('Failed to get user drive info');
                const meDrive = await meResp.json();
                effectiveDriveId = meDrive.id;
                effectiveItemId = item.id;
            }

            // Send metadata to server for direct download
            const importResp = await fetch(getApiPath('/api/sharepoint/import'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    driveId: effectiveDriveId,
                    itemId: effectiveItemId,
                    fileName: item.name,
                    accessToken: token
                })
            });

            if (!importResp.ok) {
                const errData = await importResp.json().catch(() => ({}));
                throw new Error(errData.error || `Server import failed (${importResp.status})`);
            }

            const result = await importResp.json();

            onFileSelected({
                mediaId: result.mediaId,
                fileName: result.fileName || item.name,
                fileSize: result.fileSize,
                isServerImport: true
            });
            onClose();
        } catch (err: any) {
            console.error('Server import error:', err);
            setError(err.message || 'Failed to import file from SharePoint');
        } finally {
            setDownloading(false);
        }
    };

    const formatSize = (bytes?: number) => {
        if (!bytes) return '';
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
        if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
        return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
    };

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric'
        });
    };

    // Get the breadcrumb label for the current source
    const getSourceLabel = (): string => {
        switch (browseSource) {
            case 'myfiles': return 'My Files';
            case 'shared': return 'Shared with Me';
            case 'sites': return 'SharePoint Sites';
            case 'site-drives': return currentSiteName || 'Document Libraries';
            case 'drive-browse': return breadcrumbs[0]?.name || 'Files';
            default: return 'Home';
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Modal Overlay */}
            <div style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 10000,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }} onClick={onClose}>
                <div style={{
                    background: '#1e1e2e',
                    borderRadius: '12px',
                    width: '720px',
                    maxWidth: '95vw',
                    maxHeight: '80vh',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
                    overflow: 'hidden'
                }} onClick={(e) => e.stopPropagation()}>

                    {/* Header */}
                    <div style={{
                        padding: '1rem 1.25rem',
                        borderBottom: '1px solid #333',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: '#16161e'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                                <path d="M12.5 2H8.5C7.57 2 6.67 2.37 6 3L3 6C2.37 6.67 2 7.57 2 8.5V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V8C22 6.9 21.1 6 20 6H13L12.5 2Z" fill="#0078D4" />
                            </svg>
                            <span style={{ color: '#fff', fontWeight: '700', fontSize: '1.05rem' }}>
                                OneDrive & SharePoint Browser
                            </span>
                        </div>
                        <button onClick={onClose} style={{
                            background: 'none', border: 'none', color: '#888',
                            fontSize: '1.5rem', cursor: 'pointer', lineHeight: 1,
                            padding: '0 4px'
                        }}>×</button>
                    </div>

                    {/* Breadcrumbs / Navigation */}
                    {browseSource !== 'home' && (
                        <div style={{
                            padding: '0.6rem 1.25rem',
                            borderBottom: '1px solid #2a2a3a',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            flexWrap: 'wrap',
                            fontSize: '0.85rem'
                        }}>
                            {/* Home button */}
                            <button onClick={goHome} style={{
                                background: 'none', border: 'none', color: '#7ab0ff',
                                cursor: 'pointer', padding: '2px 4px', borderRadius: '3px',
                                fontWeight: '600', fontSize: '0.85rem'
                            }}>
                                ⌂ Home
                            </button>
                            <span style={{ color: '#555' }}>›</span>

                            {/* Source label */}
                            {browseSource === 'site-drives' ? (
                                <>
                                    <button onClick={openSites} style={{
                                        background: 'none', border: 'none', color: '#7ab0ff',
                                        cursor: 'pointer', padding: '2px 4px', borderRadius: '3px',
                                        fontWeight: '400', fontSize: '0.85rem'
                                    }}>
                                        SharePoint Sites
                                    </button>
                                    <span style={{ color: '#555' }}>›</span>
                                    <span style={{ color: '#ccc', padding: '2px 4px', fontWeight: '600', fontSize: '0.85rem' }}>
                                        {currentSiteName}
                                    </span>
                                </>
                            ) : browseSource === 'drive-browse' && currentSiteId ? (
                                <>
                                    <button onClick={openSites} style={{
                                        background: 'none', border: 'none', color: '#7ab0ff',
                                        cursor: 'pointer', padding: '2px 4px', borderRadius: '3px',
                                        fontWeight: '400', fontSize: '0.85rem'
                                    }}>
                                        SharePoint Sites
                                    </button>
                                    <span style={{ color: '#555' }}>›</span>
                                    <button onClick={() => currentSiteId && openSiteDrives({ id: currentSiteId, displayName: currentSiteName })} style={{
                                        background: 'none', border: 'none', color: '#7ab0ff',
                                        cursor: 'pointer', padding: '2px 4px', borderRadius: '3px',
                                        fontWeight: '400', fontSize: '0.85rem'
                                    }}>
                                        {currentSiteName}
                                    </button>
                                    {breadcrumbs.map((bc, i) => (
                                        <span key={bc.id + i} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                            <span style={{ color: '#555' }}>›</span>
                                            <button onClick={() => navigateToBreadcrumb(i)} style={{
                                                background: 'none', border: 'none',
                                                color: i === breadcrumbs.length - 1 ? '#ccc' : '#7ab0ff',
                                                cursor: 'pointer', padding: '2px 4px', borderRadius: '3px',
                                                fontWeight: i === breadcrumbs.length - 1 ? '600' : '400',
                                                fontSize: '0.85rem'
                                            }}>
                                                {bc.name}
                                            </button>
                                        </span>
                                    ))}
                                </>
                            ) : (
                                <>
                                    <button onClick={() => {
                                        if (browseSource === 'myfiles') {
                                            setBreadcrumbs([]);
                                            fetchMyFiles();
                                        } else if (browseSource === 'shared') {
                                            setBreadcrumbs([]);
                                            fetchSharedWithMe();
                                        } else if (browseSource === 'sites') {
                                            fetchSites();
                                        }
                                    }} style={{
                                        background: 'none', border: 'none',
                                        color: breadcrumbs.length > 0 ? '#7ab0ff' : '#ccc',
                                        cursor: 'pointer', padding: '2px 4px', borderRadius: '3px',
                                        fontWeight: breadcrumbs.length > 0 ? '400' : '600',
                                        fontSize: '0.85rem'
                                    }}>
                                        {getSourceLabel()}
                                    </button>
                                    {breadcrumbs.map((bc, i) => (
                                        <span key={bc.id + i} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                            <span style={{ color: '#555' }}>›</span>
                                            <button onClick={() => navigateToBreadcrumb(i)} style={{
                                                background: 'none', border: 'none',
                                                color: i === breadcrumbs.length - 1 ? '#ccc' : '#7ab0ff',
                                                cursor: 'pointer', padding: '2px 4px', borderRadius: '3px',
                                                fontWeight: i === breadcrumbs.length - 1 ? '600' : '400',
                                                fontSize: '0.85rem'
                                            }}>
                                                {bc.name}
                                            </button>
                                        </span>
                                    ))}
                                </>
                            )}
                        </div>
                    )}

                    {/* Search Bar - Show in all views except home */}
                    {browseSource !== 'home' && (
                        <div style={{
                            padding: '0.75rem 1.25rem',
                            borderBottom: '1px solid #2a2a3a',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            {/* Search Icon */}
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                                <circle cx="11" cy="11" r="8" stroke="#666" strokeWidth="2" />
                                <path d="M21 21l-4.35-4.35" stroke="#666" strokeWidth="2" strokeLinecap="round" />
                            </svg>

                            {/* Search Input */}
                            <input
                                type="text"
                                placeholder={isSearchMode ? "Search results..." : "Search files and folders..."}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        performSearch(searchQuery);
                                    }
                                }}
                                style={{
                                    flex: 1,
                                    background: '#252535',
                                    border: '1px solid #333',
                                    borderRadius: '6px',
                                    padding: '0.5rem 0.75rem',
                                    color: '#e0e0e0',
                                    fontSize: '0.85rem',
                                    outline: 'none'
                                }}
                                onFocus={(e) => e.currentTarget.style.borderColor = '#4a9eff'}
                                onBlur={(e) => e.currentTarget.style.borderColor = '#333'}
                            />

                            {/* Search/Clear Button */}
                            {searchQuery && (
                                <button
                                    onClick={() => {
                                        if (isSearchMode) {
                                            performSearch(''); // Clear search
                                        } else {
                                            performSearch(searchQuery); // Execute search
                                        }
                                    }}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        background: isSearchMode ? '#444' : '#0078D4',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontSize: '0.8rem',
                                        fontWeight: '600',
                                        flexShrink: 0
                                    }}
                                >
                                    {isSearchMode ? '✕ Clear' : 'Search'}
                                </button>
                            )}
                        </div>
                    )}

                    {/* Content Area */}
                    <div style={{
                        flex: 1,
                        overflowY: 'auto',
                        padding: '0.5rem 0',
                        minHeight: '300px'
                    }}>
                        {/* HOME VIEW — Source Picker */}
                        {browseSource === 'home' && !loading && (
                            <div style={{ padding: '1.5rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <div style={{ color: '#999', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.25rem' }}>
                                    Choose a location
                                </div>

                                {/* My Files */}
                                <button onClick={openMyFiles} style={{
                                    display: 'flex', alignItems: 'center', gap: '1rem',
                                    padding: '1rem 1.25rem', background: '#252535',
                                    border: '1px solid #333', borderRadius: '10px',
                                    cursor: 'pointer', textAlign: 'left', width: '100%',
                                    transition: 'all 0.15s'
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.background = '#2a3a5a'; e.currentTarget.style.borderColor = '#4a9eff'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = '#252535'; e.currentTarget.style.borderColor = '#333'; }}
                                >
                                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#0078D4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" /></svg>
                                    </div>
                                    <div>
                                        <div style={{ color: '#e0e0e0', fontWeight: '600', fontSize: '0.95rem' }}>My Files</div>
                                        <div style={{ color: '#888', fontSize: '0.8rem' }}>Your personal OneDrive</div>
                                    </div>
                                    <span style={{ marginLeft: 'auto', color: '#555', fontSize: '1.2rem' }}>›</span>
                                </button>

                                {/* Shared with Me */}
                                <button onClick={openSharedWithMe} style={{
                                    display: 'flex', alignItems: 'center', gap: '1rem',
                                    padding: '1rem 1.25rem', background: '#252535',
                                    border: '1px solid #333', borderRadius: '10px',
                                    cursor: 'pointer', textAlign: 'left', width: '100%',
                                    transition: 'all 0.15s'
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.background = '#2a3a5a'; e.currentTarget.style.borderColor = '#4a9eff'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = '#252535'; e.currentTarget.style.borderColor = '#333'; }}
                                >
                                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#6C63FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg>
                                    </div>
                                    <div>
                                        <div style={{ color: '#e0e0e0', fontWeight: '600', fontSize: '0.95rem' }}>Shared with Me</div>
                                        <div style={{ color: '#888', fontSize: '0.8rem' }}>Files others have shared with you</div>
                                    </div>
                                    <span style={{ marginLeft: 'auto', color: '#555', fontSize: '1.2rem' }}>›</span>
                                </button>

                                {/* SharePoint Sites */}
                                <button onClick={openSites} style={{
                                    display: 'flex', alignItems: 'center', gap: '1rem',
                                    padding: '1rem 1.25rem', background: '#252535',
                                    border: '1px solid #333', borderRadius: '10px',
                                    cursor: 'pointer', textAlign: 'left', width: '100%',
                                    transition: 'all 0.15s'
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.background = '#2a3a5a'; e.currentTarget.style.borderColor = '#4a9eff'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = '#252535'; e.currentTarget.style.borderColor = '#333'; }}
                                >
                                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#038387', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
                                    </div>
                                    <div>
                                        <div style={{ color: '#e0e0e0', fontWeight: '600', fontSize: '0.95rem' }}>SharePoint Sites</div>
                                        <div style={{ color: '#888', fontSize: '0.8rem' }}>Browse team sites and document libraries</div>
                                    </div>
                                    <span style={{ marginLeft: 'auto', color: '#555', fontSize: '1.2rem' }}>›</span>
                                </button>
                            </div>
                        )}

                        {/* Loading */}
                        {loading && (
                            <div style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                height: '200px', color: '#888'
                            }}>
                                <span>Loading...</span>
                            </div>
                        )}

                        {/* SITES LIST VIEW */}
                        {browseSource === 'sites' && !loading && sites.map(site => (
                            <div
                                key={site.id}
                                onClick={() => openSiteDrives(site)}
                                style={{
                                    display: 'flex', alignItems: 'center',
                                    padding: '0.7rem 1.25rem', cursor: 'pointer',
                                    background: 'transparent', gap: '0.75rem',
                                    transition: 'background 0.1s',
                                    borderLeft: '3px solid transparent'
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = '#252535'}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                            >
                                <div style={{ width: '28px', textAlign: 'center', flexShrink: 0 }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#038387" />
                                        <text x="12" y="16" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">S</text>
                                    </svg>
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ color: '#e0e0e0', fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {site.displayName}
                                    </div>
                                    {site.webUrl && (
                                        <div style={{ color: '#666', fontSize: '0.75rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {site.webUrl}
                                        </div>
                                    )}
                                </div>
                                <span style={{ color: '#555', fontSize: '1.1rem' }}>›</span>
                            </div>
                        ))}

                        {/* SITE DRIVES LIST VIEW */}
                        {browseSource === 'site-drives' && !loading && drives.map(drive => (
                            <div
                                key={drive.id}
                                onClick={() => openDrive(drive)}
                                style={{
                                    display: 'flex', alignItems: 'center',
                                    padding: '0.7rem 1.25rem', cursor: 'pointer',
                                    background: 'transparent', gap: '0.75rem',
                                    transition: 'background 0.1s',
                                    borderLeft: '3px solid transparent'
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = '#252535'}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                            >
                                <div style={{ width: '28px', textAlign: 'center', flexShrink: 0 }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M10 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6H12L10 4Z" fill="#0078D4" />
                                    </svg>
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ color: '#e0e0e0', fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {drive.name}
                                    </div>
                                    {drive.description && (
                                        <div style={{ color: '#666', fontSize: '0.75rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {drive.description}
                                        </div>
                                    )}
                                </div>
                                <span style={{ color: '#555', fontSize: '1.1rem' }}>›</span>
                            </div>
                        ))}

                        {/* FILE/FOLDER LIST VIEW (myfiles, shared, drive-browse) */}
                        {(browseSource === 'myfiles' || browseSource === 'shared' || browseSource === 'drive-browse') && !loading && items.length === 0 && !error && (
                            <div style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                height: '200px', color: '#666', fontSize: '0.9rem'
                            }}>
                                No video files or folders found here.
                            </div>
                        )}

                        {(browseSource === 'myfiles' || browseSource === 'shared' || browseSource === 'drive-browse') && !loading && items.map(item => (
                            <div
                                key={item.id}
                                onClick={() => {
                                    if (item.folder || item.remoteItem?.folder) {
                                        navigateToFolder(item);
                                    } else {
                                        setSelectedItem(selectedItem?.id === item.id ? null : item);
                                    }
                                }}
                                onDoubleClick={() => {
                                    if (!item.folder && !item.remoteItem?.folder) selectFile(item);
                                }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '0.6rem 1.25rem',
                                    cursor: 'pointer',
                                    background: selectedItem?.id === item.id ? '#2a3a5a' : 'transparent',
                                    borderLeft: selectedItem?.id === item.id ? '3px solid #4a9eff' : '3px solid transparent',
                                    transition: 'background 0.1s',
                                    gap: '0.75rem'
                                }}
                                onMouseEnter={(e) => {
                                    if (selectedItem?.id !== item.id) e.currentTarget.style.background = '#252535';
                                }}
                                onMouseLeave={(e) => {
                                    if (selectedItem?.id !== item.id) e.currentTarget.style.background = 'transparent';
                                }}
                            >
                                {/* Icon */}
                                <div style={{ width: '28px', textAlign: 'center', flexShrink: 0 }}>
                                    {(item.folder || item.remoteItem?.folder) ? (
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M10 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6H12L10 4Z" fill="#FFC107" />
                                        </svg>
                                    ) : (
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <rect x="3" y="4" width="18" height="16" rx="2" fill="#E53935" />
                                            <polygon points="10,8 10,16 16,12" fill="white" />
                                        </svg>
                                    )}
                                </div>

                                {/* Name */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{
                                        color: '#e0e0e0', fontSize: '0.9rem',
                                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                                    }}>
                                        {item.name}
                                    </div>
                                </div>

                                {/* Size */}
                                <div style={{ color: '#777', fontSize: '0.8rem', minWidth: '70px', textAlign: 'right' }}>
                                    {(item.folder || item.remoteItem?.folder) ? `${(item.folder?.childCount ?? item.remoteItem?.folder?.childCount ?? 0)} items` : formatSize(item.size)}
                                </div>

                                {/* Date */}
                                <div style={{ color: '#666', fontSize: '0.8rem', minWidth: '90px', textAlign: 'right' }}>
                                    {formatDate(item.lastModifiedDateTime)}
                                </div>

                                {(item.folder || item.remoteItem?.folder) && <span style={{ color: '#555', fontSize: '1.1rem' }}>›</span>}
                            </div>
                        ))}

                        {/* Empty states for sites/drives */}
                        {browseSource === 'sites' && !loading && sites.length === 0 && !error && (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px', color: '#666', fontSize: '0.9rem' }}>
                                No SharePoint sites found.
                            </div>
                        )}
                        {browseSource === 'site-drives' && !loading && drives.length === 0 && !error && (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px', color: '#666', fontSize: '0.9rem' }}>
                                No document libraries found in this site.
                            </div>
                        )}
                    </div>

                    {/* Error */}
                    {error && (
                        <div style={{
                            padding: '0.5rem 1.25rem', color: '#ff6b6b',
                            fontSize: '0.85rem', background: '#2a1a1a'
                        }}>
                            {error}
                        </div>
                    )}

                    {/* Footer */}
                    <div style={{
                        padding: '0.75rem 1.25rem',
                        borderTop: '1px solid #333',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: '#16161e'
                    }}>
                        <div style={{ color: '#888', fontSize: '0.8rem' }}>
                            {selectedItem
                                ? `Selected: ${selectedItem.name} (${formatSize(selectedItem.size)})`
                                : browseSource === 'home'
                                    ? 'Choose a file location to browse'
                                    : 'Click a video to select, double-click to open immediately'
                            }
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button onClick={onClose} style={{
                                padding: '0.5rem 1.25rem', background: '#333', color: '#ccc',
                                border: 'none', borderRadius: '6px', cursor: 'pointer',
                                fontSize: '0.9rem', fontWeight: '500'
                            }}>Cancel</button>
                            <button
                                onClick={() => selectedItem && selectFile(selectedItem)}
                                disabled={!selectedItem || downloading}
                                style={{
                                    padding: '0.5rem 1.5rem',
                                    background: selectedItem && !downloading ? '#0078D4' : '#444',
                                    color: selectedItem && !downloading ? 'white' : '#777',
                                    border: 'none', borderRadius: '6px',
                                    cursor: selectedItem && !downloading ? 'pointer' : 'not-allowed',
                                    fontSize: '0.9rem', fontWeight: '700'
                                }}
                            >
                                {downloading ? 'Importing...' : 'Select'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Server import overlay */}
            {downloading && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    zIndex: 10001,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexDirection: 'column', gap: '1rem'
                }}>
                    <div style={{
                        background: '#1e1e2e', padding: '2rem 3rem',
                        borderRadius: '12px', textAlign: 'center',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
                    }}>
                        <div style={{
                            width: '40px', height: '40px', margin: '0 auto 1rem',
                            border: '3px solid #333', borderTopColor: '#0078D4',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                        }} />
                        <div style={{ color: '#e0e0e0', fontWeight: '600' }}>
                            Importing from SharePoint...
                        </div>
                        <div style={{ color: '#888', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                            Server is downloading the file directly — no bandwidth used on your end
                        </div>
                        <div style={{ color: '#888', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                            {selectedItem?.name}
                        </div>
                    </div>
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </div>
            )}
        </>
    );
}
