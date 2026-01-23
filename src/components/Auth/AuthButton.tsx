'use client';

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <button
                disabled
                style={{
                    padding: '0.6rem 1.2rem',
                    background: '#ccc',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'not-allowed',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                }}
            >
                Loading...
            </button>
        );
    }

    if (session) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#333' }}>
                        {session.user?.name || 'User'}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#666' }}>
                        {session.user?.email}
                    </span>
                </div>
                <button
                    onClick={() => signOut()}
                    style={{
                        padding: '0.6rem 1.2rem',
                        background: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#c82333'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#dc3545'}
                >
                    Sign Out
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={() => signIn('azure-ad')}
            style={{
                padding: '0.6rem 1.2rem',
                background: '#0078d4',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#006cbe'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#0078d4'}
        >
            {/* Microsoft Logo SVG */}
            <svg width="20" height="20" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="11" height="11" fill="white" />
                <rect y="12" width="11" height="11" fill="white" />
                <rect x="12" width="11" height="11" fill="white" />
                <rect x="12" y="12" width="11" height="11" fill="white" />
            </svg>
            Sign in with Microsoft
        </button>
    );
}
