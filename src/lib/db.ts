import Database from 'better-sqlite3';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const DB_PATH = join(process.cwd(), 'data', 'transcripts.db');

let _db: Database.Database | null = null;

function getDb(): Database.Database {
  if (_db) return _db;

  // Ensure data directory exists
  const dataDir = join(process.cwd(), 'data');
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }

  // Initialize database
  _db = new Database(DB_PATH);

  // Enable WAL mode for better concurrency
  _db.pragma('journal_mode = WAL');

  // Create tables if they don't exist
  _db.exec(`
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

  // Migration: Add indexed column to videos table if missing
  try {
    _db.exec(`ALTER TABLE videos ADD COLUMN indexed INTEGER DEFAULT 0`);
    console.log('✅ Migration: Added indexed column to videos table');
  } catch (e: any) {
    if (!e.message.includes('duplicate column name')) {
      console.error('Error adding indexed column to videos:', e);
    }
  }

  // Add personality column to existing tables if it doesn't exist
  try {
    _db.exec(`ALTER TABLE videos ADD COLUMN personality TEXT DEFAULT 'meetings'`);
    console.log('✅ Added personality column to videos table');
  } catch (e: any) {
    if (!e.message.includes('duplicate column name')) {
      console.error('Error adding personality column:', e);
    }
  }

  // Migration: Add client_id column to videos table if missing (pre-user-segregation databases)
  try {
    _db.exec(`ALTER TABLE videos ADD COLUMN client_id TEXT NOT NULL DEFAULT 'legacy'`);
    console.log('✅ Migration: Added client_id column to videos table');
  } catch (e: any) {
    if (!e.message.includes('duplicate column name')) {
      console.error('Error adding client_id column to videos:', e);
    }
  }

  // Migration: Add client_id column to chunk_metadata if missing
  try {
    _db.exec(`ALTER TABLE chunk_metadata ADD COLUMN client_id TEXT NOT NULL DEFAULT 'legacy'`);
    console.log('✅ Migration: Added client_id column to chunk_metadata table');
  } catch (e: any) {
    if (!e.message.includes('duplicate column name')) {
      console.error('Error adding client_id column to chunk_metadata:', e);
    }
  }

  // Migration: Recreate FTS5 transcript_chunks if it's missing client_id
  // FTS5 tables cannot be ALTERed, so we must drop and recreate
  try {
    // Check if client_id column exists in FTS5 table
    const ftsInfo = _db.prepare(`SELECT * FROM transcript_chunks LIMIT 0`).columns();
    const hasClientId = ftsInfo.some((col: any) => col.name === 'client_id');

    if (!hasClientId) {
      console.log('🔄 Migration: Recreating transcript_chunks FTS5 table with client_id...');
      _db.exec(`DROP TABLE IF EXISTS transcript_chunks`);
      _db.exec(`
        CREATE VIRTUAL TABLE transcript_chunks USING fts5(
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
      `);
      console.log('✅ Migration: transcript_chunks FTS5 table recreated with client_id');
    }
  } catch (e: any) {
    console.error('Error during FTS5 migration:', e);
  }

  console.log('✅ SQLite database initialized at:', DB_PATH);
  return _db;
}

// Proxy object that lazily initializes the database on first use.
// This prevents build-time errors when Next.js imports API routes
// during static analysis (where SQLite native bindings aren't available).
const db = new Proxy({} as Database.Database, {
  get(_target, prop: string | symbol) {
    const instance = getDb();
    const value = (instance as any)[prop];
    if (typeof value === 'function') {
      return value.bind(instance);
    }
    return value;
  },
});

export default db;
