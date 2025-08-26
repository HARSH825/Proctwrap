import express from 'express';
import violation from '../controllers/violation.js';

const router = express.Router();

router.patch('/attempts/:id/violation', violation);

export default router;
