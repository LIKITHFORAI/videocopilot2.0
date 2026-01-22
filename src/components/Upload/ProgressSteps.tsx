'use client';

import { useMemo } from 'react';

interface Step {
    id: number;
    title: string;
    description: string;
    status: 'pending' | 'active' | 'completed';
}

interface ProgressStepsProps {
    currentStatus?: string;
    progress?: number;
    mediaType?: 'video' | 'audio';
}

export default function ProgressSteps({ currentStatus = '', progress = 0, mediaType = 'video' }: ProgressStepsProps) {
    const steps = useMemo(() => {
        // Map backend status to step progression
        const label = mediaType === 'audio' ? 'Audio' : 'Video';

        const newSteps: Step[] = [
            { id: 1, title: `${label} Uploading`, description: `Uploading your ${mediaType} file`, status: 'pending' },
            { id: 2, title: `${label} Processing`, description: 'Analyzing and extracting content', status: 'pending' },
            { id: 3, title: 'Content Loading', description: 'Preparing your analysis', status: 'pending' }
        ];

        // Helper to set status
        const setStatus = (index: number, status: 'pending' | 'active' | 'completed') => {
            newSteps[index].status = status;
        };

        if (currentStatus === '' || currentStatus === 'IDLE') {
            // All pending (already initialized as pending)
        } else if (currentStatus === 'UPLOADING' || progress < 100) {
            setStatus(0, 'active');
        } else if (currentStatus === 'EXTRACTING_AUDIO' || currentStatus === 'TRANSCRIBING' || currentStatus === 'ANALYZING') {
            setStatus(0, 'completed');
            setStatus(1, 'active');
        } else if (currentStatus === 'COMPLETED') {
            setStatus(0, 'completed');
            setStatus(1, 'completed');
            setStatus(2, 'completed');
        }

        return newSteps;
    }, [currentStatus, progress, mediaType]);

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0',
            maxWidth: '600px',
            margin: '0 auto',
            height: '60px'
        }}>
            {steps.map((step, index) => (
                <div key={step.id} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                    {/* Step Card */}
                    <div style={{
                        flex: 1,
                        background: 'white',
                        border: step.status === 'active' ? '2px solid #6366f1' : '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '0.5rem 0.75rem',
                        textAlign: 'center',
                        position: 'relative',
                        boxShadow: step.status === 'active' ? '0 2px 8px rgba(99, 102, 241, 0.15)' : '0 1px 3px rgba(0,0,0,0.05)',
                        transition: 'all 0.3s ease',
                        minHeight: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {/* Step Circle */}
                        <div style={{
                            position: 'absolute',
                            top: '-12px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: step.status === 'completed' ? '#6366f1' :
                                step.status === 'active' ? '#6366f1' : '#e5e7eb',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.3s ease',
                            border: '2px solid white',
                            boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
                        }}>
                            {step.status === 'completed' ? (
                                // Checkmark SVG with animation
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    style={{
                                        animation: 'checkmark 0.3s ease-in-out'
                                    }}
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            ) : step.status === 'active' ? (
                                // Spinner for active step
                                <div style={{
                                    width: '12px',
                                    height: '12px',
                                    border: '2px solid white',
                                    borderTopColor: 'transparent',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite'
                                }} />
                            ) : (
                                // Step number for pending
                                <span style={{
                                    color: '#9ca3af',
                                    fontWeight: '600',
                                    fontSize: '0.75rem'
                                }}>{step.id}</span>
                            )}
                        </div>

                        {/* Step Content - Title Only */}
                        <div style={{ marginTop: '0.5rem' }}>
                            <h3 style={{
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                margin: 0,
                                color: step.status === 'active' ? '#6366f1' :
                                    step.status === 'completed' ? '#1f2937' : '#9ca3af'
                            }}>
                                {step.title}
                            </h3>
                        </div>
                    </div>

                    {/* Connector Line */}
                    {index < steps.length - 1 && (
                        <div style={{
                            width: '40px',
                            height: '2px',
                            background: steps[index + 1].status === 'completed' || steps[index + 1].status === 'active'
                                ? '#6366f1'
                                : '#e5e7eb',
                            margin: '0 -1px',
                            zIndex: 1,
                            transition: 'background 0.3s ease'
                        }} />
                    )}
                </div>
            ))}

            <style jsx>{`
                @keyframes checkmark {
                    0% {
                        stroke-dasharray: 0 50;
                        stroke-dashoffset: 0;
                    }
                    100% {
                        stroke-dasharray: 50 50;
                        stroke-dashoffset: 0;
                    }
                }

                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
}
