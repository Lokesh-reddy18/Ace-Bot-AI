import express from "express";
import {
  togglePinQuestion,
  updateQuestionNote,
  addQuestionsToSession,
} from "../controllers/questionController.controller.js";
import { protect } from "../middlewares/authMiddleware.middleware.js";

const router = express.Router();

// Question Routes
router.post("/add", protect, addQuestionsToSession);
router.post("/:id/pin", protect, togglePinQuestion);
router.post("/:id/note", protect, updateQuestionNote);

export default router;
