import { GoogleGenerativeAI } from "@google/generative-ai";

export interface ChatMessage {
  role: "user" | "model";
  content: string;
}

export const generateGeminiResponse = async (
  apiKey: string,
  messages: ChatMessage[],
  prompt: string,
) => {
  if (!apiKey) {
    throw new Error("API key is required");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  // Format history for Gemini API
  const history = messages.map((msg) => ({
    role: msg.role,
    parts: [{ text: msg.content }],
  }));

  // Create a chat session
  const chat = model.startChat({
    history,
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1000,
    },
  });

  const result = await chat.sendMessage(prompt);
  const response = await result.response;
  return response.text();
};
