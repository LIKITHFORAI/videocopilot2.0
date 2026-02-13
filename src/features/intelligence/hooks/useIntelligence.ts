'use client';

import { useState, useEffect, useRef } from 'react';
import { getApiPath } from '@/shared/utils/apiPath';
import { formatTrainingResponse } from '../utils/trainingFormatters';
import { Personality } from '@/features/personality/components/PersonalityChooser';

export interface Message {
    role: 'user' | 'assistant';
    content: string;
    citations?: { start: number; end: number; label: string }[];
    followUps?: string[];
}

export type TrainingTab = 'chat' | 'scribe' | 'voiceover';

export function useIntelligence(
    mediaId: string | null,
    jobId: string | null,
    personality: Personality,
    onStatusChange?: (status: string) => void,
    onProgressChange?: (progress: number) => void
) {
    const [jobStatus, setJobStatus] = useState<string>('');
    const [transcriptData, setTranscriptData] = useState<any>(null);
    const [polling, setPolling] = useState(false);

    // Chat state
    const [messages, setMessages] = useState<Message[]>([]);
    const [isChatting, setIsChatting] = useState(false);

    // Training mode state
    const [activeTrainingTab, setActiveTrainingTab] = useState<TrainingTab>('chat');
    const [trainingMessages, setTrainingMessages] = useState<Record<TrainingTab, Message[]>>({
        chat: [],
        scribe: [],
        voiceover: []
    });

    const generatedTabs = useRef<Set<string>>(new Set());
    const currentMediaRef = useRef<string | null>(null);

    // Job Polling (or direct load when jobId is null but mediaId exists)
    useEffect(() => {
        if (!jobId) {
            if (mediaId) {
                // Direct load — content already exists on server, no polling needed
                setMessages([]);
                setTrainingMessages({ chat: [], scribe: [], voiceover: [] });
                generatedTabs.current.clear();
                setPolling(false);
                setJobStatus('COMPLETED');
                if (onStatusChange) onStatusChange('COMPLETED');
                if (onProgressChange) onProgressChange(100);
                fetchTranscript(mediaId);
            } else {
                setTranscriptData(null);
                setMessages([]);
                setTrainingMessages({ chat: [], scribe: [], voiceover: [] });
                setJobStatus('');
                generatedTabs.current.clear();
            }
            return;
        }

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
                    if (onProgressChange) onProgressChange(data.progress || 0);

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
    }, [jobId, mediaId]);

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

    // Auto-generate content for Training mode
    useEffect(() => {
        if (personality !== 'training' || !transcriptData || !mediaId) return;

        if (currentMediaRef.current !== mediaId) {
            currentMediaRef.current = mediaId;
            generatedTabs.current.clear();
        }

        const cacheKey = `${mediaId}-${activeTrainingTab}`;
        if (generatedTabs.current.has(cacheKey)) return;
        generatedTabs.current.add(cacheKey);

        const autoGenerate = async () => {
            setIsChatting(true);
            const currentTab = activeTrainingTab;
            const defaultQuestions: Record<string, string> = {
                chat: 'Analyze this training video and provide a comprehensive overview.',
                scribe: 'Extract all build steps from this training video.',
                voiceover: 'Generate a voice-over script for this training video.'
            };

            try {
                const res = await fetch(getApiPath('/api/training-chat'), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        question: defaultQuestions[currentTab],
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
                    setTrainingMessages(prev => ({ ...prev, [currentTab]: [newMsg] }));
                } else {
                    setTrainingMessages(prev => ({
                        ...prev, [currentTab]: [{ role: 'assistant', content: "Sorry, I had trouble generating content." }]
                    }));
                    generatedTabs.current.delete(cacheKey);
                }
            } catch (e) {
                generatedTabs.current.delete(cacheKey);
            } finally {
                setIsChatting(false);
            }
        };

        autoGenerate();
    }, [activeTrainingTab, personality, transcriptData, mediaId]);

    const sendMessage = async (text: string) => {
        if (!text.trim() || !mediaId || isChatting) return;

        const userMsg: Message = { role: 'user', content: text };
        if (personality === 'training') {
            setTrainingMessages(prev => ({ ...prev, [activeTrainingTab]: [...prev[activeTrainingTab], userMsg] }));
        } else {
            setMessages(prev => [...prev, userMsg]);
        }

        setIsChatting(true);
        const currentTab = activeTrainingTab;

        try {
            const apiRoute = personality === 'training' ? '/api/training-chat' : '/api/chat';
            const historyMsgs = personality === 'training' ? trainingMessages[currentTab] : messages;

            const res = await fetch(getApiPath(apiRoute), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mediaId,
                    question: text,
                    history: historyMsgs.map(m => ({ role: m.role, content: m.content })),
                    personality,
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
                    setTrainingMessages(prev => ({ ...prev, [currentTab]: [...prev[currentTab], newMsg] }));
                } else {
                    setMessages(prev => [...prev, newMsg]);
                }
            }
        } catch (e) {
            console.error('Chat error', e);
        } finally {
            setIsChatting(false);
        }
    };

    return {
        jobStatus,
        transcriptData,
        polling,
        messages,
        isChatting,
        activeTrainingTab,
        setActiveTrainingTab,
        trainingMessages,
        sendMessage
    };
}
