import Database from 'better-sqlite3';

const db = new Database('./data/transcripts.db', { readonly: true });

const videos = db.prepare(`
    SELECT 
        title,
        status,
        indexed,
        datetime(upload_date, 'unixepoch') as uploaded
    FROM videos 
    ORDER BY upload_date DESC
`).all();

console.log(`\n📹 ALL VIDEOS IN DATABASE\n`);
console.log(`Total: ${videos.length} videos\n`);
console.log('='.repeat(80) + '\n');

videos.forEach((video, index) => {
    const num = String(index + 1).padStart(2, ' ');
    const statusIcon = video.status === 'completed' ? '✅' : '⏳';
    const indexIcon = video.indexed ? '🔍' : '⭕';
    console.log(`${num}. ${video.title}`);
    console.log(`    ${statusIcon} ${video.status} | ${indexIcon} Indexed: ${video.indexed ? 'Yes' : 'No'} | ⏰ ${video.uploaded}`);
    console.log('');
});

db.close();
