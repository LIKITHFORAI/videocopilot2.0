'use client';

import { getApiPath } from '@/shared/utils/apiPath';

/**
 * Browser-side IndexedDB storage for video files.
 *
 * Each user gets their own IndexedDB database, named by email.
 * This ensures two users on the same browser never see each other's data.
 *
 * DB:   videoCopilot_{userEmail}   (e.g.  videoCopilot_john@contoso.com)
 * Store: videos
 * Key:   mediaId  (string – UUID)
 * Value: { blob: Blob, mimeType: string, fileName: string, savedAt: string }
 */

const DB_VERSION = 1;
const STORE_NAME = 'videos';

function getDBName(userEmail: string): string {
    // Sanitise email for IDB name (replace chars that could cause issues)
    const safe = userEmail.toLowerCase().replace(/[^a-z0-9@._-]/g, '_');
    return `videoCopilot_${safe}`;
}

function openDB(userEmail: string): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const dbName = getDBName(userEmail);
        const request = indexedDB.open(dbName, DB_VERSION);

        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'mediaId' });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

/** Persist a video file blob for later local playback. */
export async function saveVideoToLocal(mediaId: string, file: File, userEmail: string): Promise<void> {
    if (!userEmail) {
        console.warn('[BrowserStorage] No userEmail provided, skipping save.');
        return;
    }
    try {
        const db = await openDB(userEmail);
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);

            store.put({
                mediaId,
                blob: file,
                mimeType: file.type || 'video/mp4',
                fileName: file.name,
                savedAt: new Date().toISOString(),
            });

            tx.oncomplete = () => {
                db.close();
                resolve();
            };
            tx.onerror = () => {
                db.close();
                reject(tx.error);
            };
        });
    } catch (err) {
        console.warn('[BrowserStorage] Failed to save video locally:', err);
    }
}

/** Retrieve a video blob from local storage. Returns null if not found. */
export async function getVideoFromLocal(
    mediaId: string,
    userEmail: string
): Promise<{ blob: Blob; mimeType: string; fileName: string } | null> {
    if (!userEmail) {
        console.warn('[BrowserStorage] No userEmail provided, skipping read.');
        return null;
    }
    try {
        const db = await openDB(userEmail);
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readonly');
            const store = tx.objectStore(STORE_NAME);
            const req = store.get(mediaId);

            req.onsuccess = () => {
                db.close();
                if (req.result) {
                    resolve({
                        blob: req.result.blob,
                        mimeType: req.result.mimeType,
                        fileName: req.result.fileName,
                    });
                } else {
                    resolve(null);
                }
            };
            req.onerror = () => {
                db.close();
                reject(req.error);
            };
        });
    } catch (err) {
        console.warn('[BrowserStorage] Failed to read video from local storage:', err);
        return null;
    }
}

/** Remove a specific video from local storage. */
export async function deleteVideoFromLocal(mediaId: string, userEmail: string): Promise<void> {
    if (!userEmail) {
        console.warn('[BrowserStorage] No userEmail provided, skipping delete.');
        return;
    }
    try {
        const db = await openDB(userEmail);
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);
            store.delete(mediaId);

            tx.oncomplete = () => {
                db.close();
                resolve();
            };
            tx.onerror = () => {
                db.close();
                reject(tx.error);
            };
        });
    } catch (err) {
        console.warn('[BrowserStorage] Failed to delete video from local storage:', err);
    }
}

/** 
 * Download video from server and save to local storage.
 * Used for SharePoint imports or syncing across devices (if enabled).
 */
export async function downloadVideoFromServer(
    mediaId: string,
    userEmail: string,
    onProgress?: (percent: number) => void
): Promise<boolean> {
    try {
        console.log(`[BrowserStorage] Downloading video ${mediaId} from server...`);
        // Use getApiPath to ensure correct base path in production
        const url = getApiPath(`/api/media/${mediaId}/stream`);
        const response = await fetch(url);

        if (!response.ok) {
            console.error(`[BrowserStorage] Download failed: ${response.status} ${response.statusText}`);
            return false;
        }

        const blob = await response.blob();
        if (blob.size < 100) {
            console.error('[BrowserStorage] Downloaded blob is too small, likely an error page');
            return false;
        }

        // Create a File object from the blob (optional, but good for metadata)
        const fileName = `imported_${mediaId}.mp4`; // We might not know the original name here easily without another API call, but that's fine
        const file = new File([blob], fileName, { type: blob.type || 'video/mp4' });

        await saveVideoToLocal(mediaId, file, userEmail);
        console.log(`[BrowserStorage] Successfully downloaded and saved video ${mediaId} to IndexedDB`);
        return true;

    } catch (error) {
        console.error('[BrowserStorage] Error in downloadVideoFromServer:', error);
        return false;
    }
}
