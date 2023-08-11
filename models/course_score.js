import mongoose from "mongoose";

const courseScoreSchema = new mongoose.Schema({
  dsa: {
    type: Number,
    required: true,
  },
  webdesign: {
    type: Number,
    required: true,
  },
  react: {
    type: Number,
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student_details",
  },
});

const courseScore = mongoose.model("courseScore", courseScoreSchema);
export default courseScore;
