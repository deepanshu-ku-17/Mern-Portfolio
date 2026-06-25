import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import SectionLabel from "./SectionLabel";
import projBlockaid from "../assets/project-blockaid.webp";
import projSyntax from "../assets/project-syntax.webp";
import projCycle from "../assets/project-cycle.webp";

const projects = [
  {
    name: "BlockAid",
    tagline: "Blockchain NGO funding transparency system",
    description:
      "On-chain donation ledger that lets donors trace every rupee from wallet to beneficiary in real time. Built as final year capstone project with full smart contract architecture.",
    tech: ["React", "Web3", "Blockchain", "Ethers.js", "Solidity"],
    achievements: [
      "100% transaction traceability",
      "Smart contract escrow",
      "Wallet integration",
      "Zero-fee donations",
    ],
    image: projBlockaid,
    live: null,
    repo: "https://github.com/deepanshu-ku-17/NGO",
    span: "lg:col-span-2 lg:row-span-1",
    index: "01",
  },
  {
    name: "Syntax Sphere",
    tagline: "E-Learning Platform",
    description:
      "Full-featured e-learning platform with user authentication, course management, video streaming, progress tracking and assessment modules.",
    tech: ["React", "JavaScript", "HTML5", "CSS3"],
    achievements: [
      "User authentication",
      "Progress tracking",
      "Course management",
    ],
    image: projSyntax,
    live: null,
    repo: "https://github.com/deepanshu-ku-17/E-Learning-Platform",
    span: "lg:col-span-2",
    index: "02",
  },
  {
    name: "Cycle Sustain Now",
    tagline: "E-Waste Recycling Platform",
    description:
      "Full-stack web application for e-waste management with robust backend data processing. Represented at CODE-A-THON 2.0 hackathon at ABESIT.",
    tech: ["PHP", "MySQL", "HTML", "CSS"],
    achievements: [
      "Waste management system",
      "Secure database",
      "Hackathon project",
    ],
    image: projCycle,
    live: null,
    repo: "https://github.com/deepanshu-ku-17/e-waste-recycle",
    span: "lg:col-span-2",
    index: "03",
  },
];

function ProjectCard({ project, i }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: i * 0.08 }}
      className={`group relative flex flex-col overflow-hidden rounded-3xl glass-strong transition-all hover:-translate-y-1 ${project.span}`}
    >
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: "16/10" }}
      >
        <img
          src={
            project.image?.includes("cloudinary")
              ? project.image.replace(
                  "/upload/",
                  "/upload/f_auto,q_auto,w_1200/",
                )
              : project.image
          }
          alt={project.name}
          width={1200}
          height={750}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, var(--background), rgba(13,15,24,0.4), transparent)",
          }}
        />
        <div className="absolute left-5 top-5 flex items-center gap-2">
          <span
            className="rounded-full glass px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest"
            style={{ color: "var(--muted-foreground)" }}
          >
            {project.index}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <h3 className="font-display text-2xl font-semibold tracking-tight">
            {project.name}
          </h3>
          <p
            className="mt-1 text-sm"
            style={{ color: "var(--muted-foreground)" }}
          >
            {project.tagline}
          </p>
        </div>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "rgba(245,246,250,0.8)" }}
        >
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full px-2.5 py-1 font-mono text-[10px]"
              style={{
                border: "1px solid var(--border)",
                backgroundColor: "rgba(255,255,255,0.03)",
                color: "var(--muted-foreground)",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <ul className="mt-1 grid gap-1.5">
          {project.achievements.map((a) => (
            <li
              key={a}
              className="flex items-center gap-2 text-xs"
              style={{ color: "var(--muted-foreground)" }}
            >
              <span
                className="size-1 rounded-full flex-shrink-0"
                style={{ backgroundColor: "var(--electric)" }}
              />{" "}
              {a}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center gap-2 pt-2">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium text-white"
              style={{
                background:
                  "linear-gradient(135deg, var(--electric), var(--violet))",
              }}
            >
              Live Demo
              <ExternalLink className="size-3" />
            </a>
          )}

          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full glass px-4 py-2 text-xs font-medium"
          >
            <Github className="size-3.5" />
            View Code
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [dbProjects, setDbProjects] = useState([]);

useEffect(() => {
  fetch("/api/projects")
    .then((res) => res.json())
    .then((data) => setDbProjects(data));
}, []);

  return (
    <section id="work" className="relative py-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <SectionLabel>03 — Selected Work</SectionLabel>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Products I&apos;ve shipped end-to-end.
            </h2>
          </div>
          <a
            href="https://github.com/deepanshu-ku-17"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm transition-colors"
            style={{ color: "var(--muted-foreground)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--foreground)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--muted-foreground)")
            }
          >
            All projects on GitHub <ArrowUpRight className="size-4" />
          </a>
        </div>

        <div className="mt-14 grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-4 lg:grid-cols-4">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} project={p} i={i} />
          ))}
        </div>

        {dbProjects.length > 0 && (
          <>
            <div className="mt-20 mb-8">
              <h3 className="text-3xl font-semibold">More Projects</h3>
            </div>

            <div className="grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-4 lg:grid-cols-4">
              {dbProjects.map((project, i) => (
                <ProjectCard
                  key={project._id}
                  project={{
                    ...project,
                    span: "lg:col-span-2",
                    index: String(i + 4).padStart(2, "0"),
                  }}
                  i={i}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
