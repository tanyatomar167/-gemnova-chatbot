import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getGeminiAPIResponse = async (message, mode = "Default") => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const systemPrompts = {
      "Default":        "You are a helpful assistant. Answer clearly and concisely.",
      "Deep Think":     "You are a thorough assistant. Think step by step and explain everything in detail.",
      "Code Assistant": "You are a coding expert. Always provide clean, well-commented code examples.",
      "Creative":       "You are a creative writer. Use vivid, imaginative and engaging language.",
    };

    const systemPrompt = systemPrompts[mode] || systemPrompts["Default"];
    const fullPrompt = `${systemPrompt}\n\nUser: ${message}`;

    const result = await model.generateContent(fullPrompt);
    const reply = result.response.text();
    return reply;

  } catch (err) {
    console.log(err);
    return "Something went wrong";
  }
};

export default getGeminiAPIResponse;  // ← this line must exist