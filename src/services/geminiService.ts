import { GoogleGenAI } from "@google/genai";



const apiKey = import.meta.env.VITE_GEMI_API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export const generateWelcomeMessage = async (username: string, context: 'login' | 'register'): Promise<string> => {
  if (!apiKey) {
    return context === 'login' 
      ? `Welcome back, ${username}!` 
      : `Hello, ${username}! Ready to join?`;
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      You are a friendly UI assistant for a modern platform called "Monev".
      The user is currently on the ${context === 'login' ? 'Sign In' : 'Create Account'} screen.
      The user's input name is "${username}".
      Generate a very short, warm, and inviting 1-sentence welcome message.
      Tone: Professional, Energetic, Friendly.
      Do not include quotes.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text?.trim() ?? `Welcome to Monev, ${username}!`;
    
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `Welcome to Monev, ${username}!`;
  }
};