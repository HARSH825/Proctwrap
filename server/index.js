import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import violationRouter from './routes/violationRouter.js';
import testRouter from './routes/testRouter.js';
import teacherRouter from './routes/teacherRoute.js';
import studentRouter from './routes/studentRotue.js';
import attemptRouter from './routes/attemptRoute.js';
import evidenceRouter from './routes/evidenceRoute.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3001",
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use('/v1/test', testRouter);
app.use('/v1/teacher', teacherRouter);
app.use('/v1/violation', violationRouter);
app.use('/v1/student', studentRouter);
app.use('/v1/attempt', attemptRouter);
app.use('/v1/evidence',evidenceRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
