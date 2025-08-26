import express from "express";
import { startAttempt, finishAttempt } from "../controllers/attemptController.js";

const router = express.Router();

router.post("/start", startAttempt);

router.post("/finish", finishAttempt);

export default router;
