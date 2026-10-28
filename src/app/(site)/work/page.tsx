import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    number: "01",
    slug: "bazar-dor",
    name: "Bazar Dor",
    description:
      "A responsive product discovery experience with category browsing and clear product information.",
    image: "/images/bazar-dor.png",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    live: "https://bazar-dor-pi.vercel.app/",
    repository: "https://github.com/afiaafia/bazar-dor",
  },
  {
    number: "02",
    slug: "fit-log",
    name: "Fit Log",
    description:
      "An API-driven workout application with dynamic exercise details and workout planning.",
    image: "/images/fit-log%20.png",
    technologies: ["Next.js", "React", "TypeScript", "API"],
    live: "https://b14-a6-fit-log-six.vercel.app/",
    repository: "https://github.com/afiaafia/b14-a6-fit-log",
  },
  {
    number: "03",
    slug: "dev-stack-builder",
    name: "Dev Stack Builder v2",
    description:
      "A developer-focused project for exploring and assembling a web development stack.",
    image: "/images/dev-stack-builder.png",
    technologies: ["Web Development", "GitHub"],
    live: "https://dev-stack-builder-v2.vercel.app/",
    repository: "https://github.com/afiaafia/dev-stack-builder-v2",
  },
];

export default function WorkPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="grid-background pointer-events-none opacity-70" />

      <section className="noise relative mx-auto max-w-7xl px-5 pb-20 pt-14 sm:px-8 sm:pb-28 sm:pt-20">
        <header className="mb-10 max-w-2xl sm:mb-14">
          <p className="mono flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-violet-300">
            <span className="size-1.5 rounded-full bg-violet-400" />
            Portfolio / Work
          </p>
          <h1
            id="work-heading"
            className="display-heading mt-4 text-4xl font-semibold leading-[1.02] text-white sm:text-5xl lg:text-6xl"
          >
            Selected <span className="text-violet-400">Work.</span>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
            A selection of projects across product discovery, workout planning,
            and developer tooling.
          </p>
        </header>

        <div
          aria-labelledby="work-heading"
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {projects.map((project) => (
            <article
              key={project.slug}
              className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/2.5 transition duration-300 hover:-translate-y-1 hover:border-violet-300/30 hover:bg-white/4 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <Link
                href={`/work/${project.slug}`}
                aria-label={`View ${project.name} project details`}
                className="relative block aspect-16/10 overflow-hidden bg-[#171320]"
              >
                <Image
                  src={project.image}
                  alt={`${project.name} project screenshot`}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10"
                />
              </Link>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="mono text-[10px] uppercase tracking-[0.16em] text-violet-300/80">
                  Project {project.number}
                </p>
                <h2 className="mt-3 text-xl font-semibold text-white transition-colors group-hover:text-violet-200 sm:text-2xl">
                  {project.name}
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  {project.description}
                </p>

                <ul
                  aria-label={`${project.name} technologies`}
                  className="mt-5 flex flex-wrap gap-2"
                >
                  {project.technologies.map((technology) => (
                    <li
                      key={technology}
                      className="rounded-md border border-violet-300/15 bg-violet-400/6 px-2.5 py-1.5 text-[11px] text-white/75"
                    >
                      {technology}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/[0.07] pt-5">
                  <Link
                    href={`/work/${project.slug}`}
                    aria-label={`View ${project.name} project details`}
                    className="group/action inline-flex items-center gap-1.5 text-sm font-medium text-violet-300 transition-colors hover:text-violet-200"
                  >
                    Details
                    <ArrowUpRight className="size-4 transition-transform group-hover/action:-translate-y-0.5 group-hover/action:translate-x-0.5 motion-reduce:transition-none" />
                  </Link>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Live Demo for ${project.name} (opens in a new tab)`}
                    className="inline-flex items-center gap-1 text-sm text-white/70 transition-colors hover:text-white motion-reduce:transition-none"
                  >
                    Live Demo
                    <ArrowUpRight className="size-3.5" />
                  </a>
                  <a
                    href={project.repository}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`GitHub repository for ${project.name} (opens in a new tab)`}
                    className="inline-flex items-center gap-1 text-sm text-white/70 transition-colors hover:text-white motion-reduce:transition-none"
                  >
                    GitHub
                    <ArrowUpRight className="size-3.5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
