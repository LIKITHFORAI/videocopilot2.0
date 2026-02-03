import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { indexVideoChunks } from '../src/lib/indexChunks';

/**
 * Batch index all existing transcripts into SQLite FTS5
 */
async function batchIndexAllVideos() {
    const transcriptsDir = join(process.cwd(), 'data', 'transcripts');
    const files = await readdir(transcriptsDir);

    console.log(`\n🔍 Found ${files.length} files in transcripts directory`);

    const jsonFiles = files.filter(f => f.endsWith('.json'));
    console.log(`📄 Processing ${jsonFiles.length} transcript files\n`);

    let indexed = 0;
    let failed = 0;
    let skipped = 0;

    for (const file of jsonFiles) {
        const mediaId = file.replace('.json', '');

        try {
            const transcriptPath = join(transcriptsDir, file);
            const content = await readFile(transcriptPath, 'utf-8');
            const transcript = JSON.parse(content);

            // Skip if no segments
            if (!transcript.segments || transcript.segments.length === 0) {
                console.log(`⏭️  Skipping ${file} (no segments)`);
                skipped++;
                continue;
            }

            console.log(`📹 Indexing: ${transcript.title || file}`);

            const result = await indexVideoChunks(
                mediaId,
                'mountmontgomery', // Default client
                transcript,
                transcript.title || file
            );

            console.log(`   ✅ Indexed ${result.chunksIndexed} chunks (${indexed + 1}/${jsonFiles.length})\n`);
            indexed++;

        } catch (error) {
            console.error(`   ❌ Failed to index ${file}:`, error instanceof Error ? error.message : error);
            failed++;
        }
    }

    console.log(`\n${'='.repeat(60)}`);
    console.log(`Batch indexing complete!`);
    console.log(`  ✅ Successfully indexed: ${indexed}`);
    console.log(`  ❌ Failed: ${failed}`);
    console.log(`  ⏭️  Skipped: ${skipped}`);
    console.log(`${'='.repeat(60)}\n`);
}

// Run the batch indexer
batchIndexAllVideos()
    .then(() => {
        console.log('✨ All done!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('💥 Batch indexing failed:', error);
        process.exit(1);
    });
