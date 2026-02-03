import Database from 'better-sqlite3';

const db = new Database('./data/transcripts.db', { readonly: true });

console.log('\n=== TRANSCRIPT_CHUNKS TABLE INFO ===');
const schema = db.prepare("PRAGMA table_info(transcript_chunks)").all();
console.table(schema);

db.close();
