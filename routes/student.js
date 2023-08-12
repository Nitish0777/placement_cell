import express from "express";
import passport from "passport";
import {
  createCompanyData,
  createStudentData,
  createStudentScore,
  destroyStudent,
  getStudentDetail,
  getStudentList,
} from "../controller/student_controller.js";

const router = express.Router();

router.get("/students_lists", getStudentList);
router.get("/student-detail/:id", getStudentDetail);
router.get("/destroy-student/:id", destroyStudent);

router.post("/create-student-data", createStudentData);
router.post("/create-student-score", createStudentScore);
router.post("/create-company-data", createCompanyData);

export default router;
