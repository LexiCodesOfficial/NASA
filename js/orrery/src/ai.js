import { GoogleGenerativeAI } from "@google/generative-ai";
const api = "AIzaSyDgiM8UqYKzFLaQQRp6mYXGx-N4gvGrNCo"
const genAI = new GoogleGenerativeAI(api);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });
const prompt = "Write a story about a magic backpack.";
const result = await model.generateContent(prompt);
console.log(result.response.text());