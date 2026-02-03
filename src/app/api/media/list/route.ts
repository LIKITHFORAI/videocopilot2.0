import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const videos = db.prepare(`
            SELECT 
                id,
                title,
                upload_date,
                status,
                indexed
            FROM videos
            ORDER BY upload_date DESC
        `).all();

        return NextResponse.json({ videos });
    } catch (error) {
        console.error('Failed to fetch videos:', error);
        return NextResponse.json(
            { error: 'Failed to fetch videos' },
            { status: 500 }
        );
    }
}
