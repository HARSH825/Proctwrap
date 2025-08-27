import prisma from "../config/prisma.js";

export const getAttemptEvidences = async (req, res) => {
  try {
    const { attemptId } = req.params;

    const attempt = await prisma.attempt.findUnique({
      where: { id: attemptId },
      include: {
        student: true,
        test: true,
        tabSwitchEvidence: { orderBy: { createdAt: 'desc' } },
        fullscreenExitEvidence: { orderBy: { createdAt: 'desc' } },
        multipleFacesEvidence: { orderBy: { createdAt: 'desc' } },
        phoneDetectionEvidence: { orderBy: { createdAt: 'desc' } },
      },
    });

    if (!attempt) {
      return res.status(404).json({ error: "Attempt not found" });
    }

    const allEvidences = [
      ...attempt.tabSwitchEvidence.map(e => ({ ...e, type: 'TAB_SWITCH' })),
      ...attempt.fullscreenExitEvidence.map(e => ({ ...e, type: 'FULLSCREEN_EXIT' })),
      ...attempt.multipleFacesEvidence.map(e => ({ ...e, type: 'MULTIPLE_FACES' })),
      ...attempt.phoneDetectionEvidence.map(e => ({ ...e, type: 'PHONE_DETECTION' })),
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({
      attempt,
      allEvidences,
      totalEvidences: allEvidences.length
    });

  } catch (error) {
    console.error("Error fetching evidences:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
