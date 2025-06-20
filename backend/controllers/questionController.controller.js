import Session from "../models/session.model.js";
import Questions from "../models/questions.model.js";

// Description = Add questions to the session
// Route       = POST api/questions/add
// Access      = Private
const addQuestionsToSession = async (req, res) => {
  try {
    const { sessionId, questions } = req.body;

    if (!sessionId) {
      return res.status(400).json("Session is required.");
    }
    if (!questions || !Array.isArray(questions)) {
      return res.status(400).json("Questions are required.");
    }

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(400).json("Session not found.");
    }

    // Create new questions
    const createQuestions = await Questions.insertMany(
      questions.map((q) => ({
        session: sessionId,
        question: q.question,
        answer: q.answer,
      }))
    );

    // Update session to include new question IDs
    session.questions.push(...createQuestions.map((q) => q._id));
    await session.save();
    res.status(200).json(createQuestions);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Description = Pin/ Unpin question
// Route       = POST api/questions/:id/pin
// Access      = Private
const togglePinQuestion = async (req, res) => {
  try {
    const question = await Questions.findById(req.params.id);

    if (!question) {
      return res
        .status(400)
        .json({ success: false, message: "Question not found." });
    }

    question.isPinned = !question.isPinned;
    await question.save();
    res.status(200).json({ success: true, question });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Description = Add notes to question
// Route       = POST api/questions/:id/note
// Access      = Private
const updateQuestionNote = async (req, res) => {
  try {
    const { note } = req.body;
    const question = await Questions.findById(req.params.id);

    if (!question) {
      return res
        .status(400)
        .json({ success: false, message: "Question not found" });
    }

    (question.note = note || ""), await question.save();
    res.status(200).json({ success: true, question });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export { addQuestionsToSession, togglePinQuestion, updateQuestionNote };
