import express from 'express';
import getTest from '../controllers/getTest';

const router = express.Router();

router.get('/test/:slug',getTest);