import { ArrowUpRight } from "lucide-react";
import logo from "../assets/logo.webp";

const links = [
  ["Work", "#work"],
  ["About", "#about"],
  ["Stack", "#stack"],
  ["Experience", "#experience"],
  ["Contact", "#contact"],
];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav className="glass-strong flex w-full max-w-4xl items-center justify-between rounded-full px-3 py-2 sm:px-5">
        <a href="#top" className="flex items-center justify-center gap-2 pl-2">
          <span
            className=" grid size-7 place-items-center rounded-lg text-[10px] font-bold text-white "
          >
            <img
                              src={logo}
                              alt="Deepanshu Kumar"
                            />
          </span>
          <span className="text-sm font-semibold tracking-tight">
            Deepanshu
          </span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {links.map(([label, href]) => (
            <li key={href}>
              <a
                href={href}
                className="rounded-full px-3 py-1.5 text-sm transition-colors hover:bg-white/5"
                style={{ color: "var(--muted-foreground)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--foreground)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--muted-foreground)")
                }
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="group inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all"
          style={{
            backgroundColor: "rgba(245,246,250,0.95)",
            color: "var(--background)",
          }}
        >
          Let&apos;s talk
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </nav>
    </header>
  );
}
