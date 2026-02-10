import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        // Get personality and userEmail from query parameter
        const searchParams = request.nextUrl.searchParams;
        const personality = searchParams.get('personality') || 'meetings';
        const userEmail = searchParams.get('userEmail');

        // Allow filtering by userEmail, or return all if admin/legacy (for now strictly filter if provided)
        let query = `
            SELECT 
                id,
                title,
                upload_date,
                status,
                indexed,
                personality,
                client_id
            FROM videos
            WHERE personality = ?
        `;

        const params: any[] = [personality];

        if (userEmail) {
            query += ` AND client_id = ?`;
            params.push(userEmail);
        }

        query += ` ORDER BY upload_date DESC`;

        const videos = db.prepare(query).all(...params);

        return NextResponse.json({ videos });
    } catch (error) {
        console.error('Failed to fetch videos:', error);
        return NextResponse.json(
            { error: 'Failed to fetch videos' },
            { status: 500 }
        );
    }
}
