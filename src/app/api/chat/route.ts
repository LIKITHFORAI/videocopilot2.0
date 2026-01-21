import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { getTranscriptPath } from '@/lib/storage';
import { answerQuestion } from '@/lib/intelligence';
import { existsSync } from 'fs';

export async function POST(req: NextRequest) {
    try {
        const { mediaId, question, history } = await req.json();

        if (!mediaId || !question) {
            return NextResponse.json({ error: 'Missing mediaId or question' }, { status: 400 });
        }

        const transcriptPath = getTranscriptPath(mediaId);
        if (!existsSync(transcriptPath)) {
            return NextResponse.json({ error: 'Transcript not found. Process the video first.' }, { status: 404 });
        }

        const data = await readFile(transcriptPath, 'utf-8');
        const transcript = JSON.parse(data);

        const result = await answerQuestion(transcript.segments, question, history);

        return NextResponse.json(result);
    } catch (e: any) {
        console.error("Chat API error:", e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
