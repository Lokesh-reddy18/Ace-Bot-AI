import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Description = Register/ Signup User
// Route       = POST /api/auth/register
// Access      = Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, profileImageUrl } = req.body;

    // Check if user already exists with the same email address
    const existsUser = await User.findOne({ email });
    if (existsUser) {
      return res
        .status(400)
        .json({ message: "User already exists with same email address" });
    }

    // Hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImageUrl,
    });

    // Return user data with JWT
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Description = Login/ Signin User
// Route       = POST /api/auth/login
// Access      = Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // Check for valid email
    if (!user) {
      return res.status(400).json({ message: "Invalid email address." });
    }

    // Check for valid password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Return user data with JWT
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Description = Get user profile details
// Route       = GET /api/auth/profile
// Access      = Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    // Check if user is exists
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export { registerUser, loginUser, getUserProfile };
