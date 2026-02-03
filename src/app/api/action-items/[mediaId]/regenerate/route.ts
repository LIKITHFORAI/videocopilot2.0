import { NextRequest } from 'next/server';
import { extractActionItems } from '@/lib/intelligence';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ mediaId: string }> }
) {
    const { mediaId } = await params;

    if (!mediaId) {
        return new Response('Media ID required', { status: 400 });
    }

    try {
        // Read transcript
        const transcriptPath = path.join(DATA_DIR, 'transcripts', `${mediaId}.json`);
        if (!fs.existsSync(transcriptPath)) {
            return new Response('Transcript not found', { status: 404 });
        }

        const transcriptData = JSON.parse(fs.readFileSync(transcriptPath, 'utf-8'));

        // Regenerate action items
        console.log(`Regenerating action items for video ${mediaId}...`);
        const actionItems = await extractActionItems(transcriptData.segments, transcriptData.title);

        // Save to action-items folder
        const actionItemsDir = path.join(DATA_DIR, 'action-items');
        if (!fs.existsSync(actionItemsDir)) {
            fs.mkdirSync(actionItemsDir, { recursive: true });
        }

        const actionItemsPath = path.join(actionItemsDir, `${mediaId}.json`);
        fs.writeFileSync(actionItemsPath, JSON.stringify(actionItems, null, 2));

        console.log(`✅ Regenerated ${actionItems.length} action items for video ${mediaId}`);

        return Response.json(actionItems);
    } catch (error) {
        console.error('Error regenerating action items:', error);
        return new Response(`Failed to regenerate action items: ${error}`, { status: 500 });
    }
}
