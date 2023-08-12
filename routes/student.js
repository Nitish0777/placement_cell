import express from "express";
import passport from "passport";
import {
  companyDetail,
  companyUpdate,
  createCompanyData,
  createStudentData,
  createStudentScore,
  destroyStudent,
  getStudentDetail,
  getStudentList,
} from "../controller/student_controller.js";
import company from "../models/company.js";

const router = express.Router();

router.get("/students_lists", getStudentList);
router.get("/student-detail/:id", getStudentDetail);
router.get("/destroy-student/:id", destroyStudent);
router.get("/student-company/:id", companyDetail);

router.post("/create-student-data", createStudentData);
router.post("/create-student-score", createStudentScore);
router.post("/student-company-update", companyUpdate);
router.post("/create-company-data", createCompanyData);

export default router;
