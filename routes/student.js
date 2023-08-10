import express from "express";
import passport from "passport";
import { getStudentList } from "../controller/student_controller.js";

const router = express.Router();

router.get("/students_lists", getStudentList);

router.post("/create-student-data");

export default router;
