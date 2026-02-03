import Database from 'better-sqlite3';

const db = new Database('./data/transcripts.db', { readonly: true });

console.log('\n=== CHUNK_METADATA TABLE SCHEMA ===');
const schema = db.prepare("PRAGMA table_info(chunk_metadata)").all();
console.table(schema);

console.log('\n=== SAMPLE ROW ===');
const sample = db.prepare('SELECT * FROM chunk_metadata LIMIT 1').get();
console.log(JSON.stringify(sample, null, 2));

db.close();
