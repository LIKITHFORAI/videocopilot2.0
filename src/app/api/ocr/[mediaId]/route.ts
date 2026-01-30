import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { getUploadPath } from '@/lib/storage';

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ mediaId: string }> }
) {
    try {
        const { mediaId } = await context.params;
        const uploadDir = getUploadPath(mediaId);
        const ocrPath = join(uploadDir, 'ocr_results.json');

        const data = await readFile(ocrPath, 'utf-8');
        const ocrResults = JSON.parse(data);

        return NextResponse.json(ocrResults);
    } catch (error) {
        return NextResponse.json(
            { error: 'OCR results not found' },
            { status: 404 }
        );
    }
}
