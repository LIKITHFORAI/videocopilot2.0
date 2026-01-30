'use client';

import { useState, useEffect } from 'react';

interface TranscriptPanelProps {
    mediaId: string | null;
    jobId: string | null;
    jobStatus: string;
    onSeek: (time: number) => void;
}

export default function TranscriptPanel({ mediaId, jobId, jobStatus, onSeek }: TranscriptPanelProps) {
    const [transcriptData, setTranscriptData] = useState<any>(null);
    const [polling, setPolling] = useState(false);

    useEffect(() => {
        if (!jobId) {
            setTranscriptData(null);
            return;
        }

        // Reset for new job
        setTranscriptData(null);

        let intervalId: NodeJS.Timeout;

        const checkStatus = async () => {
            try {
                const res = await fetch(`/api/job/${jobId}`);
                if (res.ok) {
                    const data = await res.json();

                    if (data.status === 'COMPLETED') {
                        setPolling(false);
                        fetchTranscript(data.mediaId);
                        clearInterval(intervalId);
                    } else if (data.status === 'FAILED') {
                        setPolling(false);
                        clearInterval(intervalId);
                    }
                }
            } catch (e) {
                console.error('Polling error', e);
            }
        };

        setPolling(true);
        checkStatus();
        intervalId = setInterval(checkStatus, 2000);

        return () => clearInterval(intervalId);
    }, [jobId]);

    const fetchTranscript = async (mid: string) => {
        try {
            const res = await fetch(`/api/transcript/${mid}`);
            if (res.ok) {
                const data = await res.json();
                setTranscriptData(data);
            }
        } catch (e) {
            console.error("Failed to fetch transcript", e);
        }
    };

    const formatTime = (seconds: number) => {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };

    const transcript = transcriptData?.segments || [];

    return (
        <div className="transcript-panel">
            <div className="panel-card">
                <div style={{
                    backgroundColor: 'white',
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    padding: '1.2rem',
                    borderBottom: '1px solid var(--border)',
                    margin: 0
                }}>
                    Transcript
                </div>

                <div className="content-area" style={{ flex: 1, overflow: 'hidden' }}>
                    <div className="transcript-content" style={{ padding: '1rem', height: '100%', overflowY: 'auto' }}>
                        {!mediaId && <p style={{ opacity: 0.6 }}>Upload a video to see the transcript.</p>}

                        {/* Loading Skeleton for Transcript */}
                        {mediaId && polling && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '0.5rem' }}>
                                {[...Array(12)].map((_, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                        <div className="skeleton" style={{ width: '45px', height: '16px' }}></div>
                                        <div className="skeleton" style={{ flex: 1, height: '16px', maxWidth: `${Math.random() * 30 + 60}%` }}></div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {mediaId && !polling && transcript.length === 0 && jobStatus === 'COMPLETED' && <p>No speech detected.</p>}
                        {mediaId && !polling && transcript.length > 0 && (
                            <div>
                                {transcript.map((seg: any, i: number) => (
                                    <div
                                        key={i}
                                        className="transcript-segment"
                                        onClick={() => onSeek(seg.start)}
                                    >
                                        <span className="timestamp">{formatTime(seg.start)}</span>
                                        <span className="text">{seg.text}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
