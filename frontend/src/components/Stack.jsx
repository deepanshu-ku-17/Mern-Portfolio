import { motion } from "framer-motion";
import {
  Code2,
  Server,
  Database,
  GitBranch,
  Palette,
  Workflow,
  Link2,
  Boxes,
  Globe,
  Terminal,
} from "lucide-react";
import SectionLabel from "./SectionLabel";

const stack = [
  { name: "React", group: "Frontend", icon: Code2, accent: "electric" },
  { name: "JavaScript", group: "Language", icon: Code2, accent: "violet" },
  { name: "Node.js", group: "Runtime", icon: Server, accent: "electric" },
  { name: "Express.js", group: "Backend", icon: Workflow, accent: "violet" },
  { name: "MongoDB", group: "Database", icon: Database, accent: "electric" },
  { name: "MySQL", group: "Database", icon: Database, accent: "violet" },
  { name: "Tailwind CSS", group: "Styling", icon: Palette, accent: "electric" },
  { name: "HTML & CSS", group: "Markup", icon: Globe, accent: "violet" },
  {
    name: "Git & GitHub",
    group: "Tooling",
    icon: GitBranch,
    accent: "electric",
  },
  { name: "REST APIs", group: "Integration", icon: Link2, accent: "violet" },
  { name: "Blockchain", group: "Web3", icon: Boxes, accent: "electric" },
  { name: "Postman", group: "Testing", icon: Terminal, accent: "violet" },
];

export default function Stack() {
  return (
    <section id="stack" className="relative py-32">
      <div className="absolute inset-x-0 top-0 -z-10 h-[40rem] aurora-bg opacity-40" />
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <SectionLabel>02 — Stack</SectionLabel>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Tools I reach for, every single day.
            </h2>
          </div>
          <p
            className="max-w-sm text-sm"
            style={{ color: "var(--muted-foreground)" }}
          >
            Full-Stack JavaScript is my core. I pick the right tool for the
            right problem — then polish it until it feels effortless.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {stack.map(({ name, group, icon: Icon, accent }, i) => (
            <motion.li
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl glass p-5 transition-all hover:-translate-y-1 hover:border-white/20"
            >
              <div
                className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    accent === "electric" ? "var(--electric)" : "var(--violet)",
                }}
              />
              <div className="flex items-start justify-between">
                <div
                  className="grid size-10 place-items-center rounded-xl"
                  style={{
                    background:
                      accent === "electric"
                        ? "linear-gradient(135deg, rgba(109,158,247,0.25), transparent)"
                        : "linear-gradient(135deg, rgba(160,108,245,0.25), transparent)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <Icon
                    className="size-5"
                    style={{
                      color:
                        accent === "electric"
                          ? "var(--electric)"
                          : "var(--violet)",
                    }}
                  />
                </div>
                <span
                  className="font-mono text-[10px] uppercase tracking-widest"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {group}
                </span>
              </div>
              <div className="mt-8 font-display text-xl font-medium">
                {name}
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
