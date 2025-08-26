import { nanoid } from 'nanoid'; 
import prisma from '../config/prisma.js';

const createTest = async (req, res) => {
  const { title, url, teacherId } = req.body;

  try {
    const slug = nanoid(6);
    
    const test = await prisma.test.create({
      data: { title, url, slug, teacherId }
    });

    const protectedUrl = `${process.env.FE_URL}/p/${slug}`;
    res.status(201).json({ "url": protectedUrl });
    
  } catch (err) {
    console.log("Error creating protected link: " + err);
    res.status(500).json("Something wrong at our side");
  }
};

export default createTest;
