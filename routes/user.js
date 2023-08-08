import express from "express";
import passport from "passport";
import { logOut, signIn, signUp } from "../controller/home_controller.js";

const router = express.Router();

router.get("/sign-in", signIn);

router.get("/sign-up", signUp);

router.get("/log-out", logOut);

export default router;
