import prisma from "../config/prisma.js";
import cloudinary from "../config/cloudinary.js";
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { 
    fileSize: 50 * 1024 * 1024 
  }
});

const violation = async (req, res) => {
  const { id } = req.params;
  let type, imageBuffer;
  
  if (req.file) {
    type = req.body.type;
    imageBuffer = req.file.buffer;
    // console.log("FormData - type:", type, "has image:", !!req.file);
  }else {
    return res.status(400).json({ error: "Missing type parameter" });
  }

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

    let imageUrl = null;
    if (imageBuffer) {
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: `violations/${type.toLowerCase()}`,
            resource_type: "image",
            quality: "auto",
            fetch_format: "auto"
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(imageBuffer);
      });
      
      imageUrl = uploadResult.secure_url;
    }

    const updatedAttempt = await prisma.attempt.update({
      where: { id },
      data: {
        [fieldMap[type]]: {
          increment: 1,
        },
      },
    });

    if (imageUrl) {
      const evidenceData = {
        url: imageUrl,
        attemptId: id,
      };

      switch (type) {
        case "TAB_SWITCH":
          await prisma.tabSwitchEvidence.create({ data: evidenceData });
          break;
        case "FULLSCREEN_EXIT":
          await prisma.fullscreenExitEvidence.create({ data: evidenceData });
          break;
        case "MULTIPLE_FACES":
          await prisma.multipleFacesEvidence.create({ data: evidenceData });
          break;
        case "PHONE_DETECTION":
          await prisma.phoneDetectionEvidence.create({ data: evidenceData });
          break;
      }
    }

    res.json({
      message: `Violation ${type} recorded`,
      attempt: updatedAttempt,
      evidenceUrl: imageUrl,
    });
  } catch (error) {
    console.error("Error recording violation:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};


export default violation;
