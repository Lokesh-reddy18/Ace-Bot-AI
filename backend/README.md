
# Ace Bot AI - Backend

Welcome to the **Ace Bot AI Backend**! This is the server-side application for Ace Bot AI, providing RESTful APIs and AI-powered services for interview preparation and learning.

## 🚀 Live API
[https://ace-bot-ai.onrender.com](https://ace-bot-ai.onrender.com)

## 📂 Project Structure
- `server.js` - Entry point for the Express server
- `controllers/` - Route controllers for handling business logic
- `models/` - Mongoose models for MongoDB
- `routes/` - API route definitions
- `middlewares/` - Custom middleware functions
- `utils/` - Utility functions and prompt templates
- `config/` - Database and environment configuration

## 🛠️ Tech Stack
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [GEMINI API](https://gemini.com/)

## 📦 Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Lokesh-reddy18/Ace-Bot-AI
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` directory and add your environment variables (e.g., MongoDB URI, Gemini API key).
4. Start the server:
   ```bash
   npm run dev
   ```

## 📝 Features
- User authentication (JWT-based)
- AI-powered interview question generation
- Session and user management
- RESTful API endpoints
- Secure and scalable architecture



## 📄 License
This project is licensed under the MIT License.
