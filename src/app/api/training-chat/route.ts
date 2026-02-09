import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getTrainingPrompt } from '@/lib/training_prompts';

// Initialize Azure OpenAI
const azureChatEndpoint = process.env.AZURE_OPENAI_CHAT_ENDPOINT;
const azureChatApiKey = process.env.AZURE_OPENAI_CHAT_API_KEY;
const azureChatApiVersion = process.env.AZURE_OPENAI_CHAT_API_VERSION || '2025-01-01-preview';
const chatDeployment = process.env.AZURE_CHAT_DEPLOYMENT || 'drcloudehr-video-copilot';

const isPlaceholder = !azureChatApiKey || azureChatApiKey.includes('placeholder');

let openai: OpenAI | null = null;
if (!isPlaceholder && azureChatEndpoint && azureChatApiKey) {
    openai = new OpenAI({
        apiKey: azureChatApiKey,
        baseURL: `${azureChatEndpoint}/openai/deployments/${chatDeployment}`,
        defaultQuery: { 'api-version': azureChatApiVersion },
        defaultHeaders: { 'api-key': azureChatApiKey },
    });
}

export async function POST(req: NextRequest) {
    try {
        const { question, activeTab, transcriptSegments } = await req.json();

        if (!question || !activeTab) {
            return NextResponse.json({ error: 'Missing question or activeTab' }, { status: 400 });
        }

        if (!transcriptSegments || !Array.isArray(transcriptSegments)) {
            return NextResponse.json({ error: 'Missing or invalid transcriptSegments' }, { status: 400 });
        }

        if (!openai) {
            return NextResponse.json({
                answer: "### ⚠️ No API Key Detected\nI'm currently in **offline mode**. To enable Training mode analysis, please provide a valid Azure OpenAI API key in your `.env.local` file.",
                suggested_questions: []
            });
        }

        // Prepare context from provided transcript segments
        const context = transcriptSegments
            .map((s: any) => `[${s.start.toFixed(2)}] ${s.text}`)
            .join('\n');

        // Get training-specific system prompt
        const systemPrompt = getTrainingPrompt(activeTab, context);

        if (!systemPrompt) {
            return NextResponse.json({
                error: `Invalid activeTab: ${activeTab}. Valid tabs: chat, scribe, voiceover`
            }, { status: 400 });
        }

        // Call Azure OpenAI
        const response = await openai.chat.completions.create({
            model: chatDeployment,
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: question
                }
            ],
            response_format: { type: "json_object" },
            temperature: 0.3,
        }, { timeout: 60000 }); // 60 second timeout for training analysis

        const content = JSON.parse(response.choices[0].message.content || '{}');

        return NextResponse.json({
            answer: JSON.stringify(content, null, 2), // Pretty-print JSON response
            trainingData: content, // Return structured data for UI rendering
            suggested_questions: [] // Training mode doesn't need suggested questions
        });

    } catch (error: any) {
        console.error('Training chat error:', error);
        return NextResponse.json({
            error: 'Failed to process training request',
            details: error.message
        }, { status: 500 });
    }
}
