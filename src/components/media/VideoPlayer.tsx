'use client';

import { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';

export interface VideoPlayerRef {
    seekTo: (time: number) => void;
}

interface VideoPlayerProps {
    mediaId: string | null;
    jobStatus?: string;
}

const VideoPlayer = forwardRef<VideoPlayerRef, VideoPlayerProps>(({ mediaId, jobStatus }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);

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
            <div className="video-section">
                <div style={{ textAlign: 'center', opacity: 0.6 }}>
                    <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>Video Player Placeholder</p>
                    <p style={{ fontSize: '0.9rem' }}>Upload a video to start playback</p>
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
