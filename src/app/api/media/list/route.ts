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
              AND (hidden = 0 OR hidden IS NULL)
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

// PATCH: Hide videos from Recent Media without deleting data
export async function PATCH(request: NextRequest) {
    try {
        const { mediaId, userEmail, personality } = await request.json();

        if (mediaId) {
            // Hide a single video
            db.prepare('UPDATE videos SET hidden = 1 WHERE id = ?').run(mediaId);
        } else if (userEmail && personality) {
            // Hide all videos for this user + personality
            db.prepare('UPDATE videos SET hidden = 1 WHERE client_id = ? AND personality = ?').run(userEmail, personality);
        } else {
            return NextResponse.json({ error: 'Missing mediaId or userEmail+personality' }, { status: 400 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to hide videos:', error);
        return NextResponse.json(
            { error: 'Failed to hide videos' },
            { status: 500 }
        );
    }
}
