import Database from 'better-sqlite3';

const db = new Database('./data/transcripts.db', { readonly: true });

console.log('\n📊 DATABASE STRUCTURE:\n');

// Get videos table schema
console.log('=== VIDEOS TABLE SCHEMA ===');
const schema = db.prepare("PRAGMA table_info(videos)").all();
console.table(schema);

console.log('\n=== LATEST 3 VIDEOS ===');
const videos = db.prepare('SELECT * FROM videos ORDER BY rowid DESC LIMIT 3').all();
videos.forEach((v, i) => {
    console.log(`\n--- Video ${i + 1} ---`);
    console.log(JSON.stringify(v, null, 2));
});

db.close();
console.log('\n✅ Done!\n');
