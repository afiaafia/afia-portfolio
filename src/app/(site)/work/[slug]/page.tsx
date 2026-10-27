import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, GitBranch } from "lucide-react";

type ProjectSlug = "bazar-dor" | "fit-log" | "dev-stack-builder";

type Project = {
  name: string;
  description: string;
  image: string;
  stack: string[];
  features: string[];
  live: string;
  repository: string;
};

const projects: Record<ProjectSlug, Project> = {
  "bazar-dor": {
    name: "Bazar Dor",
    description:
      "A responsive product discovery experience with category browsing and clear product information.",
    image: "/images/bazar-dor.png",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    features: [
      "Browse products by category",
      "Sort products by price",
      "View product and market-price details",
      "Sign in with email, Google, or GitHub",
      "Manage profile information",
    ],
    live: "https://bazar-dor-pi.vercel.app/",
    repository: "https://github.com/afiaafia/bazar-dor",
  },
  "fit-log": {
    name: "Fit Log",
    description:
      "An API-driven workout application with dynamic exercise details and workout planning.",
    image: "/images/fit-log%20.png",
    stack: ["Next.js", "React", "TypeScript", "API"],
    features: [
      "Browse workouts and detailed exercise information",
      "Add workouts to today's plan",
      "Save workouts for later",
      "Track workout time, exercise count, and estimated calories",
      "Keep plan and completion data in browser storage",
    ],
    live: "https://b14-a6-fit-log-six.vercel.app/",
    repository: "https://github.com/afiaafia/b14-a6-fit-log",
  },
  "dev-stack-builder": {
    name: "Dev Stack Builder v2",
    description:
      "A developer-focused project exploring interactive stack configuration and practical frontend engineering.",
    image: "/images/dev-stack-builder.png",
    stack: ["React", "TypeScript", "Frontend"],
    features: [
      "Explore interactive stack configuration",
      "Use developer-focused frontend tooling",
    ],
    live: "https://dev-stack-builder-v2.vercel.app/",
    repository: "https://github.com/afiaafia/dev-stack-builder-v2",
  },
};

type WorkPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function WorkDetailPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const project = projects[slug as ProjectSlug];

  if (!project) notFound();

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="grid-background pointer-events-none" />
      <div className="pointer-events-none absolute -right-40 top-10 size-105 rounded-full bg-violet-500/8 blur-[130px]" />

      <section className="relative mx-auto max-w-7xl px-5 pb-20 pt-10 sm:px-8 sm:pb-28 sm:pt-14">
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-violet-300"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Back to Work
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div className="animate-in fade-in slide-in-from-bottom-3 duration-700">
            <p className="mono flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-violet-300">
              <span className="size-1.5 rounded-full bg-violet-400" />
              Featured project
            </p>

            <h1 className="display-heading mt-5 text-4xl font-semibold leading-[1.02] text-white sm:text-6xl">
              {project.name}
              <span className="text-violet-400">.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
              {project.description}
            </p>

            <section className="mt-8" aria-labelledby="project-features">
              <h2
                id="project-features"
                className="mono text-[10px] uppercase tracking-[0.18em] text-white/45"
              >
                Key Features
              </h2>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-3 text-sm leading-6 text-white/75"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-violet-400"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-8">
              <p className="mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                Technology stack
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((technology) => (
                  <li
                    key={technology}
                    className="rounded-lg border border-violet-300/15 bg-violet-400/6 px-3 py-2 text-xs text-white/80"
                  >
                    {technology}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-xl bg-violet-500 px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-400 hover:shadow-[0_8px_30px_rgba(139,92,246,0.22)]"
              >
                Live Demo
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href={project.repository}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/2.5 px-5 py-3 text-sm font-medium text-white/85 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-300/35 hover:bg-violet-400/6 hover:text-white"
              >
                <GitBranch className="size-4" />
                GitHub Repository
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-3 duration-700 delay-150">
            <div className="group relative aspect-16/10 overflow-hidden rounded-2xl border border-white/10 bg-white/2.5 shadow-2xl shadow-black/30">
              <Image
                src={project.image}
                alt={`${project.name} project screenshot`}
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 48vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
