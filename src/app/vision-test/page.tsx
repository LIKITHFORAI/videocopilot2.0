'use client';

import { useState } from 'react';
import { getApiPath } from '@/lib/apiPath';

interface Frame {
    filename: string;
    timestamp: number;
    timestampFormatted: string;
    data: string;
    description?: string;
    analyzing?: boolean;
}

export default function VisionTestPage() {
    const [mediaId, setMediaId] = useState('');
    const [frames, setFrames] = useState<Frame[]>([]);
    const [extracting, setExtracting] = useState(false);
    const [error, setError] = useState('');

    const extractFrames = async () => {
        if (!mediaId) {
            setError('Please enter a media ID');
            return;
        }

        setExtracting(true);
        setError('');
        setFrames([]);

        try {
            const res = await fetch(getApiPath('/api/extract-frames'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mediaId,
                    intervalSeconds: 5,
                    maxFrames: 10
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to extract frames');
            }

            setFrames(data.frames);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setExtracting(false);
        }
    };

    const analyzeFrame = async (index: number) => {
        const frame = frames[index];

        // Update analyzing state
        setFrames(prev => prev.map((f, i) =>
            i === index ? { ...f, analyzing: true } : f
        ));

        try {
            const res = await fetch(getApiPath('/api/vision'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: frame.data })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to analyze frame');
            }

            // Update with description
            setFrames(prev => prev.map((f, i) =>
                i === index ? { ...f, description: data.description, analyzing: false } : f
            ));
        } catch (err: any) {
            setFrames(prev => prev.map((f, i) =>
                i === index ? { ...f, description: `Error: ${err.message}`, analyzing: false } : f
            ));
        }
    };

    const analyzeAllFrames = async () => {
        for (let i = 0; i < frames.length; i++) {
            await analyzeFrame(i);
        }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
                🔬 Gemini Vision Test Lab
            </h1>

            {/* Input Section */}
            <div style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                marginBottom: '2rem'
            }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                    Media ID (from saved videos):
                </label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <input
                        type="text"
                        value={mediaId}
                        onChange={(e) => setMediaId(e.target.value)}
                        placeholder="e.g., 061f4e68-fe0d-4bdb-83e1-de1870840fe3"
                        style={{
                            flex: 1,
                            padding: '0.75rem',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            fontSize: '0.9rem'
                        }}
                    />
                    <button
                        onClick={extractFrames}
                        disabled={extracting}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: extracting ? '#ccc' : '#0066ff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontWeight: '600',
                            cursor: extracting ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {extracting ? 'Extracting...' : 'Extract Frames'}
                    </button>
                </div>

                {error && (
                    <div style={{
                        marginTop: '1rem',
                        padding: '0.75rem',
                        background: '#fee',
                        border: '1px solid #f88',
                        borderRadius: '6px',
                        color: '#c00'
                    }}>
                        {error}
                    </div>
                )}
            </div>

            {/* Quick Actions */}
            {frames.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                    <button
                        onClick={analyzeAllFrames}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: '#6366f1',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        🚀 Analyze All Frames with Gemini
                    </button>
                    <span style={{ marginLeft: '1rem', color: '#666' }}>
                        {frames.length} frames extracted
                    </span>
                </div>
            )}

            {/* Frames Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 1fr))',
                gap: '1.5rem'
            }}>
                {frames.map((frame, index) => (
                    <div key={index} style={{
                        background: 'white',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}>
                        {/* Image */}
                        <div style={{ position: 'relative' }}>
                            <img
                                src={frame.data}
                                alt={`Frame ${index + 1}`}
                                style={{ width: '100%', display: 'block' }}
                            />
                            <div style={{
                                position: 'absolute',
                                top: '0.5rem',
                                left: '0.5rem',
                                background: 'rgba(0,0,0,0.7)',
                                color: 'white',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '4px',
                                fontSize: '0.85rem',
                                fontWeight: '600'
                            }}>
                                {frame.timestampFormatted}
                            </div>
                        </div>

                        {/* Info */}
                        <div style={{ padding: '1rem' }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '0.75rem'
                            }}>
                                <h3 style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                                    Frame {index + 1}
                                </h3>
                                <button
                                    onClick={() => analyzeFrame(index)}
                                    disabled={frame.analyzing}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        background: frame.analyzing ? '#ccc' : '#4ade80',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        fontSize: '0.85rem',
                                        fontWeight: '600',
                                        cursor: frame.analyzing ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    {frame.analyzing ? '🔄 Analyzing...' : frame.description ? '✅ Re-analyze' : '🔍 Analyze'}
                                </button>
                            </div>

                            {/* Description */}
                            {frame.description && (
                                <div style={{
                                    background: '#f5f5f5',
                                    padding: '0.75rem',
                                    borderRadius: '6px',
                                    fontSize: '0.85rem',
                                    lineHeight: '1.5',
                                    whiteSpace: 'pre-wrap'
                                }}>
                                    {frame.description}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
