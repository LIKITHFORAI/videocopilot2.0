'use client';

import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { getApiPath } from '@/lib/apiPath';

import { Personality } from '../Personality/PersonalityChooser';

interface IntelligencePanelProps {
    mediaId: string | null;
    jobId: string | null;
    onSeek: (time: number) => void;
    onStatusChange?: (status: string) => void;
    onProgressChange?: (progress: number) => void;
    personality?: Personality;
}

interface Message {
    role: 'user' | 'assistant';
    content: string;
    citations?: { start: number; end: number; label: string }[];
    followUps?: string[];
}

interface KeyPoint {
    text: string;
    timestamp?: number;
}

function formatTrainingResponse(tab: string, data: any): string {
    if (!data) return "No data available.";

    // If data is string, try to parse it
    if (typeof data === 'string') {
        try {
            data = JSON.parse(data);
        } catch {
            return data; // Return as is if not JSON
        }
    }

    if (tab === 'chat') {
        let md = `### ${data.topic_identification?.topic_name || 'Analysis'}\n\n`;
        md += `**Goal:** ${data.training_goal}\n\n`;
        md += `**Target Audience:** ${data.topic_identification?.audience_type}\n`;
        if (data.topic_identification?.target_video_length_seconds) {
            md += `**Target Length:** ${data.topic_identification.target_video_length_seconds}s\n\n`;
        }

        if (data.scope_guardrails) {
            md += `### Scope & Guardrails\n`;
            md += `**Included:**\n${data.scope_guardrails?.included?.map((i: string) => `- ${i}`).join('\n') || 'None'}\n\n`;
            md += `**Excluded:**\n${data.scope_guardrails?.excluded?.map((i: string) => `- ${i}`).join('\n') || 'None'}\n\n`;
        }

        if (data.content_readiness) {
            md += `### Readiness\n`;
            md += `**Status:** ${data.content_readiness?.reusability_status}\n`;
            md += `**Reason:** ${data.content_readiness?.reason}\n\n`;
        }

        if (data.next_recording_action) {
            md += `### Next Steps\n${data.next_recording_action.what_to_record_next}\n`;
        }

        if (data.sanitization_report) {
            md += `### Sanitization Report\n`;
            md += `**PHI Risk:** ${data.sanitization_report.phi_risk}\n`;
            if (data.sanitization_report.detected_terms?.length) {
                md += `**Detected Terms:** ${data.sanitization_report.detected_terms.join(', ')}\n`;
            }
        }

        return md;
    }

    if (tab === 'scribe') {
        if (!data.steps || !Array.isArray(data.steps)) return JSON.stringify(data, null, 2);

        let md = `### Build Steps\n\n`;
        data.steps.forEach((step: any) => {
            md += `**${step.n}. ${step.action}**\n`;
            if (step.ui_path && step.ui_path.length) {
                md += `   *Path: ${step.ui_path.join(' > ')}*\n`;
            }
            if (step.fields_edited && step.fields_edited.length) {
                md += `   *Fields:* ${step.fields_edited.join(', ')}\n`;
            }
            md += '\n';
        });
        return md;
    }

    if (tab === 'voiceover') {
        let md = `### Voice-Over Script\n\n`;
        md += `**Opening:**\n"${data.opening}"\n\n`;

        md += `**Walkthrough:**\n`;
        data.step_walkthrough?.forEach((step: string) => {
            md += `- "${step}"\n`;
        });
        md += '\n';

        if (data.single_example) {
            md += `**Example (${data.single_example.example_name}):**\n"${data.single_example.example_script}"\n\n`;
        }

        if (data.common_mistakes?.length) {
            md += `**Common Mistakes:**\n${data.common_mistakes.map((m: string) => `- ${m}`).join('\n')}\n\n`;
        }

        md += `**Wrap Up:**\n"${data.wrap_up}"\n`;

        return md;
    }

    return JSON.stringify(data, null, 2);
}

export default function IntelligencePanel({ mediaId, jobId, onSeek, onStatusChange, onProgressChange, personality = 'meetings' }: IntelligencePanelProps) {
    const [jobStatus, setJobStatus] = useState<string>('');
    const [transcriptData, setTranscriptData] = useState<any>(null);
    const [polling, setPolling] = useState(false);

    // Chat state
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isChatting, setIsChatting] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Training mode sub-tabs
    type TrainingTab = 'chat' | 'scribe' | 'voiceover';
    const [activeTrainingTab, setActiveTrainingTab] = useState<TrainingTab>('chat');

    // Separate state for each training tab to prevent overwrites
    const [trainingMessages, setTrainingMessages] = useState<Record<TrainingTab, Message[]>>({
        chat: [],
        scribe: [],
        voiceover: []
    });

    // Track which tabs have been generated for current video to prevent duplicate API calls
    const generatedTabs = useRef<Set<string>>(new Set());
    const currentMediaRef = useRef<string | null>(null);


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
            setTrainingMessages({ chat: [], scribe: [], voiceover: [] });
            setJobStatus('');
            generatedTabs.current.clear(); // Also clear generation cache
            return;
        }

        // Reset state for new job
        setTranscriptData(null);
        setMessages([]);

        let intervalId: NodeJS.Timeout;

        const checkStatus = async () => {
            try {
                const res = await fetch(getApiPath(`/api/job/${jobId}`));
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
            const res = await fetch(getApiPath(`/api/transcript/${mid}`));
            if (res.ok) {
                const data = await res.json();
                setTranscriptData(data);
            }
        } catch (e) {
            console.error("Failed to fetch transcript", e);
        }
    };

    // Auto-generate content when Training tab changes
    useEffect(() => {
        if (personality !== 'training' || !transcriptData || !mediaId) return;

        // Reset cache when switching to a different video
        if (currentMediaRef.current !== mediaId) {
            currentMediaRef.current = mediaId;
            generatedTabs.current.clear();
        }

        // Create unique key for this tab + video combination
        const cacheKey = `${mediaId}-${activeTrainingTab}`;

        // Skip if already generated for this tab
        if (generatedTabs.current.has(cacheKey)) {
            return;
        }

        // Mark as generating to prevent duplicates
        generatedTabs.current.add(cacheKey);


        // Auto-generate content for the active tab
        const autoGenerate = async () => {
            setIsChatting(true);

            // Capture current tab to ensure updates go to the right place even if user switches tabs
            const currentTab = activeTrainingTab;

            // Define default questions for each tab
            const defaultQuestions: Record<string, string> = {
                chat: 'Analyze this training video and provide a comprehensive overview.',
                scribe: 'Extract all build steps from this training video.',
                voiceover: 'Generate a voice-over script for this training video.'
            };

            const question = defaultQuestions[currentTab];

            try {
                const res = await fetch(getApiPath('/api/training-chat'), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        question,
                        activeTab: currentTab,
                        transcriptSegments: transcriptData.segments
                    })
                });

                if (res.ok) {
                    const data = await res.json();

                    const formattedContent = formatTrainingResponse(currentTab, data.trainingData || data.answer);

                    const newMsg: Message = {
                        role: 'assistant',
                        content: formattedContent,
                        citations: data.citations,
                        followUps: data.followUps
                    };

                    // Update only the specific tab's messages
                    setTrainingMessages(prev => ({
                        ...prev,
                        [currentTab]: [newMsg]
                    }));
                } else {
                    setTrainingMessages(prev => ({
                        ...prev,
                        [currentTab]: [{ role: 'assistant', content: "Sorry, I had trouble generating content for this tab." }]
                    }));

                    // Remove from cache on error so user can retry
                    generatedTabs.current.delete(cacheKey);
                }
            } catch (e) {
                setTrainingMessages(prev => ({
                    ...prev,
                    [currentTab]: [{ role: 'assistant', content: "Error connecting to the AI service." }]
                }));
                // Remove from cache on error so user can retry
                generatedTabs.current.delete(cacheKey);
            } finally {
                setIsChatting(false);
            }
        };

        autoGenerate();
    }, [activeTrainingTab, personality, transcriptData, mediaId]);


    const handleSendMessage = async (textOverride?: string) => {
        const textToSend = textOverride || input;

        if (!textToSend.trim() || !mediaId || isChatting) return;

        const userMsg: Message = { role: 'user', content: textToSend };

        // Update correct state based on mode
        if (personality === 'training') {
            setTrainingMessages(prev => ({
                ...prev,
                [activeTrainingTab]: [...prev[activeTrainingTab], userMsg]
            }));
        } else {
            setMessages(prev => [...prev, userMsg]);
        }

        // Only clear input if we didn't use an override (i.e., user typed it)
        if (!textOverride) {
            setInput('');
        }

        setIsChatting(true);
        const currentTab = activeTrainingTab; // Capture for async closure

        try {
            // Use different API route for Training mode
            const apiRoute = personality === 'training' ? '/api/training-chat' : '/api/chat';

            // Get correct history
            const historyMsgs = personality === 'training' ? trainingMessages[currentTab] : messages;

            const res = await fetch(getApiPath(apiRoute), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mediaId,
                    question: textToSend,
                    history: historyMsgs.map(m => ({ role: m.role, content: m.content })),
                    personality: personality || 'meetings',
                    activeTab: personality === 'training' ? currentTab : undefined,
                    transcriptSegments: transcriptData?.segments
                })
            });

            if (res.ok) {
                const data = await res.json();
                const content = (personality === 'training')
                    ? formatTrainingResponse(currentTab, data.trainingData || data.answer)
                    : data.answer;

                const newMsg: Message = {
                    role: 'assistant',
                    content: content,
                    citations: data.citations,
                    followUps: data.followUps || data.suggested_questions
                };

                if (personality === 'training') {
                    setTrainingMessages(prev => ({
                        ...prev,
                        [currentTab]: [...prev[currentTab], newMsg]
                    }));
                } else {
                    setMessages(prev => [...prev, newMsg]);
                }
            } else {
                const errorMsg: Message = { role: 'assistant', content: "Sorry, I had trouble processing that request." };
                if (personality === 'training') {
                    setTrainingMessages(prev => ({
                        ...prev,
                        [currentTab]: [...prev[currentTab], errorMsg]
                    }));
                } else {
                    setMessages(prev => [...prev, errorMsg]);
                }
            }
        } catch (e) {
            const errorMsg: Message = { role: 'assistant', content: "Connect error while chatting." };
            if (personality === 'training') {
                setTrainingMessages(prev => ({
                    ...prev,
                    [currentTab]: [...prev[currentTab], errorMsg]
                }));
            } else {
                setMessages(prev => [...prev, errorMsg]);
            }
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

                {/* Header with conditional sub-tabs */}
                <div style={{ borderBottom: '1px solid var(--border)' }}>
                    {/* Show "Chat" title only for non-training modes */}
                    {personality !== 'training' && (
                        <div style={{
                            fontSize: '1.3rem',
                            fontWeight: '700',
                            padding: '1.5rem',
                            margin: 0
                        }}>Chat</div>
                    )}

                    {/* Training Mode Sub-Tabs (replaces "Chat" title) */}
                    {personality === 'training' && (
                        <div style={{
                            display: 'flex',
                            gap: '0.25rem',
                            padding: '1rem 1rem 0 1rem',
                            marginTop: 0,
                            borderBottom: '1px solid #e2e8f0',
                            justifyContent: 'space-between'
                        }}>
                            {['chat', 'scribe', 'voiceover'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTrainingTab(tab as any)}
                                    style={{
                                        flex: 1,
                                        padding: '0.75rem 0.5rem',
                                        border: 'none',
                                        background: activeTrainingTab === tab ? '#eff6ff' : 'transparent', // Light blue background for active
                                        borderBottom: activeTrainingTab === tab ? '3px solid var(--primary)' : '3px solid transparent',
                                        cursor: 'pointer',
                                        fontWeight: activeTrainingTab === tab ? '700' : '500',
                                        color: activeTrainingTab === tab ? 'var(--primary)' : '#64748b',
                                        fontSize: '0.95rem',
                                        borderRadius: '8px 8px 0 0',
                                        transition: 'all 0.2s',
                                        textAlign: 'center',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {tab === 'chat' ? 'Chat' : tab === 'scribe' ? 'Scribe Steps' : 'VoiceOver Tips'}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="content-area" style={{ flex: 1, overflow: 'hidden' }}>
                    {(
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


                                {/* Summary Header - Only for Meetings Mode */}
                                {transcriptData && personality === 'meetings' && (
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

                                {(personality === 'training' ? trainingMessages[activeTrainingTab] : messages).map((m, i) => (
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
                                            {/* Render Follow-up Questions */}
                                            {m.role === 'assistant' && m.followUps && m.followUps.length > 0 && (
                                                <div style={{
                                                    marginTop: '1rem',
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    gap: '0.5rem'
                                                }}>
                                                    {m.followUps.map((q, idx) => (
                                                        <button
                                                            key={idx}
                                                            onClick={() => handleSendMessage(q)}
                                                            style={{
                                                                background: '#f8fafc',
                                                                border: '1px solid #e2e8f0',
                                                                borderRadius: '20px',
                                                                padding: '0.5rem 1rem',
                                                                fontSize: '0.85rem',
                                                                color: '#475569',
                                                                cursor: 'pointer',
                                                                transition: 'all 0.2s',
                                                                textAlign: 'left'
                                                            }}
                                                            onMouseEnter={(e) => {
                                                                e.currentTarget.style.background = '#f1f5f9';
                                                                e.currentTarget.style.borderColor = '#cbd5e1';
                                                                e.currentTarget.style.color = '#1e293b';
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.currentTarget.style.background = '#f8fafc';
                                                                e.currentTarget.style.borderColor = '#e2e8f0';
                                                                e.currentTarget.style.color = '#475569';
                                                            }}
                                                        >
                                                            {q}
                                                        </button>
                                                    ))}
                                                </div>
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
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}>
                                        <line x1="22" y1="2" x2="11" y2="13"></line>
                                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
