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
            // Get access token, requesting consent if needed
            let tokenResponse;
            try {
                tokenResponse = await instance.acquireTokenSilent({
                    scopes: ["Files.Read.All", "Sites.Read.All"],
                    account: accounts[0]
                });
            } catch (silentError) {
                // If silent fails, request consent via redirect
                console.log('Silent token acquisition failed, requesting consent:', silentError);
                await instance.acquireTokenRedirect({
                    scopes: ["Files.Read.All", "Sites.Read.All"],
                    account: accounts[0]
                });
                return; // Redirect will occur, function will exit
            }

            // Configure File Picker for OneDrive for Business
            const pickerOptions = {
                sdk: "8.0",
                entry: {
                    sharePoint: {}  // Changed from oneDrive to sharePoint for proper loading
                },
                authentication: {
                    accessToken: tokenResponse.accessToken
                },
                messaging: {
                    origin: window.location.origin,
                    channelId: `video-copilot-${Date.now()}`
                },
                typesAndSources: {
                    mode: "files",
                    filters: [".mp4", ".avi", ".mov", ".mkv", ".webm", ".MP4", ".AVI", ".MOV"]
                }
            };

            // Open File Picker in popup
            const form = document.createElement('form');
            form.action = 'https://ensoftekinc-my.sharepoint.com/my';
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
                            { headers: { Authorization: `Bearer ${tokenResponse.accessToken}` } }
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
            if (err.errorCode === 'consent_required') {
                setError('Additional permissions needed. Please grant access to your OneDrive files.');
            } else {
                setError(err.message || 'Failed to open SharePoint picker');
            }
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
