import { useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
const ResumeModal = lazy(() => import("./ResumeModal"));
import {
  Mail,
  Linkedin,
  Github,
  Download,
  Instagram,
  MessageCircle,
  ArrowUpRight,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import SectionLabel from "./SectionLabel";


const contactItems = [
  {
    label: "Email",
    value: "work.deepanshukumar@gmail.com",
    href: "mailto:work.deepanshukumar@gmail.com",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "@Deepanshu-kumar",
    href: "https://www.linkedin.com/in/deepanshu-kumar-5604b1239/",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    value: "@deepanshu-ku-17",
    href: "https://github.com/deepanshu-ku-17",
    icon: Github,
  },
  {
    label: "Resume",
    value: "Download PDF",
    href: "/resume.pdf",
    icon: Download,
  },
  {
    label: "Instagram",
    value: "@deepanshu_kumar",
    href: "https://instagram.com/17_deepanshu",
    icon: Instagram,
  },
  {
    label: "WhatsApp",
    value: "Chat on WhatsApp",
    href: "https://wa.me/917834868865?text=Hi%20Deepanshu,%20I%20visited%20your%20portfolio.",
    icon: MessageCircle,
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errors, setErrors] = useState({});
  const [showResumeModal, setShowResumeModal] = useState(false);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim()) e.message = "Message is required";
    else if (form.message.trim().length < 10)
      e.message = "Message too short (min 10 chars)";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputClass = `w-full rounded-2xl glass px-4 py-3 text-sm transition-colors outline-none focus:border-white/20 placeholder-[var(--muted-foreground)]`;

  return (
    <section id="contact" className="relative overflow-hidden pt-32 pb-10">
      {showResumeModal && (
        <ResumeModal onClose={() => setShowResumeModal(false)} />
      )}
      <div className="absolute inset-0 -z-10 aurora-bg opacity-60" />
      <div className="container mx-auto px-6">
        <div className="glass-strong relative overflow-hidden rounded-[2.5rem] p-10 sm:p-16">
          <div
            className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full blur-3xl"
            style={{ backgroundColor: "rgba(160,108,245,0.3)" }}
          />
          <div
            className="pointer-events-none absolute -left-32 -bottom-32 size-96 rounded-full blur-3xl"
            style={{ backgroundColor: "rgba(109,158,247,0.3)" }}
          />

          <div className="relative">
            <SectionLabel>08 — Contact</SectionLabel>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-6xl">
              Have an idea worth{" "}
              <span className="text-gradient">building?</span>
            </h2>
            <p
              className="mt-4 max-w-xl"
              style={{ color: "var(--muted-foreground)" }}
            >
              I&apos;m open to MERN Stack roles — and to thoughtful freelance
              work. Reach out and let&apos;s talk specifics.
            </p>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {contactItems.map(({ label, value, href, icon: Icon }) => (
                <a
                  key={label}
                  href={label === "Resume" ? "#" : href}
                  onClick={
                    label === "Resume"
                      ? (e) => {
                          e.preventDefault();
                          setShowResumeModal(true);
                        }
                      : undefined
                  }
                  target={
                    href.startsWith("http") && label !== "Resume"
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    href.startsWith("http") && label !== "Resume"
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group flex items-center justify-between rounded-2xl p-5 transition-all hover:-translate-y-0.5"
                  style={{
                    border: "1px solid var(--border)",
                    backgroundColor: "rgba(255,255,255,0.03)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                    e.currentTarget.style.backgroundColor =
                      "rgba(255,255,255,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.backgroundColor =
                      "rgba(255,255,255,0.03)";
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="grid size-11 place-items-center rounded-xl"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(109,158,247,0.25), rgba(160,108,245,0.25))",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <div
                        className="text-xs uppercase tracking-widest"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        {label}
                      </div>
                      <div
                        className="mt-0.5 text-sm font-medium break-all"
                        style={{
                          wordBreak: "break-word",
                        }}
                      >
                        {value}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight
                    className="size-4 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    style={{ color: "var(--muted-foreground)" }}
                  />
                </a>
              ))}
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-12 rounded-3xl glass p-8"
            >
              <h3 className="font-display text-xl font-semibold mb-6">
                Send a message
              </h3>

              {status === "success" && (
                <div
                  className="mb-6 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm"
                  style={{
                    backgroundColor: "rgba(52,211,153,0.1)",
                    border: "1px solid rgba(52,211,153,0.3)",
                    color: "#34d399",
                  }}
                >
                  <CheckCircle className="size-4 flex-shrink-0" />
                  Message sent successfully! I&apos;ll get back to you soon.
                </div>
              )}

              {status === "error" && (
                <div
                  className="mb-6 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm"
                  style={{
                    backgroundColor: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.3)",
                    color: "#f87171",
                  }}
                >
                  <AlertCircle className="size-4 flex-shrink-0" />
                  Something went wrong. Please try again or email directly.
                </div>
              )}

              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className={inputClass}
                      style={{ color: "var(--foreground)" }}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className={inputClass}
                      style={{ color: "var(--foreground)" }}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Subject"
                    value={form.subject}
                    onChange={(e) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                    className={inputClass}
                    style={{ color: "var(--foreground)" }}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.subject}
                    </p>
                  )}
                </div>
                <div>
                  <textarea
                    placeholder="Tell me about your project or opportunity..."
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className={inputClass + " resize-none"}
                    style={{ color: "var(--foreground)" }}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--electric), var(--violet))",
                  }}
                >
                  {status === "loading" ? (
                    "Sending..."
                  ) : (
                    <>
                      Send message <Send className="size-4" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>

        <footer
          className="mt-6 flex flex-col items-center justify-between gap-3 border-t pt-8 text-xs sm:flex-row"
          style={{
            borderColor: "var(--border)",
            color: "var(--muted-foreground)",
          }}
        >
          <span className="font-mono">
            © 2026 Deepanshu Kumar — Crafted with obsessive detail.
          </span>
          <span className="font-mono">Ghaziabad → World</span>
        </footer>
      </div>
    </section>
  );
}
