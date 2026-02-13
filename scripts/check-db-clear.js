const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(process.cwd(), 'data', 'transcripts.db');

// Check if file exists (it shouldn't, or should be 0 size/new)
if (!fs.existsSync(dbPath)) {
    console.log("Database file deleted. (It will be recreated empty on next app start)");
} else {
    const db = new Database(dbPath);
    // If auto-recreated by some background process, check counts
    try {
        const videoCount = db.prepare('SELECT COUNT(*) as count FROM videos').get();
        console.log(`Indexed Videos: ${videoCount.count}`);
    } catch (e) {
        console.log("Database empty/uninitialized.");
    }
}
