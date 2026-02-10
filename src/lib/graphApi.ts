/**
 * Server-side Graph API utilities for SharePoint/OneDrive file access.
 * Used by /api/sharepoint/import to download files directly from Graph API.
 *
 * Security: Access tokens are used immediately and never persisted or logged.
 */

const GRAPH_BASE = 'https://graph.microsoft.com/v1.0';

export interface GraphFileMetadata {
    name: string;
    size: number;
    mimeType: string;
    downloadUrl: string;
}

/**
 * Validate a user's access token by making a lightweight /me call.
 * Returns true if token is valid and usable.
 */
export async function validateToken(accessToken: string): Promise<boolean> {
    try {
        const response = await fetch(`${GRAPH_BASE}/me`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        return response.ok;
    } catch {
        return false;
    }
}

/**
 * Get file metadata from Graph API using driveId + itemId.
 * Returns file name, size, MIME type, and direct download URL.
 *
 * @throws Error with coded messages: TOKEN_EXPIRED, ACCESS_DENIED, FILE_NOT_FOUND, GRAPH_ERROR_{status}
 */
export async function getFileMetadata(
    driveId: string,
    itemId: string,
    accessToken: string
): Promise<GraphFileMetadata> {
    const url = `${GRAPH_BASE}/drives/${driveId}/items/${itemId}`;

    const response = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (!response.ok) {
        const status = response.status;
        if (status === 401) throw new Error('TOKEN_EXPIRED');
        if (status === 403) throw new Error('ACCESS_DENIED');
        if (status === 404) throw new Error('FILE_NOT_FOUND');
        throw new Error(`GRAPH_ERROR_${status}`);
    }

    const meta = await response.json();
    const downloadUrl = meta['@microsoft.graph.downloadUrl'];

    if (!downloadUrl) {
        throw new Error('NO_DOWNLOAD_URL');
    }

    return {
        name: meta.name,
        size: meta.size,
        mimeType: meta.file?.mimeType || 'application/octet-stream',
        downloadUrl
    };
}

/**
 * Download a file from Graph API as a readable stream.
 * Uses the @microsoft.graph.downloadUrl for direct, authenticated download.
 *
 * The download URL is pre-authenticated by Microsoft, so no Bearer token is needed.
 *
 * @throws Error with coded message: DOWNLOAD_FAILED_{status}, NO_RESPONSE_BODY
 */
export async function downloadFileStream(
    downloadUrl: string
): Promise<{ stream: ReadableStream; contentLength: number }> {
    const response = await fetch(downloadUrl);

    if (!response.ok) {
        throw new Error(`DOWNLOAD_FAILED_${response.status}`);
    }

    const contentLength = parseInt(response.headers.get('content-length') || '0', 10);

    if (!response.body) {
        throw new Error('NO_RESPONSE_BODY');
    }

    return {
        stream: response.body as unknown as ReadableStream,
        contentLength
    };
}
