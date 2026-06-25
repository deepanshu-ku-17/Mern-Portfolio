import express from "express";
import multer from "multer";
import cloudinary from "../utils/cloudinary.js";
import auth from "../middleware/auth.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const base64 = req.file.buffer.toString("base64");

    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${base64}`,
      {
        folder: "portfolio-projects",
      }
    );

    res.json({
      success: true,
      url: result.secure_url,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;