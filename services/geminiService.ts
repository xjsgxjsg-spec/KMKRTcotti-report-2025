
import { GoogleGenAI } from "@google/genai";
import { CustomerData } from "../types";

export const analyzeSpendingHabits = async (data: CustomerData): Promise<string> => {
  try {
    // Check if API key exists
    if (!process.env.API_KEY) {
      return "Gemini API Key is missing. Please configure it to see AI insights.";
    }

    // Always use the named parameter for API key and initialize directly
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // Prepare a summarized version of the data to save tokens
    const summaryData = {
      user: data.name,
      totalOrders: data.orders.length,
      totalSpent: data.orders.reduce((sum, o) => sum + o.totalAmount, 0),
      items: data.orders.flatMap(o => o.items.map(i => `${i.name} (${i.category})`)).slice(0, 30) // Limit items
    };

    const prompt = `
      You are a fun, witty personal finance assistant for a coffee shop loyalist. 
      Analyze the following annual coffee consumption data JSON:
      ${JSON.stringify(summaryData)}

      Task:
      1. Give a 2-sentence summary of their "Coffee Personality".
      2. Provide one humorous or useful tip based on what they buy most.
      
      Keep the tone lighthearted and encouraging.
    `;

    // Use gemini-3-flash-preview as recommended for basic text tasks
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    // Access .text property directly (not a method) as per guidelines
    return response.text || "Could not generate insights at this time.";
  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    return "AI analysis is currently unavailable. Please try again later.";
  }
};
