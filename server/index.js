import express from "express";
import dotenv from "dotenv";
import violationRouter from './routes/violationRouter.js';
import testRouter from './routes/testRouter.js';
import teacherRouter from './routes/teacherRoute.js';

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running ");
});

app.use('v1/test',testRouter);
app.use('v1/teacher',teacherRouter);
app.use('/v1/violation',violationRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
