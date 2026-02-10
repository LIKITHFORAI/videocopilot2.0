import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { createWriteStream } from 'fs';
import { mkdir } from 'fs/promises';
import { join } from 'path';
import { getFileMetadata, downloadFileStream, validateToken } from '@/lib/graphApi';
import { getUploadPath, ensureDirs } from '@/lib/storage';

/**
 * POST /api/sharepoint/import
 *
 * Server-side file import from SharePoint/OneDrive.
 * Downloads the file directly from Graph API to the server's local disk,
 * bypassing the user's browser entirely.
 *
 * Request body:
 *   { driveId: string, itemId: string, fileName?: string, accessToken: string }
 *
 * Response:
 *   { mediaId: string, fileName: string, fileSize: number }
 *
 * Security:
 *   - Access token is used immediately for the download and never stored.
 *   - Token is never included in log messages.
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { driveId, itemId, fileName, accessToken } = body;

        // Validate required fields
        if (!driveId || !itemId || !accessToken) {
            return NextResponse.json(
                { error: 'Missing required fields: driveId, itemId, accessToken' },
                { status: 400 }
            );
        }

        // Quick token validation
        const isValid = await validateToken(accessToken);
        if (!isValid) {
            return NextResponse.json(
                { error: 'Invalid or expired access token. Please re-authenticate.' },
                { status: 401 }
            );
        }

        // Fetch file metadata from Graph API
        let metadata;
        try {
            metadata = await getFileMetadata(driveId, itemId, accessToken);
        } catch (err: any) {
            const msg = err.message || '';
            if (msg === 'TOKEN_EXPIRED') {
                return NextResponse.json({ error: 'Access token expired. Please re-authenticate.' }, { status: 401 });
            }
            if (msg === 'ACCESS_DENIED') {
                return NextResponse.json({ error: 'You do not have permission to access this file.' }, { status: 403 });
            }
            if (msg === 'FILE_NOT_FOUND') {
                return NextResponse.json({ error: 'File not found in SharePoint.' }, { status: 404 });
            }
            if (msg === 'NO_DOWNLOAD_URL') {
                return NextResponse.json({ error: 'This file type does not support direct download.' }, { status: 400 });
            }
            throw err;
        }

        const finalFileName = fileName || metadata.name;
        const mediaId = randomUUID();

        // Ensure directories exist
        await ensureDirs();
        const uploadDir = getUploadPath(mediaId);
        await mkdir(uploadDir, { recursive: true });

        const filePath = join(uploadDir, finalFileName);
        const fileSizeMB = (metadata.size / (1024 * 1024)).toFixed(1);
        console.log(`[SP-IMPORT] 📥 Starting server-side download: ${finalFileName} (${fileSizeMB} MB)`);

        // Stream file from Graph API directly to disk
        const { stream } = await downloadFileStream(metadata.downloadUrl);

        const fileStream = createWriteStream(filePath);
        const reader = (stream as any).getReader();

        const finishPromise = new Promise<void>((resolve, reject) => {
            fileStream.on('finish', () => resolve());
            fileStream.on('error', (err) => reject(err));
        });

        let bytesWritten = 0;
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            bytesWritten += value.length;
            if (!fileStream.write(value)) {
                await new Promise<void>((resolve) => fileStream.once('drain', () => resolve()));
            }
        }
        fileStream.end();
        await finishPromise;

        console.log(`[SP-IMPORT] ✅ Download complete: mediaId=${mediaId}, file=${finalFileName}, size=${bytesWritten} bytes`);

        return NextResponse.json({
            mediaId,
            fileName: finalFileName,
            fileSize: bytesWritten
        });

    } catch (error: any) {
        console.error('[SP-IMPORT] ❌ Import failed:', error.message);
        return NextResponse.json(
            { error: 'Server-side import failed. Please try again.' },
            { status: 500 }
        );
    }
}
