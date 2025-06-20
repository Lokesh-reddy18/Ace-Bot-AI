export const BASIC_URL = "http://localhost:3000"; // Default backend server URL

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register",   // Signup User
    LOGIN: "/api/auth/login",         // Login User
    GET_PROFILE: "/api/auth/profile", // Get logged-in User profile
  },
  IMAGE: {
    UPLOAD_IMAGE: "/api/auth/upload/image", // Upload profile picture
  },
  AI: {
    GENERATE_QUESTIONS: "/api/ai/generate/questions",       // Generate interview questions and answers from Gemini AI
    GENERATE_EXPLANATIONS: "/api/ai/generate/explanations", // Generate interview question concept explanation from Gemini AI
  },
  SESSION: {
    CREATE: "/api/sessions/create",               // Create New Session
    GET_ALL: "/api/sessions/my/sessions",         // Get all sessions for logged-in user
    GET_ONE: (id) => `/api/sessions/${id}`,       // Get a selected session details
    DELETE: (id) => `/api/sessions/delete/${id}`, // Delete a selected session
  },
  QUESTION: {
    ADD_TO_SESSION: "/api/questions/add",             // Add questions to a selected existing session
    PIN_QUESTION: (id) => `/api/questions/${id}/pin`, // Pin or Unpin selected question
    UPDATE_NOTE: (id) => `/api/questions/${id}/note`, // Update/Add a note to selected question
  },
};
