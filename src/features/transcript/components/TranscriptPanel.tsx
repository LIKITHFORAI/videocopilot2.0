'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { getApiPath } from '@/shared/utils/apiPath';
import { formatTime } from '@/shared/utils/formatTime';

interface TranscriptPanelProps {
    mediaId: string | null;
    jobId: string | null;
    jobStatus: string;
    onSeek: (time: number) => void;
    highlightTimestamp?: number | null;
    onHighlightDone?: () => void;
}

export default function TranscriptPanel({ mediaId, jobId, jobStatus, onSeek, highlightTimestamp, onHighlightDone }: TranscriptPanelProps) {
    const [transcriptData, setTranscriptData] = useState<any>(null);
    const [polling, setPolling] = useState(false);
    const [highlightedIndices, setHighlightedIndices] = useState<Set<number>>(new Set());
    const segmentRefs = useRef<Map<number, HTMLDivElement>>(new Map());
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!jobId) {
            if (mediaId && jobStatus === 'COMPLETED') {
                // Direct load — content already exists, no polling needed
                setPolling(false);
                fetchTranscript(mediaId);
            } else {
                setTranscriptData(null);
            }
            return;
        }

        // Reset for new job
        setTranscriptData(null);

        let intervalId: NodeJS.Timeout;

        const checkStatus = async () => {
            try {
                const res = await fetch(getApiPath(`/api/job/${jobId}`));
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
    }, [jobId, mediaId, jobStatus]);

    const fetchTranscript = async (mid: string) => {
        try {
            const res = await fetch(getApiPath(`/api/transcript/${mid}`));
            if (res.ok) {
                const data = await res.json();
                setTranscriptData(data);
            }
        } catch (e) {
            console.error("Failed to fetch transcript", e);
        }
    };

    // Handle highlight when Jump is pressed on action items
    useEffect(() => {
        if (highlightTimestamp == null || !transcriptData?.segments?.length) return;

        const segments = transcriptData.segments;
        const HIGHLIGHT_WINDOW = 15; // seconds — highlight segments within this range

        // Find the segment closest to the target timestamp
        let closestIdx = 0;
        let closestDiff = Infinity;
        for (let i = 0; i < segments.length; i++) {
            const diff = Math.abs(segments[i].start - highlightTimestamp);
            if (diff < closestDiff) {
                closestDiff = diff;
                closestIdx = i;
            }
        }

        // Collect indices of segments within the highlight window
        const indices = new Set<number>();
        for (let i = 0; i < segments.length; i++) {
            const segStart = segments[i].start;
            if (segStart >= highlightTimestamp && segStart <= highlightTimestamp + HIGHLIGHT_WINDOW) {
                indices.add(i);
            }
        }
        // Always include the closest segment
        indices.add(closestIdx);

        setHighlightedIndices(indices);

        // Scroll the closest segment into view
        const el = segmentRefs.current.get(closestIdx);
        if (el && scrollContainerRef.current) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Remove highlight after 6 seconds
        const timer = setTimeout(() => {
            setHighlightedIndices(new Set());
            if (onHighlightDone) onHighlightDone();
        }, 6000);

        return () => clearTimeout(timer);
    }, [highlightTimestamp, transcriptData]);

    const setSegmentRef = useCallback((index: number, el: HTMLDivElement | null) => {
        if (el) {
            segmentRefs.current.set(index, el);
        } else {
            segmentRefs.current.delete(index);
        }
    }, []);

    const transcript = transcriptData?.segments || [];

    return (
        <div className="transcript-panel">
            <div className="panel-card">
                <div style={{
                    backgroundColor: 'var(--surface)',
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    padding: '1.2rem',
                    borderBottom: '1px solid var(--border-default)',
                    margin: 0,
                    color: 'var(--text-primary)'
                }}>
                    Transcript
                </div>

                <div className="content-area" style={{ flex: 1, overflow: 'hidden' }}>
                    <div
                        ref={scrollContainerRef}
                        className="transcript-content"
                        style={{ padding: '1rem', height: '100%', overflowY: 'auto' }}
                    >
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
                                {transcript.map((seg: any, i: number) => {
                                    const isHighlighted = highlightedIndices.has(i);
                                    return (
                                        <div
                                            key={i}
                                            ref={(el) => setSegmentRef(i, el)}
                                            className="transcript-segment"
                                            onClick={() => onSeek(seg.start)}
                                            style={{
                                                background: isHighlighted ? 'var(--transcript-segment-highlight-bg)' : 'transparent',
                                                borderLeft: isHighlighted ? '3px solid var(--transcript-segment-highlight-border)' : '3px solid transparent',
                                                borderRadius: isHighlighted ? '4px' : '0',
                                                transition: 'background 0.3s ease, border-left 0.3s ease',
                                                paddingLeft: '0.5rem',
                                                marginLeft: '-0.5rem',
                                            }}
                                        >
                                            <span className="timestamp">{formatTime(seg.start)}</span>
                                            <span className="text">{seg.text}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
