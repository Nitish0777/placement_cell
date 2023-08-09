import express from "express";
import passport from "passport";
import {
  logOut,
  signIn,
  signUp,
  studentPage,
} from "../controller/home_controller.js";
import { create, createSession } from "../controller/user_controller.js";

const router = express.Router();

router.get("/sign-in", signIn);

router.get("/sign-up", signUp);

router.get("/student-page", studentPage);

router.post("/create", create);

router.post(
  "/create-session",
  passport.authenticate(
    "local",
    { failureRedirect: "/user/sign-in" },
    createSession
  )
);

router.get("/log-out", logOut);

export default router;
