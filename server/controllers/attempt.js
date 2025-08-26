import prisma from "../config/prisma.js";

export const startAttempt = async (req, res) => {
  try {
    const { studentId, testId } = req.body;

    if (!studentId || !testId) {
      return res.status(400).json({ error: "studentId and testId are required" });
    }

    const student = await prisma.student.findUnique({ where: { id: studentId } });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const test = await prisma.test.findUnique({ where: { id: testId } });
    if (!test) {
      return res.status(404).json({ error: "Test not found" });
    }

    const attempt = await prisma.attempt.create({
      data: {
        studentId,
        testId,
      },
    });

    res.status(201).json(attempt);
  } catch (error) {
    console.error("Error starting attempt:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const finishAttempt = async (req, res) => {
  try {
    const { attemptId } = req.body;

    if (!attemptId) {
      return res.status(400).json({ error: "attemptId is required" });
    }

    const attempt = await prisma.attempt.update({
      where: { id: attemptId },
      data: { finishedAt: new Date() },
    });

    res.json(attempt);
  } catch (error) {
    console.error("Error finishing attempt:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
