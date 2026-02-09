import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import { extractAudio, splitAudio, transcribeChunk, getAudioDurationInSeconds, reencodeToLowQuality } from '@/lib/transcription';
import { getUploadPath, getJobPath, getTranscriptPath, cleanupMedia, ensureDirs } from '@/lib/storage';
import { generateSummary, extractActionItems } from '@/lib/intelligence';

// Global cancellation tracker
const cancelledJobs = new Map<string, boolean>();

export function cancelJob(jobId: string) {
    cancelledJobs.set(jobId, true);
    console.log(`🛑 Job ${jobId} marked for cancellation`);
}

export function isJobCancelled(jobId: string): boolean {
    return cancelledJobs.get(jobId) === true;
}

export function clearJobCancellation(jobId: string) {
    cancelledJobs.delete(jobId);
}

// In-memory job status tracker for MVP (since fs writes might be slow for status polling if high freq)
// But we used file-based persistence in the stub. Let's stick to file-based for persistence across restarts.

async function updateJob(jobId: string, data: any) {
    const jobPath = getJobPath(jobId);
    let existing = {};
    try {
        const fileContent = await readFile(jobPath, 'utf-8');
        existing = JSON.parse(fileContent);
    } catch (e) {
        // ignore
    }
    const updated = { ...existing, ...data, updatedAt: new Date().toISOString() };
    await writeFile(jobPath, JSON.stringify(updated, null, 2));
}

// Background processing function
async function processMedia(jobId: string, mediaId: string, personality: string = 'meetings') {
    try {
        await updateJob(jobId, { status: 'PREPARING', progress: 5 });
        const uploadDir = getUploadPath(mediaId);

        // Check for cancellation
        if (isJobCancelled(jobId)) {
            console.log(`⚠️ Job ${jobId} was cancelled during PREPARING`);
            await updateJob(jobId, { status: 'CANCELLED' });
            clearJobCancellation(jobId);
            return;
        }

        // Find the uploaded video file
        const files = await fs.promises.readdir(uploadDir);
        const validExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.mp3', '.wav', '.m4a'];
        const videoFile = files.find(f => validExtensions.some(ext => f.toLowerCase().endsWith(ext)));

        if (!videoFile) {
            throw new Error('No media file found in upload directory');
        }

        const inputPath = join(uploadDir, videoFile);
        const isAudio = ['.mp3', '.wav', '.m4a'].some(ext => videoFile.toLowerCase().endsWith(ext));
        const audioMasterPath = join(uploadDir, 'audio_master.mp3');

        // Check cancellation before audio extraction
        if (isJobCancelled(jobId)) {
            console.log(`⚠️ Job ${jobId} was cancelled before EXTRACTING_AUDIO`);
            await updateJob(jobId, { status: 'CANCELLED' });
            clearJobCancellation(jobId);
            return;
        }

        // 1. EXTRACT AUDIO
        if (!isAudio) {
            await updateJob(jobId, { status: 'EXTRACTING_AUDIO', progress: 10 });
            console.log(`Job ${jobId}: Extracting audio...`);
            await extractAudio(inputPath, audioMasterPath);
        } else {
            // If it's already audio, copy to master
            if (videoFile.toLowerCase().endsWith('.mp3')) {
                await fs.promises.copyFile(inputPath, audioMasterPath);
            } else {
                await extractAudio(inputPath, audioMasterPath);
            }
        }

        // Check cancellation before video compression
        if (isJobCancelled(jobId)) {
            console.log(`⚠️ Job ${jobId} was cancelled before COMPRESSING_VIDEO`);
            await updateJob(jobId, { status: 'CANCELLED' });
            clearJobCancellation(jobId);
            return;
        }

        // 1.5. COMPRESS VIDEO (if it's a video file)
        if (!isAudio) {
            await updateJob(jobId, { status: 'COMPRESSING_VIDEO', progress: 15 });
            console.log(`Job ${jobId}: Compressing video to 360p...`);
            const video360pPath = join(uploadDir, 'video_360p.mp4');
            await reencodeToLowQuality(inputPath, video360pPath);
            console.log(`Job ${jobId}: Video compression complete`);
        }

        // Check cancellation before chunking
        if (isJobCancelled(jobId)) {
            console.log(`⚠️ Job ${jobId} was cancelled before CHUNKING`);
            await updateJob(jobId, { status: 'CANCELLED' });
            clearJobCancellation(jobId);
            return;
        }

        // 2. CHUNKING
        await updateJob(jobId, { status: 'CHUNKING', progress: 22 });
        console.log(`Job ${jobId}: Chunking audio...`);
        const chunksDir = join(uploadDir, 'chunks');
        const chunkFiles = await splitAudio(audioMasterPath, chunksDir);

        // 3. TRANSCRIBING
        await updateJob(jobId, { status: 'TRANSCRIBING', progress: 32 });
        console.log(`Job ${jobId}: Transcribing ${chunkFiles.length} chunks...`);

        let allSegments: any[] = [];
        let fullText = "";
        let currentOffset = 0;

        for (let i = 0; i < chunkFiles.length; i++) {
            // Check cancellation at the start of each chunk
            if (isJobCancelled(jobId)) {
                console.log(`⚠️ Job ${jobId} was cancelled during transcription (chunk ${i + 1}/${chunkFiles.length})`);
                await updateJob(jobId, { status: 'CANCELLED' });
                clearJobCancellation(jobId);
                return;
            }

            const chunkPath = chunkFiles[i];
            const progress = 32 + Math.floor((i / chunkFiles.length) * 58); // 32 -> 90
            await updateJob(jobId, { status: 'TRANSCRIBING_CHUNK', chunkIndex: i + 1, totalChunks: chunkFiles.length, progress });

            console.log(`Job ${jobId}: Processing chunk ${i + 1}/${chunkFiles.length} (offset ${currentOffset}s)`);

            const result = await transcribeChunk(chunkPath, currentOffset);
            allSegments.push(...result.segments);
            fullText += result.text + " ";

            const duration = await getAudioDurationInSeconds(chunkPath);
            currentOffset += duration;
        }

        // 4. SUMMARIZING & GENERATING ACTION ITEMS (IN PARALLEL)
        await updateJob(jobId, { status: 'SUMMARIZING', progress: 92 });

        // Run both AI generation tasks in parallel
        const [summaryData, actionItems] = await Promise.all([
            generateSummary(allSegments, videoFile),
            extractActionItems(allSegments)
        ]);

        await updateJob(jobId, { status: 'MERGING', progress: 95 });
        const transcript = {
            mediaId,
            jobId,
            text: fullText.trim(),
            segments: allSegments,
            title: summaryData.title,
            summary: summaryData.summary,
            keyPoints: summaryData.keyPoints,
            createdAt: new Date().toISOString()
        };

        const transcriptPath = getTranscriptPath(mediaId);
        await writeFile(transcriptPath, JSON.stringify(transcript, null, 2));

        // Cache action items immediately
        const actionItemsDir = join(process.cwd(), 'data', 'action-items');
        const actionItemsCachePath = join(actionItemsDir, `${mediaId}.json`);
        if (!fs.existsSync(actionItemsDir)) {
            await fs.promises.mkdir(actionItemsDir, { recursive: true });
        }
        await writeFile(actionItemsCachePath, JSON.stringify(actionItems, null, 2));

        // 4.5. INDEX CHUNKS FOR SEARCH
        await updateJob(jobId, { status: 'INDEXING', progress: 96 });
        console.log(`Job ${jobId}: Indexing chunks for search...`);
        try {
            const { indexVideoChunks } = await import('@/lib/indexChunks');
            await indexVideoChunks(mediaId, 'mountmontgomery', transcript, summaryData.title, personality);
            console.log(`Job ${jobId}: Indexing complete`);
        } catch (indexError) {
            console.error(`Job ${jobId}: Indexing failed (non-fatal):`, indexError);
            // Continue even if indexing fails
        }

        //5. CLEANUP
        await updateJob(jobId, { status: 'CLEANUP', progress: 98 });
        await cleanupMedia(mediaId);

        // DONE
        await updateJob(jobId, { status: 'COMPLETED', progress: 100, resultUrl: `/api/transcript/${mediaId}` });
        console.log(`Job ${jobId}: Done!`);

    } catch (error: any) {
        console.error(`Job ${jobId} Failed:`, error);
        await updateJob(jobId, { status: 'FAILED', error: error.message || 'Unknown error' });
    }
}

export async function POST(req: NextRequest) {
    try {
        await ensureDirs();
        const { mediaId, personality } = await req.json();
        if (!mediaId) {
            return NextResponse.json({ error: 'Missing mediaId' }, { status: 400 });
        }

        const jobId = randomUUID();
        const jobData = {
            jobId,
            mediaId,
            personality: personality || 'meetings',
            status: 'QUEUED',
            createdAt: new Date().toISOString(),
            progress: 0,
        };

        const jobPath = getJobPath(jobId);
        await writeFile(jobPath, JSON.stringify(jobData, null, 2));

        console.log(`[PROCESS] 🚀 Starting job ${jobId} for mediaId ${mediaId}`);
        // Start processing asynchronously (fire and forget)
        // Note: In Next.js Serverless env this might not finish. 
        // For local dev/MVP it's fine.
        processMedia(jobId, mediaId, personality || 'meetings');

        return NextResponse.json({ jobId });
    } catch (error) {
        console.error('Process start error:', error);
        return NextResponse.json({ error: 'Processing initiation failed' }, { status: 500 });
    }
}
