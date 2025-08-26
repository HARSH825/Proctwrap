import prisma from "../config/prisma.js";

const violation = async (req, res) => {
  const { id } = req.params;
  const { type } = req.body;

  try {
    const fieldMap = {
      TAB_SWITCH: "tabSwitchCount",
      FULLSCREEN_EXIT: "fullscreenExitCount",
      MULTIPLE_FACES: "multipleFacesCount",
      PHONE_DETECTION: "phoneDetectionCount",
    };

    if (!fieldMap[type]) {
      return res.status(400).json({ error: "Invalid violation type" });
    }

    const updatedAttempt = await prisma.attempt.update({
      where: { id },
      data: {
        [fieldMap[type]]: {
          increment: 1,
        },
      },
    });

    res.json({
      message: `Violation ${type} recorded`,
      attempt: updatedAttempt,
    });
  } catch (error) {
    console.error("Error recording violation:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default violation;
