import prisma from "../config/prisma.js";

const getTest = async (req, res) => {

  const { slug } = req.params;

  try {
    const test = await prisma.test.findUnique({
      where: { slug },
    });

    if (!test) {
      return res.status(404).json({ error: "Test not found" });
    }

    res.json({
        id: test.id,
      title: test.title,
      url: test.url,
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default getTest;
