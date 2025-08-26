import express, { Router } from 'express';
import violation from '../controllers/violation';

const router = express.Router();

router.patch('/attempts/:id/violation',violation);

export default router;