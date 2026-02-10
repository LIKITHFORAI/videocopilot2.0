import { join } from 'path';
import { mkdir, readdir, unlink, rmdir, stat } from 'fs/promises';

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

/**
 * Aggressive cleanup: delete ALL files in the upload directory.
 * 
 * With decentralized storage, the server no longer needs to keep any
 * video or audio files after processing. The client stores the video
 * in IndexedDB for local playback. The server retains only:
 *   - Transcript JSON files (data/transcripts/)
 *   - Database entries (transcripts.db)
 *   - Job status files (data/jobs/)
 */
export async function cleanupMedia(mediaId: string) {
    const uploadPath = getUploadPath(mediaId);

    try {
        console.log(`[CLEANUP] Deleting ALL media files for ${mediaId} (decentralized storage mode)...`);
        await recursiveDelete(uploadPath);
        console.log(`[CLEANUP] Complete: ${mediaId} — all media files removed from server.`);
    } catch (e) {
        console.error('[CLEANUP] Critical error during cleanup:', e);
    }
}

/** Recursively delete a directory and all its contents. */
async function recursiveDelete(dirPath: string) {
    try {
        const entries = await readdir(dirPath);
        for (const entry of entries) {
            const fullPath = join(dirPath, entry);
            const info = await stat(fullPath);
            if (info.isDirectory()) {
                await recursiveDelete(fullPath);
            } else {
                await unlink(fullPath);
            }
        }
        await rmdir(dirPath);
    } catch (e: any) {
        // Ignore "not found" errors
        if (e.code !== 'ENOENT') {
            console.error(`[CLEANUP] Error deleting ${dirPath}:`, e);
        }
    }
}

