'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useDragDrop } from '@/hooks/useDragDrop';

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

    useImperativeHandle(ref, () => ({
        seekTo: (time: number) => {
            if (videoRef.current) {
                videoRef.current.currentTime = time;
                videoRef.current.play().catch(() => { });
            }
        }
    }));

    if (!mediaId) {
        return (
            <div
                className="video-section"
                {...dragHandlers}
                style={{
                    // Only override styles when dragging
                    ...(isDragging ? {
                        border: '2px dashed var(--primary)',
                        background: 'rgba(59, 130, 246, 0.1)' // Light blue overlay on top of (or replacing) gradient
                    } : {
                        // When not dragging, let CSS handle background and border
                        // But we might want to ensure border matches CSS if we were overriding it
                    })
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

    // Use the streaming endpoint
    const videoSrc = `/api/media/${mediaId}/stream`;

    return (
        <div className="video-section" style={{ background: 'black' }}>
            <video
                key={`${mediaId}-${jobStatus === 'COMPLETED' ? 'ready' : 'processing'}`} // Force reload when status changes to COMPLETED
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
