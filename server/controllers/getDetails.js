import prisma from "../config/prisma.js";

export const getTeacherTests = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const tests = await prisma.test.findMany({
      where: { teacherId },
      include: {
        attempts: true,
      },
    });

    res.json(tests);
  } catch (error) {
    console.error("Error fetching tests:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};


export const getTestAttempts = async (req, res) => {
  try {
    const { testId } = req.params;

    const attempts = await prisma.attempt.findMany({
      where: { testId },
      include: {
        student: true,
      },
    });

    res.json(attempts);
  } catch (error) {
    console.error("Error fetching attempts:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};


export const getAttemptDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const attempt = await prisma.attempt.findUnique({
      where: { id },
      include: {
        student: true,
        test: true,
        // phase-2 (eveidence details )
      },
    });

    if (!attempt) {
      return res.status(404).json({ error: "Attempt not found" });
    }

    res.json(attempt);
  } catch (error) {
    console.error("Error fetching attempt details:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
