import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    contact: {
      type: String,
      required: true,
    },
    batch: {
      type: String,
      required: true,
    },
    courseid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course_score",
    },
    companyId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "companyInterviews",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const student = mongoose.model("student_details", studentSchema);

export default student;
