import { GoogleGenAI } from "@google/genai";

// const genAI = new GoogleGenAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY; // Store in .env file
const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });


export const gemini = genAI;
