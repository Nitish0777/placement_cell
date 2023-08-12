import express from "express";
import passport from "passport";
import {
  createCompanyData,
  createStudentData,
  createStudentScore,
  getStudentList,
} from "../controller/student_controller.js";

const router = express.Router();

router.get("/students_lists", getStudentList);
router.get("/student-detail/:id");

router.post("/create-student-data", createStudentData);
router.post("/create-student-score", createStudentScore);
router.post("/create-company-data", createCompanyData);

export default router;
