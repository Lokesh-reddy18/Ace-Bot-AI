import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.config.js";
import authRoutes from "./routes/authRoutes.routes.js";
import sessionRoutes from "./routes/sessionRoutes.routes.js";
import questionRoutes from "./routes/questionRoutes.routes.js";
import { protect } from "./middlewares/authMiddleware.middleware.js";
import {
  generatedInterviewQuestions,
  generatedConceptExplanations,
} from "./controllers/aiController.controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware to handle CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);

// AI Generated Routes
app.use("/api/ai/generate/questions", protect, generatedInterviewQuestions);
app.use("/api/ai/generate/explanations", protect, generatedConceptExplanations);

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
