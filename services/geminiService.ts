import { GoogleGenAI, Type } from "@google/genai";
import { WishResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateChristmasBlessing = async (wish: string): Promise<WishResponse> => {
  try {
    const model = "gemini-2.5-flash";
    const prompt = `
      You are the Spirit of the Arix Signature Christmas Tree. The user has made a wish: "${wish}".
      
      Generate a short, poetic, luxurious, and mystical blessing based on this wish. 
      Also, suggest a hex color code that represents the mood of this blessing (e.g., warm gold, deep red, icy blue).
      
      Keep the blessing under 25 words.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            blessing: { type: Type.STRING },
            colorTheme: { type: Type.STRING, description: "Hex color code, e.g., #FFD700" }
          },
          required: ["blessing", "colorTheme"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as WishResponse;
    }
    
    throw new Error("No response text");
  } catch (error) {
    console.error("Gemini Error:", error);
    // Fallback
    return {
      blessing: "May gold and emerald light guide your path to prosperity this season.",
      colorTheme: "#FFD700"
    };
  }
};