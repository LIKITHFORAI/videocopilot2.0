/**
 * Get the API base path for the current environment
 * In production, this includes the basePath from next.config.ts
 * In development, it's just the root path
 */
export function getApiPath(endpoint: string): string {
    const basePath = process.env.NEXT_PUBLIC_BASEPATH || '';

    // Ensure endpoint starts with /
    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

    return `${basePath}${normalizedEndpoint}`;
}

// Example usage:
// fetch(getApiPath('/api/upload'))  // Production: /demo-tool/api/upload
// fetch(getApiPath('/api/upload'))  // Development: /api/upload
