import express from "express";
import {
  createSession,
  getSessionById,
  getMySessions,
  deleteSession,
} from "../controllers/sessionController.controller.js";
import { protect } from "../middlewares/authMiddleware.middleware.js";

const router = express.Router();

// Session Routes
router.post("/create", protect, createSession);
router.get("/my/sessions", protect, getMySessions);
router.get("/:id", protect, getSessionById);
router.delete("/delete/:id", protect, deleteSession);

export default router;
