'use client';

import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { useDragDrop } from '@/hooks/useDragDrop';
import { getVideoFromLocal } from '@/lib/browserStorage';

export interface VideoPlayerRef {
    seekTo: (time: number) => void;
}

interface VideoPlayerProps {
    mediaId: string | null;
    jobStatus?: string;
    onFileDrop?: (file: File) => void;
}

const VideoPlayer = forwardRef<VideoPlayerRef, VideoPlayerProps>(({ mediaId, jobStatus, onFileDrop }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const { accounts } = useMsal();
    const userEmail = accounts[0]?.username || '';
    const { isDragging, dragHandlers } = useDragDrop(onFileDrop);

    // Video source: either a local blob URL or the server stream endpoint
    const [videoSrc, setVideoSrc] = useState<string | null>(null);
    const [sourceType, setSourceType] = useState<'local' | 'server' | 'none'>('none');
    const [loading, setLoading] = useState(false);

    useImperativeHandle(ref, () => ({
        seekTo: (time: number) => {
            if (videoRef.current) {
                videoRef.current.currentTime = time;
                videoRef.current.play().catch(() => { });
            }
        }
    }));

    // Resolve video source whenever mediaId changes
    useEffect(() => {
        if (!mediaId) {
            setVideoSrc(null);
            setSourceType('none');
            return;
        }

        let cancelled = false;
        const blobUrlRef: { current: string | null } = { current: null };

        async function resolveSource() {
            setLoading(true);

            // 1. Try IndexedDB (local blob)
            try {
                const local = await getVideoFromLocal(mediaId!, userEmail);
                if (local && !cancelled) {
                    const url = URL.createObjectURL(local.blob);
                    blobUrlRef.current = url;
                    setVideoSrc(url);
                    setSourceType('local');
                    setLoading(false);
                    return;
                }
            } catch (e) {
                console.warn('[VideoPlayer] IndexedDB lookup failed:', e);
            }

            // 2. Try server stream (HEAD request to check if file exists)
            try {
                const resp = await fetch(`/api/media/${mediaId}/stream`, { method: 'HEAD' });
                if (resp.ok && !cancelled) {
                    setVideoSrc(`/api/media/${mediaId}/stream`);
                    setSourceType('server');
                    setLoading(false);
                    return;
                }
            } catch (e) {
                console.warn('[VideoPlayer] Server stream check failed:', e);
            }

            // 3. Neither available
            if (!cancelled) {
                setVideoSrc(null);
                setSourceType('none');
                setLoading(false);
            }
        }

        resolveSource();

        return () => {
            cancelled = true;
            // Revoke blob URL to free memory
            if (blobUrlRef.current) {
                URL.revokeObjectURL(blobUrlRef.current);
            }
        };
    }, [mediaId, jobStatus, userEmail]);

    // ── No media selected ──
    if (!mediaId) {
        return (
            <div
                className="video-section"
                {...dragHandlers}
                style={{
                    ...(isDragging ? {
                        border: '2px dashed var(--primary)',
                        background: 'rgba(59, 130, 246, 0.1)'
                    } : {})
                }}
            >
                <div style={{ textAlign: 'center', opacity: 0.6, pointerEvents: 'none' }}>
                    <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                        {isDragging ? 'Drop to Upload' : 'Video Player Placeholder'}
                    </p>
                    <p style={{ fontSize: '0.9rem' }}>
                        {isDragging ? 'Release to start analysis' : 'Upload or Drop media to start playback'}
                    </p>
                </div>
            </div>
        );
    }

    // ── Loading state ──
    if (loading) {
        return (
            <div className="video-section" style={{
                background: '#111',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', gap: '0.5rem'
            }}>
                <div style={{
                    width: '32px', height: '32px',
                    border: '3px solid #333', borderTopColor: '#0078D4',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }} />
                <span style={{ color: '#888', fontSize: '0.85rem' }}>Loading video...</span>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    // ── Video not found (no local blob, no server file) ──
    if (!videoSrc) {
        return (
            <div className="video-section" style={{
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', gap: '0.75rem', padding: '2rem',
                textAlign: 'center'
            }}>
                <div style={{ fontSize: '2rem' }}>📄</div>
                <div style={{ color: '#e0e0e0', fontWeight: 600 }}>
                    Video not available on this device
                </div>
                <div style={{ color: '#888', fontSize: '0.85rem', maxWidth: '300px' }}>
                    The transcript and analysis are still available below.
                    To watch the video, open this page on the device where it was originally uploaded.
                </div>
            </div>
        );
    }

    // ── Playback ──
    return (
        <div className="video-section" style={{ background: 'black' }}>
            {sourceType === 'local' && (
                <div style={{
                    position: 'absolute', top: '8px', right: '8px',
                    background: 'rgba(0,120,212,0.8)', color: '#fff',
                    padding: '2px 8px', borderRadius: '4px',
                    fontSize: '0.7rem', fontWeight: 600, zIndex: 10
                }}>
                    LOCAL
                </div>
            )}
            <video
                key={`${mediaId}-${jobStatus === 'COMPLETED' ? 'ready' : 'processing'}-${sourceType}`}
                ref={videoRef}
                src={videoSrc}
                controls
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            >
                Your browser does not support the video tag.
            </video>
        </div>
    );
});

VideoPlayer.displayName = 'VideoPlayer';
export default VideoPlayer;
