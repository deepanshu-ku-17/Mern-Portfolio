import { useRef, useState, lazy, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  Download,
  Mail,
  Code2,
  Database,
  MapPin,
} from "lucide-react";
import SectionLabel, { GlowOrbs } from "./SectionLabel";
import heroPortrait from "../assets/hero-portrait.webp";
const ResumeModal = lazy(() => import("./ResumeModal"));

const techTags = [
  "React",
  "Node.js",
  "MongoDB",
  "Express",
  "JavaScript",
  "Tailwind",
  "Web3",
  "Blockchain",
  "REST APIs",
  "Git",
];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const [showResumeModal, setShowResumeModal] = useState(false);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate flex min-h-screen items-center overflow-hidden pt-28"
    >
      <Suspense fallback={null}>
        {showResumeModal && (
          <ResumeModal onClose={() => setShowResumeModal(false)} />
        )}
      </Suspense>
      <div className="absolute inset-0 -z-10 aurora-bg" />
      <div className="absolute inset-0 -z-10 grid-bg" />
      <GlowOrbs />

      <motion.div
        style={{ y, opacity }}
        className="container mx-auto px-6 w-full"
      >
        <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="animate-rise">
            <SectionLabel>
              <MapPin className="size-3" /> Ghaziabad, India · Available for
              hire
            </SectionLabel>

            <h1
              className="mt-6 font-display leading-[0.95] tracking-[-0.04em]"
              style={{
                fontSize: "clamp(2.75rem, 9vw, 7.5rem)",
                fontWeight: 600,
              }}
            >
              Deepanshu
              <br />
              <span className="text-gradient">Kumar</span>
            </h1>

            <p
              className="mt-6 max-w-xl text-lg sm:text-xl"
              style={{ color: "var(--muted-foreground)" }}
            >
              MERN Stack Developer crafting{" "}
              <span style={{ color: "var(--foreground)" }}>
                fast, premium web applications
              </span>{" "}
              — React · Node.js · Express · MongoDB
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#work"
                className="group relative inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 glow-blue"
                style={{
                  background:
                    "linear-gradient(135deg, var(--electric), var(--violet))",
                }}
              >
                View Projects
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <button
                onClick={() => setShowResumeModal(true)}
                className="inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm font-medium transition-colors hover:bg-white/[0.08]"
              >
                <Download className="size-4" />
                Download Resume
              </button>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-colors hover:opacity-100"
                style={{ color: "var(--muted-foreground)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--foreground)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--muted-foreground)")
                }
              >
                <Mail className="size-4" /> Contact Me
              </a>
            </div>

            <div
              className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t pt-6"
              style={{ borderColor: "var(--border)" }}
            >
              {[
                ["3+", "Years coding"],
                ["10+", "Projects shipped"],
                ["2", "Internships"],
              ].map(([k, v]) => (
                <div key={v}>
                  <div className="font-display text-2xl font-semibold">{k}</div>
                  <div
                    className="mt-1 text-xs"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {v}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Portrait */}
          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div
              className="absolute -inset-6 rounded-[2rem] blur-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(109,158,247,0.4), rgba(160,108,245,0.3), transparent)",
              }}
            />
            <div className="glass-strong relative overflow-hidden rounded-[2rem] p-2">
              <div className="relative overflow-hidden rounded-[1.5rem]">
                <img
                  src={heroPortrait}
                  alt="Deepanshu Kumar"
                  width={896}
                  height={1152}
                  loading="eager"
                  decoding="async"
                  fetchpriority="high"
                  className="w-full object-cover"
                  style={{ aspectRatio: "3/4" }}
                />
                <div className="absolute inset-x-3 bottom-8 flex items-center justify-between rounded-2xl glass px-3 py-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="relative grid size-2 place-items-center">
                      <span
                        className="absolute inset-0 rounded-full animate-pulse-ring"
                        style={{ backgroundColor: "#34d399" }}
                      />
                      <span
                        className="size-2 rounded-full"
                        style={{ backgroundColor: "#34d399" }}
                      />
                    </span>
                    <span>Open to work</span>
                  </div>
                  <span
                    className="font-mono"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    v2026.1
                  </span>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -left-4 top-10 hidden md:block">
              <div className="glass-strong flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-medium animate-float-slow">
                <Code2
                  className="size-3.5"
                  style={{ color: "var(--electric)" }}
                />{" "}
                React · Node.js
              </div>
            </div>
            <div className="absolute -right-2 bottom-24 hidden md:block">
              <div
                className="glass-strong flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-medium animate-float-slow"
                style={{ animationDelay: "-4s" }}
              >
                <Database
                  className="size-3.5"
                  style={{ color: "var(--violet)" }}
                />{" "}
                Mongo · Express
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tech marquee */}
      <div
        className="absolute inset-x-0 bottom-0 overflow-hidden border-t py-4"
        style={{
          backgroundColor: "rgba(13,15,24,0.4)",
          backdropFilter: "blur(8px)",
          borderColor: "rgba(255,255,255,0.06)",
        }}
      >
        <div
          className="flex w-max animate-marquee gap-12 whitespace-nowrap px-6 text-xs font-mono uppercase tracking-[0.2em]"
          style={{ color: "rgba(136,144,168,0.6)" }}
        >
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-12">
              {techTags.map((t) => (
                <span key={t} className="flex items-center gap-2">
                  <span
                    className="size-1 rounded-full"
                    style={{ backgroundColor: "var(--electric)" }}
                  />{" "}
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
