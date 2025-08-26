import express from 'express';
import violation from '../controllers/violation';

const app = express.Router();

app.patch('/attempts/:id/violation',violation);