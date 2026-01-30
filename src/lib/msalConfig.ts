import { Configuration, PopupRequest } from "@azure/msal-browser";

export const msalConfig: Configuration = {
    auth: {
        clientId: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID!,
        authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID}`,
        // Use blank redirect page for popup authentication
        redirectUri: typeof window !== 'undefined'
            ? `${window.location.origin}/auth-redirect.html`
            : 'http://localhost:3000/auth-redirect.html',
    },
    cache: {
        cacheLocation: "localStorage",
    }
};

export const loginRequest: PopupRequest = {
    scopes: ["User.Read", "Files.Read.All", "Sites.Read.All"]
};
