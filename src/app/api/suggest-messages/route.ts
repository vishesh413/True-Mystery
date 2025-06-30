import { NextResponse } from 'next/server';
import { GoogleGenAI } from "@google/genai";

export const runtime = 'edge';

interface APIErrorType {
  name: string;
  status: number;
  headers: Record<string, string>;
  message: string;
}

export async function POST(req: Request) {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        temperature: 1.2,
        topK: 40,
        topP: 1,
        maxOutputTokens: 256,
      },
    });

    return NextResponse.json({ result: result.text });
  } catch (error: unknown) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'name' in error &&
      (error as APIErrorType).name === 'APIError'
    ) {
      const err = error as APIErrorType;
      return NextResponse.json(
        {
          name: err.name,
          status: err.status,
          headers: err.headers,
          message: err.message,
        },
        { status: err.status }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
