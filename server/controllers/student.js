import prisma from "../config/prisma.js";

export const createStudent = async (req, res) => {
  try {
    const { name, email, uid } = req.body;

    if (!name || !email || !uid) {
      return res.status(400).json({ error: "Name, email, and UID are required" });
    }

    let student = await prisma.student.findUnique({
      where: { uid },
    });

    if (student) {
      return res.status(200).json(student); 
    }

    student = await prisma.student.create({
      data: {
        name,
        email,
        uid,
      },
    });

    res.status(201).json(student);
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getStudent = async (req, res) => {
  try {
    const { uid } = req.params;

    const student = await prisma.student.findUnique({
      where: { uid },
      include: {
        attempts: true, 
      },
    });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
