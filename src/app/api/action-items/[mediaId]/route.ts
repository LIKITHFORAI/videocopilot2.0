import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { getTranscriptPath } from '@/lib/storage';
import { existsSync } from 'fs';
import { extractActionItems } from '@/lib/intelligence';

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ mediaId: string }> | { mediaId: string } }
) {
    const params = 'then' in context.params ? await context.params : context.params;
    const mediaId = params.mediaId;

    if (!mediaId) {
        return NextResponse.json({ error: 'Missing Media ID' }, { status: 400 });
    }

    try {
        // Check for cached action items
        const cacheDir = join(process.cwd(), 'data', 'action-items');
        const cachePath = join(cacheDir, `${mediaId}.json`);

        if (existsSync(cachePath)) {
            const cached = await readFile(cachePath, 'utf-8');
            return NextResponse.json(JSON.parse(cached));
        }

        // Read transcript
        const transcriptPath = getTranscriptPath(mediaId);
        if (!existsSync(transcriptPath)) {
            return NextResponse.json({ error: 'Transcript not found' }, { status: 404 });
        }

        const transcriptData = await readFile(transcriptPath, 'utf-8');
        const transcript = JSON.parse(transcriptData);

        if (!transcript.segments || transcript.segments.length === 0) {
            return NextResponse.json([]);
        }

        // Extract action items using AI
        const actionItems = await extractActionItems(transcript.segments);

        // Cache the results
        if (!existsSync(cacheDir)) {
            await mkdir(cacheDir, { recursive: true });
        }
        await writeFile(cachePath, JSON.stringify(actionItems, null, 2));

        return NextResponse.json(actionItems);
    } catch (error) {
        console.error('Action items extraction error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
