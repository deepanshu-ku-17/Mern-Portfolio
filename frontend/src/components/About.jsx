import { GraduationCap, Code2, Sparkles } from "lucide-react";
import SectionLabel from "./SectionLabel";

const journey = [
  {
    year: "2027",
    title: "MBA — IT Management",
    note: "Pursuing · Amity University Online · Bridging product + engineering",
    icon: GraduationCap,
  },
  {
    year: "2025",
    title: "B.Tech — Information Technology",
    note: "Graduated · ABES Institute of Technology (AKTU) · DSA, Systems, Web",
    icon: GraduationCap,
  },
  {
    year: "2024",
    title: "MERN Stack Developer",
    note: "Shipping production React + Node systems · 2 professional internships",
    icon: Code2,
  },
  {
    year: "2024",
    title: "First Web3 & Blockchain Exploration",
    note: "Started exploring Solidity, smart contracts & decentralized systems",
    icon: Sparkles,
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="container mx-auto grid gap-16 px-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionLabel>01 — About</SectionLabel>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Engineer first.
            <br />
            <span style={{ color: "var(--muted-foreground)" }}>
              Builder always.
            </span>
          </h2>
          <p
            className="mt-6 max-w-md text-base leading-relaxed"
            style={{ color: "var(--muted-foreground)" }}
          >
            I'm a MERN Stack Developer passionate about building scalable web
            applications, solving real-world problems and creating seamless
            digital experiences. My focus is the seam between React, APIs, and
            data — with an eye for performance, clean code and meaningful user
            interfaces.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              ["10+", "Projects Built"],
              ["15+", "Technologies"],
              ["2", "Internships"],
            ].map(([num, label]) => (
              <div key={label} className="glass rounded-2xl p-4 text-center">
                <div className="font-display text-2xl font-semibold text-gradient">
                  {num}
                </div>
                <div
                  className="mt-1 text-xs"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <ol
          className="relative space-y-4 border-l pl-6"
          style={{ borderColor: "var(--border)" }}
        >
          <div
            className="absolute left-0 top-0 h-full w-px"
            style={{
              background:
                "linear-gradient(to bottom, var(--electric), var(--violet), transparent)",
            }}
          />
          {journey.map(({ year, title, note, icon: Icon }) => (
            <li key={title} className="group relative">
              <span className="absolute -left-[34px] top-3 grid size-6 place-items-center rounded-full glass-strong">
                <Icon className="size-3" style={{ color: "var(--electric)" }} />
              </span>
              <div className="glass rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:border-white/15">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-medium">{title}</h3>
                  <span
                    className="font-mono text-xs"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {year}
                  </span>
                </div>
                <p
                  className="mt-1 text-sm"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {note}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
