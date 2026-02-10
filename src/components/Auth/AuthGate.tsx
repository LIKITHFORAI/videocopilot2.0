'use client';

import { useMsal } from "@azure/msal-react";
import { loginRequest } from "@/lib/msalConfig";
import { useState, useEffect } from 'react';
import { getApiPath } from '@/lib/apiPath';
import { InteractionStatus } from "@azure/msal-browser";

export default function AuthGate() {
    const { instance, inProgress } = useMsal();
    const [bypassAuth, setBypassAuth] = useState(false);

    // Load bypass state from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('devBypassAuth');
        if (saved === 'true') {
            setBypassAuth(true);
            // Don't reload here - it will be handled by parent component re-render
        }
    }, []);

    const handleLogin = () => {
        // Don't start a new login if one is already in progress
        if (inProgress !== InteractionStatus.None) {
            console.log('Login already in progress, please wait...');
            return;
        }

        // Use redirect flow - simpler and more reliable than popup
        instance.loginRedirect(loginRequest);
    };

    const handleBypassToggle = () => {
        const newValue = !bypassAuth;
        setBypassAuth(newValue);
        localStorage.setItem('devBypassAuth', String(newValue));
        if (newValue) {
            // Reload to bypass auth
            window.location.reload();
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
                {/* Logo/Brand Area - Centered and Larger */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1.25rem',
                    marginBottom: '2.5rem'
                }}>
                    {/* DrCloudEHR Logo - Larger */}
                    <img
                        src={getApiPath('/NewLogo.png')}
                        alt="Get IT Done"
                        style={{
                            height: '72px',
                            width: 'auto'
                        }}
                    />

                    {/* Brand Names - Stacked Vertically */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.25rem'
                    }}>
                        <span style={{
                            fontSize: '1.8rem',
                            fontWeight: '600',
                            fontFamily: '"Noto Sans", sans-serif',
                            color: '#1e293b',
                            letterSpacing: '0.5px'
                        }}>
                            DrCloudEHR
                        </span>
                        <span style={{
                            fontSize: '2.6rem',
                            fontWeight: '600',
                            fontFamily: '"Bebas Neue", sans-serif',
                            color: '#667eea',
                            lineHeight: '1'
                        }}>
                            Get IT Done
                        </span>
                    </div>
                </div>

                {/* Sign-in Button */}
                <button
                    onClick={handleLogin}
                    disabled={inProgress !== InteractionStatus.None}
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

                {/* Dev Bypass Toggle */}
                <div style={{
                    marginBottom: '1.5rem',
                    padding: '0.75rem',
                    background: '#fff3cd',
                    borderRadius: '8px',
                    border: '1px solid #ffc107'
                }}>
                    <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        color: '#856404'
                    }}>
                        <input
                            type="checkbox"
                            checked={bypassAuth}
                            onChange={handleBypassToggle}
                            style={{
                                width: '16px',
                                height: '16px',
                                cursor: 'pointer'
                            }}
                        />
                        <span style={{ fontWeight: '600' }}>🔧 Dev Mode: Bypass authentication for testing</span>
                    </label>
                </div>

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
