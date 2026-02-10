'use client';

import { useMsal } from "@azure/msal-react";
import { useState, useCallback, useEffect } from "react";

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
}

interface BreadcrumbItem {
    id: string;
    name: string;
}

interface SharePointPickerProps {
    onFileSelected: (file: File) => void;
    isOpen: boolean;
    onClose: () => void;
}

export default function SharePointPicker({ onFileSelected, isOpen, onClose }: SharePointPickerProps) {
    const { instance, accounts } = useMsal();
    const [items, setItems] = useState<DriveItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<DriveItem | null>(null);

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

    // Fetch items from Graph API
    const fetchItems = useCallback(async (folderId?: string) => {
        setLoading(true);
        setError(null);
        setSelectedItem(null);

        try {
            const token = await getToken();
            const url = folderId
                ? `${GRAPH_BASE}/me/drive/items/${folderId}/children?$top=200&$orderby=name`
                : `${GRAPH_BASE}/me/drive/root/children?$top=200&$orderby=name`;

            const resp = await fetch(url, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!resp.ok) {
                const errBody = await resp.text();
                console.error('Graph API error:', resp.status, errBody);
                throw new Error(`Failed to load files (${resp.status})`);
            }

            const data = await resp.json();
            const allItems: DriveItem[] = data.value || [];

            // Show folders + video files only
            const filtered = allItems.filter(item => {
                if (item.folder) return true;
                if (item.file) {
                    const ext = '.' + item.name.split('.').pop()?.toLowerCase();
                    return VIDEO_EXTENSIONS.includes(ext);
                }
                return false;
            });

            // Sort: folders first, then files
            filtered.sort((a, b) => {
                if (a.folder && !b.folder) return -1;
                if (!a.folder && b.folder) return 1;
                return a.name.localeCompare(b.name);
            });

            setItems(filtered);
        } catch (err: any) {
            console.error('Fetch error:', err);
            setError(err.message || 'Failed to load files');
        } finally {
            setLoading(false);
        }
    }, [getToken]);

    // Auto-load root when opened
    useEffect(() => {
        if (isOpen && accounts[0]) {
            setBreadcrumbs([]);
            setSelectedItem(null);
            setError(null);
            fetchItems();
        }
    }, [isOpen, accounts, fetchItems]);

    // Navigate into a folder
    const navigateToFolder = async (item: DriveItem) => {
        setBreadcrumbs(prev => [...prev, { id: item.id, name: item.name }]);
        await fetchItems(item.id);
    };

    // Navigate via breadcrumb
    const navigateToBreadcrumb = async (index: number) => {
        if (index < 0) {
            setBreadcrumbs([]);
            await fetchItems();
        } else {
            const target = breadcrumbs[index];
            setBreadcrumbs(prev => prev.slice(0, index + 1));
            await fetchItems(target.id);
        }
    };

    // Download and select a file
    const selectFile = async (item: DriveItem) => {
        setDownloading(true);
        setError(null);

        try {
            const token = await getToken();

            // Get the item metadata with download URL
            const metaResp = await fetch(
                `${GRAPH_BASE}/me/drive/items/${item.id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (!metaResp.ok) throw new Error('Failed to get file info');
            const meta = await metaResp.json();
            const downloadUrl = meta['@microsoft.graph.downloadUrl'];

            if (!downloadUrl) throw new Error('No download URL available');

            // Download using pre-authenticated URL (no auth header needed)
            const fileResp = await fetch(downloadUrl);
            if (!fileResp.ok) throw new Error(`Download failed (${fileResp.status})`);

            const blob = await fileResp.blob();
            const file = new File([blob], item.name, { type: blob.type || 'video/mp4' });

            onFileSelected(file);
            onClose();
        } catch (err: any) {
            console.error('Download error:', err);
            setError(err.message || 'Failed to download file');
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
                                OneDrive File Browser
                            </span>
                        </div>
                        <button onClick={onClose} style={{
                            background: 'none', border: 'none', color: '#888',
                            fontSize: '1.5rem', cursor: 'pointer', lineHeight: 1,
                            padding: '0 4px'
                        }}>×</button>
                    </div>

                    {/* Breadcrumbs */}
                    <div style={{
                        padding: '0.6rem 1.25rem',
                        borderBottom: '1px solid #2a2a3a',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        flexWrap: 'wrap',
                        fontSize: '0.85rem'
                    }}>
                        <button onClick={() => navigateToBreadcrumb(-1)} style={{
                            background: 'none', border: 'none', color: '#7ab0ff',
                            cursor: 'pointer', padding: '2px 4px', borderRadius: '3px',
                            fontWeight: '600', fontSize: '0.85rem'
                        }}>
                            My Files
                        </button>
                        {breadcrumbs.map((bc, i) => (
                            <span key={bc.id} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
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
                    </div>

                    {/* File List */}
                    <div style={{
                        flex: 1,
                        overflowY: 'auto',
                        padding: '0.5rem 0',
                        minHeight: '300px'
                    }}>
                        {loading && (
                            <div style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                height: '200px', color: '#888'
                            }}>
                                <span>Loading files...</span>
                            </div>
                        )}

                        {!loading && items.length === 0 && !error && (
                            <div style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                height: '200px', color: '#666', fontSize: '0.9rem'
                            }}>
                                No video files or folders found here.
                            </div>
                        )}

                        {!loading && items.map(item => (
                            <div
                                key={item.id}
                                onClick={() => {
                                    if (item.folder) {
                                        navigateToFolder(item);
                                    } else {
                                        setSelectedItem(selectedItem?.id === item.id ? null : item);
                                    }
                                }}
                                onDoubleClick={() => {
                                    if (!item.folder) selectFile(item);
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
                                    {item.folder ? (
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
                                    {item.folder ? `${item.folder.childCount} items` : formatSize(item.size)}
                                </div>

                                {/* Date */}
                                <div style={{ color: '#666', fontSize: '0.8rem', minWidth: '90px', textAlign: 'right' }}>
                                    {formatDate(item.lastModifiedDateTime)}
                                </div>

                                {item.folder && <span style={{ color: '#555', fontSize: '1.1rem' }}>›</span>}
                            </div>
                        ))}
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
                                {downloading ? 'Downloading...' : 'Select'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Downloading overlay */}
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
                            Downloading from OneDrive...
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
