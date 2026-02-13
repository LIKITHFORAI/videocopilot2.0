const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(process.cwd(), 'data', 'transcripts.db'));

const rows = db.prepare('SELECT id, title FROM videos WHERE title LIKE "%Making%"').all();
console.log('Found "Making" videos in local DB:', rows);
db.close();
