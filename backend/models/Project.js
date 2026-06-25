import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    tagline: { type: String },
    description: { type: String },
    tech: [{ type: String }],
    achievements: [{ type: String }],
    image: { type: String },
    live: { type: String },
    repo: { type: String },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.model('Project', projectSchema)
