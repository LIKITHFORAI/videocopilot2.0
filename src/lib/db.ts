import Database from 'better-sqlite3';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const DB_PATH = join(process.cwd(), 'data', 'transcripts.db');

// Ensure data directory exists
const dataDir = join(process.cwd(), 'data');
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

// Initialize database
const db = new Database(DB_PATH);

// Enable WAL mode for better concurrency
db.pragma('journal_mode = WAL');

// Create tables if they don't exist
db.exec(`
  -- Videos table
  CREATE TABLE IF NOT EXISTS videos (
    id TEXT PRIMARY KEY,
    client_id TEXT NOT NULL,
    filename TEXT NOT NULL,
    title TEXT,
    upload_date INTEGER DEFAULT (strftime('%s', 'now')),
    duration_seconds INTEGER,
    status TEXT DEFAULT 'processing',
    indexed INTEGER DEFAULT 0,
    personality TEXT DEFAULT 'meetings',
    created_at INTEGER DEFAULT (strftime('%s', 'now'))
  );

  CREATE INDEX IF NOT EXISTS idx_videos_client ON videos(client_id);
  CREATE INDEX IF NOT EXISTS idx_videos_date ON videos(upload_date DESC);
  CREATE INDEX IF NOT EXISTS idx_videos_indexed ON videos(indexed);
  CREATE INDEX IF NOT EXISTS idx_videos_personality ON videos(personality);

  -- Transcript chunks table with FTS5
  CREATE VIRTUAL TABLE IF NOT EXISTS transcript_chunks USING fts5(
    id UNINDEXED,
    video_id UNINDEXED,
    client_id UNINDEXED,
    chunk_index UNINDEXED,
    chunk_text,
    speaker,
    start_time UNINDEXED,
    end_time UNINDEXED,
    created_at UNINDEXED,
    tokenize = 'porter'
  );

  -- Metadata table for chunk info (FTS5 doesn't support all column types)
  CREATE TABLE IF NOT EXISTS chunk_metadata (
    id TEXT PRIMARY KEY,
    video_id TEXT NOT NULL,
    client_id TEXT NOT NULL,
    chunk_index INTEGER NOT NULL,
    start_time REAL NOT NULL,
    end_time REAL NOT NULL,
    created_at INTEGER DEFAULT (strftime('%s', 'now')),
    UNIQUE(video_id, chunk_index)
  );

  CREATE INDEX IF NOT EXISTS idx_chunks_meta_client ON chunk_metadata(client_id);
  CREATE INDEX IF NOT EXISTS idx_chunks_meta_video ON chunk_metadata(video_id);
`);

// Add personality column to existing tables if it doesn't exist
try {
  db.exec(`ALTER TABLE videos ADD COLUMN personality TEXT DEFAULT 'meetings'`);
  console.log('✅ Added personality column to videos table');
} catch (e: any) {
  // Column already exists, ignore error
  if (!e.message.includes('duplicate column name')) {
    console.error('Error adding personality column:', e);
  }
}

console.log('✅ SQLite database initialized at:', DB_PATH);

export default db;
