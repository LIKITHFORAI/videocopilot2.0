'use client';

import { useState, useEffect } from 'react';

export default function WelcomeModal() {
    const [isOpen, setIsOpen] = useState(true);

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(4px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'fadeIn 0.3s ease-out'
        }}>
            <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '2rem',
                maxWidth: '500px',
                width: '90%',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                position: 'relative',
                animation: 'scaleIn 0.3s ease-out'
            }}>
                {/* Close X Button */}
                <button
                    onClick={() => setIsOpen(false)}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        color: '#64748b',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
                    onMouseLeave={e => e.currentTarget.style.background = 'none'}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        width: '48px', height: '48px',
                        background: 'var(--primary)',
                        borderRadius: '12px',
                        color: 'white',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.2rem', fontWeight: 'bold',
                        margin: '0 auto 1rem auto'
                    }}>
                        VC
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', margin: 0 }}>
                        Welcome to Video Copilot
                    </h2>
                    <p style={{ color: '#64748b', marginTop: '0.5rem' }}>
                        Your AI-powered media analysis assistant
                    </p>
                </div>

                {/* Steps */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                    <Step
                        number={1}
                        title="Upload Media"
                        description="Drag & drop a video or audio file to get started."
                    />
                    <Step
                        number={2}
                        title="AI Processing"
                        description="Let our AI transcribe and analyze your content automatically."
                    />
                    <Step
                        number={3}
                        title="Explore & Chat"
                        description="Read the recap, jump to highlights, or ask questions."
                    />
                </div>

                {/* Footer Action */}
                <button
                    onClick={() => setIsOpen(false)}
                    style={{
                        width: '100%',
                        padding: '0.8rem',
                        background: 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'transform 0.1s active',
                        boxShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.4)'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    onMouseDown={e => e.currentTarget.style.transform = 'translateY(1px)'}
                >
                    Get Started
                </button>

                <style jsx>{`
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    @keyframes scaleIn {
                        from { transform: scale(0.95); opacity: 0; }
                        to { transform: scale(1); opacity: 1; }
                    }
                `}</style>
            </div>
        </div>
    );
}

function Step({ number, title, description }: { number: number, title: string, description: string }) {
    return (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{
                flexShrink: 0,
                width: '28px', height: '28px',
                borderRadius: '50%',
                background: '#e0e7ff',
                color: 'var(--primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                marginTop: '2px'
            }}>
                {number}
            </div>
            <div>
                <h4 style={{ margin: '0 0 0.25rem 0', color: '#334155', fontWeight: '600' }}>{title}</h4>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem', lineHeight: '1.4' }}>{description}</p>
            </div>
        </div>
    );
}
