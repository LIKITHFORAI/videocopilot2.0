import { NextRequest, NextResponse } from 'next/server';
import { pipeline } from 'stream/promises';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { mkdir } from 'fs/promises';
import { randomUUID } from 'crypto';

// Configure route for large file uploads
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// Increase body size limit (50MB)
export const maxDuration = 60; // 60 seconds max execution time

export async function POST(req: NextRequest) {
    try {
        const filename = req.headers.get('x-original-filename') || 'video.mp4';
        const mediaId = randomUUID();

        // Ensure the directory exists for this specific media upload
        const uploadDir = join(process.cwd(), 'data', 'uploads', mediaId);
        await mkdir(uploadDir, { recursive: true });

        const filePath = join(uploadDir, filename);

        // Get the ReadableStream from the request body
        // Next.js App Router Request body is a standard Web ReadableStream
        // We need to convert or pipe it to fs.

        if (!req.body) {
            return NextResponse.json({ error: 'No body provided' }, { status: 400 });
        }

        // Convert Web ReadableStream to Node Readable Stream is tricky directly 
        // but we can use 'stream/consumers' or just iterator
        // Or simpler: iterate the chunks and write them.
        // However, for best performance pipeline is preferred if we can adapt it.
        // Check if 'req.body' (Web Stream) is compatible with node pipeline in this environment.
        // If not, we can use the reader.

        const fileStream = createWriteStream(filePath);

        try {
            const reader = req.body.getReader();

            // Set up the finish promise BEFORE we start writing
            const finishPromise = new Promise<void>((resolve, reject) => {
                fileStream.on('finish', () => resolve());
                fileStream.on('error', (err) => reject(err));
            });

            // Write all chunks
            try {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    // Handle backpressure
                    if (!fileStream.write(value)) {
                        await new Promise<void>((resolve) => fileStream.once('drain', () => resolve()));
                    }
                }
            } finally {
                fileStream.end();
            }

            // Wait for file to be fully written to disk
            await finishPromise;

            const fileSize = (await import('fs').then(fs => fs.promises.stat(filePath))).size;
            console.log(`[UPLOAD] ✅ Upload complete: mediaId=${mediaId}, filename=${filename}, size=${fileSize} bytes`);
            console.log(`[UPLOAD] 📤 Returning mediaId to client: ${mediaId}`);

            return NextResponse.json({ mediaId });

        } catch (err) {
            fileStream.destroy();
            throw err;
        }

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
