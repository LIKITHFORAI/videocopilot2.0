import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ jobId: string }> | { jobId: string } }
) {
    // In Next.js 15+, params is a Promise
    const params = 'then' in context.params ? await context.params : context.params;
    const jobId = params.jobId;

    if (!jobId) {
        return NextResponse.json({ error: 'Missing Job ID' }, { status: 400 });
    }

    try {
        const jobPath = join(process.cwd(), 'data', 'jobs', `${jobId}.json`);
        const data = await readFile(jobPath, 'utf-8');
        const job = JSON.parse(data);
        return NextResponse.json(job);
    } catch (error) {
        return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }
}

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ jobId: string }> | { jobId: string } }
) {
    const params = 'then' in context.params ? await context.params : context.params;
    const jobId = params.jobId;

    if (!jobId) {
        return NextResponse.json({ error: 'Missing Job ID' }, { status: 400 });
    }

    try {
        const jobPath = join(process.cwd(), 'data', 'jobs', `${jobId}.json`);

        // 1. Read job to get mediaId
        let data;
        try {
            data = await readFile(jobPath, 'utf-8');
        } catch (e) {
            return NextResponse.json({ error: 'Job not found' }, { status: 404 });
        }

        const job = JSON.parse(data);
        const { mediaId } = job;

        // 2. Cancel the running job if it's still processing
        const { cancelJob } = await import('@/lib/jobTracker');
        cancelJob(jobId);

        // 3. Delete Upload Directory (and all contents)
        if (mediaId) {
            const uploadDir = join(process.cwd(), 'data', 'uploads', mediaId);
            // Use rm with recursive: true to delete directory and contents
            await import('fs/promises').then(fs => fs.rm(uploadDir, { recursive: true, force: true }));
        }

        // 4. Delete Job File
        await import('fs/promises').then(fs => fs.rm(jobPath, { force: true }));

        return NextResponse.json({ success: true, message: 'Job cancelled and data deleted' });
    } catch (error) {
        console.error('Delete job error:', error);
        return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 });
    }
}
