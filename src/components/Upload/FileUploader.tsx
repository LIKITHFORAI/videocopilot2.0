'use client';

import { useState, useRef, useEffect } from 'react';

interface FileUploaderProps {
    onUploadComplete: (mediaId: string, jobId: string) => void;
    currentJobStatus?: string;
    currentJobProgress?: number;
}

export default function FileUploader({
    onUploadComplete,
    currentJobStatus,
    currentJobProgress = 0,
}: FileUploaderProps) {
    const [status, setStatus] = useState<
        'idle' | 'uploading' | 'queued' | 'error'
    >('idle');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [message, setMessage] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    // reset internal state when job completes
    useEffect(() => {
        if (currentJobStatus === 'COMPLETED') {
            setStatus('idle');
            setMessage('Ready');
            // We essentially allow "Upload New" now.
        }
    }, [currentJobStatus]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Reset input value to allow re-uploading the same file
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
                    await startProcessing(response.mediaId);
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

    const startProcessing = async (mediaId: string) => {
        try {
            const res = await fetch('/api/process', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mediaId }),
            });
            const data = await res.json();
            if (res.ok) {
                // Determine layout will switch to external status
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
    // We are "processing" if local status is queued OR external job status is active
    const isProcessing =
        status === 'queued' ||
        (currentJobStatus &&
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
            <div>
                <input
                    type="file"
                    accept="video/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading || isProcessing}
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
