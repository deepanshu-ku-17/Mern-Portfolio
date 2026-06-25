import express from 'express'
import Project from '../models/Project.js'
import auth from "../middleware/auth.js";

const router = express.Router()

// GET /api/projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 })
    res.json(projects)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// POST /api/projects (admin)
router.post('/', auth, async (req, res) => {
  try {
    const project = await Project.create(req.body)
    res.status(201).json(project)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// DELETE /api/projects/:id (admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// UPDATE PROJECT (admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )

    res.json(project)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
