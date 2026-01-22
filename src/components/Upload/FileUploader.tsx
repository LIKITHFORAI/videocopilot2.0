'use client';

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import ProgressSteps from './ProgressSteps';
import { useDragDrop } from '@/hooks/useDragDrop';

export interface FileUploaderRef {
    uploadFile: (file: File) => void;
}

interface FileUploaderProps {
    onUploadComplete: (mediaId: string, jobId: string, type: 'video' | 'audio') => void;
    currentJobStatus?: string;
    currentJobProgress?: number;
}

interface HistoryItem {
    mediaId: string;
    jobId: string;
    fileName: string;
    date: string;
    type?: 'video' | 'audio'; // Add type to history
}

const FileUploader = forwardRef<FileUploaderRef, FileUploaderProps>(({
    onUploadComplete,
    currentJobStatus,
    currentJobProgress = 0,
}, ref) => {
    const [status, setStatus] = useState<'idle' | 'uploading' | 'queued' | 'error'>('idle');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [mediaType, setMediaType] = useState<'video' | 'audio'>('video');
    const [message, setMessage] = useState('');
    const [loadingFromHistory, setLoadingFromHistory] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // History State
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [showHistory, setShowHistory] = useState(false);

    // Popup UX State
    const [isClosing, setIsClosing] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const closePopup = () => {
        setIsClosing(true);
        setTimeout(() => {
            setShowHistory(false);
            setIsClosing(false);
        }, 1000);
    };

    // Click Outside Listener
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (showHistory && !isClosing &&
                popupRef.current && !popupRef.current.contains(event.target as Node) &&
                buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
                closePopup();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showHistory, isClosing]);

    // Load history on mount
    useEffect(() => {
        const saved = localStorage.getItem('vc_history');
        if (saved) {
            try {
                // eslint-disable-next-line
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
            // eslint-disable-next-line
            setStatus('idle');
            setMessage('Ready');
        }
    }, [currentJobStatus]);

    const startProcessing = async (mediaId: string, fileName: string, type: 'video' | 'audio') => {
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
                    date: new Date().toISOString(),
                    type: type
                });

                onUploadComplete(mediaId, data.jobId, type);
            } else {
                setStatus('error');
                setMessage('Failed to start processing.');
            }
        } catch (_err) {
            setStatus('error');
            setMessage('Failed to connect to processing API.');
        }
    };

    const processFile = async (file: File) => {
        if (!file) return;

        // Duplicate Check
        const existing = history.find(h => h.fileName === file.name);
        if (existing) {
            const useExisting = window.confirm(
                `You analyzed "${file.name}" on ${new Date(existing.date).toLocaleDateString()}.\n\nLoad the existing analysis instead of re-uploading?`
            );

            if (useExisting) {
                setLoadingFromHistory(true);
                // Use stored type or guess from extension if missing (legacy history items)
                const type = existing.type || (/\.(mp3|wav|m4a|aac|flac|ogg)$/i.test(existing.fileName) ? 'audio' : 'video');
                setMediaType(type);

                onUploadComplete(existing.mediaId, existing.jobId, type);
                // Reset flag after a brief delay
                setTimeout(() => setLoadingFromHistory(false), 500);
                return;
            }
        }

        // Detect Media Type
        const isAudio = file.type.startsWith('audio/') ||
            /\.(mp3|wav|m4a|aac|flac|ogg)$/i.test(file.name);
        setMediaType(isAudio ? 'audio' : 'video');

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
                    await startProcessing(response.mediaId, file.name, isAudio ? 'audio' : 'video');
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

    // Expose uploadFile method via Ref
    useImperativeHandle(ref, () => ({
        uploadFile: (file: File) => {
            processFile(file);
        }
    }));

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            processFile(file);
            // Reset input value
            e.target.value = '';
        }
    };

    // Drag and Drop Hook
    const { isDragging, dragHandlers } = useDragDrop(processFile);

    // Determine what to display
    const isUploading = status === 'uploading';
    const isProcessing =
        status === 'queued' ||
        (!!currentJobStatus && // Force boolean
            currentJobStatus !== 'COMPLETED' &&
            currentJobStatus !== 'FAILED' &&
            currentJobStatus !== '' &&
            !loadingFromHistory); // Don't show progress for saved videos

    // const displayStatus = isUploading ? 'Uploading Media...' : `Processing: ${currentJobStatus?.replace('_', ' ') || 'Initializing'}...`;
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
                    <ProgressSteps
                        currentStatus={isUploading ? 'UPLOADING' : currentJobStatus}
                        progress={displayProgress}
                        mediaType={mediaType}
                    />
                ) : (
                    <div style={{ opacity: 0.5, fontSize: '0.9rem', textAlign: 'center' }}>{message || 'Ready for new media'}</div>
                )}
            </div>

            {/* Action Area */}
            <div style={{ display: 'flex', gap: '1rem' }}>
                {/* History Button */}
                <div style={{ position: 'relative' }}>
                    <button
                        ref={buttonRef}
                        onClick={() => {
                            if (showHistory && !isClosing) {
                                closePopup();
                            } else if (!showHistory) {
                                setShowHistory(true);
                            }
                        }}
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
                        title="My Media"
                    >
                        {/* Simple History Icon */}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 20v-6M6 20V10M18 20V4" />
                        </svg>
                    </button>

                    {/* Popup */}
                    {(showHistory || isClosing) && (
                        <div
                            ref={popupRef}
                            style={{
                                position: 'absolute',
                                top: '110%',
                                right: 0,
                                width: '300px',
                                background: 'white',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                padding: '1rem',
                                zIndex: 200,
                                opacity: isClosing ? 0 : 1,
                                transition: 'opacity .5s ease-out',
                                pointerEvents: isClosing ? 'none' : 'auto'
                            }}>
                            <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem' }}>Recent Media</h4>
                            {history.length === 0 ? (
                                <p style={{ fontSize: '0.9rem', color: '#888' }}>No saved media yet.</p>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {history.map((item, i) => (
                                        <div
                                            key={i}
                                            onClick={() => {
                                                setLoadingFromHistory(true);
                                                // Use stored type or guess from extension if missing (legacy history items)
                                                const type = item.type || (/\.(mp3|wav|m4a|aac|flac|ogg)$/i.test(item.fileName) ? 'audio' : 'video');
                                                onUploadComplete(item.mediaId, item.jobId, type);
                                                setShowHistory(false);
                                                // Reset flag after a brief delay
                                                setTimeout(() => setLoadingFromHistory(false), 1000);
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
                    accept="video/*,audio/*,.mkv"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                <button
                    {...dragHandlers}
                    onClick={() => fileInputRef.current?.click()}
                    disabled={!!isUploading || !!isProcessing}
                    style={{
                        padding: '0.6rem 1.2rem',
                        background: (isUploading || isProcessing) ? '#ccc' : (isDragging ? 'var(--secondary)' : 'var(--primary)'),
                        color: 'white',
                        border: isDragging ? '2px dashed white' : 'none',
                        borderRadius: '6px',
                        cursor: (isUploading || isProcessing) ? 'not-allowed' : 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        transition: 'all 0.2s',
                        transform: isDragging ? 'scale(1.05)' : 'scale(1)'
                    }}
                >
                    {(isUploading || isProcessing) ? 'Please Wait' : (isDragging ? 'Drop File' : 'Upload New')}
                </button>
            </div>
        </div>
    );
});

FileUploader.displayName = 'FileUploader';
export default FileUploader;
