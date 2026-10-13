import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowDownRight,
  ArrowUpRight,
  Bug,
  Code2,
  GitBranch,
  Layers3,
} from "lucide-react"

export const metadata: Metadata = {
  title: "About",
  description:
    "My approach to full-stack web development, learning, and building projects.",
}

const principles = [
  {
    number: "01",
    title: "Build with purpose",
    description: "Focus on useful features and clear user experiences.",
    icon: Code2,
  },
  {
    number: "02",
    title: "Debug systematically",
    description: "Understand the problem before reaching for a fix.",
    icon: Bug,
  },
  {
    number: "03",
    title: "Improve through iteration",
    description: "Refine code, learn from mistakes, and keep improving.",
    icon: GitBranch,
  },
]

const journey = [
  {
    title: "Start with the fundamentals",
    description:
      "Build a strong foundation in web development, from core concepts to modern tools.",
  },
  {
    title: "Learn by building",
    description:
      "Apply new skills through hands-on projects, API integration, and debugging.",
  },
  {
    title: "Keep moving forward",
    description:
      "Strengthen full-stack skills by improving existing work and tackling new challenges.",
  },
]

const projects = [
  {
    number: "01",
    name: "Bazar Dor",
    type: "Market price web app",
    description:
      "A product-focused application for browsing everyday essentials and tracking price changes.",
    href: "https://bazar-dor-pi.vercel.app/",
    stack: "Next.js · TypeScript · MongoDB",
  },
  {
    number: "02",
    name: "Fit Log",
    type: "Workout tracking app",
    description:
      "A workout logging application built around recording training sessions and exploring muscle groups.",
    href: "https://fit-log-sandy.vercel.app/",
    stack: "Next.js · TypeScript · API integration",
  },
]

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
      {/* 01 — Introduction */}
      <section
        aria-labelledby="about-heading"
        className="grid items-center gap-10 border-b border-white/10 pb-20 md:grid-cols-[1.2fr_0.8fr] md:gap-16 md:pb-28"
      >
        <div className="max-w-2xl">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.24em] text-violet-300">
            01 / A little about me
          </p>

          <h1
            id="about-heading"
            className="text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-7xl"
          >
            I build for the{" "}
            <span className="text-violet-300">web.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-white/65 sm:text-lg">
            I’m a full-stack web development student focused on building
            useful applications, understanding how things work, and turning
            what I learn into working projects.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-violet-300/15 bg-white/[0.025] p-7 sm:p-9">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-violet-500/15 blur-3xl"
          />
          <div className="relative">
            <div className="mb-10 flex h-12 w-12 items-center justify-center rounded-xl border border-violet-300/20 bg-violet-400/10 text-violet-300">
              <Code2 size={23} strokeWidth={1.7} />
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/45">
              Current focus
            </p>
            <p className="mt-4 text-xl font-medium text-white sm:text-2xl">
              Full-stack development
            </p>
            <p className="mt-3 text-sm leading-7 text-white/55">
              React · Next.js · TypeScript
              <br />
              Node.js · Express · MongoDB
            </p>
            <div className="mt-8 h-px bg-white/10" />
            <p className="mt-5 text-sm text-violet-200/80">
              Learn through building. Improve through iteration.
            </p>
          </div>
        </div>
      </section>

      {/* 02 — How I work */}
      <section
        aria-labelledby="approach-heading"
        className="border-b border-white/10 py-20 sm:py-24"
      >
        <div className="mb-10 max-w-xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.24em] text-violet-300">
            02 / My approach
          </p>
          <h2
            id="approach-heading"
            className="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            How I work.
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-3 sm:gap-6">
          {principles.map((item) => {
            const Icon = item.icon

            return (
              <article key={item.number} className="border-t border-white/15 pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs tabular-nums text-violet-300">
                    {item.number}
                  </span>
                  <Icon size={19} className="text-white/45" />
                </div>
                <h3 className="mt-6 text-lg font-medium text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/55">
                  {item.description}
                </p>
              </article>
            )
          })}
        </div>
      </section>

      {/* 03 — Journey */}
      <section
        aria-labelledby="journey-heading"
        className="grid gap-10 border-b border-white/10 py-20 sm:py-24 md:grid-cols-[0.8fr_1.2fr] md:gap-16"
      >
        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.24em] text-violet-300">
            03 / My journey
          </p>
          <h2
            id="journey-heading"
            className="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            Progress, one project at a time.
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/55">
            I’m developing my skills through structured learning and practical
            work, with a focus on understanding the process—not just the result.
          </p>
        </div>

        <div className="relative space-y-8 border-l border-violet-300/25 pl-6 sm:pl-8">
          {journey.map((item, index) => (
            <article key={item.title} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border border-violet-300 bg-[#111014] sm:-left-[37px]"
              />
              <p className="text-xs uppercase tracking-[0.16em] text-white/40">
                STEP 0{index + 1}
              </p>
              <h3 className="mt-2 text-lg font-medium text-white">
                {item.title}
              </h3>
              <p className="mt-2 max-w-lg text-sm leading-7 text-white/55">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* 04 — Selected projects */}
      <section aria-labelledby="projects-heading" className="pt-20 sm:pt-24">
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.24em] text-violet-300">
              04 / Learning by building
            </p>
            <h2
              id="projects-heading"
              className="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            >
              Work that shows my progress.
            </h2>
          </div>
          <Link
            href="/work"
            className="inline-flex w-fit items-center gap-2 text-sm text-white/65 transition-colors hover:text-violet-300"
          >
            Explore all work <ArrowDownRight size={16} />
          </Link>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {projects.map((project) => (
            <article
              key={project.number}
              className="grid gap-4 py-7 sm:grid-cols-[56px_1fr_auto] sm:items-start sm:gap-6 sm:py-8"
            >
              <span className="pt-1 text-xs tabular-nums text-violet-300">
                {project.number}
              </span>

              <div>
                <p className="text-xs text-white/40">{project.type}</p>
                <h3 className="mt-2 text-xl font-medium text-white">
                  {project.name}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">
                  {project.description}
                </p>
                <p className="mt-4 text-xs leading-6 text-white/40">
                  {project.stack}
                </p>
              </div>

              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit ${project.name} (opens in a new tab)`}
                className="inline-flex w-fit items-center gap-2 text-sm text-violet-300 transition-colors hover:text-violet-200 sm:mt-1"
              >
                View project <ArrowUpRight size={16} />
              </a>
            </article>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-3 text-sm text-white/45">
          <Layers3 size={17} className="shrink-0 text-violet-300" />
          <p>Each project is an opportunity to learn, test, and improve.</p>
        </div>
      </section>
    </main>
  )
}
