import express from 'express'
import ResumeDownload from '../models/ResumeDownload.js'

const router = express.Router()

// POST /api/resume-download — track a download
// routes/resume.js

router.post("/", async (req, res) => {
  try {
    const { name, email, purpose } = req.body;

    const saved = await ResumeDownload.create({
      name,
      email,
      purpose,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
      referrer: req.headers.referer,
    });

    console.log("SAVED =>", saved);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// GET /api/resume-download — analytics (admin)
router.get('/', async (req, res) => {
  try {
    const downloads = await ResumeDownload.find().sort({ createdAt: -1 })
    res.json(downloads)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
