import express from "express";
import { createStudent, getStudent } from "../controllers/student.js";

const router = express.Router();

router.post("/", createStudent);

router.get("/:uid", getStudent);

export default router;
