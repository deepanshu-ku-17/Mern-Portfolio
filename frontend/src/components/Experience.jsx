import { motion } from "framer-motion";
import { Briefcase, Calendar, GraduationCap } from "lucide-react";
import SectionLabel from "./SectionLabel";

const experience = [
  {
    role: "Web Development Intern",
    company: "Next24Tech Technology & Services",
    location: "Maharashtra, India (Remote)",
    period: "Jul 2024 – Sep 2024",
    bullets: [
      "Developed and deployed responsive web applications using modern frontend technologies and best practices",
      "Collaborated with cross-functional teams to implement user-centric features and optimize application performance",
      "Debugged and resolved critical issues in production environments, improving overall system reliability",
      "Participated in code reviews and contributed to establishing coding standards for the development team",
    ],
  },
  {
    role: "Java Programming Intern",
    company: "CodSoft",
    location: "India (Remote)",
    period: "Jul 2024 – Aug 2024",
    bullets: [
      "Designed and implemented Java-based solutions applying core OOP principles and design patterns",
      "Built scalable backend systems with efficient algorithms, reducing processing time significantly",
      "Completed real-world projects demonstrating proficiency in Java fundamentals and problem-solving",
      "Strengthened DSA fundamentals later applied in JavaScript and MERN stack development",
    ],
  },
];

const education = [
  {
    degree: "Master of Business Administration",
    field: "Information Technology Management",
    school: "Amity University Online",
    period: "Expected 2027",
    note: "Pursuing — Bridging product & engineering leadership",
  },
  {
    degree: "Bachelor of Technology",
    field: "Information Technology",
    school: "ABES Institute of Technology (AKTU)",
    period: "2021 – 2025",
    note: "Ghaziabad, UP — DSA, Systems, Full Stack Web Development",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-32">
      <div className="container mx-auto px-6">
        <SectionLabel>04 — Experience</SectionLabel>
        <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Where I&apos;ve been learning my craft.
        </h2>

        <ol className="relative mt-14 grid gap-4">
          {experience.map((x, i) => (
            <motion.li
              key={x.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="grid grid-cols-1 gap-6 rounded-3xl glass p-6 lg:grid-cols-[200px_1fr_auto] lg:items-start lg:p-8"
            >
              <div
                className="flex items-center gap-2 font-mono text-xs"
                style={{ color: "var(--muted-foreground)" }}
              >
                <Calendar className="size-3.5" /> {x.period}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Briefcase
                    className="size-4"
                    style={{ color: "var(--electric)" }}
                  />
                  <h3 className="font-display text-xl font-medium">{x.role}</h3>
                </div>
                <p
                  className="mt-1 text-sm"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {x.company} · {x.location}
                </p>
                <ul
                  className="mt-4 grid gap-2 text-sm"
                  style={{ color: "rgba(245,246,250,0.85)" }}
                >
                  {x.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span
                        className="mt-1 size-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: "var(--violet)" }}
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <span
                className="hidden self-start rounded-full glass px-3 py-1 text-[10px] font-mono uppercase tracking-widest lg:inline-flex"
                style={{ color: "var(--muted-foreground)" }}
              >
                Completed
              </span>
            </motion.li>
          ))}
        </ol>

        {/* Education */}
        <div className="mt-16">
          <SectionLabel>05 — Education</SectionLabel>
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Academic foundation.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {education.map((edu, i) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-3xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="grid size-10 place-items-center rounded-xl"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(109,158,247,0.2), rgba(160,108,245,0.2))",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <GraduationCap
                      className="size-5"
                      style={{ color: "var(--electric)" }}
                    />
                  </div>
                  <span
                    className="font-mono text-xs"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {edu.period}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold">
                  {edu.degree}
                </h3>
                <p
                  className="mt-1 text-sm font-medium"
                  style={{ color: "var(--electric)" }}
                >
                  {edu.field}
                </p>
                <p
                  className="mt-2 text-sm"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {edu.school}
                </p>
                <p
                  className="mt-2 text-xs"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {edu.note}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
