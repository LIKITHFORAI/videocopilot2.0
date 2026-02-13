'use client';

import { useMsal } from "@azure/msal-react";
import { loginRequest } from "@/lib/msalConfig";
import { getApiPath } from '@/shared/utils/apiPath';
import { InteractionStatus } from "@azure/msal-browser";

export default function AuthGate() {
    const { instance, inProgress } = useMsal();

    const handleLogin = () => {
        // Don't start a new login if one is already in progress
        if (inProgress !== InteractionStatus.None) {
            console.log('Login already in progress, please wait...');
            return;
        }

        // Use redirect flow - simpler and more reliable than popup
        instance.loginRedirect(loginRequest);
    };


    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #96a9ffff 0%, #4b74a2ff 100%)',
            padding: '2rem'
        }}>
            <div style={{
                background: 'var(--surface)',
                borderRadius: '16px',
                padding: '3rem 2rem',
                maxWidth: '450px',
                width: '100%',
                textAlign: 'center',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                color: 'var(--text-primary)'
            }}>
                {/* Logo/Brand Area */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1.25rem',
                    marginBottom: '2.5rem'
                }}>
                    {/* DrCloudEHR Logo */}
                    <img
                        src={getApiPath('/EnSoftek - DrCloudEHR Logo.png')}
                        alt="DrCloudEHR GTD"
                        style={{
                            height: '100px',
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
                            color: 'var(--text-primary)',
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
                            GetThingsDone
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
                        transition: 'all 0.2s'
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
            </div>
        </div>
    );
}
