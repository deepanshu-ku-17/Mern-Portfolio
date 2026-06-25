import dotenv from 'dotenv'
dotenv.config({ path: "./.env" })

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import mongoose from 'mongoose'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

import adminRoutes from "./routes/admin.js";
import contactRoutes from './routes/contact.js'
import resumeRoutes from './routes/resume.js'
import projectRoutes from './routes/projects.js'
import githubRoutes from './routes/github.js'
import uploadRoutes from "./routes/upload.js";


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/deepanshu-portfolio'

/* ─── Security & Middleware ─── */
app.use(helmet({
  contentSecurityPolicy: false, // relax for portfolio
}))

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE', 'PATCH'],
  credentials: true,
}))

app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'))
}


/* ─── Routes ─── */
app.use('/api/contact', contactRoutes)
app.use('/api/resume-download', resumeRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/github', githubRoutes)
app.use("/api/admin", adminRoutes);
app.use("/api/upload", uploadRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  })
})

/* ─── Serve frontend in production ─── */
if (process.env.NODE_ENV === 'production') {
  const frontendDist = join(__dirname, '../frontend/dist')
  app.use(express.static(frontendDist))
  app.get('*', (req, res) => {
    res.sendFile(join(frontendDist, 'index.html'))
  })
}

/* ─── Error handler ─── */
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
  })
})

/* ─── MongoDB + start ─── */
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected:', MONGODB_URI)
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    })
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message)
    process.exit(1)
  })

export default app
