import Database from 'better-sqlite3';
import fs from 'fs';

const db = new Database('./data/transcripts.db');

console.log('\n🗑️  CLEANING UP OLD VIDEOS...\n');

// Get the 3 newest video IDs to keep
const videosToKeep = db.prepare(`
    SELECT id FROM videos 
    ORDER BY upload_date DESC 
    LIMIT 3
`).all().map(v => v.id);

console.log('✅ Keeping these 3 videos:');
videosToKeep.forEach(id => console.log(`   - ${id}`));

// Get all videos to delete
const videosToDelete = db.prepare(`
    SELECT id, filename FROM videos 
    WHERE id NOT IN (${videosToKeep.map(() => '?').join(',')})
`).all(...videosToKeep);

console.log(`\n🗑️  Deleting ${videosToDelete.length} old videos...\n`);

// Delete from database
const deleteFromMetadata = db.prepare('DELETE FROM chunk_metadata WHERE video_id = ?');
const deleteFromVideos = db.prepare('DELETE FROM videos WHERE id = ?');

let filesDeleted = 0;
let filesSkipped = 0;

videosToDelete.forEach(video => {
    console.log(`Deleting: ${video.id}`);

    // Delete from database
    deleteFromMetadata.run(video.id);
    deleteFromVideos.run(video.id);
    console.log(`  ✓ Deleted from database`);

    // Try to delete files (skip if locked)
    try {
        const uploadPath = `./data/uploads/${video.filename}`;
        if (fs.existsSync(uploadPath)) {
            fs.unlinkSync(uploadPath);
            console.log(`  ✓ Deleted video file`);
            filesDeleted++;
        }
    } catch (err) {
        console.log(`  ⚠️  Video file locked (will delete on server restart)`);
        filesSkipped++;
    }

    try {
        const transcriptPath = `./data/transcripts/${video.id}.json`;
        if (fs.existsSync(transcriptPath)) {
            fs.unlinkSync(transcriptPath);
            console.log(`  ✓ Deleted transcript`);
        }
    } catch (err) { }

    try {
        const actionItemsPath = `./data/action-items/${video.id}.json`;
        if (fs.existsSync(actionItemsPath)) {
            fs.unlinkSync(actionItemsPath);
            console.log(`  ✓ Deleted action items`);
        }
    } catch (err) { }
});

db.close();

console.log(`\n✅ Cleanup complete!`);
console.log(`   Kept: 3 videos`);
console.log(`   Deleted from DB: ${videosToDelete.length} videos`);
console.log(`   Files deleted: ${filesDeleted}`);
if (filesSkipped > 0) {
    console.log(`   Files skipped (locked): ${filesSkipped}`);
    console.log(`\n💡 Stop the dev server to delete remaining locked files\n`);
}
