import { NextAuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

export const authOptions: NextAuthOptions = {
    providers: [
        AzureADProvider({
            clientId: process.env.AZURE_AD_CLIENT_ID!,
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
            tenantId: process.env.AZURE_AD_TENANT_ID!,
            authorization: {
                params: {
                    scope: "openid profile email Files.Read Sites.Read.All",
                },
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile }) {
            // Persist the OAuth access_token and user info to the token right after signin
            if (account) {
                token.accessToken = account.access_token;
            }
            if (profile) {
                token.email = profile.email;
                token.name = profile.name;
            }
            return token;
        },
        async session({ session, token }) {
            // Send properties to the client
            if (token && session.user) {
                session.user.email = token.email as string;
                session.user.name = token.name as string;
                // Expose accessToken to client side for direct Graph API calls if needed
                // Note: Better to handle this server-side in API routes, but putting it here makes it available
                (session as any).accessToken = token.accessToken;
            }
            return session;
        },
    },
    pages: {
        signIn: '/', // Redirect to home page for sign in
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: true, // Enable debug logging
};
