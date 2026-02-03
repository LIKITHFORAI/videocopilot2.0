export interface TranscriptSegment {
    start: number;
    end: number;
    text: string;
    speaker?: string;
}

export interface Chunk {
    chunkIndex: number;
    startTime: number;
    endTime: number;
    text: string;
    speaker?: string;
}

/**
 * Chunk transcript into 30-90 second segments with overlap
 */
export function chunkTranscript(
    segments: TranscriptSegment[],
    chunkDurationSeconds: number = 60,
    overlapSeconds: number = 10
): Chunk[] {
    const chunks: Chunk[] = [];
    let chunkIndex = 0;
    let currentChunk: string[] = [];
    let chunkStart = 0;
    let chunkEnd = 0;
    let currentSpeaker: string | undefined;

    for (const segment of segments) {
        // If adding this segment exceeds chunk duration, save current chunk
        if (segment.end - chunkStart > chunkDurationSeconds && currentChunk.length > 0) {
            chunks.push({
                chunkIndex: chunkIndex++,
                startTime: chunkStart,
                endTime: chunkEnd,
                text: currentChunk.join(' '),
                speaker: currentSpeaker,
            });

            // Start new chunk with overlap
            chunkStart = Math.max(0, chunkEnd - overlapSeconds);
            currentChunk = [];
        }

        currentChunk.push(segment.text);
        chunkEnd = segment.end;
        currentSpeaker = segment.speaker;

        if (chunkStart === 0) chunkStart = segment.start;
    }

    // Add final chunk
    if (currentChunk.length > 0) {
        chunks.push({
            chunkIndex: chunkIndex++,
            startTime: chunkStart,
            endTime: chunkEnd,
            text: currentChunk.join(' '),
            speaker: currentSpeaker,
        });
    }

    return chunks;
}
