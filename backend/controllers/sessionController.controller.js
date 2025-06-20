import Session from "../models/session.model.js";
import Questions from "../models/questions.model.js";

// Description = Create a new session and linked questions
// Route       = POST /api/session/create
// Access      = Private
const createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, questions } =
      req.body;
    const userId = req.user._id; // Asssuming you have a middleware setting req.user

    const session = await Session.create({
      user: userId,
      role,
      experience,
      topicsToFocus,
      description,
    });

    const questionDocuments = await Promise.all(
      questions.map(async (q) => {
        const question = await Questions.create({
          session: session._id,
          question: q.question,
          answer: q.answer,
        });
        return question._id;
      })
    );
    session.questions = questionDocuments;

    await session.save();
    res.status(200).json({ success: true, session });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Description = Get all sessions for logged-in user
// Route       = GET /api/sessions/my/sessions
// Access      = Private
const getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate("questions");
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Description = Get a session by session id with populated questions
// Route       = GET /api/session/:id
// Access      = Private
const getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate({
        path: "questions",
        options: { sort: { isPinned: -1, createdAt: 1 } },
      })
      .exec();

    if (!session) {
      return res
        .status(400)
        .json({ success: false, message: "Session not found" });
    }
    res.status(200).json({ success: true, session });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Description = Delete an existing Session with its questions
// Route       = DELETE /api/session/delete/:id
// Access      = Private
const deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(400).json({ message: "Session not found" });
    }

    // Check if logged-in user owned this session
    if (session.user.toString() !== req.user.id) {
      return res
        .status(400)
        .json({ message: "You haven't permission to delete this session." });
    }

    // Delete all questions linked to session
    await Questions.deleteMany({ session: session._id });

    // Delete session
    await session.deleteOne();
    res.status(200).json({ message: "Session deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export { createSession, getMySessions, getSessionById, deleteSession };
