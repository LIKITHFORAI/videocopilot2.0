import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        // Get personality from query parameter
        const searchParams = request.nextUrl.searchParams;
        const personality = searchParams.get('personality') || 'meetings';

        const videos = db.prepare(`
            SELECT 
                id,
                title,
                upload_date,
                status,
                indexed,
                personality
            FROM videos
            WHERE personality = ?
            ORDER BY upload_date DESC
        `).all(personality);

        return NextResponse.json({ videos });
    } catch (error) {
        console.error('Failed to fetch videos:', error);
        return NextResponse.json(
            { error: 'Failed to fetch videos' },
            { status: 500 }
        );
    }
}
