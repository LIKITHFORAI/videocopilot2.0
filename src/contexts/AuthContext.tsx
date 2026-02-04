'use client';

import { PublicClientApplication, EventType, EventMessage, AuthenticationResult } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "@/lib/msalConfig";
import { ReactNode, useMemo } from "react";

export default function AuthContext({ children }: { children: ReactNode }) {
    // Create MSAL instance lazily on client side only
    const msalInstance = useMemo(() => {
        if (typeof window === 'undefined') {
            return null;
        }

        const instance = new PublicClientApplication(msalConfig);

        // Set active account if accounts exist on initialization
        if (!instance.getActiveAccount() && instance.getAllAccounts().length > 0) {
            instance.setActiveAccount(instance.getAllAccounts()[0]);
        }

        // Listen for successful login events
        instance.addEventCallback((event: EventMessage) => {
            if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
                const payload = event.payload as AuthenticationResult;
                if (payload.account) {
                    instance.setActiveAccount(payload.account);
                }
            }
        });

        return instance;
    }, []);

    // Don't render MsalProvider during SSR
    if (!msalInstance) {
        return <>{children}</>;
    }

    return (
        <MsalProvider instance={msalInstance}>
            {children}
        </MsalProvider>
    );
}
