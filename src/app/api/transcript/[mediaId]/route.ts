import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { getTranscriptPath } from '@/lib/storage';
import { existsSync } from 'fs';

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
        const transcriptPath = getTranscriptPath(mediaId);

        if (!existsSync(transcriptPath)) {
            return NextResponse.json({ error: 'Transcript not found' }, { status: 404 });
        }

        const data = await readFile(transcriptPath, 'utf-8');
        const transcript = JSON.parse(data);
        return NextResponse.json(transcript);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
