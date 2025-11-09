
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const getBusinessInsights = async (dataSummary: string): Promise<string> => {
    // FIX: Per @google/genai coding guidelines, API key should be sourced directly from process.env.API_KEY.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const prompt = `
        You are an expert business analyst for a food delivery company called FoodHub.
        Based on the following data summary, provide three actionable business insights.
        Each insight should be a short paragraph.
        Format the response as plain text, with each insight clearly numbered.

        Data Summary:
        ---
        ${dataSummary}
        ---
    `;

    try {
        // FIX: Per @google/genai coding guidelines, explicitly type the response from generateContent.
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Could not get insights from Gemini API.");
    }
};

export { getBusinessInsights };
