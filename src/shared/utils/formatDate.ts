/**
 * Format an ISO date string into a human-readable display string.
 * Handles 'N/A' and invalid dates gracefully.
 * Single source of truth — replaces 2 duplicate implementations.
 */
export function formatDate(dateStr?: string): string {
    if (!dateStr || dateStr === 'N/A') return 'No due date';
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    } catch {
        return dateStr;
    }
}
