import type { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenAI } from "@google/genai";
import { GoogleGenerativeAI } from '@google/generative-ai';

type GeminiRequest = {
    prompt: string;
    images: Array<{
        inlineData: {
            data: string;
            mimeType: string;
        }
    }>;
};

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb'
        },
        responseLimit: false,
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '10mb',
        }
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { prompt, images } = req.body as GeminiRequest;

    if (!prompt || !images) {
        return res.status(400).json({ error: 'Prompt and images are required' });
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const result = await model.generateContent({
            contents: [
                {
                    role: "user",
                    parts: [
                        { text: prompt },
                        ...images
                    ]
                }
            ],
        });

        const response = await result.response;
        return res.status(200).json(response);
    } catch (err) {
        console.error('Gemini API error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
