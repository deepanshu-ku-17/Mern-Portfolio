import mongoose from "mongoose";

const resumeDownloadSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    purpose: String,
    ip: String,
    userAgent: String,
    referrer: String,
  },
  { timestamps: true }
);

export default mongoose.model(
  "ResumeDownload",
  resumeDownloadSchema
);