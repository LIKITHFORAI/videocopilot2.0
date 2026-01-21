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

    // Poll for job status
    useEffect(() => {
        if (!jobId) return;

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

    const handleSendMessage = async () => {
        if (!input.trim() || !mediaId || isChatting) return;

        const userMsg: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsChatting(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mediaId,
                    question: input,
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

    const formatTime = (seconds: number) => {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };

    const transcript = transcriptData?.segments || [];

    // Helper to get key points safely
    const getKeyPoints = (): KeyPoint[] => {
        if (!transcriptData?.keyPoints) return [];
        return transcriptData.keyPoints.map((kp: any) => {
            if (typeof kp === 'string') return { text: kp, timestamp: 0 };
            return kp;
        });
    };

    const keyPoints = getKeyPoints();

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

                            {mediaId && polling && (
                                <div style={{ textAlign: 'center', padding: '3rem', opacity: 0.5 }}>
                                    <p style={{ fontStyle: 'italic' }}>Processing transcript in background...</p>
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
                                {/* Dynamic Summary & Highlights Header */}
                                {transcriptData && (
                                    <div className="summary-header" style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                                        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: '700' }}>Video Recap</h3>
                                        <p style={{ fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem', color: '#444' }}>
                                            {transcriptData.summary}
                                        </p>

                                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.8rem', fontWeight: '700' }}>Key Highlights</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                            {keyPoints.map((point, idx) => (
                                                <div
                                                    key={idx}
                                                    onClick={() => point.timestamp !== undefined && onSeek(point.timestamp)}
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

                                {/* Chat Messages */}
                                {messages.length === 0 && !transcriptData && (
                                    <div style={{ padding: '2rem', textAlign: 'center', opacity: 0.5 }}>
                                        <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Ask anything about the video!</p>
                                        <p style={{ fontSize: '0.85rem' }}>Processing...</p>
                                    </div>
                                )}

                                {messages.map((m, i) => (
                                    <div key={i} className={`message-row ${m.role}`}>
                                        <div className="message-content">
                                            {m.role === 'assistant' ? (
                                                <div className="prose">
                                                    <ReactMarkdown>{m.content}</ReactMarkdown>
                                                    {m.citations && m.citations.length > 0 && (
                                                        <div className="citations-list">
                                                            {m.citations.map((c, j) => (
                                                                <button
                                                                    key={j}
                                                                    onClick={() => onSeek(c.start)}
                                                                    className="citation-chip"
                                                                >
                                                                    Jump to {c.label}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
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
                                    onClick={handleSendMessage}
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
