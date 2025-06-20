import { GoogleGenAI } from "@google/genai";
import {
  questionAnswerPrompt,
  conceptExplanationPrompt,
} from "../utils/prompts.utils.js";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY is not defined in environment variables");
  throw new Error("GEMINI_API_KEY is required");
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Description = Generate interview questions and answers using GeminiAI
// Route       = POST /api/ai/generate/questions
// Access      = Private
export const generatedInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role) {
      return res.status(400).json({ message: "Role is required." });
    }
    if (!experience) {
      return res
        .status(400)
        .json({ message: "Years of experience is required." });
    }
    if (!topicsToFocus) {
      return res
        .status(400)
        .json({ message: "At least one topic is required." });
    }
    if (!numberOfQuestions) {
      return res
        .status(400)
        .json({ message: "Number of questions is required." });
    }

    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });

    const rawText = response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Clean JSON(Remove
    const cleanedText = rawText
      .replace(/```json/g, "") // Clean starting
      .replace(/```/g, "") // Clean ending
      .trim(); // Remove extra spaces

    let data;
    try {
      data = JSON.parse(cleanedText);
    } catch (parseError) {
      return res.status(500).json({
        message: "Failed to parse AI response as JSON.",
        error: parseError.message,
        raw: cleanedText,
      });
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Description = Generate explains an interview question using GeminiAI
// Route       = POST /api/ai/generate/explanations
// Access      = Private
export const generatedConceptExplanations = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Question is required." });
    }

    const prompt = conceptExplanationPrompt(question);

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });

    const rawText = response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Clean JSON(Remove
    const cleanedText = rawText
      .replace(/```json/g, "") // Clean starting
      .replace(/```/g, "") // Clean ending
      .trim(); // Remove extra spaces

    // Parse
    const data = JSON.parse(cleanedText);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
