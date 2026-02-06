'use client';

import { PublicClientApplication, EventType, EventMessage, AuthenticationResult } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "@/lib/msalConfig";
import { ReactNode, useMemo, useEffect, useState } from "react";

export default function AuthContext({ children }: { children: ReactNode }) {
    const [msalInstance, setMsalInstance] = useState<PublicClientApplication | null>(null);

    // Create MSAL instance lazily on client side only
    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const initializeMsal = async () => {
            const instance = new PublicClientApplication(msalConfig);

            // Initialize MSAL
            await instance.initialize();

            // Handle redirect promise (important for redirect flow)
            await instance.handleRedirectPromise();

            // Set active account if accounts exist on initialization
            const accounts = instance.getAllAccounts();
            if (!instance.getActiveAccount() && accounts.length > 0) {
                instance.setActiveAccount(accounts[0]);
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

            setMsalInstance(instance);
        };

        initializeMsal();
    }, []);

    // Don't render MsalProvider during SSR or before initialization
    if (!msalInstance) {
        return <>{children}</>;
    }

    return (
        <MsalProvider instance={msalInstance}>
            {children}
        </MsalProvider>
    );
}
