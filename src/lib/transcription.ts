import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';
import { promisify } from 'util';

// Initialize Azure OpenAI for Whisper transcription
const azureWhisperEndpoint = process.env.AZURE_OPENAI_WHISPER_ENDPOINT;
const azureWhisperApiKey = process.env.AZURE_OPENAI_WHISPER_API_KEY;
const azureWhisperApiVersion = process.env.AZURE_OPENAI_WHISPER_API_VERSION || '2024-06-01';
const whisperDeployment = process.env.AZURE_WHISPER_DEPLOYMENT || 'whisper-for-video-copilot';

const isPlaceholder = !azureWhisperApiKey || azureWhisperApiKey.includes('placeholder');

let openai: OpenAI | null = null;
if (azureWhisperEndpoint && azureWhisperApiKey && !isPlaceholder) {
    openai = new OpenAI({
        apiKey: azureWhisperApiKey,
        baseURL: `${azureWhisperEndpoint}/openai/deployments/${whisperDeployment}`,
        defaultQuery: { 'api-version': azureWhisperApiVersion },
        defaultHeaders: { 'api-key': azureWhisperApiKey },
    });
    console.log(`✅ Azure OpenAI Whisper initialized: ${azureWhisperEndpoint}`);
} else {
    console.warn("Azure Whisper credentials not found or invalid. Using dummy transcription.");
}

export const getAudioDurationInSeconds = async (filePath: string): Promise<number> => {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(filePath, (err, metadata) => {
            if (err) return reject(err);
            resolve(metadata.format.duration || 0);
        });
    });
};

export const extractAudio = async (inputPath: string, outputPath: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .noVideo()
            .audioCodec('libmp3lame')
            .audioBitrate('128k') // Standard bitrate
            .save(outputPath)
            .on('end', () => resolve())
            .on('error', (err) => reject(err));
    });
};

/**
 * Re-encode video to 360p with optimized compression
 * Reduces file size by 85-95% while maintaining acceptable quality
 * Perfect for training videos where visual context matters more than quality
 */
export const reencodeToLowQuality = async (inputPath: string, outputPath: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .videoCodec('libx264')
            .size('640x360') // 360p resolution (16:9 aspect ratio)
            .videoBitrate('400k') // Low bitrate for small file size
            .fps(24) // Reduce from 30fps to 24fps
            .outputOptions([
                '-crf 28', // Constant Rate Factor (18-28 range, higher = smaller file)
                '-preset fast', // Encoding speed vs compression efficiency
                '-profile:v baseline', // Compatible with all devices
                '-movflags +faststart', // Enable streaming/progressive download
            ])
            .audioCodec('aac')
            .audioBitrate('64k') // Low audio bitrate
            .audioChannels(1) // Mono audio
            .save(outputPath)
            .on('progress', (progress) => {
                if (progress.percent) {
                    console.log(`Re-encoding progress: ${Math.round(progress.percent)}%`);
                }
            })
            .on('end', () => {
                console.log('Re-encoding complete');
                resolve();
            })
            .on('error', (err) => {
                console.error('Re-encoding error:', err);
                reject(err);
            });
    });
};


// Target chunk size in bytes (20MB) to be safe under 25MB limit
const TARGET_CHUNK_SIZE = 20 * 1024 * 1024;
// Approximate bytes per second for 128k bitrate mp3: 128000 bits / 8 = 16000 bytes/sec
const BYTES_PER_SEC = 16000;
const SECONDS_PER_CHUNK = Math.floor(TARGET_CHUNK_SIZE / BYTES_PER_SEC); // ~1300 seconds (~21 mins)

export const splitAudio = async (inputPath: string, outputDir: string): Promise<string[]> => {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // FFmpeg segment muxer is efficient for splitting
    const outputPattern = path.join(outputDir, 'chunk_%03d.mp3');

    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .outputOptions([
                `-f segment`,
                `-segment_time ${SECONDS_PER_CHUNK}`,
                `-c copy` // fast split without re-encoding
            ])
            .output(outputPattern)
            .on('end', () => {
                // Read directory to get generated files
                const files = fs.readdirSync(outputDir)
                    .filter(f => f.startsWith('chunk_') && f.endsWith('.mp3'))
                    .sort()
                    .map(f => path.join(outputDir, f));
                resolve(files);
            })
            .on('error', (err) => reject(err))
            .run();
    });
};

export async function transcribeChunk(filePath: string, offsetSeconds: number = 0) {
    if (!openai) {
        // Dummy Transcript if no key
        // Wait a bit to simulate work
        await new Promise(r => setTimeout(r, 1000));
        return {
            text: "This is a dummy transcript because no OpenAI API key was provided.",
            segments: [
                { id: 0, start: offsetSeconds + 1, end: offsetSeconds + 5, text: "This is the first dummy segment." },
                { id: 1, start: offsetSeconds + 6, end: offsetSeconds + 10, text: "Here is another segment of speech." },
                { id: 2, start: offsetSeconds + 11, end: offsetSeconds + 15, text: "And a final point made here." }
            ]
        };
    }

    const fileStream = fs.createReadStream(filePath);

    try {
        const response = await openai.audio.transcriptions.create({
            file: fileStream,
            model: whisperDeployment, // Azure deployment name
            response_format: 'verbose_json',
            timestamp_granularities: ['segment'], // get segment level timestamps
        });

        // Adjust timestamps with offset
        const text = response.text;
        const segments = response.segments?.map(seg => ({
            ...seg,
            start: seg.start + offsetSeconds,
            end: seg.end + offsetSeconds,
        })) || [];

        return { text, segments };
    } catch (e: any) {
        console.error("OpenAI API Error:", e);
        // Fallback if 401 or similar
        if (e?.status === 401 || e?.code === 'invalid_api_key') {
            console.warn("Invalid API Key detected during call. Falling back to dummy.");
            // Return dummy data
            return {
                text: "[Fallback] Start of video content...",
                segments: [
                    { id: 0, start: offsetSeconds + 0.5, end: offsetSeconds + 4, text: "[Fallback Transcript] The API key was invalid." },
                    { id: 1, start: offsetSeconds + 5, end: offsetSeconds + 9, text: "Using local dummy generation instead." }
                ]
            };
        }
        throw e;
    }
}
