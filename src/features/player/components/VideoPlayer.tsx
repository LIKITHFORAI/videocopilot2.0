'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useDragDrop } from '@/hooks/useDragDrop';
import { useVideoSource } from '../hooks/useVideoSource';

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
    const { isDragging, dragHandlers } = useDragDrop(onFileDrop);
    const { videoSrc, sourceType, loading } = useVideoSource(mediaId, jobStatus);

    useImperativeHandle(ref, () => ({
        seekTo: (time: number) => {
            if (videoRef.current) {
                videoRef.current.currentTime = time;
                videoRef.current.play().catch(() => { });
            }
        }
    }));

    // ── No media selected ──
    if (!mediaId) {
        return (
            <div
                className="video-section"
                {...dragHandlers}
                style={{
                    ...(isDragging ? {
                        border: '2px dashed var(--video-badge-local-bg)',
                        background: 'var(--video-container-bg)',
                        opacity: 0.8
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
                background: 'var(--video-loading-overlay)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', gap: '0.5rem'
            }}>
                <div style={{
                    width: '32px', height: '32px',
                    border: '3px solid var(--border-light)', borderTopColor: 'var(--video-badge-local-bg)',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }} />
                <span style={{ color: 'var(--text-white)', fontSize: '0.85rem' }}>Loading video...</span>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    // ── Video not found (no local blob, no server file) ──
    if (!videoSrc) {
        return (
            <div className="video-section" style={{
                background: 'var(--video-container-bg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', gap: '0.75rem', padding: '2rem',
                textAlign: 'center'
            }}>
                <div style={{ fontSize: '2rem' }}>📄</div>
                <div style={{ color: 'var(--video-error-text)', fontWeight: 600 }}>
                    Video not available on this device
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '300px' }}>
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
                    background: 'var(--video-badge-local-bg)', opacity: 0.8, color: '#fff',
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
