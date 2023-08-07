import express from "express";
import { home } from "../controller/home_controller.js";
const router = express.Router();

router.get("/", home);

export default router;
