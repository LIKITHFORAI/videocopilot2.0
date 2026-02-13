import { NextRequest, NextResponse } from 'next/server';
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import { formatTime } from '@/shared/utils/formatTime';

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

        // Helper to run ffmpeg
        const extractVideoFrames = (): Promise<void> => {
            return new Promise((resolve, reject) => {
                ffmpeg(videoPath)
                    .on('end', () => resolve())
                    .on('error', (err) => reject(err))
                    .screenshots({
                        count: maxFrames,
                        folder: framesDir,
                        filename: 'frame-%03d.jpg',
                        size: '640x360'
                    });
            });
        };

        // Run extraction
        await extractVideoFrames();

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
                    timestampFormatted: formatTime(timestamp),
                    data: `data:image/jpeg;base64,${base64}`
                };
            })
        );

        return NextResponse.json({
            success: true,
            mediaId,
            frameCount: frameData.length,
            intervalSeconds,
            frames: frameData
        });

    } catch (error: any) {
        console.error('Frame extraction error:', error);
        return NextResponse.json({
            error: 'Failed to extract frames',
            details: error.message
        }, { status: 500 });
    }
}

// formatTime imported from @/shared/utils/formatTime
