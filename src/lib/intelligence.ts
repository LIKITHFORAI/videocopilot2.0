import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY;
const isPlaceholder = !apiKey || apiKey.includes('placeholder') || apiKey === 'sk-your-key-here';

let openai: OpenAI | null = null;
if (apiKey && !isPlaceholder) {
    openai = new OpenAI({ apiKey });
}

export async function generateSummary(transcriptText: string) {
    if (!openai) {
        return {
            summary: "This is a placeholder summary. Please provide a valid OpenAI API key to generate a real AI summary.",
            keyPoints: ["Point 1: Upload a video", "Point 2: Wait for transcription", "Point 3: See AI insights"]
        };
    }

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: `You are a video analysis assistant. Analyze the provided transcript and respond with a JSON object containing:
                    - "summary": A concise 2-3 sentence summary of the video content
                    - "keyPoints": An array of 3-5 key bullet points (as strings)
                    
                    Example response format:
                    {
                        "summary": "This video discusses...",
                        "keyPoints": ["First key point", "Second key point", "Third key point"]
                    }`
                },
                {
                    role: "user",
                    content: `Please analyze this transcript:\n\n${transcriptText.substring(0, 15000)}`
                }
            ],
            response_format: { type: "json_object" },
            temperature: 0.7
        });

        const content = JSON.parse(response.choices[0].message.content || '{}');
        return {
            summary: content.summary || "No summary generated.",
            keyPoints: content.keyPoints || []
        };
    } catch (e: any) {
        console.error("Summary generation error:", e);
        console.error("Error details:", e.message, e.response?.data);
        return {
            summary: `Error: ${e.message || 'Failed to generate summary'}`,
            keyPoints: []
        };
    }
}

export async function answerQuestion(transcriptSegments: any[], question: string, history: any[] = []) {
    if (!openai) {
        return {
            answer: "### ⚠️ No API Key Detected\nI'm currently in **offline mode**. To enable full chat capabilities with grounded timestamps and AI analysis, please provide a valid `OPENAI_API_KEY` in your `.env.local` file.",
            citations: []
        };
    }

    // Prepare context with timestamps
    const context = transcriptSegments
        .map(s => `[${s.start.toFixed(2)}] ${s.text}`)
        .join('\n');

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o", // Use gpt-4o for better reasoning and following complex instructions
            messages: [
                {
                    role: "system",
                    content: `You are the "Video Copilot" — a specialized AI assistant for training videos and screen walkthroughs.
                    Your goal is to be a "navigational tether" between the user and the video content.

                    ### GUIDELINES:
                    1. **Grounded Evidence**: NEVER answer without citing timestamps.
                    2. **Dual-Evidence Reasoning**: Distinguish between "What they said" (Audio) and "What they did/showed" (Visual).
                    3. **Rich Formatting**: Use clear headers, bold text, and lists.
                    4. **Proactive Closure**: End your responses with 1-2 helpful "Next Step" suggestions (e.g., "Would you like me to generate an SOP for this?").
                    5. **Timestamp Format**: Always use [MM:SS] format for visual clarity in text, even if you are provided raw seconds.

                    ### RESPONSE STRUCTURE (When applicable):
                    - **Fast Answer**: Concise direct answer.
                    - **Jump to Moments**: A list of specific timestamps with short labels of what happens.
                    - **What they said (Voice)**: Quotes from the audio with timestamps.
                    - **What they did (Visual)**: Description of the on-screen action.
                    - **SOP/Steps**: Bulleted steps if a workflow is described.

                    ### CONTEXT (Transcript segments with [seconds]):
                    ${context.substring(0, 25000)}`
                },
                ...history.slice(-10), // More history for better context
                {
                    role: "user",
                    content: question
                }
            ],
            temperature: 0.2 // Lower temp for more grounded facts
        });

        const answer = response.choices[0].message.content || "";

        // Extract citations from the text. 
        // We look for [MM:SS] OR [SS.SS] OR [SS] formats
        const timestampRegex = /\[(\d{1,2}:)?\d{1,2}(?::\d{1,2})?(\.\d+)?\]/g;
        const citations = [];
        let match;

        while ((match = timestampRegex.exec(answer)) !== null) {
            const raw = match[0].replace(/[\[\]]/g, '');
            let seconds = 0;

            if (raw.includes(':')) {
                const parts = raw.split(':');
                if (parts.length === 3) {
                    seconds = parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseFloat(parts[2]);
                } else {
                    seconds = parseInt(parts[0]) * 60 + parseFloat(parts[1]);
                }
            } else {
                seconds = parseFloat(raw);
            }

            citations.push({
                start: seconds,
                end: seconds + 2, // Highlight small window
                label: match[0]
            });
        }

        // De-duplicate citations by start time
        const uniqueCitations = Array.from(new Map(citations.map(c => [c.start, c])).values());

        return { answer, citations: uniqueCitations };
    } catch (e) {
        console.error("Chat error:", e);
        return { answer: "Error processing your request.", citations: [] };
    }
}
