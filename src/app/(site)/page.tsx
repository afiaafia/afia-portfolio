import Link from "next/link"
import { ArrowDownRight, ArrowUpRight, Code2 } from "lucide-react"

import { siteConfig } from "@/config/site"
import { StackLab } from "@/components/stack/stack-lab"

const projects = [
  {
    number: "01",
    name: "Fit Log",
    description:
      "Workout discovery and planning application built around API-driven data, dynamic pages, and responsive UI.",
    stack: "Next.js · React · TypeScript",
    href: "/work/fit-log",
  },
  {
    number: "02",
    name: "Task Vault",
    description:
      "Backend-focused task management project built to practice APIs, validation, TypeScript, and MongoDB.",
    stack: "Node.js · Express · MongoDB",
    href: "/work/task-vault",
  },
]

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <div className="grid-background" />

      <section className="noise relative mx-auto max-w-[1400px] px-4 pb-20 pt-14 sm:px-6 sm:pt-20 lg:px-10 lg:pb-28 lg:pt-24">
        <div className="grid items-end gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
          <div>
            <div className="mb-8 flex items-center gap-3">
              <span className="flex items-center gap-2 rounded-full border border-[#ccff00]/15 bg-[#ccff00]/5 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-[#ccff00]">
                <span className="size-1.5 rounded-full bg-[#ccff00] shadow-[0_0_10px_rgba(204,255,0,0.8)]" />
                System online
              </span>

              <span className="mono hidden text-[10px] text-white/25 sm:inline">
                /home
              </span>
            </div>

            <p className="mono mb-5 text-xs uppercase tracking-[0.22em] text-white/35">
              Afia A. — Full-Stack Web Developer
            </p>

            <h1 className="display-heading max-w-5xl text-5xl font-semibold leading-[0.9] sm:text-7xl lg:text-[7.25rem]">
              BUILD.
              <br />
              <span className="text-white/25">LEARN.</span>
              <br />
              REPEAT.
            </h1>

            <p className="mt-8 max-w-xl text-base leading-7 text-white/55 sm:text-lg">
              I build practical web applications while learning how modern
              frontend, backend, APIs, and databases fit together.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-5 py-3 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
              >
                Explore work
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-5 py-3 text-sm font-medium text-white/75 transition-colors hover:border-white/20 hover:text-white"
              >
                GitHub
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>

          <div className="lg:pb-3">
            <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0f11]/85 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-white/20" />
                  <span className="size-2 rounded-full bg-white/20" />
                  <span className="size-2 rounded-full bg-white/20" />
                </div>

                <span className="mono text-[10px] text-white/25">
                  developer.workspace
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <div className="mono space-y-4 text-xs leading-6">
                  <div>
                    <span className="text-[#ccff00]">$</span>{" "}
                    <span className="text-white/70">whoami</span>
                    <p className="pl-4 text-white/45">
                      afia — full-stack web developer
                    </p>
                  </div>

                  <div>
                    <span className="text-[#ccff00]">$</span>{" "}
                    <span className="text-white/70">focus</span>
                    <p className="pl-4 text-white/45">
                      React · Next.js · TypeScript
                    </p>
                    <p className="pl-4 text-white/45">
                      Node.js · Express · MongoDB
                    </p>
                  </div>

                  <div>
                    <span className="text-[#ccff00]">$</span>{" "}
                    <span className="text-white/70">principle</span>
                    <p className="pl-4 text-white/45">
                      learn by building
                    </p>
                  </div>

                  <div className="border-t border-white/[0.07] pt-4">
                    <div className="flex items-center gap-2 text-white/35">
                      <Code2 className="size-3.5 text-[#ccff00]" />
                      <span>workspace ready</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid border-y border-white/[0.07] sm:grid-cols-3">
          <div className="border-b border-white/[0.07] px-0 py-5 sm:border-b-0 sm:border-r sm:px-6">
            <p className="mono text-[10px] uppercase tracking-[0.18em] text-white/25">
              Current mode
            </p>
            <p className="mt-2 text-sm font-medium text-white/75">
              Full-Stack Web Development
            </p>
          </div>

          <div className="border-b border-white/[0.07] px-0 py-5 sm:border-b-0 sm:border-r sm:px-6">
            <p className="mono text-[10px] uppercase tracking-[0.18em] text-white/25">
              Shipped work
            </p>
            <p className="mt-2 text-sm font-medium text-white/75">
              02 featured projects
            </p>
          </div>

          <div className="px-0 py-5 sm:px-6">
            <p className="mono text-[10px] uppercase tracking-[0.18em] text-white/25">
              Code
            </p>
            <p className="mt-2 text-sm font-medium text-white/75">
              GitHub · Open to opportunities
            </p>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[1400px] px-4 pb-24 sm:px-6 lg:px-10 lg:pb-32">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="mono text-[10px] uppercase tracking-[0.2em] text-white/25">
              Selected work
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              Things I&apos;ve built.
            </h2>
          </div>

          <Link
            href="/work"
            className="hidden items-center gap-2 text-xs font-medium text-white/45 transition-colors hover:text-white sm:flex"
          >
            View all work
            <ArrowDownRight className="size-4" />
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.number}
              href={project.href}
              className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition-all hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.035] sm:p-6"
            >
              <div className="flex items-center justify-between">
                <span className="mono text-[10px] tracking-[0.18em] text-white/25">
                  {project.number}
                </span>

                <ArrowUpRight className="size-4 text-white/25 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#ccff00]" />
              </div>

              <div className="mt-20 max-w-lg">
                <h3 className="text-2xl font-semibold tracking-[-0.04em] text-white">
                  {project.name}
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/45">
                  {project.description}
                </p>

                <p className="mono mt-6 text-[10px] uppercase tracking-[0.12em] text-white/30">
                  {project.stack}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <StackLab />
    </div>
  )
}
