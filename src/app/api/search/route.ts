import { NextRequest, NextResponse } from 'next/server';
import { searchTranscripts } from '@/lib/indexChunks';
import { getApiPath } from '@/shared/utils/apiPath';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const { query, client_id = 'mountmontgomery', limit = 10 } = await req.json();

        if (!query || typeof query !== 'string') {
            return NextResponse.json(
                { error: 'Query is required' },
                { status: 400 }
            );
        }

        // Search using SQLite FTS5
        const results = searchTranscripts(query, client_id, limit);

        return NextResponse.json({
            results,
            count: results.length,
        });
    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json(
            { error: 'Search failed', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
