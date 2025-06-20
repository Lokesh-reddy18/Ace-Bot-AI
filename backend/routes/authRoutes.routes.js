import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/authController.controller.js";
import { protect } from "../middlewares/authMiddleware.middleware.js";
import upload from "../middlewares/uploadMiddleware.middleware.js";

const router = express.Router();

// Auth Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);

// Image upload route
router.post("/upload/image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded" });
  }

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.status(200).json({ imageUrl });
});

export default router;
