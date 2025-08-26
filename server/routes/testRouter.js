import express from 'express';
import createTest from '../controllers/createTest.js';
import getTest from '../controllers/getTest.js';

const router = express.Router();

router.post("/test", createTest);
router.get('/test/:slug', getTest);

export default router;
