import Database from 'better-sqlite3';

const db = new Database('./data/transcripts.db', { readonly: true });

const videos = db.prepare('SELECT title FROM videos ORDER BY upload_date DESC').all();

console.log(JSON.stringify(videos, null, 2));

db.close();
