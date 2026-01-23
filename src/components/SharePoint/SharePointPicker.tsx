'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface DriveItem {
    id: string;
    name: string;
    folder?: { childCount: number };
    file?: { mimeType: string };
    size?: number;
    lastModifiedDateTime: string;
    parentReference?: { id: string, driveId: string };
}

interface SharePointPickerProps {
    onCancel: () => void;
    onSelect: (fileId: string, fileName: string, driveId: string) => void;
}

export default function SharePointPicker({ onCancel, onSelect }: SharePointPickerProps) {
    const { data: session } = useSession();
    const [items, setItems] = useState<DriveItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentFolder, setCurrentFolder] = useState<string>('root');
    const [breadcrumbs, setBreadcrumbs] = useState<{ id: string, name: string }[]>([{ id: 'root', name: 'Home' }]);

    useEffect(() => {
        fetchItems(currentFolder);
    }, [currentFolder]);

    const fetchItems = async (folderId: string) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/sharepoint/list?folderId=${folderId}`);
            if (!res.ok) throw new Error('Failed to fetch files');
            const data = await res.json();
            setItems(data.value);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleNavigate = (folderId: string, folderName: string) => {
        setCurrentFolder(folderId);
        setBreadcrumbs([...breadcrumbs, { id: folderId, name: folderName }]);
    };

    const handleBreadcrumbClick = (index: number) => {
        const newBreadcrumbs = breadcrumbs.slice(0, index + 1);
        setBreadcrumbs(newBreadcrumbs);
        setCurrentFolder(newBreadcrumbs[newBreadcrumbs.length - 1].id);
    };

    const handleFileSelect = (item: DriveItem) => {
        if (item.file && item.parentReference) {
            onSelect(item.id, item.name, item.parentReference.driveId);
        }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)', zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <div style={{
                width: '800px', height: '600px', background: 'white',
                borderRadius: '8px', display: 'flex', flexDirection: 'column',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}>
                {/* Header */}
                <div style={{
                    padding: '1rem', borderBottom: '1px solid #eee',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                    <h3 style={{ margin: 0 }}>Select from SharePoint/OneDrive</h3>
                    <button onClick={onCancel} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                </div>

                {/* Breadcrumbs */}
                <div style={{ padding: '0.5rem 1rem', background: '#f9f9f9', borderBottom: '1px solid #eee', display: 'flex', gap: '0.5rem' }}>
                    {breadcrumbs.map((crumb, index) => (
                        <span key={crumb.id} style={{ display: 'flex', alignItems: 'center' }}>
                            <span
                                onClick={() => handleBreadcrumbClick(index)}
                                style={{
                                    cursor: 'pointer',
                                    color: index === breadcrumbs.length - 1 ? '#333' : '#0078d4',
                                    fontWeight: index === breadcrumbs.length - 1 ? '600' : '400'
                                }}
                            >
                                {crumb.name}
                            </span>
                            {index < breadcrumbs.length - 1 && <span style={{ margin: '0 0.5rem', color: '#999' }}>/</span>}
                        </span>
                    ))}
                </div>

                {/* File List */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>Loading files...</div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '1rem' }}>
                            {items.map(item => (
                                <div
                                    key={item.id}
                                    onClick={() => item.folder ? handleNavigate(item.id, item.name) : handleFileSelect(item)}
                                    style={{
                                        border: '1px solid #eee', borderRadius: '4px', padding: '1rem',
                                        cursor: 'pointer', textAlign: 'center',
                                        background: item.folder ? '#f0faff' : 'white',
                                        transition: 'all 0.2s',
                                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem'
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.borderColor = '#0078d4'}
                                    onMouseLeave={e => e.currentTarget.style.borderColor = '#eee'}
                                >
                                    <div style={{ fontSize: '2rem' }}>
                                        {item.folder ? '📁' : (item.file?.mimeType.includes('video') ? '🎥' : '📄')}
                                    </div>
                                    <div style={{
                                        fontSize: '0.9rem', wordBreak: 'break-word', overflow: 'hidden',
                                        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'
                                    }}>
                                        {item.name}
                                    </div>
                                    {item.file && (
                                        <div style={{ fontSize: '0.7rem', color: '#666' }}>
                                            {(item.size! / (1024 * 1024)).toFixed(1)} MB
                                        </div>
                                    )}
                                </div>
                            ))}
                            {items.length === 0 && (
                                <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#999', padding: '2rem' }}>
                                    This folder is empty
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
