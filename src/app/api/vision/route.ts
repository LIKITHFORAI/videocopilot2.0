import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
    try {
        const { image, prompt } = await req.json();

        if (!image) {
            return NextResponse.json({ error: 'Image data required' }, { status: 400 });
        }

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ error: 'GEMINI_API_KEY not configured' }, { status: 500 });
        }

        // Get the Gemini 1.5 Flash model
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        // Prepare the image data (base64)
        const imagePart = {
            inlineData: {
                data: image.replace(/^data:image\/\w+;base64,/, ''),
                mimeType: 'image/jpeg'
            }
        };

        // Default prompt for UI analysis if none provided
        const analysisPrompt = prompt || `Analyze this video frame in detail. Describe:
1. What UI elements are visible (buttons, menus, forms, etc.)
2. The layout and structure of the screen
3. Any text content visible
4. The context of what's being shown
5. Any notable actions or states (selected items, active tabs, etc.)

Be specific about locations and relationships between elements.`;

        // Generate content
        const result = await model.generateContent([analysisPrompt, imagePart]);
        const response = await result.response;
        const description = response.text();

        return NextResponse.json({
            success: true,
            description,
            model: 'gemini-1.5-flash'
        });

    } catch (error: any) {
        console.error('Gemini Vision API Error:', error);
        return NextResponse.json({
            error: 'Failed to analyze image',
            details: error.message
        }, { status: 500 });
    }
}
