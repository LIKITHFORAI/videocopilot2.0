'use client';

import { PublicClientApplication, EventType, EventMessage, AuthenticationResult } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "@/lib/msalConfig";
import { ReactNode } from "react";

// Initialize MSAL only on client side to avoid crypto_nonexistent error during SSR
let msalInstance: PublicClientApplication;
if (typeof window !== 'undefined') {
    msalInstance = new PublicClientApplication(msalConfig);

    // Set active account if accounts exist on initialization
    if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
        msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
    }

    // Listen for successful login events
    msalInstance.addEventCallback((event: EventMessage) => {
        if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
            const payload = event.payload as AuthenticationResult;
            if (payload.account) {
                msalInstance.setActiveAccount(payload.account);
            }
        }
    });
}

export default function AuthContext({ children }: { children: ReactNode }) {
    return (
        <MsalProvider instance={msalInstance}>
            {children}
        </MsalProvider>
    );
}
