const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(process.cwd(), 'data', 'transcripts.db');
const db = new Database(dbPath);

// Get all videos with their titles
const videos = db.prepare('SELECT id, title, filename FROM videos ORDER BY upload_date DESC').all();

console.log('UPLOADED VIDEOS SUMMARY');
console.log('=======================\n');

let hasActionItems = 0;
let missingActionItems = 0;

videos.forEach((v, index) => {
    const displayTitle = v.title || v.filename;

    // Check if action items file exists and has content
    const actionItemsPath = path.join(process.cwd(), 'data', 'action-items', `${v.id}.json`);
    let status = 'NOT FOUND';
    let count = 0;

    if (fs.existsSync(actionItemsPath)) {
        const size = fs.statSync(actionItemsPath).size;
        if (size > 10) {
            const items = JSON.parse(fs.readFileSync(actionItemsPath, 'utf-8'));
            count = items.length;
            status = 'HAS DATA';
            hasActionItems++;
        } else {
            status = 'EMPTY';
            missingActionItems++;
        }
    }

    console.log(`VIDEO ${index + 1}:`);
    console.log(`  Title: ${displayTitle}`);
    console.log(`  ID: ${v.id}`);
    console.log(`  Action Items: ${status}${count > 0 ? ` (${count} items)` : ''}`);
    console.log('');
});

console.log('SUMMARY');
console.log('=======');
console.log(`Total Videos: ${videos.length}`);
console.log(`With Action Items: ${hasActionItems}`);
console.log(`Missing/Empty Action Items: ${missingActionItems}`);
