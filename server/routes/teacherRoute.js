import express from 'express';
import { createTeacher, loginTeacher } from '../controllers/teacher.js';
import { getTeacherTests, getTestAttempts, getAttemptDetails } from '../controllers/getDetails.js';

const router = express.Router();

router.post("/create", createTeacher);
router.post("/login", loginTeacher);
router.get('/list/:teacherId', getTeacherTests);
router.get('/listAttempts/:testId', getTestAttempts);
router.get('/oneAttemptDetails/:attemptId', getAttemptDetails);

export default router;
