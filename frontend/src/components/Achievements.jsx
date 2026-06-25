import { motion } from "framer-motion";
import { Trophy, Award } from "lucide-react";
import SectionLabel from "./SectionLabel";

const achievements = [
  {
    title: "National Level Cesteball Player",
    level: "National",
    note: "Represented at national championships — team leadership & discipline",
    icon: Trophy,
  },
  {
    title: "National Level Netball Player",
    level: "National",
    note: "Inter-state tournament representation — consistency & performance",
    icon: Trophy,
  },
  {
    title: "District Level Handball Champion",
    level: "District",
    note: "Champion title in district league — competitive excellence",
    icon: Award,
  },
];

export default function Achievements() {
  return (
    <section className="relative py-24">
      <div className="container mx-auto px-6">
        <SectionLabel>06 — Beyond Code</SectionLabel>
        <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Discipline learned on the field.
        </h2>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-3xl glass p-6 transition-all hover:-translate-y-1"
            >
              <div
                className="absolute -right-10 -top-10 size-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(109,158,247,0.3), rgba(160,108,245,0.3))",
                }}
              />
              <div className="flex items-center justify-between">
                <div
                  className="grid size-12 place-items-center rounded-2xl ring-1 ring-white/10"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(109,158,247,0.2), rgba(160,108,245,0.2))",
                  }}
                >
                  <a.icon
                    className="size-5"
                    style={{ color: "var(--electric)" }}
                  />
                </div>
                <span
                  className="rounded-full glass px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {a.level}
                </span>
              </div>
              <h3 className="mt-6 font-display text-lg font-medium leading-snug">
                {a.title}
              </h3>
              <p
                className="mt-1 text-sm"
                style={{ color: "var(--muted-foreground)" }}
              >
                {a.note}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
