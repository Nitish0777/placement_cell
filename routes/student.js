import express from "express";
import passport from "passport";
import {
  companyDetail,
  companyUpdate,
  createCompanyData,
  createStudentData,
  createStudentScore,
  csv,
  destroyStudent,
  getStudentDetail,
  getStudentList,
} from "../controller/student_controller.js";
import company from "../models/company.js";

const router = express.Router();

router.get("/students_lists", passport.checkAuthentication, getStudentList);
router.get(
  "/student-detail/:id",
  passport.checkAuthentication,
  getStudentDetail
);
router.get(
  "/destroy-student/:id",
  passport.checkAuthentication,
  destroyStudent
);
router.get("/student-company/:id", passport.checkAuthentication, companyDetail);

router.get("/csv", passport.checkAuthentication, csv);

router.post(
  "/create-student-data",
  passport.checkAuthentication,
  createStudentData
);
router.post(
  "/create-student-score",
  passport.checkAuthentication,
  createStudentScore
);
router.post(
  "/student-company-update",
  passport.checkAuthentication,
  companyUpdate
);
router.post(
  "/create-company-data",
  passport.checkAuthentication,
  createCompanyData
);

export default router;
