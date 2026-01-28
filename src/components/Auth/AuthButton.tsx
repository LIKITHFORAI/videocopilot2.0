'use client';

import { useMsal } from "@azure/msal-react";
import { loginRequest } from "@/lib/msalConfig";

export default function AuthButton() {
    const { instance, accounts } = useMsal();
    const account = accounts[0];

    const handleLogin = async () => {
        try {
            await instance.loginPopup(loginRequest);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleLogout = () => {
        instance.logoutPopup();
    };

    if (account) {
        return (
            <button
                onClick={handleLogout}
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
                title={`Signed in as ${account.username}`}
            >
                {account.name?.split(' ')[0]?.toUpperCase() || 'USER'}
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
