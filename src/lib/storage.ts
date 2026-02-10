import { join } from 'path';
import { mkdir, readdir, unlink } from 'fs/promises';

const BASE_DIR = process.cwd();
const DATA_DIR = join(BASE_DIR, 'data');
export const UPLOADS_DIR = join(DATA_DIR, 'uploads');
export const JOBS_DIR = join(DATA_DIR, 'jobs');
export const TRANSCRIPTS_DIR = join(DATA_DIR, 'transcripts');

export async function ensureDirs() {
    await mkdir(UPLOADS_DIR, { recursive: true });
    await mkdir(JOBS_DIR, { recursive: true });
    await mkdir(TRANSCRIPTS_DIR, { recursive: true });
}

export function getUploadPath(mediaId: string) {
    return join(UPLOADS_DIR, mediaId);
}

export function getTranscriptPath(mediaId: string) {
    return join(TRANSCRIPTS_DIR, `${mediaId}.json`);
}

export function getJobPath(jobId: string) {
    return join(JOBS_DIR, `${jobId}.json`);
}

export async function cleanupMedia(mediaId: string) {
    const uploadPath = getUploadPath(mediaId);
    const chunksDir = join(uploadPath, 'chunks');
    const audioMaster = join(uploadPath, 'audio_master.mp3');
    const video360p = join(uploadPath, 'video_360p.mp4');

    try {
        console.log(`[CLEANUP] Starting cleanup for ${mediaId}...`);

        // 1. Always delete chunks directory
        await recursiveDelete(chunksDir);

        // 2. Check if 360p video exists (our "System of Record" for playback)
        let has360p = false;
        try {
            const files = await readdir(uploadPath);
            has360p = files.includes('video_360p.mp4');
        } catch {
            // directory might not exist
        }

        if (has360p) {
            console.log(`[CLEANUP] Found 360p video. Deleting original source and audio master to save space.`);

            // Delete Audio Master
            await unlink(audioMaster).catch(() => { });

            // Delete Original Video (Anything that is NOT video_360p.mp4)
            const files = await readdir(uploadPath);
            for (const file of files) {
                if (file !== 'video_360p.mp4' && file !== 'chunks') {
                    // This is likely the original uploaded file (e.g., 'MyVideo.mp4')
                    // Be careful not to delete other potential assets like thumbnails if we add them later
                    await unlink(join(uploadPath, file)).catch(err => {
                        console.error(`[CLEANUP] Failed to delete original file ${file}:`, err);
                    });
                }
            }
        } else {
            console.log(`[CLEANUP] No 360p video found. KEEPING original file as primary source.`);
            // If no 360p video (e.g. audio upload or failed conversion), we MUST keep the original
            // But we can still delete audio_master since it's redundant if original is audio
            // For safety, let's keep audio_master if it's an audio-only upload where original might be weird format
        }

    } catch (e) {
        console.error('[CLEANUP] Critical error during cleanup:', e);
    }
}

async function recursiveDelete(path: string) {
    try {
        const files = await readdir(path);
        for (const file of files) {
            await unlink(join(path, file));
        }
        await unlink(path); // rmdir
    } catch (e) {
        // ignore if doesn't exist
    }
}
