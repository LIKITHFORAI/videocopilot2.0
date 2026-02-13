/**
 * Format seconds into MM:SS display string.
 * Single source of truth — replaces 4 duplicate implementations.
 */
export function formatTime(seconds: number): string {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}
