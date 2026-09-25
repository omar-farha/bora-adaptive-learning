import { GoogleGenAI } from "@google/genai";

const MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";

export class AIServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AIServiceError";
  }
}

let client: GoogleGenAI | null = null;

function getClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new AIServiceError("MISSING_API_KEY");
  }
  if (!client) {
    client = new GoogleGenAI({ apiKey });
  }
  return client;
}

function isTransientOverload(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return message.includes("503") || message.includes("UNAVAILABLE");
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface StructuredCallOptions {
  prompt: string;
  responseSchema: object;
  temperature?: number;
}

export async function callStructured(options: StructuredCallOptions): Promise<unknown> {
  const ai = getClient();
  const config = {
    responseMimeType: "application/json" as const,
    responseSchema: options.responseSchema,
    temperature: options.temperature ?? 0.4,
  };

  let response;
  try {
    response = await ai.models.generateContent({
      model: MODEL,
      contents: options.prompt,
      config,
    });
  } catch (error) {
    if (isTransientOverload(error)) {
      await delay(1200);
      response = await ai.models.generateContent({
        model: MODEL,
        contents: options.prompt,
        config,
      });
    } else {
      throw error;
    }
  }

  const text = response.text;
  if (!text) {
    throw new AIServiceError("EMPTY_RESPONSE");
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new AIServiceError("INVALID_JSON");
  }
}
