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
async function processMedia(jobId: string, mediaId: string) {
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
        // Assuming video file is the largest or just the first non-dir
        const validExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.mp3', '.wav', '.m4a'];
        const videoFile = files.find(f => validExtensions.some(ext => f.toLowerCase().endsWith(ext)));

        if (!videoFile) {
            throw new Error('No media file found in upload directory');
        }

        const inputPath = join(uploadDir, videoFile);
        const isAudio = ['.mp3', '.wav', '.m4a'].some(ext => videoFile.toLowerCase().endsWith(ext));
        const audioMasterPath = join(uploadDir, 'audio_master.mp3');
        const compressedVideoPath = join(uploadDir, 'video_360p.mp4');

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

            // 1.5 RE-ENCODE VIDEO TO 360P (save storage while keeping visual context)
            // Check cancellation before re-encoding
            if (isJobCancelled(jobId)) {
                console.log(`⚠️ Job ${jobId} was cancelled after audio extraction`);
                await updateJob(jobId, { status: 'CANCELLED' });
                clearJobCancellation(jobId);
                return;
            }

            await updateJob(jobId, { status: 'COMPRESSING_VIDEO', progress: 20 });
            console.log(`Job ${jobId}: Re-encoding video to 360p...`);
            await reencodeToLowQuality(inputPath, compressedVideoPath);

            // Delete the original high-res video to save space
            console.log(`Job ${jobId}: Deleting original video to save storage...`);
            await fs.promises.unlink(inputPath);
            console.log(`Job ${jobId}: Original video deleted, keeping 360p version`);
        } else {
            // If it's already audio, just use it or copy it to master if needed
            // For simplicity, we might just use inputPath as master if it is mp3, else convert
            if (videoFile.toLowerCase().endsWith('.mp3')) {
                await fs.promises.copyFile(inputPath, audioMasterPath);
            } else {
                await extractAudio(inputPath, audioMasterPath);
            }
        }

        // Check cancellation before chunking
        if (isJobCancelled(jobId)) {
            console.log(`⚠️ Job ${jobId} was cancelled before CHUNKING`);
            await updateJob(jobId, { status: 'CANCELLED' });
            clearJobCancellation(jobId);
            return;
        }

        // 2. CHUNKING
        await updateJob(jobId, { status: 'CHUNKING', progress: 30 });
        console.log(`Job ${jobId}: Chunking audio...`);
        const chunksDir = join(uploadDir, 'chunks');
        const chunkFiles = await splitAudio(audioMasterPath, chunksDir);

        // 3. TRANSCRIBING
        await updateJob(jobId, { status: 'TRANSCRIBING', progress: 40 });
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
            const progress = 40 + Math.floor((i / chunkFiles.length) * 50); // 40 -> 90
            await updateJob(jobId, { status: 'TRANSCRIBING_CHUNK', chunkIndex: i + 1, totalChunks: chunkFiles.length, progress });

            // Get duration of this chunk to correctly offset the next
            // (Or we could rely on the file name or reliable splitting, but measuring is safer)
            // Actually, we can just use the cumulative durations from Whisper segments, 
            // BUT Whisper timestamps are relative to the start of the audio file.
            // If we split by time (e.g. 1300s), we know the offset.

            // NOTE: splitAudio uses `segment_time`, but actual cut points might vary slightly on keyframes? 
            // -c copy on audio is usually frame accurate.
            // Let's use ffprobe to get precise duration of the chunk we just processed to add to offset for next.
            // OR simpler: `transcribeChunk` takes an offset.
            // We need to know the start time of this chunk.

            // Better approach: Get duration of previous chunk.
            // First chunk offset = 0.

            console.log(`Job ${jobId}: Processing chunk ${i + 1}/${chunkFiles.length} (offset ${currentOffset}s)`);

            const result = await transcribeChunk(chunkPath, currentOffset);
            allSegments.push(...result.segments);
            fullText += result.text + " ";

            const duration = await getAudioDurationInSeconds(chunkPath);
            currentOffset += duration;
        }

        // 4. MERGING, SUMMARIZING & GENERATING ACTION ITEMS (IN PARALLEL)
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

        // 5. CLEANUP
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
        const { mediaId } = await req.json();
        if (!mediaId) {
            return NextResponse.json({ error: 'Missing mediaId' }, { status: 400 });
        }

        const jobId = randomUUID();
        const jobData = {
            jobId,
            mediaId,
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
        processMedia(jobId, mediaId);

        return NextResponse.json({ jobId });
    } catch (error) {
        console.error('Process start error:', error);
        return NextResponse.json({ error: 'Processing initiation failed' }, { status: 500 });
    }
}
