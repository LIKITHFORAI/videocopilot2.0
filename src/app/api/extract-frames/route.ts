import { NextRequest, NextResponse } from 'next/server';
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs/promises';
import { existsSync } from 'fs';

export async function POST(req: NextRequest) {
    try {
        const { mediaId, intervalSeconds = 5, maxFrames = 10 } = await req.json();

        if (!mediaId) {
            return NextResponse.json({ error: 'Media ID required' }, { status: 400 });
        }

        const videoPath = path.join(process.cwd(), 'data', 'uploads', mediaId, 'video_360p.mp4');

        if (!existsSync(videoPath)) {
            return NextResponse.json({ error: 'Video not found' }, { status: 404 });
        }

        // Create frames directory
        const framesDir = path.join(process.cwd(), 'data', 'uploads', mediaId, 'frames');
        await fs.mkdir(framesDir, { recursive: true });

        // Extract frames
        const frames: string[] = [];
        let frameCount = 0;

        return new Promise((resolve, reject) => {
            ffmpeg(videoPath)
                .on('end', async () => {
                    // Read all extracted frames
                    const frameFiles = await fs.readdir(framesDir);
                    const sortedFrames = frameFiles
                        .filter(f => f.endsWith('.jpg'))
                        .sort()
                        .slice(0, maxFrames);

                    // Convert frames to base64
                    const frameData = await Promise.all(
                        sortedFrames.map(async (filename, index) => {
                            const framePath = path.join(framesDir, filename);
                            const buffer = await fs.readFile(framePath);
                            const base64 = buffer.toString('base64');
                            const timestamp = index * intervalSeconds;

                            return {
                                filename,
                                timestamp,
                                timestampFormatted: formatTimestamp(timestamp),
                                data: `data:image/jpeg;base64,${base64}`
                            };
                        })
                    );

                    resolve(NextResponse.json({
                        success: true,
                        mediaId,
                        frameCount: frameData.length,
                        intervalSeconds,
                        frames: frameData
                    }));
                })
                .on('error', (err) => {
                    console.error('FFmpeg error:', err);
                    reject(NextResponse.json({
                        error: 'Frame extraction failed',
                        details: err.message
                    }, { status: 500 }));
                })
                .screenshots({
                    count: maxFrames,
                    folder: framesDir,
                    filename: 'frame-%03d.jpg',
                    size: '640x360'
                });
        });

    } catch (error: any) {
        console.error('Frame extraction error:', error);
        return NextResponse.json({
            error: 'Failed to extract frames',
            details: error.message
        }, { status: 500 });
    }
}

function formatTimestamp(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}
