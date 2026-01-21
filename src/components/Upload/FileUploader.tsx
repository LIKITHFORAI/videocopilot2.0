'use client';

import { useState, useRef, useEffect } from 'react';

interface FileUploaderProps {
    onUploadComplete: (mediaId: string, jobId: string) => void;
    currentJobStatus?: string;
    currentJobProgress?: number;
}

interface HistoryItem {
    mediaId: string;
    jobId: string;
    fileName: string;
    date: string;
}

export default function FileUploader({
    onUploadComplete,
    currentJobStatus,
    currentJobProgress = 0,
}: FileUploaderProps) {
    const [status, setStatus] = useState<'idle' | 'uploading' | 'queued' | 'error'>('idle');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [message, setMessage] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    // History State
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [showHistory, setShowHistory] = useState(false);

    // Load history on mount
    useEffect(() => {
        const saved = localStorage.getItem('vc_history');
        if (saved) {
            try {
                setHistory(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse history", e);
            }
        }
    }, []);

    // Save history helper
    const addToHistory = (item: HistoryItem) => {
        const newHistory = [item, ...history.filter(h => h.fileName !== item.fileName)].slice(0, 10); // Keep last 10, remove duplicates
        setHistory(newHistory);
        localStorage.setItem('vc_history', JSON.stringify(newHistory));
    };

    // reset internal state when job completes
    useEffect(() => {
        if (currentJobStatus === 'COMPLETED') {
            setStatus('idle');
            setMessage('Ready');
        }
    }, [currentJobStatus]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Duplicate Check
        const existing = history.find(h => h.fileName === file.name);
        if (existing) {
            const useExisting = window.confirm(
                `You analyzed "${file.name}" on ${new Date(existing.date).toLocaleDateString()}.\n\nLoad the existing analysis instead of re-uploading?`
            );

            if (useExisting) {
                onUploadComplete(existing.mediaId, existing.jobId);
                // Clear input
                e.target.value = '';
                return;
            }
        }

        // Reset input value to allow re-uploading the same file if they chose No
        e.target.value = '';

        setStatus('uploading');
        setMessage(`Uploading ${file.name}...`);
        setUploadProgress(0);

        try {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/api/upload', true);
            xhr.setRequestHeader('X-Original-Filename', file.name);

            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    const percentComplete = (event.loaded / event.total) * 100;
                    setUploadProgress(percentComplete);
                }
            };

            xhr.onload = async () => {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    setStatus('queued');
                    setMessage('Queuing for processing...');
                    // Start the job
                    await startProcessing(response.mediaId, file.name);
                } else {
                    setStatus('error');
                    setMessage('Upload failed.');
                }
            };

            xhr.onerror = () => {
                setStatus('error');
                setMessage('Network error during upload.');
            };

            xhr.send(file);
        } catch (err) {
            console.error(err);
            setStatus('error');
            setMessage('Upload failed.');
        }
    };

    const startProcessing = async (mediaId: string, fileName: string) => {
        try {
            const res = await fetch('/api/process', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mediaId }),
            });
            const data = await res.json();
            if (res.ok) {
                // Save to history
                addToHistory({
                    mediaId,
                    jobId: data.jobId,
                    fileName,
                    date: new Date().toISOString()
                });

                onUploadComplete(mediaId, data.jobId);
            } else {
                setStatus('error');
                setMessage('Failed to start processing.');
            }
        } catch (err) {
            setStatus('error');
            setMessage('Failed to connect to processing API.');
        }
    };

    // Determine what to display
    const isUploading = status === 'uploading';
    const isProcessing =
        status === 'queued' ||
        (!!currentJobStatus && // Force boolean
            currentJobStatus !== 'COMPLETED' &&
            currentJobStatus !== 'FAILED' &&
            currentJobStatus !== '');

    const displayStatus = isUploading ? 'Uploading Video...' : `Processing: ${currentJobStatus?.replace('_', ' ') || 'Initializing'}...`;
    const displayProgress = isUploading ? uploadProgress : currentJobProgress;

    return (
        <div className="header" style={{
            background: 'white',
            borderBottom: '1px solid var(--border)',
            padding: '1rem 2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
        }}>
            {/* Logo / Title Area */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: '200px' }}>
                <div style={{
                    width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '6px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold'
                }}>VC</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', margin: 0 }}>Video Copilot</h3>
            </div>

            {/* Central Progress Area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {(isUploading || isProcessing) ? (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '500', color: '#666' }}>
                            <span>{displayStatus}</span>
                            <span>{Math.round(displayProgress)}%</span>
                        </div>
                        <div style={{
                            width: '100%',
                            height: '8px',
                            background: '#f0f0f0',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            position: 'relative' // needed for overflow hidden on child?
                        }}>
                            <div
                                className={!isUploading ? "fancy-progress" : ""}
                                style={{
                                    width: `${displayProgress}%`,
                                    height: '100%',
                                    background: isUploading ? 'var(--primary)' : undefined, // Fancy class handles background if processing
                                    transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    borderRadius: '4px'
                                }}
                            />
                        </div>
                    </>
                ) : (
                    <div style={{ opacity: 0.5, fontSize: '0.9rem' }}>Ready for new video</div>
                )}
            </div>

            {/* Action Area */}
            <div style={{ display: 'flex', gap: '1rem' }}>
                {/* History Button */}
                <div style={{ position: 'relative' }}>
                    <button
                        onClick={() => setShowHistory(!showHistory)}
                        style={{
                            padding: '0.6rem',
                            background: 'white',
                            color: '#555',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        title="My Videos"
                    >
                        {/* Simple History Icon */}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 20v-6M6 20V10M18 20V4" />
                        </svg>
                    </button>

                    {showHistory && (
                        <div style={{
                            position: 'absolute',
                            top: '110%',
                            right: 0,
                            width: '300px',
                            background: 'white',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            padding: '1rem',
                            zIndex: 200
                        }}>
                            <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem' }}>Recent Videos</h4>
                            {history.length === 0 ? (
                                <p style={{ fontSize: '0.9rem', color: '#888' }}>No saved videos yet.</p>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {history.map((item, i) => (
                                        <div
                                            key={i}
                                            onClick={() => {
                                                onUploadComplete(item.mediaId, item.jobId);
                                                setShowHistory(false);
                                            }}
                                            style={{
                                                padding: '0.5rem',
                                                border: '1px solid #eee',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontSize: '0.9rem',
                                                transition: 'background 0.2s'
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
                                            onMouseLeave={e => e.currentTarget.style.background = 'white'}
                                        >
                                            <div style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {item.fileName}
                                            </div>
                                            <div style={{ fontSize: '0.75rem', color: '#999' }}>
                                                {new Date(item.date).toLocaleDateString()}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <input
                    type="file"
                    accept="video/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={!!isUploading || !!isProcessing}
                    style={{
                        padding: '0.6rem 1.2rem',
                        background: (isUploading || isProcessing) ? '#ccc' : 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: (isUploading || isProcessing) ? 'not-allowed' : 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        transition: 'all 0.2s'
                    }}
                >
                    {(isUploading || isProcessing) ? 'Please Wait' : 'Upload New'}
                </button>
            </div>
        </div>
    );
}
