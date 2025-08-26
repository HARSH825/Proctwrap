import express from "express";
import dotenv from "dotenv";
import prisma from "./config/prisma.js"; // use the client

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running ");
});

app.use('v1//test',testRouter);
app.use('v1/tests',testsRouter);

app.post("/test", async (req, res) => {
  const { title, formUrl, protectedUrl } = req.body;
  try {
    const test = await prisma.test.create({
      data: { title, formUrl, protectedUrl },
    });
    res.json(test);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/tests", async (req, res) => {
  try {
    const tests = await prisma.test.findMany();
    res.json(tests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
