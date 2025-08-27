import express from 'express';
import multer from 'multer';
import violation from '../controllers/violation.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { 
    fileSize: 50 * 1024 * 1024 
  }
});

router.patch('/attempts/:id/violation', upload.single('image'), violation);

export default router;
