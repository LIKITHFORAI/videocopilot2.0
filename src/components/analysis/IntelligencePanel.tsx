'use client';

import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

type Tab = 'transcript' | 'chat';

interface IntelligencePanelProps {
    mediaId: string | null;
    jobId: string | null;
    onSeek: (time: number) => void;
    onStatusChange?: (status: string) => void;
    onProgressChange?: (progress: number) => void;
}

interface Message {
    role: 'user' | 'assistant';
    content: string;
    citations?: { start: number; end: number; label: string }[];
}

interface KeyPoint {
    text: string;
    timestamp?: number;
}

export default function IntelligencePanel({ mediaId, jobId, onSeek, onStatusChange, onProgressChange }: IntelligencePanelProps) {
    const [activeTab, setActiveTab] = useState<Tab>('transcript');
    const [jobStatus, setJobStatus] = useState<string>('');
    const [transcriptData, setTranscriptData] = useState<any>(null);
    const [polling, setPolling] = useState(false);

    // Chat state
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isChatting, setIsChatting] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    useEffect(() => {
        if (!jobId) {
            // Reset when no job is active
            setTranscriptData(null);
            setMessages([]);
            setJobStatus('');
            return;
        }

        // Reset state for new job
        setTranscriptData(null);
        setMessages([]);

        let intervalId: NodeJS.Timeout;

        const checkStatus = async () => {
            try {
                const res = await fetch(`/api/job/${jobId}`);
                if (res.ok) {
                    const data = await res.json();
                    setJobStatus(data.status);
                    if (onStatusChange) onStatusChange(data.status);

                    const newProgress = data.progress || 0;
                    if (onProgressChange) onProgressChange(newProgress);

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

    const handleSendMessage = async (textOverride?: string) => {
        const textToSend = textOverride || input;

        if (!textToSend.trim() || !mediaId || isChatting) return;

        const userMsg: Message = { role: 'user', content: textToSend };
        setMessages(prev => [...prev, userMsg]);

        // Only clear input if we didn't use an override (i.e., user typed it)
        if (!textOverride) {
            setInput('');
        }

        setIsChatting(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mediaId,
                    question: textToSend,
                    history: messages.map(m => ({ role: m.role, content: m.content }))
                })
            });

            if (res.ok) {
                const data = await res.json();
                setMessages(prev => [...prev, { role: 'assistant', content: data.answer, citations: data.citations }]);
            } else {
                setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I had trouble processing that request." }]);
            }
        } catch (e) {
            setMessages(prev => [...prev, { role: 'assistant', content: "Connect error while chatting." }]);
        } finally {
            setIsChatting(false);
        }
    };

    const handleHighlightClick = (point: KeyPoint) => {
        // 1. Seek Video
        if (point.timestamp !== undefined) {
            onSeek(point.timestamp);
        }

        // 2. Trigger Chat Context
        // We simulate a user asking about this highlight to generate a summary
        handleSendMessage(`Check the video at ${formatTime(point.timestamp || 0)} and tell me more about: "${point.text}"`);
    };

    const formatTime = (seconds: number) => {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };

    const transcript = transcriptData?.segments || [];

    const getKeyPoints = (): KeyPoint[] => {
        if (!transcriptData?.keyPoints) return [];
        return transcriptData.keyPoints.map((kp: any) => {
            if (typeof kp === 'string') return { text: kp, timestamp: 0 };
            return kp;
        });
    };

    const keyPoints = getKeyPoints();

    // Transform content to turn [MM:SS] into clickable links
    const processContent = (text: string) => {
        // Regex matches [MM:SS] or [H:MM:SS]
        return text.replace(/\[((?:\d{1,2}:)?\d{1,2}:\d{2})\]/g, (match, timeStr) => {
            const parts = timeStr.split(':').map(Number);
            let seconds = 0;
            if (parts.length === 3) seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
            else seconds = parts[0] * 60 + parts[1];

            // Return Markdown link format: [08:10](#seek:490)
            return `[${match}](#seek:${seconds})`;
        });
    };

    return (
        <div className="intelligence-panel">
            <div className="panel-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

                <div className="tabs">
                    <div className={`tab ${activeTab === 'transcript' ? 'active' : ''}`} onClick={() => setActiveTab('transcript')}>Transcript</div>
                    <div className={`tab ${activeTab === 'chat' ? 'active' : ''}`} onClick={() => setActiveTab('chat')}>Chat</div>
                </div>

                <div className="content-area" style={{ flex: 1, overflow: 'hidden' }}>
                    {activeTab === 'transcript' && (
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
                    )}

                    {activeTab === 'chat' && (
                        <div className="chat-container" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <div className="messages" style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
                                {/* Loading Skeleton for Summary & Highlights */}
                                {mediaId && polling && !transcriptData && (
                                    <div className="skeleton-summary">
                                        {/* Header */}
                                        <div className="skeleton" style={{ width: '30%', height: '24px', marginBottom: '1rem' }}></div>
                                        {/* Summary Lines */}
                                        <div className="skeleton" style={{ width: '100%', height: '16px', marginBottom: '0.6rem' }}></div>
                                        <div className="skeleton" style={{ width: '92%', height: '16px', marginBottom: '0.6rem' }}></div>
                                        <div className="skeleton" style={{ width: '96%', height: '16px', marginBottom: '2rem' }}></div>

                                        {/* Highlights Header */}
                                        <div className="skeleton" style={{ width: '40%', height: '22px', marginBottom: '1.2rem' }}></div>

                                        {/* Bubbles */}
                                        {[...Array(3)].map((_, i) => (
                                            <div key={i} className="skeleton" style={{ width: '100%', height: '70px', marginBottom: '1rem', borderRadius: '12px' }}></div>
                                        ))}

                                        <div style={{ textAlign: 'center', marginTop: '2rem', color: '#888', fontSize: '0.9rem' }}>
                                            <p>AI is analyzing your video...</p>
                                        </div>
                                    </div>
                                )}

                                {/* Summary Header */}
                                {transcriptData && (
                                    <div className="summary-header" style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                                        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: '700' }}>
                                            {transcriptData.title || "Video Recap"}
                                        </h3>
                                        <p style={{ fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem', color: '#444' }}>
                                            {transcriptData.summary}
                                        </p>

                                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.8rem', fontWeight: '700' }}>Key Highlights</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                            {keyPoints.map((point, idx) => (
                                                <div
                                                    key={idx}
                                                    onClick={() => handleHighlightClick(point)}
                                                    style={{
                                                        padding: '1rem',
                                                        background: 'white',
                                                        border: '1px solid #e2e8f0',
                                                        borderRadius: '12px',
                                                        boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s',
                                                        display: 'flex',
                                                        alignItems: 'flex-start',
                                                        gap: '0.8rem'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.06)';
                                                        e.currentTarget.style.borderColor = 'var(--primary)';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.transform = 'translateY(0)';
                                                        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.03)';
                                                        e.currentTarget.style.borderColor = '#e2e8f0';
                                                    }}
                                                >
                                                    <div style={{
                                                        background: 'var(--primary)', color: 'white',
                                                        borderRadius: '50%', width: '24px', height: '24px',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        fontSize: '0.8rem', fontWeight: 'bold', flexShrink: 0, marginTop: '2px'
                                                    }}>
                                                        {idx + 1}
                                                    </div>
                                                    <div>
                                                        <p style={{ fontSize: '0.95rem', margin: 0, fontWeight: '500' }}>{point.text}</p>
                                                        {point.timestamp !== undefined && point.timestamp > 0 && (
                                                            <span style={{ fontSize: '0.8rem', color: 'var(--primary)', marginTop: '0.3rem', display: 'block' }}>
                                                                Jump to {formatTime(point.timestamp)}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {messages.map((m, i) => (
                                    <div key={i} className={`message-row ${m.role}`}>
                                        <div className="message-content">
                                            {m.role === 'assistant' ? (
                                                <div className="prose">
                                                    <ReactMarkdown
                                                        components={{
                                                            a: ({ node, href, children, ...props }) => {
                                                                if (href?.startsWith('#seek:')) {
                                                                    const seconds = parseFloat(href.split(':')[1]);
                                                                    return (
                                                                        <button
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                onSeek(seconds);
                                                                            }}
                                                                            style={{
                                                                                background: '#eff6ff', // blue-50
                                                                                color: '#2563eb', // blue-600
                                                                                border: '1px solid #bfdbfe', // blue-200
                                                                                borderRadius: '12px',
                                                                                padding: '2px 8px',
                                                                                fontSize: '0.85em',
                                                                                fontWeight: '600',
                                                                                cursor: 'pointer',
                                                                                display: 'inline-block',
                                                                                verticalAlign: 'middle',
                                                                                margin: '0 2px',
                                                                                textDecoration: 'none'
                                                                            }}
                                                                        >
                                                                            {children}
                                                                        </button>
                                                                    );
                                                                }
                                                                return <a href={href} {...props}>{children}</a>;
                                                            }
                                                        }}
                                                    >
                                                        {processContent(m.content)}
                                                    </ReactMarkdown>
                                                </div>
                                            ) : (
                                                <p>{m.content}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {isChatting && <div className="typing-indicator">Thinking...</div>}
                                <div ref={chatEndRef} />
                            </div>

                            <div className="chat-input-area">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Type a question..."
                                    disabled={!mediaId || polling || isChatting}
                                />
                                <button
                                    onClick={() => handleSendMessage()}
                                    disabled={!mediaId || polling || isChatting || !input.trim()}
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
