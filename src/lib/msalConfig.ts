import { Configuration, PopupRequest } from "@azure/msal-browser";

export const msalConfig: Configuration = {
    auth: {
        clientId: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID!,
        authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID}`,
        // For redirect flow, redirect back to homepage
        redirectUri: typeof window !== 'undefined'
            ? (() => {
                // Only apply basePath for production (not localhost)
                const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
                const basePath = isLocalhost ? '' : (process.env.NEXT_PUBLIC_BASE_PATH || '');
                return `${window.location.origin}${basePath}/`;
            })()
            : 'http://localhost:3000/',
        postLogoutRedirectUri: typeof window !== 'undefined'
            ? (() => {
                const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
                const basePath = isLocalhost ? '' : (process.env.NEXT_PUBLIC_BASE_PATH || '');
                return `${window.location.origin}${basePath}/`;
            })()
            : 'http://localhost:3000/',
    },
    cache: {
        cacheLocation: "sessionStorage",
    }
};

export const loginRequest: PopupRequest = {
    scopes: [
        "User.Read",
        "Files.Read.All",
        "Files.ReadWrite.All",
        "Sites.Read.All",
        "Sites.ReadWrite.All"
    ],
    prompt: "select_account"
};
