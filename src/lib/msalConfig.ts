import { Configuration, PopupRequest } from "@azure/msal-browser";

export const msalConfig: Configuration = {
    auth: {
        clientId: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID!,
        authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID}`,
        // Dynamically build redirect URI to work with basePath (e.g., /videocopilot)
        redirectUri: typeof window !== 'undefined'
            ? (() => {
                // Get the base path from current location
                const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
                return `${window.location.origin}${basePath}/auth-redirect.html`;
            })()
            : 'http://localhost:3000/auth-redirect.html',
    },
    cache: {
        cacheLocation: "sessionStorage",
    }
};

export const loginRequest: PopupRequest = {
    scopes: ["User.Read", "Files.Read.All", "Sites.Read.All"]
};
