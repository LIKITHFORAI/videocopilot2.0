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
    // In a real app we might keep the original, but requirements say 'delete temporary video/audio chunk files'
    // and 'keep original uploaded media for now (optional)'.
    // We will delete the chunks directory.
    const uploadPath = getUploadPath(mediaId);
    const chunksDir = join(uploadPath, 'chunks');
    try {
        // Delete chunks
        await recursiveDelete(chunksDir);
        // Optionally delete master audio if it exists
        // await unlink(join(uploadPath, 'audio_master.mp3')).catch(() => {});
    } catch (e) {
        console.error('Cleanup error:', e);
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
