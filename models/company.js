import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    interviewDate: {
      type: Date,
      required: true,
    },
    placementStatus: {
      type: String,
      required: true,
      enum: ["placed", "not placed", "in process"],
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student_details",
    },
  },
  {
    timestamps: true,
  }
);

const company = mongoose.model("companyInterviews", companySchema);
export default company;
