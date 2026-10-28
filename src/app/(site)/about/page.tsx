import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  BrainCircuit,
  Code2,
  Compass,
  GraduationCap,
  Lightbulb,
  Terminal,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about my full-stack development journey, current work, interests, and future direction.",
};

const presentFocus = [
  "Full-stack web development",
  "JavaScript and TypeScript",
  "React and Next.js",
  "APIs and database integration",
];

const journeyPoints = [
  {
    number: "01",
    title: "Build the fundamentals",
    description:
      "I am developing my programming knowledge through structured learning, practice, and a deeper understanding of how web technologies work together.",
  },
  {
    number: "02",
    title: "Learn through projects",
    description:
      "Working on applications gives me a way to apply what I learn, solve implementation problems, and understand the decisions behind a working product.",
  },
  {
    number: "03",
    title: "Keep improving",
    description:
      "Each project gives me new questions to investigate, mistakes to learn from, and skills to strengthen for the next challenge.",
  },
];

const principles = [
  {
    number: "01",
    title: "Understand first",
    description:
      "I prefer to investigate a problem and understand its cause before choosing a solution.",
  },
  {
    number: "02",
    title: "Experiment and learn",
    description:
      "I learn by trying things, testing assumptions, and figuring out why something works or fails.",
  },
  {
    number: "03",
    title: "Improve through iteration",
    description:
      "I revisit my work, identify what can be better, and keep refining my approach.",
  },
];

const projects = [
  {
    number: "01",
    name: "Bazar Dor",
    image: "/images/bazar-dor.png",
    category: "MARKET PRICE WEB APP",
    description:
      "A product-focused web application with category browsing, sorting, product details, authentication, and a responsive interface.",
    technologies: "Next.js · TypeScript · Tailwind CSS · MongoDB",
    demo: "https://bazar-dor-pi.vercel.app/",
    source: "https://github.com/afiaafia/bazar-dor",
  },
  {
    number: "02",
    name: "Fit Log",
    image: "/images/fit-log%20.png",
    category: "WORKOUT LOGGING APP",
    description:
      "A workout application built around recording training sessions, exploring muscle groups, and working with API-provided data.",
    technologies: "Next.js · TypeScript · Tailwind CSS · API integration",
    demo: "https://b14-a6-fit-log-six.vercel.app/",
    source: "https://github.com/afiaafia/b14-a6-fit-log",
  },
];

export default function AboutPage() {
  return (
    <main className="relative isolate overflow-hidden bg-[#0B0A10] text-white">
      {/* Subtle background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -right-40 top-20 size-112 rounded-full bg-violet-500/[0.07] blur-[120px]" />
        <div className="absolute -left-40 top-220 size-96 rounded-full bg-violet-500/5 blur-[110px]" />
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-24 pt-12 sm:px-8 sm:pb-32 sm:pt-16">
        {/* Intro */}
        <section
          aria-labelledby="about-title"
          className="border-b border-white/10 pb-14 sm:pb-20"
        >
          <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.24em] text-violet-300">
            <span className="h-px w-7 bg-violet-300" />
            A little about me
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_280px] lg:items-end">
            <div>
              <h1
                id="about-title"
                className="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
              >
                Afia Mubassira
                <span className="text-violet-300">.</span>
              </h1>

              <p className="mt-3 text-sm font-medium tracking-wide text-violet-200/85 sm:text-base">
                Full-Stack Web Developer
              </p>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
                I&apos;m a Computer Science and Technology student interested
                in understanding how technology works and using that knowledge
                to build useful web applications. My current focus is
                full-stack development, while my curiosity extends to
                artificial intelligence, robotics, and emerging technologies.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/2.5 p-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/85">
                Currently
              </p>
              <div className="mt-4 flex items-start gap-3">
                <GraduationCap
                  size={19}
                  className="mt-0.5 shrink-0 text-violet-300"
                />
                <div>
                  <p className="text-sm font-medium text-white/85">
                    CST Diploma
                  </p>
                  <p className="mt-1 text-xs leading-5 text-white/85">
                    National Polytechnic Institute
                    <br />
                    Manikganj · 4th semester
                  </p>
                </div>
              </div>
              <div className="mt-5 flex items-start gap-3">
                <Terminal
                  size={18}
                  className="mt-0.5 shrink-0 text-violet-300"
                />
                <div>
                  <p className="text-sm font-medium text-white/85">
                    Learning by building
                  </p>
                  <p className="mt-1 text-xs leading-5 text-white/85">
                    Full-stack web development
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 01 — Present */}
        <section
          aria-labelledby="present-title"
          className="grid gap-8 border-b border-white/10 py-16 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"
        >
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-violet-300">
              01 / Present
            </p>
            <h2
              id="present-title"
              className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              What I&apos;m doing now.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/85">
              My current priority is strengthening my full-stack development
              skills and applying them to practical projects.
            </p>
          </div>

          <div>
            <div className="grid gap-0 sm:grid-cols-2 sm:gap-x-8">
              {presentFocus.map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-3 border-b border-white/10 py-4"
                >
                  <span className="font-mono text-xs text-violet-300/85">
                    0{index + 1}
                  </span>
                  <span className="text-sm text-white/85">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-7 flex items-start gap-3 rounded-xl border border-violet-300/15 bg-violet-300/4 p-4">
              <Code2
                size={20}
                className="mt-0.5 shrink-0 text-violet-300"
              />
              <p className="text-sm leading-6 text-white/85">
                I use projects to connect concepts with practice, from
                building interfaces to integrating APIs and working with
                application data.
              </p>
            </div>
          </div>
        </section>

        {/* 02 — Past */}
        <section
          aria-labelledby="past-title"
          className="grid gap-10 border-b border-white/10 py-16 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"
        >
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-violet-300">
              02 / Past
            </p>
            <h2
              id="past-title"
              className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              How I got here.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/85">
              My journey is built around learning the fundamentals, applying
              them, and gradually taking on more challenging work.
            </p>
          </div>

          <div className="relative space-y-8 border-l border-violet-300/20 pl-6 sm:pl-8">
            {journeyPoints.map((point) => (
              <article key={point.number} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-7.75 top-1.5 size-2.5 rounded-full border border-violet-300 bg-[#0B0A10] sm:-left-9.25"
                />
                <p className="font-mono text-[10px] tracking-[0.18em] text-violet-300/85">
                  {point.number}
                </p>
                <h3 className="mt-2 text-lg font-medium text-white">
                  {point.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-7 text-white/85">
                  {point.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* 03 — Future */}
        <section
          aria-labelledby="future-title"
          className="border-b border-white/10 py-16 sm:py-20"
        >
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-violet-300">
                03 / Future
              </p>
              <h2
                id="future-title"
                className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                What I want to explore.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-white/85">
                Web development is my current focus, but I am also interested
                in the technologies that may shape what comes next.
              </p>
            </div>

            <div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  {
                    title: "Artificial Intelligence",
                    description: "Systems that perform intelligent tasks.",
                  },
                  {
                    title: "Machine Learning",
                    description: "Learning patterns from data.",
                  },
                  {
                    title: "Deep Learning",
                    description: "Neural networks and complex models.",
                  },
                  {
                    title: "Robotics",
                    description: "Connecting software with the physical world.",
                  },
                ].map((interest) => (
                  <div
                    key={interest.title}
                    className="rounded-xl border border-white/10 bg-white/2.5 p-5 transition-colors duration-300 hover:border-violet-300/30"
                  >
                    <BrainCircuit
                      size={19}
                      className="text-violet-300"
                    />
                    <h3 className="mt-4 text-sm font-medium text-white/85">
                      {interest.title}
                    </h3>
                    <p className="mt-2 text-xs leading-6 text-white/85">
                      {interest.description}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-sm leading-7 text-white/85">
                I want to explore these areas more deeply as my technical
                foundation grows, with the long-term goal of building
                something meaningful using intelligent systems.
              </p>
            </div>
          </div>
        </section>

        {/* 04 — Personality */}
        <section
          aria-labelledby="personality-title"
          className="grid gap-10 border-b border-white/10 py-16 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"
        >
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-violet-300">
              04 / Personality
            </p>
            <h2
              id="personality-title"
              className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              How I think and work.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/85">
              I enjoy figuring out how things work, asking questions, and
              working through the details instead of stopping at the first
              solution.
            </p>
            <div className="mt-7 flex items-start gap-3">
              <Lightbulb
                size={20}
                className="mt-0.5 shrink-0 text-violet-300"
              />
              <p className="text-sm leading-7 text-white/85">
                Curiosity keeps me learning; patience helps me work through
                the difficult parts.
              </p>
            </div>
          </div>

          <div className="divide-y divide-white/10">
            {principles.map((principle) => (
              <article key={principle.number} className="py-5 first:pt-0">
                <div className="flex items-start gap-4">
                  <span className="pt-1 font-mono text-xs text-violet-300">
                    {principle.number}
                  </span>
                  <div>
                    <h3 className="text-base font-medium text-white">
                      {principle.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-white/85">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}

            <div className="flex items-start gap-4 py-5">
              <Compass
                size={19}
                className="mt-1 shrink-0 text-violet-300"
              />
              <div>
                <h3 className="text-base font-medium text-white">
                  Outside my current focus
                </h3>
                <p className="mt-2 text-sm leading-7 text-white/85">
                  I enjoy exploring ideas around emerging technology and
                  learning about fields beyond the tools I use every day.
                  I prefer to share personal hobbies only when they genuinely
                  reflect my interests.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 05 — Selected work */}
        <section
          aria-labelledby="work-title"
          className="pt-16 sm:pt-20"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-violet-300">
                05 / Selected work
              </p>
              <h2
                id="work-title"
                className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                Learning through building.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/85">
                A couple of projects where I have put my learning into
                practice.
              </p>
            </div>

            <Link
              href="/work"
              className="inline-flex w-fit items-center gap-2 text-sm text-white/85 transition-colors hover:text-violet-300"
            >
              View all projects
              <ArrowDownRight size={16} />
            </Link>
          </div>

          <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {projects.map((project) => (
              <article
                key={project.number}
                className="grid gap-5 py-7 sm:grid-cols-[44px_180px_minmax(0,1fr)_auto] sm:items-start sm:gap-6 sm:py-9"
              >
                <span className="font-mono text-xs text-violet-300">
                  {project.number}
                </span>

                <div className="relative aspect-16/10 w-full overflow-hidden rounded-xl border border-white/10 bg-[#171320] sm:w-45">
                  <Image
                    src={project.image}
                    alt={`${project.name} project screenshot`}
                    fill
                    sizes="(max-width: 639px) 100vw, 180px"
                    className="object-cover transition-transform duration-500 hover:scale-[1.03] motion-reduce:transition-none"
                  />
                </div>

                <div className="min-w-0">
                  <p className="font-mono text-[10px] tracking-[0.16em] text-white/85">
                    {project.category}
                  </p>
                  <h3 className="mt-2 text-xl font-medium text-white sm:text-2xl">
                    {project.name}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-white/85">
                    {project.description}
                  </p>
                  <p className="mt-3 text-xs leading-6 text-white/85">
                    {project.technologies}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 sm:flex-col sm:items-end">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-white/85 transition-colors hover:text-violet-300"
                  >
                    Live demo
                    <ArrowUpRight size={14} />
                  </a>
                  <a
                    href={project.source}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-white/85 transition-colors hover:text-violet-300"
                  >
                    Source code
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 border-l-2 border-violet-300/60 py-1 pl-5 sm:mt-16 sm:pl-7">
            <p className="max-w-2xl text-lg leading-8 tracking-tight text-white/85 sm:text-xl">
              Still learning. Still experimenting. Building a stronger
              foundation for the work I want to do next.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
