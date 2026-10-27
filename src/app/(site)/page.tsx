import Link from "next/link";
import Image from "next/image";
import {
  ArrowDownRight,
  ArrowUpRight,
  Code2,
  Layers3,
  Sparkles,
} from "lucide-react";

import { siteConfig } from "@/config/site";
import { StackLab } from "@/components/stack/stack-lab";
import { ContactSection } from "@/components/contact/contact-section";
import { InteractivePortrait } from "@/components/interactive-portrait";

const projects = [
  {
    number: "01",
    name: "Bazar Dor",
    category: "E-commerce experience",
    description:
      "A responsive product discovery experience with category browsing and clear product information.",
    stack: "Next.js · TypeScript · Tailwind CSS",
    image: "/images/bazar-dor.png",
    repo: "https://github.com/afiaafia/bazar-dor",
    live: "https://bazar-dor-pi.vercel.app/",
    accent: "text-emerald-300",
  },
  {
    number: "02",
    name: "Fit Log",
    category: "Workout discovery & planning",
    description:
      "An API-driven workout application with dynamic exercise details and workout planning.",
    stack: "Next.js · React · TypeScript · API",
    image: "/images/fit-log%20.png",
    repo: "https://github.com/afiaafia/b14-a6-fit-log",
    live: "https://b14-a6-fit-log-six.vercel.app/",
    accent: "text-[#ccff00]",
  },
  {
    number: "03",
    name: "Dev Stack Builder v2",
    category: "Developer tool",
    description:
      "A developer-focused project for exploring and assembling a web development stack.",
    stack: "Web Development · GitHub",
    image: "/images/dev-stack-builder.png",
    repo: "https://github.com/afiaafia/dev-stack-builder-v2",
    live: "",
    accent: "text-violet-300",
  },
];

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <div className="grid-background pointer-events-none absolute inset-0 opacity-60" />

      <div className="pointer-events-none absolute -top-48 left-1/2 size-128 -translate-x-1/2 rounded-full bg-violet-500/9 blur-[120px]" />
      <div className="pointer-events-none absolute -left-48 top-112 size-96 rounded-full bg-purple-500/10 blur-[110px]" />

      <section className="noise relative mx-auto max-w-350 px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:px-10 lg:pb-28 lg:pt-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-violet-400/25 bg-violet-500/8 px-3.5 py-2 backdrop-blur-xl">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-violet-400/60" />
                <span className="relative inline-flex size-2 rounded-full bg-violet-400" />
              </span>
              <span className="mono text-[10px] uppercase tracking-[0.16em] text-white/90">
                Building, learning, shipping
              </span>
            </div>

            <p className="mono mb-6 text-[11px] uppercase tracking-[0.22em] text-white/90">
              Afia Mubassira / Full-Stack Web Developer
            </p>

            <h1 className="display-heading text-3xl font-semibold leading-tight tracking-[-0.065em] sm:text-5xl lg:text-6xl">
              I BUILD FOR THE <span className="text-violet-400">WEB.</span>
            </h1>

            <p className="mt-8 max-w-xl text-sm leading-7 text-white/90 sm:text-base sm:leading-8">
              I build practical full-stack web applications, bringing frontend,
              backend, APIs, and databases together to solve real problems. Each
              project helps me sharpen my craft.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/#selected-work"
                className="group inline-flex items-center gap-2.5 rounded-full border border-violet-300/30 bg-violet-600 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_4px_22px_rgba(139,92,246,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-200/60 hover:bg-violet-500 hover:shadow-[0_10px_35px_rgba(139,92,246,0.38)] active:translate-y-0"
              >
                Explore projects
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/2.5 px-5 py-3.5 text-sm font-medium text-white/90 transition hover:border-white/25 hover:bg-white/6 hover:text-white"
              >
                GitHub profile
                <ArrowUpRight className="size-4" />
              </Link>

              <Link
                href="/resume"
                className="group inline-flex items-center gap-2 rounded-full border border-violet-300/30 bg-violet-400/6 px-5 py-3.5 text-sm font-medium text-white/90 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200/60 hover:bg-violet-500/15 hover:text-white"
              >
                View Resume
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          <InteractivePortrait />
        </div>
      </section>

      <section
        id="selected-work"
        className="relative mx-auto max-w-350 px-4 pb-12 sm:px-6 lg:px-10 lg:pb-16"
      >
        <div className="mb-6 flex flex-col justify-between gap-3 sm:mb-7 sm:flex-row sm:items-end">
          <div>
            <p className="mono flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/85">
              <span className="size-1.5 rounded-full bg-violet-400" />
              Portfolio / Selected work
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.06em] text-white sm:text-4xl">
              Featured <span className="text-violet-400">work.</span>
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-6 text-white/75">
              Practical projects, real implementation work, and the decisions
              behind building for the web.
            </p>
          </div>

          <Link
            href="/#selected-work"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-4 py-3 text-xs font-medium text-white/85 transition hover:border-violet-400/50 hover:text-white"
          >
            Explore all projects
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {projects.map((project) => (
            <article
              key={project.number}
              className="group grid min-w-0 gap-4 py-5 transition-colors sm:grid-cols-[52px_160px_minmax(0,1fr)] sm:items-center sm:gap-6 sm:py-6 lg:grid-cols-[64px_190px_minmax(0,1fr)] lg:gap-8"
            >
              <span
                className={`mono text-sm font-medium ${project.accent}`}
                aria-label={`Project ${project.number}`}
              >
                {project.number}
              </span>

              <a
                href={project.live || project.repo}
                target="_blank"
                rel="noreferrer"
                className="relative block aspect-16/10 w-full overflow-hidden rounded-xl border border-white/10 bg-white/3 sm:aspect-4/3"
                aria-label={`Open ${project.name}`}
              >
                <Image
                  src={project.image}
                  alt={`${project.name} project preview`}
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 160px, 190px"
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                />
              </a>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <p className="mono text-[10px] uppercase tracking-[0.14em] text-white/60">
                    {project.category}
                  </p>
                  <span className="mono text-[9px] uppercase tracking-[0.12em] text-violet-300/90">
                    {project.live ? "Live project" : "Source code"}
                  </span>
                </div>

                <h3 className="mt-2 text-lg font-semibold tracking-[-0.04em] text-white transition-colors group-hover:text-violet-300 sm:text-xl">
                  {project.name}
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">
                  {project.description}
                </p>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <p className="mono text-[10px] leading-5 text-white/65">
                    {project.stack}
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-white/85 transition hover:text-violet-300"
                    >
                      GitHub
                      <ArrowUpRight className="size-3.5" />
                    </a>

                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-violet-300 transition hover:text-white"
                      >
                        Live demo
                        <ArrowUpRight className="size-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 sm:pt-10">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mono text-[10px] uppercase tracking-[0.2em] text-violet-300/90">
                Behind the code / Build log
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-tighter text-white sm:text-2xl">
                Engineering notes.
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-white/70">
                Lessons from debugging, API integration, and the decisions that
                shape each implementation.
              </p>
            </div>
            <Link
              href="/build-log"
              className="inline-flex w-fit items-center gap-2 text-xs font-medium text-white/85 transition hover:text-violet-300"
            >
              Read the build log
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              {
                number: "01",
                title: "Debugging lessons",
                description: "Tracing issues and understanding the root cause.",
                href: "/build-log/debugging-lessons",
              },
              {
                number: "02",
                title: "Working with APIs",
                description:
                  "Connecting interfaces to real data and endpoints.",
                href: "/build-log/fit-log-api",
              },
              {
                number: "03",
                title: "Rendering & hydration",
                description: "Understanding rendering behavior and mismatches.",
                href: "/build-log/hydration-mismatch",
              },
            ].map((note) => (
              <Link
                key={note.number}
                href={note.href}
                className="group rounded-xl border border-white/10 bg-[#0b0c10]/70 p-4 transition hover:border-violet-400/30"
              >
                <span className="mono text-[10px] text-violet-300/90">
                  NOTE_{note.number}
                </span>
                <h4 className="mt-3 text-sm font-semibold text-white/90 transition group-hover:text-violet-300">
                  {note.title}
                </h4>
                <p className="mt-2 text-xs leading-6 text-white/65">
                  {note.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] text-white/60 transition group-hover:text-white/90">
                  Read note <ArrowUpRight className="size-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <StackLab />
      <ContactSection />
    </div>
  );
}
