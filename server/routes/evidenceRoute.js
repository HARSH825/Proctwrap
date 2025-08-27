import express from 'express';
import { getAttemptEvidences } from '../controllers/evidences.js';

const router = express.Router();

router.get('/attempt/:attemptId', getAttemptEvidences);

export default router;
