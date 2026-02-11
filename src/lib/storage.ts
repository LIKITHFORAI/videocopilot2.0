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
 * Selective cleanup: delete intermediate files but KEEP video_360p.mp4.
 * 
 * The compressed video must remain on the server so the stream endpoint
 * can serve it for:
 *   - SharePoint imports (never saved to IndexedDB)
 *   - Cross-device playback (video not on this device's IndexedDB)
 * 
 * Files DELETED: original upload, audio_master.mp3, chunks/
 * Files KEPT:    video_360p.mp4
 * 
 * The server also retains:
 *   - Transcript JSON files (data/transcripts/)
 *   - Database entries (transcripts.db)
 *   - Job status files (data/jobs/)
 */
export async function cleanupMedia(mediaId: string) {
    const uploadPath = getUploadPath(mediaId);

    try {
        console.log(`[CLEANUP] Cleaning intermediate files for ${mediaId} (keeping video_360p.mp4)...`);
        const entries = await readdir(uploadPath);

        for (const entry of entries) {
            // KEEP the compressed video for streaming
            if (entry === 'video_360p.mp4') continue;

            const fullPath = join(uploadPath, entry);
            const info = await stat(fullPath);
            if (info.isDirectory()) {
                await recursiveDelete(fullPath);
            } else {
                await unlink(fullPath);
            }
        }

        console.log(`[CLEANUP] Complete: ${mediaId} — intermediate files removed, video_360p.mp4 preserved.`);
    } catch (e: any) {
        if (e.code !== 'ENOENT') {
            console.error('[CLEANUP] Critical error during cleanup:', e);
        }
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

