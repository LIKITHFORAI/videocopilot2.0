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
