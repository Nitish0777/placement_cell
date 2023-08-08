import express from "express";
import user from "./user.js";
import { home } from "../controller/home_controller.js";
const router = express.Router();

router.get("/", home);

export default router;
