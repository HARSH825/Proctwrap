import express from 'express';
import createTest from '../controllers/createTest';

const router = express.Router();

router.post("/create",createTest);
