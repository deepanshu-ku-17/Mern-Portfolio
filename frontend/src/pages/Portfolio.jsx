import { lazy, Suspense } from "react";

import Nav from "../components/Nav"
import Hero from "../components/Hero";
const About = lazy(() => import("../components/About"));
const Stack = lazy(() => import("../components/Stack"));
const Projects = lazy(() => import("../components/Projects"));
const Experience = lazy(() => import("../components/Experience"));
const Achievements = lazy(() => import("../components/Achievements"));
const GithubShowcase = lazy(() => import("../components/GitHubShowcase"));
const Contact = lazy(() => import("../components/Contact"));

import CustomCursor from "../components/CustomCursor";
export default function Portfolio() {
  return (
    <>
      <CustomCursor />
      <main
        className="relative min-h-screen antialiased portfolio-page"
        style={{
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
        }}
      >
          <Nav />
          <Hero />

        <Suspense fallback={null}>

          <About />

          <Stack />

          <Projects />

          <Experience />

          <Achievements />

          <GithubShowcase />

          <Contact />

        </Suspense>
      </main>
    </>
  );
}
