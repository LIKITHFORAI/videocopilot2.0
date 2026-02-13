'use client';

import { useMsal } from "@azure/msal-react";
import { useState } from "react";

interface FileItem {
    id: string;
    name: string;
    size: number;
    webUrl: string;
}

export default function OneDriveBrowser({ onFileSelected }: { onFileSelected: (file: File) => void }) {
    const { instance, accounts } = useMsal();
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState<FileItem[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [downloading, setDownloading] = useState<string | null>(null);

    const loadFiles = async () => {
        if (!accounts[0]) {
            setError('Please sign in with Microsoft first');
            return;
        }

        setLoading(true);
        setError(null);
        setShowModal(true);

        try {
            // Get access token
            const response = await instance.acquireTokenSilent({
                scopes: ["Files.Read.All"],
                account: accounts[0]
            });

            // Get video files from user's OneDrive
            const graphResponse = await fetch(
                `https://graph.microsoft.com/v1.0/me/drive/root/search(q='.mp4 OR .avi OR .mov OR .mkv OR .webm')?$top=50&$select=id,name,size,webUrl`,
                { headers: { Authorization: `Bearer ${response.accessToken}` } }
            );

            if (!graphResponse.ok) {
                throw new Error('Failed to load OneDrive files');
            }

            const data = await graphResponse.json();
            setFiles(data.value || []);

        } catch (err: any) {
            console.error('OneDrive browser error:', err);
            setError(err.message || 'Failed to load files');
        } finally {
            setLoading(false);
        }
    };

    const downloadFile = async (fileItem: FileItem) => {
        setDownloading(fileItem.id);
        try {
            const response = await instance.acquireTokenSilent({
                scopes: ["Files.Read.All"],
                account: accounts[0]
            });

            const fileResponse = await fetch(
                `https://graph.microsoft.com/v1.0/me/drive/items/${fileItem.id}/content`,
                { headers: { Authorization: `Bearer ${response.accessToken}` } }
            );

            if (!fileResponse.ok) {
                throw new Error('Failed to download file');
            }

            const blob = await fileResponse.blob();
            const file = new File([blob], fileItem.name, { type: 'video/mp4' });

            onFileSelected(file);
            setShowModal(false);
        } catch (err: any) {
            console.error('Download error:', err);
            setError(err.message || 'Failed to download file');
        } finally {
            setDownloading(null);
        }
    };

    return (
        <>
            <button
                onClick={loadFiles}
                disabled={loading || !accounts[0]}
                style={{
                    padding: '0.75rem 1.5rem',
                    background: loading || !accounts[0] ? '#ccc' : '#107C10',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: loading || !accounts[0] ? 'not-allowed' : 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                }}
                title={!accounts[0] ? 'Please sign in first' : ''}
            >
                ☁️ {loading ? 'Loading...' : 'Browse OneDrive'}
            </button>

            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '12px',
                        padding: '2rem',
                        maxWidth: '600px',
                        width: '90%',
                        maxHeight: '80vh',
                        overflow: 'auto'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Your OneDrive Videos</h2>
                            <button
                                onClick={() => setShowModal(false)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '1.5rem',
                                    cursor: 'pointer',
                                    color: '#666'
                                }}
                            >×</button>
                        </div>

                        {error && (
                            <div style={{
                                padding: '1rem',
                                background: '#fee',
                                border: '1px solid #fcc',
                                borderRadius: '6px',
                                marginBottom: '1rem',
                                color: '#c00'
                            }}>
                                {error}
                            </div>
                        )}

                        {files.length === 0 && !loading ? (
                            <p style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>
                                No video files found in your OneDrive
                            </p>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {files.map(file => (
                                    <div
                                        key={file.id}
                                        style={{
                                            padding: '1rem',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            cursor: downloading === file.id ? 'wait' : 'pointer',
                                            background: downloading === file.id ? '#f5f5f5' : 'white'
                                        }}
                                        onClick={() => downloadFile(file)}
                                    >
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                                                {file.name}
                                            </div>
                                            <div style={{ fontSize: '0.85rem', color: '#666' }}>
                                                {(file.size / 1024 / 1024).toFixed(2)} MB
                                            </div>
                                        </div>
                                        <button
                                            disabled={downloading === file.id}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                background: '#107C10',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: downloading === file.id ? 'wait' : 'pointer',
                                                fontWeight: '600'
                                            }}
                                        >
                                            {downloading === file.id ? 'Downloading...' : 'Select'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
