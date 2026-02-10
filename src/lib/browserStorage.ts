'use client';

/**
 * Browser-side IndexedDB storage for video files.
 *
 * Videos are stored as Blobs keyed by mediaId so the player can
 * render them locally even when the server has removed the file.
 *
 * DB:   video-copilot-media
 * Store: videos
 * Key:   mediaId  (string – UUID)
 * Value: { blob: Blob, mimeType: string, fileName: string, savedAt: string }
 */

const DB_NAME = 'video-copilot-media';
const DB_VERSION = 1;
const STORE_NAME = 'videos';

function openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

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
export async function saveVideoToLocal(mediaId: string, file: File): Promise<void> {
    try {
        const db = await openDB();
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
    mediaId: string
): Promise<{ blob: Blob; mimeType: string; fileName: string } | null> {
    try {
        const db = await openDB();
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
export async function deleteVideoFromLocal(mediaId: string): Promise<void> {
    try {
        const db = await openDB();
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
