import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { getTranscriptPath } from '@/lib/storage';
import { answerQuestion } from '@/lib/intelligence';
import { existsSync } from 'fs';
import { searchTranscripts } from '@/lib/indexChunks';
import { formatTime } from '@/shared/utils/formatTime';

// formatTime imported from @/shared/utils/formatTime

export async function POST(req: NextRequest) {
    try {
        const { mediaId, question, history, clientId = 'mountmontgomery', useSearch = true } = await req.json();

        if (!question) {
            return NextResponse.json({ error: 'Missing question' }, { status: 400 });
        }

        let context = '';
        let sources: any[] = [];

        // Cross-video search mode (no specific mediaId)
        if (useSearch && !mediaId) {
            const searchResults = searchTranscripts(question, clientId, 10);

            if (searchResults && searchResults.length > 0) {
                // Format context for ChatGPT
                context = searchResults
                    .map((r, i) =>
                        `[Source ${i + 1}: ${r.videoTitle} at ${formatTime(r.startTime)}]\n${r.chunkText}`
                    )
                    .join('\n\n');

                sources = searchResults.map(r => ({
                    videoId: r.videoId,
                    videoTitle: r.videoTitle,
                    timestamp: r.startTime,
                    text: r.chunkText.substring(0, 150) + '...',
                }));
            }

            // Call ChatGPT with retrieved context
            const systemPrompt = `You are an AI assistant analyzing meeting transcripts. 
Answer the question using ONLY the provided context from past meetings.
ALWAYS cite your sources using the [Source X] format shown in the context.
If the context doesn't contain relevant information, say so clearly.`;

            const userPrompt = context
                ? `Context from past meetings:\n\n${context}\n\nQuestion: ${question}`
                : `Question: ${question}\n\n(No relevant past meetings found for this question)`;

            const response = await fetch(
                `${process.env.AZURE_OPENAI_CHAT_ENDPOINT}/openai/deployments/${process.env.AZURE_CHAT_DEPLOYMENT}/chat/completions?api-version=${process.env.AZURE_OPENAI_CHAT_API_VERSION}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'api-key': process.env.AZURE_OPENAI_CHAT_API_KEY!,
                    },
                    body: JSON.stringify({
                        messages: [
                            { role: 'system', content: systemPrompt },
                            ...(history || []),
                            { role: 'user', content: userPrompt },
                        ],
                        temperature: 0.7,
                        max_tokens: 800,
                    }),
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Azure OpenAI API error:', response.status, errorText);
                return NextResponse.json({
                    error: 'Failed to get AI response',
                    details: `API returned ${response.status}`
                }, { status: 500 });
            }

            const data = await response.json();

            if (!data.choices || !data.choices[0] || !data.choices[0].message) {
                console.error('Invalid API response structure:', data);
                return NextResponse.json({
                    error: 'Invalid response from AI service'
                }, { status: 500 });
            }

            const answer = data.choices[0].message.content;

            return NextResponse.json({ answer, sources });
        }

        //Single video mode (existing logic)
        if (mediaId) {
            const transcriptPath = getTranscriptPath(mediaId);
            if (!existsSync(transcriptPath)) {
                return NextResponse.json({ error: 'Transcript not found. Process the video first.' }, { status: 404 });
            }

            const data = await readFile(transcriptPath, 'utf-8');
            const transcript = JSON.parse(data);

            const result = await answerQuestion(transcript.segments, question, history);

            return NextResponse.json(result);
        }

        return NextResponse.json({ error: 'Either mediaId or useSearch must be provided' }, { status: 400 });
    } catch (e: any) {
        console.error("Chat API error:", e);
        return NextResponse.json({ error: 'Internal Server Error', details: e.message }, { status: 500 });
    }
}
