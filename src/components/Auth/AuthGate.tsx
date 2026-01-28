'use client';

import { useMsal } from "@azure/msal-react";
import { loginRequest } from "@/lib/msalConfig";

export default function AuthGate() {
    const { instance } = useMsal();

    const handleLogin = async () => {
        try {
            await instance.loginPopup(loginRequest);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '2rem'
        }}>
            <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '3rem 2rem',
                maxWidth: '500px',
                textAlign: 'center',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
            }}>
                {/* Logo/Icon */}
                <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'var(--primary)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    margin: '0 auto 1.5rem',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}>
                    VC
                </div>

                {/* Heading */}
                <h1 style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: '#1e293b',
                    marginBottom: '0.5rem'
                }}>
                    Welcome to Video Copilot
                </h1>

                <p style={{
                    fontSize: '1.1rem',
                    color: '#64748b',
                    marginBottom: '2rem',
                    lineHeight: '1.6'
                }}>
                    Sign in with your Microsoft account to analyze videos, extract insights, and access your SharePoint files.
                </p>

                {/* Sign-in Button */}
                <button
                    onClick={handleLogin}
                    style={{
                        width: '100%',
                        padding: '1rem 1.5rem',
                        background: '#0078d4',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.75rem',
                        transition: 'all 0.2s',
                        marginBottom: '2rem'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#006cbe'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#0078d4'}
                >
                    {/* Microsoft Logo SVG */}
                    <svg width="24" height="24" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="11" height="11" fill="white" />
                        <rect y="12" width="11" height="11" fill="white" />
                        <rect x="12" width="11" height="11" fill="white" />
                        <rect x="12" y="12" width="11" height="11" fill="white" />
                    </svg>
                    Sign in with Microsoft
                </button>

                {/* Features List */}
                <div style={{
                    borderTop: '1px solid #e2e8f0',
                    paddingTop: '1.5rem',
                    textAlign: 'left'
                }}>
                    <div style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '2' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{ color: '#10b981', fontSize: '1.2rem' }}>✓</span>
                            <span>Automatic video transcription</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{ color: '#10b981', fontSize: '1.2rem' }}>✓</span>
                            <span>AI-powered summaries and insights</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{ color: '#10b981', fontSize: '1.2rem' }}>✓</span>
                            <span>Access SharePoint and OneDrive videos</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{ color: '#10b981', fontSize: '1.2rem' }}>✓</span>
                            <span>Track analysis history across devices</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
