import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    session: { type: mongoose.Schema.Types.ObjectId, ref: "Session" },
    question: String,
    answer: String,
    note: String,
    isPinned: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Questions", QuestionSchema);
