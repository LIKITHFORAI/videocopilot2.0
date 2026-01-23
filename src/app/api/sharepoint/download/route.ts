import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { randomUUID } from 'crypto';

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !(session as any).accessToken) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const accessToken = (session as any).accessToken;
    const { fileId, driveId, fileName } = await request.json();

    if (!fileId || !fileName) {
        return NextResponse.json({ error: 'Missing fileId or fileName' }, { status: 400 });
    }

    try {
        // 1. Get Download URL
        const downloadUrl = `https://graph.microsoft.com/v1.0/drives/${driveId}/items/${fileId}/content`;

        // 2. Download file stream
        const response = await fetch(downloadUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to download file: ${response.statusText}`);
        }

        if (!response.body) {
            throw new Error('Response body is empty');
        }

        // 3. Prepare Storage (Standard Upload Structure)
        const mediaId = randomUUID();
        const uploadDir = path.join(process.cwd(), 'data', 'uploads', mediaId);

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Sanitize filename
        const safeFileName = fileName.replace(/[^a-z0-9.]/gi, '_');
        const filePath = path.join(uploadDir, safeFileName);

        // 4. Write stream to file
        const fileStream = fs.createWriteStream(filePath);

        // Convert Web Stream to Node Stream
        const reader = response.body.getReader();
        const pump = async () => {
            const { done, value } = await reader.read();
            if (done) {
                fileStream.end();
                return;
            }
            fileStream.write(Buffer.from(value));
            await pump();
        };
        await pump();

        // Wait for finish
        await new Promise((resolve, reject) => {
            fileStream.on('finish', resolve);
            fileStream.on('error', reject);
        });

        console.log(`[SHAREPOINT] ✅ Download complete: mediaId=${mediaId}, filename=${safeFileName}`);

        // 5. Return mediaId so client can trigger processing
        return NextResponse.json({ mediaId });

    } catch (error) {
        console.error('SharePoint Download Error:', error);
        return NextResponse.json({ error: 'Failed to download file' }, { status: 500 });
    }
}
