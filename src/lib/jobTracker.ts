// Global cancellation tracker for background jobs
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
