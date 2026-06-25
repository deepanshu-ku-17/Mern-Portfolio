import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, ArrowUpRight, Star, GitFork } from "lucide-react";
import { GitHubCalendar } from "react-github-calendar";
import SectionLabel from "./SectionLabel";

const GITHUB_USERNAME = "deepanshu-ku-17";

export default function GitHubShowcase() {
  const [repos, setRepos] = useState([]);
  const [stats, setStats] = useState({
    public_repos: 0,
    followers: 0,
    following: 0,
  });

  useEffect(() => {
    async function fetchGitHub() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=4`
          ),
        ]);

        if (userRes.ok) {
          const user = await userRes.json();

          setStats({
            public_repos: user.public_repos,
            followers: user.followers,
            following: user.following,
          });
        }

        if (reposRes.ok) {
          const data = await reposRes.json();
          setRepos(data);
        }
      } catch (err) {
        console.error("GitHub fetch failed", err);
      }
    }

    fetchGitHub();
  }, []);

  const displayStats = [
    { label: "Public Repos", value: stats.public_repos },
    { label: "Followers", value: stats.followers },
    { label: "Contributions", value: "150+" },
    { label: "GitHub", value: "Active" },
  ];

  const langColor = {
    JavaScript: "var(--electric)",
    TypeScript: "var(--aurora)",
    PHP: "var(--violet)",
    Java: "#e76f51",
    Python: "#4fc3f7",
    HTML: "#e34c26",
    CSS: "#2965f1",
  };

  return (
    <section className="relative py-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <SectionLabel>07 — Coding Activity</SectionLabel>

            <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Code is a daily practice.
            </h2>
          </div>

          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-medium transition-colors hover:bg-white/[0.08]"
          >
            <Github className="size-4" />
            @{GITHUB_USERNAME}
          </a>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-[1.5fr_1fr]">

          {/* GitHub Calendar */}
          <div className="rounded-3xl glass-strong p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-lg font-medium">
                GitHub Contributions
              </h3>

              <span
                className="font-mono text-xs"
                style={{ color: "var(--muted-foreground)" }}
              >
                Last 12 Months
              </span>
            </div>

            <GitHubCalendar
              username={GITHUB_USERNAME}
              blockSize={12}
              blockMargin={3.5}
              fontSize={12}
              hideColorLegend
              hideMonthLabels={false}
              colorScheme="dark"
              theme={{
                dark: [
                  "#1a1d2a",
                  "#324a85",
                  "#4d6fd1",
                  "#7f67e8",
                  "#a06cf5",
                ],
              }}
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            {displayStats.map((s) => (
              <div
                key={s.label}
                className="rounded-3xl glass p-5 transition-all hover:-translate-y-1"
              >
                <div className="font-display text-3xl font-semibold text-gradient">
                  {s.value}
                </div>

                <div
                  className="mt-2 text-xs"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Repositories */}
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {repos.map((repo, i) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group flex items-center justify-between rounded-2xl glass p-5 transition-all hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center gap-2">
                  <Github
                    className="size-4"
                    style={{ color: "var(--muted-foreground)" }}
                  />

                  <span className="font-mono text-sm">
                    {repo.name}
                  </span>
                </div>

                <p
                  className="mt-1 text-xs"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {repo.description || "No description provided"}
                </p>

                <div
                  className="mt-3 flex items-center gap-4 text-xs"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {repo.language && (
                    <div className="flex items-center gap-1.5">
                      <span
                        className="size-2 rounded-full"
                        style={{
                          background:
                            langColor[repo.language] ||
                            "var(--electric)",
                        }}
                      />

                      {repo.language}
                    </div>
                  )}

                  <div className="flex items-center gap-1">
                    <Star className="size-3" />
                    {repo.stargazers_count}
                  </div>

                  <div className="flex items-center gap-1">
                    <GitFork className="size-3" />
                    {repo.forks_count}
                  </div>
                </div>
              </div>

              <ArrowUpRight
                className="size-4 transition-all group-hover:-translate-y-1 group-hover:translate-x-1"
                style={{ color: "var(--muted-foreground)" }}
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}