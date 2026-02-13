/**
 * Get the API base path for the current environment.
 * In production, this includes the basePath from next.config.ts.
 * In development, it's just the root path.
 */
export function getApiPath(endpoint: string): string {
    const basePath = process.env.NEXT_PUBLIC_BASEPATH || '';
    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${basePath}${normalizedEndpoint}`;
}
