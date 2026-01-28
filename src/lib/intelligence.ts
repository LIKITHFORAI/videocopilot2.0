import OpenAI from 'openai';

// Initialize Azure OpenAI for Chat/Summaries
const azureChatEndpoint = process.env.AZURE_OPENAI_CHAT_ENDPOINT;
const azureChatApiKey = process.env.AZURE_OPENAI_CHAT_API_KEY;
const azureChatApiVersion = process.env.AZURE_OPENAI_CHAT_API_VERSION || '2025-01-01-preview';
const chatDeployment = process.env.AZURE_CHAT_DEPLOYMENT || 'drcloudehr-video-copilot';

const isPlaceholder = !azureChatApiKey || azureChatApiKey.includes('placeholder');

let openai: OpenAI | null = null;
if (azureChatEndpoint && azureChatApiKey && !isPlaceholder) {
    openai = new OpenAI({
        apiKey: azureChatApiKey,
        baseURL: `${azureChatEndpoint}/openai/deployments/${chatDeployment}`,
        defaultQuery: { 'api-version': azureChatApiVersion },
        defaultHeaders: { 'api-key': azureChatApiKey },
    });
    console.log(`✅ Azure OpenAI Chat initialized: ${azureChatEndpoint}`);
} else {
    console.warn("Azure Chat credentials not found or invalid. Using placeholder responses.");
}

export async function generateSummary(segments: any[], filename?: string) {
    if (!openai) {
        return {
            summary: "This is a placeholder summary. Please provide a valid OpenAI API key to generate a real AI summary.",
            keyPoints: [
                { text: "Point 1: Upload a video", timestamp: 0 },
                { text: "Point 2: Wait for transcription", timestamp: 10 },
                { text: "Point 3: See AI insights", timestamp: 20 }
            ]
        };
    }

    // Limit context to prevent token overflow, but prioritize evenly distributed segments or just header
    // For now, just taking the first 30k chars of formatted text
    const context = segments
        .map(s => `[${Math.floor(s.start)}s] ${s.text}`)
        .join('\n')
        .substring(0, 30000);

    try {
        const response = await openai.chat.completions.create({
            model: chatDeployment, // Azure deployment name (using same for both chat and summaries)
            messages: [
                {
                    role: "system",
                    content: `You are a video analysis assistant. Analyze the provided transcript (with timestamps) and respond with a JSON object.
                    
                    TASK 1: Generate a Title
                    - You will be provided with a "Filename".
                    - IF the filename is clear and descriptive (e.g., "Patient_Billing_Workflow_Review.mp4" or "Q3 Sales Kickoff"), USE IT as the base for the title. Clean it up (replace underscores with spaces, capitalize).
                    - IF the filename is cryptic or generic (e.g., "video1234.mp4", "zoom_recording_001", "meeting-28491"), IGNORE IT and generate a title based on the transcript content.
                    - CRITICAL: The final title MUST end with the word "Recap".
                    - The title should be concise (3-8 words).

                    TASK 2: Generate Summary & Key Points
                    - "summary": A concise 2-3 sentence summary of the video content.
                    - "keyPoints": An array of 3-5 key highlights. Each highlight must be an object with:
                        - "text": The highlight description (string).
                        - "timestamp": The start time in seconds (number) closest to where this point is discussed in the transcript.
                    
                    Example response format:
                    {
                        "title": "Patient Billing Workflow Recap",
                        "summary": "This video discusses...",
                        "keyPoints": [
                            { "text": "Introduction to the topic", "timestamp": 0 },
                            { "text": "Deep dive into feature X", "timestamp": 120 }
                        ]
                    }`
                },
                {
                    role: "user",
                    content: `Filename: ${filename || 'Unknown'}\n\nPlease analyze this transcript:\n\n${context}`
                }
            ],
            response_format: { type: "json_object" },
            temperature: 0.5
        });

        const content = JSON.parse(response.choices[0].message.content || '{}');
        // Ensure structure is correct
        const keyPoints = Array.isArray(content.keyPoints)
            ? content.keyPoints.map((kp: any) => ({
                text: typeof kp === 'string' ? kp : kp.text,
                timestamp: typeof kp === 'string' ? 0 : (kp.timestamp || 0)
            }))
            : [];

        return {
            title: content.title || "Video Recap",
            summary: content.summary || "No summary generated.",
            keyPoints
        };
    } catch (e: any) {
        console.error("Summary generation error:", e);
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
            model: chatDeployment, // Azure deployment name
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

export async function extractActionItems(segments: any[], meetingDate?: string) {
    if (!openai) {
        return [];
    }

    // Prepare context with timestamps
    const context = segments
        .map(s => `[${Math.floor(s.start)}s] ${s.text}`)
        .join('\n')
        .substring(0, 30000);

    try {
        const response = await openai.chat.completions.create({
            model: chatDeployment,
            messages: [
                {
                    role: "system",
                    content: `Role: You are a specialized Project Management Assistant for an EHR (Electronic Health Record) Implementation firm. Your goal is to convert messy meeting transcripts into clean, structured action items.

Primary Categories (Use these if applicable):

If the task falls under these themes, you MUST use these exact prefixes:

- Client Portal -
- Reports -
- Requirements -
- Appointment Types -
- Service Codes -
- Payers -
- Users & Roles -
- DrFirst/EPCS -
- Interface -
- Data Migration -

AI Categorization Rule:

If a task does not fit the list above, analyze the context and generate a concise 1-2 word heading followed by a hyphen (e.g., Workflow -, Hardware -, Security -).

Data Extraction Rules:

- Action Item: Combine the [Heading] - [Professional Task Description].
- Responsible Party: Identify the specific person. If no name is mentioned, assign to "DoctorCloud Technical Team" (for technical tasks) or "HHS Program Team" (for clinical/staff tasks).
- Due Date: Use YYYY-MM-DD format if a date is mentioned. If a timeframe is mentioned (e.g., "by Friday"), calculate the date based on the meeting date${meetingDate ? ` (${meetingDate})` : ''}. Otherwise, use "N/A".
- Note: Capture mentions of "NextGen," "DoctorCloud," or specific technical blockers.
- Timestamp: The time in seconds where this action item was discussed in the transcript.

Output Requirement: Return a JSON object with an "action_items" array. Each item must have:
{
  "action_items": [
    {
      "action_item": "Heading - Detailed professional task description",
      "responsible_party": "Name or Team",
      "due_date": "YYYY-MM-DD or N/A",
      "notes": "Technical context or specific instructions",
      "timestamp": 0
    }
  ]
}`
                },
                {
                    role: "user",
                    content: `Analyze the following transcript and extract action items:\n\n${context}`
                }
            ],
            response_format: { type: "json_object" },
            temperature: 0.3
        });

        const content = JSON.parse(response.choices[0].message.content || '{"action_items":[]}');
        const actionItems = Array.isArray(content.action_items) ? content.action_items : [];

        // Add unique IDs and extract category
        return actionItems.map((item: any, index: number) => {
            const actionText = item.action_item || '';
            const categoryMatch = actionText.match(/^([^-]+)-/);
            const category = categoryMatch ? categoryMatch[1].trim() : 'General';

            return {
                id: `action-${Date.now()}-${index}`,
                category,
                action_item: actionText,
                responsible_party: item.responsible_party || 'Unassigned',
                due_date: item.due_date || 'N/A',
                notes: item.notes || '',
                timestamp: item.timestamp || 0
            };
        });
    } catch (e: any) {
        console.error("Action items extraction error:", e);
        return [];
    }
}
