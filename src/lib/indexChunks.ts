import db from './db';
import { chunkTranscript, Chunk } from './chunker';
import { randomUUID } from 'crypto';

export interface IndexResult {
    chunksIndexed: number;
    videoId: string;
}

/**
 * Index video chunks into SQLite FTS5 for searchability
 */
export async function indexVideoChunks(
    videoId: string,
    clientId: string,
    transcript: any,
    videoTitle?: string,
    personality: string = 'meetings'
): Promise<IndexResult> {
    try {
        // 1. Chunk the transcript
        const chunks = chunkTranscript(transcript.segments || []);

        //2. Start transaction
        const insertChunk = db.prepare(`
      INSERT INTO transcript_chunks (id, video_id, client_id, chunk_index, chunk_text, speaker, start_time, end_time, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, strftime('%s', 'now'))
    `);

        const insertMeta = db.prepare(`
      INSERT INTO chunk_metadata (id, video_id, client_id, chunk_index, start_time, end_time)
      VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(video_id, chunk_index) DO UPDATE SET
        start_time = excluded.start_time,
        end_time = excluded.end_time
    `);

        const updateVideo = db.prepare(`
      INSERT INTO videos (id, client_id, filename, title, indexed, status, personality)
      VALUES (?, ?, ?, ?, 1, 'completed', ?)
      ON CONFLICT(id) DO UPDATE SET
        indexed = 1,
        status = 'completed',
        title = COALESCE(excluded.title, title),
        personality = excluded.personality
    `);

        const transaction = db.transaction((chunks: Chunk[]) => {
            // Insert each chunk
            for (const chunk of chunks) {
                const chunkId = randomUUID();

                insertChunk.run(
                    chunkId,
                    videoId,
                    clientId,
                    chunk.chunkIndex,
                    chunk.text,
                    chunk.speaker || null,
                    chunk.startTime,
                    chunk.endTime
                );

                insertMeta.run(
                    chunkId,
                    videoId,
                    clientId,
                    chunk.chunkIndex,
                    chunk.startTime,
                    chunk.endTime
                );
            }

            // Mark video as indexed
            updateVideo.run(videoId, clientId, videoId, videoTitle || 'Untitled', personality);
        });

        transaction(chunks);

        console.log(`✅ Indexed ${chunks.length} chunks for video ${videoId}`);

        return {
            chunksIndexed: chunks.length,
            videoId,
        };
    } catch (error) {
        console.error('Error indexing chunks:', error);
        throw error;
    }
}

/**
 * Search across all indexed transcripts
 */
export interface SearchResult {
    videoId: string;
    videoTitle: string;
    chunkText: string;
    speaker: string | null;
    startTime: number;
    endTime: number;
    relevance: number;
}

export function searchTranscripts(
    query: string,
    clientId?: string, // Kept for API compatibility; no longer used for filtering (Global Knowledge Base)
    limit: number = 10
): SearchResult[] {
    const stmt = db.prepare(`
    SELECT 
      c.video_id as videoId,
      COALESCE(v.title, v.filename, 'Untitled') as videoTitle,
      c.chunk_text as chunkText,
      c.speaker,
      m.start_time as startTime,
      m.end_time as endTime,
      rank as relevance
    FROM transcript_chunks c
    JOIN chunk_metadata m ON c.id = m.id
    LEFT JOIN videos v ON c.video_id = v.id
    WHERE transcript_chunks MATCH ?
    ORDER BY rank, v.upload_date DESC
    LIMIT ?
  `);

    return stmt.all(query, limit) as SearchResult[];
}
