'use client';

import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { formatTime } from '@/shared/utils/formatTime';
import { Personality } from '@/features/personality/components/PersonalityChooser';
import { useIntelligence, Message, TrainingTab, CrossVideoSource } from '../hooks/useIntelligence';

interface IntelligencePanelProps {
    mediaId: string | null;
    jobId: string | null;
    onSeek: (time: number) => void;
    onStatusChange?: (status: string) => void;
    onProgressChange?: (progress: number) => void;
    personality?: Personality;
}

interface KeyPoint {
    text: string;
    timestamp?: number;
}

export default function IntelligencePanel({
    mediaId,
    jobId,
    onSeek,
    onStatusChange,
    onProgressChange,
    personality = 'meetings'
}: IntelligencePanelProps) {
    const {
        jobStatus,
        transcriptData,
        polling,
        messages,
        isChatting,
        activeTrainingTab,
        setActiveTrainingTab,
        trainingMessages,
        sendMessage
    } = useIntelligence(mediaId, jobId, personality, onStatusChange, onProgressChange);

    const [input, setInput] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, trainingMessages, activeTrainingTab]);

    const handleSendMessage = async (textOverride?: string) => {
        const textToSend = textOverride || input;
        if (!textToSend.trim()) return;
        if (!textOverride) setInput('');
        await sendMessage(textToSend);
    };

    const handleHighlightClick = (point: KeyPoint) => {
        if (point.timestamp !== undefined) onSeek(point.timestamp);
        handleSendMessage(`Check the video at ${formatTime(point.timestamp || 0)} and tell me more about: "${point.text}"`);
    };

    const getKeyPoints = (): KeyPoint[] => {
        if (!transcriptData?.keyPoints) return [];
        return transcriptData.keyPoints.map((kp: any) => {
            if (typeof kp === 'string') return { text: kp, timestamp: 0 };
            return kp;
        });
    };

    const keyPoints = getKeyPoints();

    const processContent = (text: string) => {
        return text.replace(/\[((?:\d{1,2}:)?\d{1,2}:\d{2})\]/g, (match, timeStr) => {
            const parts = timeStr.split(':').map(Number);
            let seconds = 0;
            if (parts.length === 3) seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
            else seconds = parts[0] * 60 + parts[1];
            return `[${match}](#seek:${seconds})`;
        });
    };

    const currentMessages = personality === 'training' ? trainingMessages[activeTrainingTab] : messages;

    return (
        <div className="intelligence-panel">
            <div className="panel-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{
                    borderBottom: '1px solid var(--border-default)',
                    background: 'var(--chat-header-bg)'
                }}>
                    {personality !== 'training' && (
                        <div style={{ fontSize: '1.3rem', fontWeight: '700', padding: '1.5rem', margin: 0, color: 'var(--text-primary)' }}>Chat</div>
                    )}

                    {personality === 'training' && (
                        <div style={{
                            display: 'flex', gap: '0.25rem', padding: '1rem 1rem 0 1rem',
                            borderBottom: '1px solid var(--border-default)', justifyContent: 'space-between'
                        }}>
                            {(['chat', 'scribe', 'voiceover'] as TrainingTab[]).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTrainingTab(tab)}
                                    style={{
                                        flex: 1, padding: '0.75rem 0.5rem', border: 'none',
                                        background: activeTrainingTab === tab ? 'var(--upload-hover-bg)' : 'transparent',
                                        borderBottom: activeTrainingTab === tab ? '3px solid var(--primary)' : '3px solid transparent',
                                        cursor: 'pointer', fontWeight: activeTrainingTab === tab ? '700' : '500',
                                        color: activeTrainingTab === tab ? 'var(--primary)' : 'var(--text-secondary)',
                                        fontSize: '0.95rem', borderRadius: '8px 8px 0 0', transition: 'all 0.2s', textAlign: 'center'
                                    }}
                                >
                                    {tab === 'chat' ? 'Chat' : tab === 'scribe' ? 'Scribe Steps' : 'VoiceOver Tips'}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="content-area" style={{ flex: 1, overflow: 'hidden', background: 'var(--chat-messages-bg)' }}>
                    <div className="chat-container" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div className="messages" style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
                            {mediaId && polling && !transcriptData && (
                                <div className="skeleton-summary">
                                    <div className="skeleton" style={{ width: '30%', height: '24px', marginBottom: '1rem' }}></div>
                                    <div className="skeleton" style={{ width: '100%', height: '16px', marginBottom: '0.6rem' }}></div>
                                    <div className="skeleton" style={{ width: '92%', height: '16px', marginBottom: '0.6rem' }}></div>
                                    <div className="skeleton" style={{ width: '96%', height: '16px', marginBottom: '2rem' }}></div>
                                    <div className="skeleton" style={{ width: '40%', height: '22px', marginBottom: '1.2rem' }}></div>
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="skeleton" style={{ width: '100%', height: '70px', marginBottom: '1rem', borderRadius: '12px' }}></div>
                                    ))}
                                    <div style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                        <p>AI is analyzing your video...</p>
                                    </div>
                                </div>
                            )}

                            {transcriptData && personality === 'meetings' && (
                                <div className="summary-section" style={{
                                    marginBottom: '2rem',
                                    padding: '1.5rem',
                                    background: 'var(--chat-recap-bg)',
                                    borderRadius: '12px',
                                    border: '1px solid var(--border-default)'
                                }}>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: '700', color: 'var(--chat-recap-title)' }}>{transcriptData.title || "Video Recap"}</h3>
                                    <p style={{ fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem', color: 'var(--chat-recap-summary)' }}>{transcriptData.summary}</p>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.8rem', fontWeight: '700', color: 'var(--chat-recap-title)' }}>Key Highlights</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                        {keyPoints.map((point, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => handleHighlightClick(point)}
                                                className="highlight-bubble"
                                                style={{
                                                    padding: '1rem', background: 'var(--highlight-card-bg)', border: '1px solid var(--highlight-card-border)',
                                                    borderRadius: '12px', boxShadow: 'var(--shadow-small)',
                                                    cursor: 'pointer', transition: 'all 0.2s', display: 'flex',
                                                    alignItems: 'flex-start', gap: '0.8rem'
                                                }}
                                            >
                                                <div style={{
                                                    background: 'var(--highlight-number-bg)', color: 'var(--highlight-number-text)', borderRadius: '50%',
                                                    width: '24px', height: '24px', display: 'flex', alignItems: 'center',
                                                    justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold', flexShrink: 0, marginTop: '2px'
                                                }}>{idx + 1}</div>
                                                <div>
                                                    <p style={{ fontSize: '0.95rem', margin: 0, fontWeight: '500', color: 'var(--highlight-title-text)' }}>{point.text}</p>
                                                    {point.timestamp !== undefined && point.timestamp > 0 && (
                                                        <span style={{ fontSize: '0.8rem', color: 'var(--highlight-jump-link)', marginTop: '0.3rem', display: 'block' }}>
                                                            Jump to {formatTime(point.timestamp)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {currentMessages.map((m, i) => (
                                <div key={i} className={`message-row ${m.role}`} style={{
                                    alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start'
                                }}>
                                    <div className="message-content" style={{
                                        background: m.role === 'user' ? 'var(--chat-bubble-user-bg)' : 'var(--chat-bubble-ai-bg)',
                                        color: m.role === 'user' ? 'white' : 'var(--text-primary)',
                                        border: m.role === 'user' ? 'none' : '1px solid var(--chat-input-border)',
                                        boxShadow: m.role === 'user' ? 'none' : 'var(--shadow-small)'
                                    }}>
                                        {m.role === 'assistant' ? (
                                            <div className="prose">
                                                <ReactMarkdown
                                                    components={{
                                                        a: ({ node, href, children, ...props }) => {
                                                            if (href?.startsWith('#seek:')) {
                                                                const seconds = parseFloat(href.split(':')[1]);
                                                                return (
                                                                    <button
                                                                        onClick={(e) => { e.preventDefault(); onSeek(seconds); }}
                                                                        style={{
                                                                            background: 'var(--upload-hover-bg)', color: 'var(--primary)', border: '1px solid var(--border-default)',
                                                                            borderRadius: '12px', padding: '2px 8px', fontSize: '0.85em',
                                                                            fontWeight: '600', cursor: 'pointer', display: 'inline-block',
                                                                            verticalAlign: 'middle', margin: '0 2px', textDecoration: 'none'
                                                                        }}
                                                                    >{children}</button>
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
                                        {m.role === 'assistant' && m.followUps && (
                                            <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                                {m.followUps.map((q, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => handleSendMessage(q)}
                                                        className="followup-btn"
                                                    >{q}</button>
                                                ))}
                                            </div>
                                        )}
                                        {m.role === 'assistant' && m.crossVideoSources && m.crossVideoSources.length > 0 && (
                                            <div style={{
                                                marginTop: '0.75rem',
                                                padding: '0.75rem',
                                                background: 'var(--upload-hover-bg)',
                                                borderRadius: '8px',
                                                border: '1px solid var(--border-default)',
                                                fontSize: '0.85rem'
                                            }}>
                                                <div style={{ fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                                                    Referenced from other videos:
                                                </div>
                                                {m.crossVideoSources.map((src: CrossVideoSource, idx: number) => (
                                                    <div key={idx} style={{
                                                        padding: '0.3rem 0',
                                                        color: 'var(--highlight-jump-link)',
                                                    }}>
                                                        {src.videoTitle} at {formatTime(src.timestamp)}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {isChatting && <div className="typing-indicator" style={{ color: 'var(--ai-typing-indicator)' }}>Thinking...</div>}
                            <div ref={chatEndRef} />
                        </div>

                        <div className="chat-input-area" style={{ background: 'var(--chat-input-area-bg)' }}>
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
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}>
                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                .highlight-bubble:hover {
                    transform: translateY(-2px);
                    border-color: var(--highlight-jump-link) !important;
                }
                .followup-btn {
                    background: var(--chat-bubble-ai-bg); border: 1px solid var(--chat-input-border); border-radius: 20px;
                    padding: 0.5rem 1rem; fontSize: 0.85rem; color: var(--chat-recap-summary); cursor: pointer;
                    transition: all 0.2s; text-align: left;
                }
                .followup-btn:hover {
                    background: var(--transcript-segment-hover); border-color: var(--highlight-jump-link); color: var(--chat-recap-title);
                }
            `}</style>
        </div>
    );
}
