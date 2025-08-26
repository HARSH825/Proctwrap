import express from "express";
import { createStudent, getStudent } from "../controllers/studentController.js";

const router = express.Router();

router.post("/", createStudent);

router.get("/:uid", getStudent);

export default router;
