import express from 'express';
import { createTeacher, loginTeacher } from '../controllers/teacher';
const router = express.Router();

router.post("/create",createTeacher);
router.post("/login",loginTeacher);

router.get('/list/:teacherId',getTeacherTests);   //teacher id 
router.get('/listAttempts/:testId',getTestAttempts);   // test id 
router.get('/oneAttemptDetails/:attemptId',getAttemptDetails);  // attemptId 

export default router;