import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const createTeacher = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }

    const existing = await prisma.teacher.findUnique({
      where: { email },
    });

    if (existing) {
      return res.status(409).json({ error: "Teacher with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const teacher = await prisma.teacher.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const { password: _, ...teacherSafe } = teacher;

    res.status(201).json(teacherSafe);
  } catch (error) {
    console.error("Error creating teacher:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};



export const loginTeacher = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const teacher = await prisma.teacher.findUnique({
      where: { email },
    });

    if (!teacher) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { teacherId: teacher.id, email: teacher.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    const { password: _, ...teacherSafe } = teacher;

    res.json({
      message: "Login successful",
      teacher: teacherSafe,
      token,
    });
  } catch (error) {
    console.error("Error logging in teacher:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
