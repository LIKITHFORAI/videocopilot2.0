import { NextRequest, NextResponse } from 'next/server';
import { createReadStream, statSync, readdirSync } from 'fs';
import { join } from 'path';
import { getUploadPath } from '@/lib/storage';

// Helper to find the video file in the directory
// Prioritizes the compressed 360p version if it exists
function findVideoFile(dir: string): string | null {
    try {
        const files = readdirSync(dir);

        // First, check if compressed video exists
        const compressedVideo = join(dir, 'video_360p.mp4');
        if (files.includes('video_360p.mp4')) {
            return compressedVideo;
        }

        // Fall back to finding any video file (for uploads still being processed)
        const validExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.mp3', '.wav', '.m4a'];
        const file = files.find(f => validExtensions.some(ext => f.toLowerCase().endsWith(ext)));
        return file ? join(dir, file) : null;
    } catch (e) {
        return null;
    }
}

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ mediaId: string }> | { mediaId: string } }
) {
    const params = 'then' in context.params ? await context.params : context.params;
    const mediaId = params.mediaId;
    if (!mediaId) return new NextResponse('Missing ID', { status: 400 });

    const uploadDir = getUploadPath(mediaId);
    const filePath = findVideoFile(uploadDir);

    if (!filePath) {
        return new NextResponse('Media not found', { status: 404 });
    }

    try {
        const stat = statSync(filePath);
        const fileSize = stat.size;
        const range = request.headers.get('range');

        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunksize = (end - start) + 1;
            const file = createReadStream(filePath, { start, end });
            const headers = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize.toString(),
                'Content-Type': 'video/mp4',
            };
            // @ts-ignore: NextResponse supports node streams/web streams
            return new NextResponse(file, { status: 206, headers });
        } else {
            // CRITICAL: Must include Accept-Ranges even for non-range requests
            const headers = {
                'Content-Length': fileSize.toString(),
                'Content-Type': 'video/mp4',
                'Accept-Ranges': 'bytes', // This tells the browser it can seek
            };
            const file = createReadStream(filePath);
            // @ts-ignore
            return new NextResponse(file, { status: 200, headers });
        }
    } catch (error) {
        console.error('Stream error:', error);
        return new NextResponse('Error streaming media', { status: 500 });
    }
}

// Support HEAD requests for video metadata
export async function HEAD(
    request: NextRequest,
    context: { params: Promise<{ mediaId: string }> | { mediaId: string } }
) {
    const params = 'then' in context.params ? await context.params : context.params;
    const mediaId = params.mediaId;
    if (!mediaId) return new NextResponse('Missing ID', { status: 400 });

    const uploadDir = getUploadPath(mediaId);
    const filePath = findVideoFile(uploadDir);

    if (!filePath) {
        return new NextResponse('Media not found', { status: 404 });
    }

    try {
        const stat = statSync(filePath);
        const fileSize = stat.size;

        const headers = {
            'Content-Length': fileSize.toString(),
            'Content-Type': 'video/mp4',
            'Accept-Ranges': 'bytes',
        };

        return new NextResponse(null, { status: 200, headers });
    } catch (error) {
        console.error('HEAD request error:', error);
        return new NextResponse('Error', { status: 500 });
    }
}
