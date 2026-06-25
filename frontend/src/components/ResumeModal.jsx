import { useState } from "react";

export default function ResumeModal({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    purpose: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/resume-download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    window.open("/resume.pdf", "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="glass-strong w-full max-w-md rounded-3xl p-6">
        <h2 className="text-2xl font-semibold mb-5">Download Resume</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            type="text"
            placeholder="Your Name"
            className="w-full rounded-xl p-3 bg-white/5"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            required
            type="email"
            placeholder="Your Email"
            className="w-full rounded-xl p-3 bg-white/5"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <select
            required
            value={form.purpose}
            className="w-full rounded-xl p-3 bg-white/5 text-white border border-white/10"
            onChange={(e) => setForm({ ...form, purpose: e.target.value })}
          >
            <option value="" className="bg-[#171717] text-white">
              Purpose
            </option>
            <option className="bg-[#171717] text-white">
              Hiring Opportunity
            </option>
            <option className="bg-[#171717] text-white">Internship</option>
            <option className="bg-[#171717] text-white">
              Freelance Project
            </option>
            <option className="bg-[#171717] text-white">Networking</option>
            <option className="bg-[#171717] text-white">Other</option>
          </select>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 rounded-xl py-3 bg-violet-600"
            >
              Download
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl py-3 border"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
