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
        _count: {
          select: {
            tabSwitchEvidence: true,
            fullscreenExitEvidence: true,
            multipleFacesEvidence: true,
            phoneDetectionEvidence: true,
          }
        }
      },
    });

    const formattedAttempts = attempts.map(attempt => ({
      ...attempt,
      totalEvidences: attempt._count.tabSwitchEvidence + 
                     attempt._count.fullscreenExitEvidence +
                     attempt._count.multipleFacesEvidence + 
                     attempt._count.phoneDetectionEvidence
    }));

    res.json(formattedAttempts);
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
        tabSwitchEvidence: true,
        fullscreenExitEvidence: true,
        multipleFacesEvidence: true,
        phoneDetectionEvidence: true,
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
