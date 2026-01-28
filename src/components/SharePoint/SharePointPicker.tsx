'use client';

import { useMsal } from "@azure/msal-react";
import { useState } from "react";

export default function SharePointPicker({ onFileSelected }: {
    onFileSelected: (file: File) => void
}) {
    const { instance, accounts } = useMsal();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const openPicker = async () => {
        if (!accounts[0]) {
            setError('Please sign in with Microsoft first');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Get access token silently
            const response = await instance.acquireTokenSilent({
                scopes: ["Files.Read.All", "Sites.Read.All"],
                account: accounts[0]
            });

            // Configure File Picker
            const pickerOptions = {
                sdk: "8.0",
                entry: {
                    oneDrive: { files: {} }
                },
                authentication: {
                    accessToken: response.accessToken
                },
                messaging: {
                    origin: window.location.origin,
                    channelId: `video-copilot-${Date.now()}`
                },
                typesAndSources: {
                    mode: "files",
                    filters: [".mp4", ".avi", ".mov", ".mkv", ".webm"]
                }
            };

            // Open File Picker in popup
            const form = document.createElement('form');
            form.action = 'https://ensoftekinc-my.sharepoint.com/_layouts/15/FilePicker.aspx';
            form.method = 'POST';
            form.target = 'sharepoint-picker';

            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'params';
            input.value = JSON.stringify(pickerOptions);
            form.appendChild(input);

            document.body.appendChild(form);

            const popup = window.open('', 'sharepoint-picker', 'width=800,height=600,menubar=no,toolbar=no');
            if (!popup) {
                throw new Error('Popup blocked. Please allow popups for this site.');
            }

            form.submit();
            document.body.removeChild(form);

            // Listen for file selection
            const handleMessage = async (event: MessageEvent) => {
                if (event.data.type === 'selection' && event.data.items && event.data.items.length > 0) {
                    const fileInfo = event.data.items[0];

                    try {
                        // Download file from Microsoft Graph
                        const fileResponse = await fetch(
                            `https://graph.microsoft.com/v1.0/me/drive/items/${fileInfo.id}/content`,
                            { headers: { Authorization: `Bearer ${response.accessToken}` } }
                        );

                        if (!fileResponse.ok) {
                            throw new Error('Failed to download file from SharePoint');
                        }

                        const blob = await fileResponse.blob();
                        const file = new File([blob], fileInfo.name, { type: blob.type || 'video/mp4' });

                        onFileSelected(file);
                        popup?.close();
                    } catch (err) {
                        console.error('File download error:', err);
                        setError('Failed to download file');
                    }

                    window.removeEventListener('message', handleMessage);
                }
            };

            window.addEventListener('message', handleMessage);

        } catch (err: any) {
            console.error('SharePoint picker error:', err);
            setError(err.message || 'Failed to open SharePoint picker');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button
                onClick={openPicker}
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
                    transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => {
                    if (!loading && accounts[0]) e.currentTarget.style.background = '#0e6b0e';
                }}
                onMouseLeave={(e) => {
                    if (!loading && accounts[0]) e.currentTarget.style.background = '#107C10';
                }}
                title={!accounts[0] ? 'Please sign in first' : ''}
            >
                <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
                    <path d="M42.8 18.032H28.032V3.2H19.968v14.832H5.2v8.064h14.768v14.832h8.064V26.096H42.8z" fill="white" />
                </svg>
                {loading ? 'Opening SharePoint...' : 'Import from SharePoint'}
            </button>
            {error && <p style={{ color: '#dc3545', marginTop: '0.5rem', fontSize: '0.9rem' }}>{error}</p>}
        </div>
    );
}
