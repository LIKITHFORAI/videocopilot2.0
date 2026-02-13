'use client';

import { useMsal } from "@azure/msal-react";
import { loginRequest } from "@/lib/msalConfig";
import { useState } from "react";

export default function AuthButton() {
    const { instance, accounts, inProgress } = useMsal();
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const account = accounts[0];

    const handleLogin = () => {
        setIsLoggingIn(true);
        // Use redirect flow - page will redirect to Microsoft and back
        instance.loginRedirect(loginRequest);
    };

    const handleLogout = () => {
        // Clear all accounts from cache (local-only logout)
        instance.clearCache();
        // Redirect to login page (include basePath for production)
        const basePath = process.env.NEXT_PUBLIC_BASEPATH || '';
        window.location.href = `${window.location.origin}${basePath}/`;
    };

    const [isHovered, setIsHovered] = useState(false);

    // Show loading state while MSAL is processing or logging in
    if (inProgress !== "none" || isLoggingIn) {
        return (
            <button
                disabled
                style={{
                    height: '36px',
                    padding: '0 1rem',
                    background: 'var(--border-default)',
                    color: 'var(--text-secondary)',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'not-allowed',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                ...
            </button>
        );
    }

    if (account) {
        return (
            <button
                onClick={handleLogout}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    height: '36px',
                    padding: '0 1.25rem',
                    background: isHovered ? 'var(--status-error)' : 'var(--header-btn-auth-bg)',
                    color: 'var(--header-btn-auth-text)',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    transition: 'all 0.2s ease',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    display: 'flex',
                    alignItems: 'center',
                    minWidth: '100px',
                    justifyContent: 'center'
                }}
                title={`Signed in as ${account.username}`}
            >
                {isHovered ? 'LOGOUT' : (account.name?.split(' ')[0]?.toUpperCase() || 'USER')}
            </button>
        );
    }

    return (
        <button
            onClick={handleLogin}
            style={{
                height: '36px',
                padding: '0 1.25rem',
                background: 'var(--header-btn-auth-bg)',
                color: 'var(--header-btn-auth-text)',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: '600',
                transition: 'background 0.2s',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                display: 'flex',
                alignItems: 'center'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--primary-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--header-btn-auth-bg)'}
        >
            LOGIN
        </button>
    );
}
