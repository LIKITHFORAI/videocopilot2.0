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
        instance.logoutRedirect();
    };

    const [isHovered, setIsHovered] = useState(false);

    // Show loading state while MSAL is processing or logging in
    if (inProgress !== "none" || isLoggingIn) {
        return (
            <button
                disabled
                style={{
                    height: '44px',
                    padding: '0 1.5rem',
                    background: '#94a3b8',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'not-allowed',
                    fontSize: '0.9rem',
                    fontWeight: '700',
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
                    height: '44px',
                    padding: '0 1.5rem',
                    background: isHovered ? '#ef4444' : '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '700',
                    transition: 'all 0.2s ease',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    display: 'flex',
                    alignItems: 'center',
                    minWidth: '120px',
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
                height: '44px',
                padding: '0 1.5rem',
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '700',
                transition: 'background 0.2s',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                display: 'flex',
                alignItems: 'center'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#2563eb'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#3b82f6'}
        >
            LOGIN
        </button>
    );
}
