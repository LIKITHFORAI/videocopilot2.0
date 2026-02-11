'use client';

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import MinimalProgressBar from './MinimalProgressBar';
import { useDragDrop } from '@/hooks/useDragDrop';
import AuthButton from '@/components/Auth/AuthButton';
import SharePointPicker from '@/components/SharePoint/SharePointPicker';
import type { ServerImportResult } from '@/components/SharePoint/SharePointPicker';
import PersonalityChooser, { Personality } from '@/components/Personality/PersonalityChooser';
import { theme } from '@/lib/theme';
import { getApiPath } from '@/lib/apiPath';
import { saveVideoToLocal } from '@/lib/browserStorage';

import { useMsal } from '@azure/msal-react';

export interface FileUploaderRef {
    uploadFile: (file: File) => void;
}

interface FileUploaderProps {
    onUploadComplete: (mediaId: string, jobId: string) => void;
    currentJobStatus?: string;
    currentJobProgress?: number;
    onCancel?: () => void;
    personality?: Personality; // Added for passing personality to APIs
    onPersonalityChange?: (personality: Personality) => void; // Handler for personality changes
}

interface HistoryItem {
    mediaId: string;
    jobId: string;
    fileName: string;
    date: string;
    userEmail?: string; // Track who uploaded
}

const FileUploader = forwardRef<FileUploaderRef, FileUploaderProps>(({
    onUploadComplete,
    currentJobStatus,
    currentJobProgress = 0,
    onCancel,
    personality = 'meetings', // Default to meetings
    onPersonalityChange
}, ref) => {
    const { instance, accounts } = useMsal();
    const [status, setStatus] = useState<'idle' | 'uploading' | 'queued' | 'error'>('idle');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [message, setMessage] = useState('');
    const [loadingFromHistory, setLoadingFromHistory] = useState(false);
    const [activeJobId, setActiveJobId] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const xhrRef = useRef<XMLHttpRequest | null>(null);

    // History State
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [showHistory, setShowHistory] = useState(false);

    // Upload State
    const [showUploadModal, setShowUploadModal] = useState(false); // Used for Dropdown now
    const [showOneDriveBrowser, setShowOneDriveBrowser] = useState(false);
    const [sharePointLoading, setSharePointLoading] = useState(false);
    const uploadContainerRef = useRef<HTMLDivElement>(null);

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
            // Close History Popup
            if (showHistory && !isClosing &&
                popupRef.current && !popupRef.current.contains(event.target as Node) &&
                buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
                closePopup();
            }

            // Close Upload Dropdown
            if (showUploadModal &&
                uploadContainerRef.current && !uploadContainerRef.current.contains(event.target as Node)) {
                setShowUploadModal(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showHistory, isClosing, showUploadModal]);

    // Load history on mount and sync with server
    useEffect(() => {
        // 1. Initial load from localStorage for instant UI
        const storageKey = `vc_history_${personality}`;
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            try {
                setHistory(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse history", e);
            }
        } else {
            // Clear history if nothing saved for this personality to prevent stale data
            setHistory([]);
        }

        // 2. ALWAYS fetch fresh list/status from server to fix stuck "Processing" states
        // Use the current user's email to filter the list
        const userEmail = accounts[0]?.username;
        const queryParams = new URLSearchParams({ personality });
        if (userEmail) queryParams.append('userEmail', userEmail);

        fetch(getApiPath(`/api/media/list?${queryParams.toString()}`))
            .then(res => res.json())
            .then(data => {
                if (data.videos && Array.isArray(data.videos)) {
                    // Map server videos to history items
                    const serverItems = data.videos.map((v: any) => ({
                        mediaId: v.id,
                        jobId: v.id, // Use mediaId as jobId fallback
                        fileName: v.title || v.filename || 'Untitled',
                        status: v.status || 'completed',
                        date: new Date(v.upload_date).toLocaleDateString(),
                        progress: 100
                    }));

                    // Update history, keeping local items if needed, but prioritizing server status
                    setHistory(current => {
                        // Trusting server is safer. Server knows what is really done.
                        const newHistory = serverItems;
                        localStorage.setItem(storageKey, JSON.stringify(newHistory));
                        return newHistory;
                    });
                }
            })
            .catch(err => console.error("Failed to sync history", err));
    }, [personality, accounts]);

    // Save history helper
    const addToHistory = (item: HistoryItem) => {
        setHistory(prevHistory => {
            const newHistory = [item, ...prevHistory.filter(h => h.mediaId !== item.mediaId)]; // No limit - show all
            const storageKey = `vc_history_${personality}`;
            localStorage.setItem(storageKey, JSON.stringify(newHistory));
            return newHistory;
        });
    };

    // reset internal state when job completes
    useEffect(() => {
        if (currentJobStatus === 'COMPLETED') {
            // eslint-disable-next-line
            setStatus('idle');
            setMessage('Ready');
        }
    }, [currentJobStatus]);

    const handleCancel = async () => {
        // 1. Cancel Upload
        if (status === 'uploading') {
            if (xhrRef.current) {
                xhrRef.current.abort();
                xhrRef.current = null;
            }
            setStatus('idle');
            setMessage('Cancelled');
            setUploadProgress(0);
            if (onCancel) onCancel();
            return;
        }

        // 2. Cancel Processing
        if (activeJobId || (currentJobStatus && currentJobStatus !== 'COMPLETED' && currentJobStatus !== 'FAILED')) {
            // Prefer internal activeJobId, fallback to what might be passed (though we don't get ID from props usually)
            const jId = activeJobId;
            if (jId) {
                try {
                    await fetch(getApiPath(`/api/job/${jId}`), { method: 'DELETE' });

                    // Remove from History using the jobId
                    const newHistory = history.filter(h => h.jobId !== jId);
                    setHistory(newHistory);
                    localStorage.setItem('vc_history', JSON.stringify(newHistory));

                } catch (e) {
                    console.error("Failed to delete job", e);
                }
            }

            // Reset State
            setStatus('idle');
            setMessage('Cancelled');
            setActiveJobId(null);
            if (onCancel) onCancel();
        }
    };

    const startProcessing = async (mediaId: string, fileName: string, fileId: string | null = null) => {
        try {
            const userEmail = accounts[0]?.username || 'anonymous';

            const res = await fetch(getApiPath('/api/process'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mediaId,
                    personality,
                    userEmail
                }),
            });
            const data = await res.json();
            if (res.ok) {
                // Save to history with user tracking
                addToHistory({
                    mediaId,
                    jobId: data.jobId,
                    fileName,
                    date: new Date().toISOString(),
                    userEmail
                });

                setActiveJobId(data.jobId);
                onUploadComplete(mediaId, data.jobId);
            } else {
                setStatus('error');
                setMessage('Failed to start processing.');
            }
        } catch (_err) {
            setStatus('error');
            setMessage('Failed to connect to processing API.');
        }
    };

    const processFile = async (file: File, fileId: string | null = null) => {
        if (!file) return;

        // Duplicate Check
        const existing = history.find(h => h.fileName === file.name);
        if (existing) {
            const useExisting = window.confirm(
                `You analyzed "${file.name}" on ${new Date(existing.date).toLocaleDateString()}.\n\nLoad the existing analysis instead of re-uploading?`
            );

            if (useExisting) {
                setLoadingFromHistory(true);
                onUploadComplete(existing.mediaId, existing.jobId);
                // Reset flag after a brief delay
                setTimeout(() => setLoadingFromHistory(false), 500);
                return;
            }
        }

        setStatus('uploading');
        setMessage(`Saving locally & uploading ${file.name}...`);
        setUploadProgress(0);

        try {
            const xhr = new XMLHttpRequest();
            xhrRef.current = xhr;
            xhr.open('POST', getApiPath('/api/upload'), true);
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

                    // Save video blob to IndexedDB with the real mediaId
                    try {
                        await saveVideoToLocal(response.mediaId, file, accounts[0]?.username || 'anonymous');
                        console.log(`[FileUploader] Saved ${file.name} to IndexedDB for ${accounts[0]?.username} (${response.mediaId})`);
                    } catch (idbErr) {
                        console.warn('[FileUploader] Failed to save video locally:', idbErr);
                    }

                    // Start the job
                    await startProcessing(response.mediaId, file.name, fileId);
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



    // OneDrive file browser - opens the Graph API modal
    const openSharePointPicker = () => {
        if (!accounts[0]) {
            alert('Please sign in with Microsoft first');
            return;
        }
        setShowOneDriveBrowser(true);
    };

    // Expose uploadFile method via Ref
    useImperativeHandle(ref, () => ({
        uploadFile: (file: File) => {
            processFile(file);
        }
    }));

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        console.log(`📦 Batch upload: ${files.length} file(s) selected`);

        // Process files sequentially
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            console.log(`Processing file ${i + 1}/${files.length}: ${file.name}`);

            // Update message to show batch progress with time estimate
            if (files.length > 1) {
                const avgTimePerVideo = 15; // minutes per video
                const remainingFiles = files.length - i;
                const estimatedMinutes = Math.round(remainingFiles * avgTimePerVideo);
                setMessage(`Batch: ${i + 1}/${files.length} - ${file.name} (~${estimatedMinutes} min remaining)`);
            }

            await processFile(file);

            // Small delay between files to prevent overwhelming the system
            if (i < files.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }

        // Reset input value
        e.target.value = '';

        if (files.length > 1) {
            setMessage(`✅ All ${files.length} files queued! Check Recent Media.`);
            console.log(`✅ All ${files.length} files queued successfully`);
            setTimeout(() => { setMessage(''); setStatus('idle'); }, 3000);
        }
    };

    // Drag and Drop Hook
    const { isDragging, dragHandlers } = useDragDrop(processFile);

    // Determine what to display
    const isUploading = status === 'uploading';
    const isProcessing =
        !loadingFromHistory && ( // Block processing UI when loading from history
            status === 'queued' ||
            (!!currentJobStatus &&
                currentJobStatus !== 'COMPLETED' &&
                currentJobStatus !== 'FAILED' &&
                currentJobStatus !== '')
        );


    // Calculate continuous progress across both stages
    // Upload: 0-20%, Processing: 20-100%
    const displayProgress = isUploading
        ? (uploadProgress * 0.20) // Map upload 0-100% to 0-20%
        : (20 + (currentJobProgress * 0.80)); // Map processing 0-100% to 20-100%


    return (
        <div style={{ position: 'relative', zIndex: 10 }}>
            <div className="header" style={{
                background: theme.colors.upload.uploadBox,
                color: 'white',
                borderBottom: `1px solid ${theme.colors.upload.uploadBoxBorder}`,
                padding: '0.4rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                height: '60px',
                position: 'relative'
            }}>
                {/* Logo / Title Area */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', minWidth: '250px' }}>
                    {/* New Logo */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={getApiPath('/GetITDoneLogo.png')}
                        alt="Get IT Done"
                        style={{
                            height: '38px',
                            width: 'auto',
                            display: 'block'
                        }}
                    />
                    {/* Brand Name */}
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                        <span style={{
                            fontSize: '1.5rem',
                            fontWeight: '600',
                            fontFamily: '"Noto Sans", sans-serif',
                            color: 'white',
                            letterSpacing: '0.5px'
                        }}>
                            DrCloudEHR
                        </span>
                        <span style={{
                            fontSize: '2.2rem',
                            fontWeight: '700',
                            fontFamily: '"Bebas Neue", sans-serif',
                            color: '#a0b1ffe8',
                            fontStyle: 'normal'
                        }}>
                            GetThingsDone
                        </span>
                    </div>
                </div>

                {/* Central Status Area */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem', justifyContent: 'center' }}>
                    <div style={{ opacity: 0.7, fontSize: '0.85rem', textAlign: 'center' }}>
                        {message || ((isUploading || isProcessing) ? 'Processing...' : 'Ready for new media')}
                    </div>
                </div>

                {/* Action Area */}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {/* 0. PERSONALITY Button (Before UPLOAD) */}
                    {onPersonalityChange && (
                        <PersonalityChooser
                            onPersonalityChange={onPersonalityChange}
                            currentPersonality={personality}
                        />
                    )}

                    {/* 1. UPLOAD Button (First) */}
                    <div style={{ position: 'relative' }} ref={uploadContainerRef}>
                        <button
                            {...dragHandlers}
                            onClick={() => {
                                if (isUploading || isProcessing) {
                                    handleCancel();
                                } else {
                                    setShowUploadModal(!showUploadModal);
                                }
                            }}
                            disabled={sharePointLoading}
                            style={{
                                height: '36px',
                                padding: '0 1.25rem',
                                background: (isUploading || isProcessing) ? theme.colors.status.error : (sharePointLoading ? theme.colors.text.light : theme.colors.progressBar.fill),
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: sharePointLoading ? 'not-allowed' : 'pointer',
                                fontSize: '0.8rem',
                                fontWeight: '600',
                                transition: 'background 0.2s',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                            onMouseEnter={(e) => {
                                if (isUploading || isProcessing) {
                                    e.currentTarget.style.background = '#b91c1c'; // Keep distinct hover for error state if need be, or add to theme
                                } else if (!sharePointLoading) {
                                    e.currentTarget.style.background = theme.colors.primaryHover;
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (isUploading || isProcessing) {
                                    e.currentTarget.style.background = theme.colors.status.error;
                                } else if (!sharePointLoading) {
                                    e.currentTarget.style.background = theme.colors.progressBar.fill;
                                }
                            }}
                        >
                            {(isUploading || isProcessing) ? 'CANCEL' : (sharePointLoading ? 'Opening...' : 'UPLOAD')}
                        </button>

                        {/* Upload Dropdown */}
                        {showUploadModal && (
                            <div style={{
                                position: 'absolute',
                                top: '110%',
                                left: 0,
                                width: '200px',
                                background: 'white',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                padding: '0.5rem',
                                zIndex: 200,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.25rem'
                            }}>
                                <button
                                    onClick={() => {
                                        fileInputRef.current?.click();
                                        setShowUploadModal(false);
                                    }}
                                    style={{
                                        padding: '0.75rem 1rem',
                                        border: 'none',
                                        background: 'transparent',
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        borderRadius: '4px',
                                        fontSize: '0.9rem',
                                        color: theme.colors.text.primary,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        fontWeight: '500'
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.background = theme.colors.upload.hoverBg}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                >
                                    💻 Computer
                                </button>
                                <button
                                    onClick={() => {
                                        setShowUploadModal(false);
                                        openSharePointPicker();
                                    }}
                                    style={{
                                        padding: '0.75rem 1rem',
                                        border: 'none',
                                        background: 'transparent',
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        borderRadius: '4px',
                                        fontSize: '0.9rem',
                                        color: theme.colors.text.primary,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        fontWeight: '500'
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.background = theme.colors.upload.hoverBg}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                >
                                    ☁️ SharePoint
                                </button>
                            </div>
                        )}
                    </div>

                    {/* 2. Recent Media Icon Button (Second) */}
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
                                width: '36px',
                                height: '36px',
                                background: theme.colors.progressBar.fill,
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'background 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = theme.colors.primaryHover;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = theme.colors.progressBar.fill;
                            }}
                            title="Recent Media"
                        >
                            {/* Folder with Clock Icon (Scaled) */}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                                <circle cx="12" cy="13" r="3"></circle>
                                <path d="M12 10v3l1.5 1.5"></path>
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
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                    <h4 style={{ margin: 0, fontSize: '1rem' }}>Recent Media</h4>
                                    {history.length > 0 && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (window.confirm('Clear all saved media history?')) {
                                                    setHistory([]);
                                                    localStorage.removeItem('vc_history');
                                                }
                                            }}
                                            style={{
                                                padding: '0.3rem 0.6rem',
                                                fontSize: '0.75rem',
                                                background: '#dc3545',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontWeight: '600'
                                            }}
                                        >
                                            Clear All
                                        </button>
                                    )}
                                </div>
                                {history.length === 0 ? (
                                    <p style={{ fontSize: '0.9rem', color: '#888' }}>No saved media yet.</p>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '400px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                                        {history.map((item, i) => (
                                            <div
                                                key={i}
                                                style={{
                                                    padding: '0.5rem',
                                                    border: '1px solid #eee',
                                                    borderRadius: '4px',
                                                    fontSize: '0.9rem',
                                                    transition: 'background 0.2s',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    gap: '0.5rem'
                                                }}
                                                onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
                                                onMouseLeave={e => e.currentTarget.style.background = 'white'}
                                            >
                                                <div
                                                    onClick={() => {
                                                        setLoadingFromHistory(true);
                                                        setStatus('idle');
                                                        onUploadComplete(item.mediaId, item.jobId);
                                                        setShowHistory(false);
                                                        setTimeout(() => setLoadingFromHistory(false), 500);
                                                    }}
                                                    style={{ flex: 1, cursor: 'pointer', overflow: 'hidden' }}
                                                >
                                                    <div style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#1f2937' }}>
                                                        {item.fileName}
                                                    </div>
                                                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                                                        {new Date(item.date).toLocaleDateString()}
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (window.confirm(`Remove "${item.fileName}" from history?`)) {
                                                            const newHistory = history.filter((_, index) => index !== i);
                                                            setHistory(newHistory);
                                                            localStorage.setItem('vc_history', JSON.stringify(newHistory));
                                                        }
                                                    }}
                                                    style={{
                                                        background: 'none',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        color: '#999',
                                                        padding: '4px',
                                                        borderRadius: '4px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}
                                                    onMouseEnter={e => {
                                                        e.currentTarget.style.color = '#dc3545';
                                                        e.currentTarget.style.background = '#ffe6e6';
                                                    }}
                                                    onMouseLeave={e => {
                                                        e.currentTarget.style.color = '#999';
                                                        e.currentTarget.style.background = 'none';
                                                    }}
                                                    title="Delete"
                                                >
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M3 6h18"></path>
                                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                                    </svg>
                                                </button>
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
                        multiple
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />

                    {/* 3. LOGIN Button (Third) */}
                    <AuthButton />
                </div>

                {/* Progress Bar - Absolutely positioned at bottom of header */}
                {(isUploading || isProcessing) && (
                    <div style={{
                        position: 'absolute',
                        bottom: -1,
                        left: 0,
                        right: 0,
                        height: '6px',
                        backgroundColor: theme.colors.progressBar.bg,
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            height: '100%',
                            width: `${Math.min(displayProgress, 100)}%`,
                            backgroundColor: theme.colors.progressBar.fill,
                            transition: 'width 2s ease-in-out'
                        }} />
                    </div>
                )}
            </div>

            {/* Helper Text - Outside header, directly below */}
            {(isUploading || isProcessing) && (
                <div style={{
                    width: '100%',
                    backgroundColor: 'transparent',
                    paddingTop: '0.5rem',
                    paddingBottom: '0.5rem',
                    fontSize: '12px',
                    color: theme.colors.text.light,
                    textAlign: 'center',
                    fontWeight: '500'
                }}>
                    {message || (
                        isUploading ? 'Uploading File' :
                            (currentJobStatus === 'QUEUED' || currentJobStatus === 'PREPARING' || currentJobStatus === 'EXTRACTING_AUDIO' ||
                                currentJobStatus === 'COMPRESSING_VIDEO' || currentJobStatus === 'CHUNKING' || currentJobStatus === 'TRANSCRIBING' ||
                                currentJobStatus === 'TRANSCRIBING_CHUNK') ? 'Processing File' :
                                'Generating Content'
                    )}
                </div>
            )}

            {/* OneDrive File Browser Modal */}
            <SharePointPicker
                isOpen={showOneDriveBrowser}
                onClose={() => setShowOneDriveBrowser(false)}
                onFileSelected={(fileOrImport: File | ServerImportResult) => {
                    setShowOneDriveBrowser(false);
                    if ('isServerImport' in fileOrImport && fileOrImport.isServerImport) {
                        // Server-side import — file already on disk, skip upload
                        setStatus('queued');
                        setMessage(`Imported ${fileOrImport.fileName} from SharePoint`);
                        startProcessing(fileOrImport.mediaId, fileOrImport.fileName);
                    } else {
                        // Client-side file (fallback / local upload)
                        processFile(fileOrImport as File);
                    }
                }}
            />
        </div>
    );
});

FileUploader.displayName = 'FileUploader';
export default FileUploader;
