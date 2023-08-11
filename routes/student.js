import express from "express";
import passport from "passport";
import {
  createStudentData,
  getStudentList,
} from "../controller/student_controller.js";

const router = express.Router();

router.get("/students_lists", getStudentList);
router.get("/student-detail/:id");

router.post("/create-student-data", createStudentData);

export default router;
