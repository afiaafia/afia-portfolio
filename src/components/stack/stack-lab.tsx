"use client"

import { useState } from "react"
import {
  Braces,
  Check,
  ChevronRight,
  Database,
  GitBranch,
  Globe,
  Layers3,
  Server,
  Terminal,
  Wrench,
} from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

type Category = "Frontend" | "Backend" | "Database" | "Tools"

type Technology = {
  name: string
  category: Category
  description: string
  evidence: string[]
  projects: string[]
  icon: typeof Braces
}

const technologies: Technology[] = [
  {
    name: "React",
    category: "Frontend",
    description:
      "Component-driven UI development with reusable interfaces and interactive state.",
    evidence: [
      "Reusable component architecture",
      "Interactive client-side UI",
      "State-driven interfaces",
    ],
    projects: ["Fit Log", "AFIA.OS Portfolio"],
    icon: Braces,
  },
  {
    name: "Next.js",
    category: "Frontend",
    description:
      "Full-stack React framework used for routing, layouts, rendering, and production web apps.",
    evidence: [
      "App Router",
      "Dynamic routes",
      "Server and client components",
      "Metadata and image optimization",
    ],
    projects: ["Fit Log", "AFIA.OS Portfolio"],
    icon: Globe,
  },
  {
    name: "TypeScript",
    category: "Frontend",
    description:
      "Typed JavaScript used to make application code safer and easier to maintain.",
    evidence: [
      "Typed React components",
      "API response types",
      "Function and data modeling",
    ],
    projects: ["Fit Log", "Task Vault", "AFIA.OS Portfolio"],
    icon: Layers3,
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    description:
      "Utility-first styling for responsive interfaces and consistent design systems.",
    evidence: [
      "Responsive layouts",
      "Component styling",
      "Design tokens and utility composition",
    ],
    projects: ["Fit Log", "AFIA.OS Portfolio"],
    icon: Layers3,
  },
  {
    name: "Node.js",
    category: "Backend",
    description:
      "JavaScript runtime used for backend services and API development.",
    evidence: [
      "Backend runtime",
      "API development",
      "Server-side JavaScript",
    ],
    projects: ["Task Vault"],
    icon: Server,
  },
  {
    name: "Express",
    category: "Backend",
    description:
      "Backend framework used to structure HTTP APIs, middleware, and request handling.",
    evidence: [
      "REST API routes",
      "Middleware",
      "Request validation",
    ],
    projects: ["Task Vault"],
    icon: Server,
  },
  {
    name: "MongoDB",
    category: "Database",
    description:
      "Document database used to persist application data in backend projects.",
    evidence: [
      "Document-based data modeling",
      "Persistent task data",
      "Backend database integration",
    ],
    projects: ["Task Vault"],
    icon: Database,
  },
  {
    name: "Git & GitHub",
    category: "Tools",
    description:
      "Version control and collaboration workflow used throughout the development process.",
    evidence: [
      "Incremental commits",
      "Repository-based development",
      "Project documentation",
    ],
    projects: ["All active projects"],
    icon: GitBranch,
  },
]

const categories: Array<"All" | Category> = [
  "All",
  "Frontend",
  "Backend",
  "Database",
  "Tools",
]

const categoryIcons = {
  Frontend: Braces,
  Backend: Server,
  Database,
  Tools: Wrench,
}

const categoryDescriptions = {
  Frontend: "Interfaces, rendering, components",
  Backend: "APIs, runtime, server logic",
  Database: "Persistence and data modeling",
  Tools: "Workflow, version control, deployment",
}

export function StackLab() {
  const [activeCategory, setActiveCategory] = useState<"All" | Category>(
    "All",
  )
  const [selectedTechnology, setSelectedTechnology] =
    useState<Technology | null>(technologies[1])

  const prefersReducedMotion = useReducedMotion()

  const visibleTechnologies =
    activeCategory === "All"
      ? technologies
      : technologies.filter(
          (technology) => technology.category === activeCategory,
        )

  return (
    <section
      id="stack"
      className="relative mx-auto max-w-[1400px] scroll-mt-24 px-4 pb-24 sm:px-6 lg:px-10 lg:pb-32"
    >
      <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mono text-[10px] uppercase tracking-[0.2em] text-white/80">
            06 / Stack
          </p>

          <h2 className="mt-3 max-w-2xl text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
            A stack I actually build with.
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-6 text-white/90">
            Not a list of logos. Each technology connects to something I have
            actually built, practiced, or used.
          </p>
        </div>

        <div className="mono hidden text-[10px] uppercase tracking-[0.16em] text-white/80 sm:block">
          evidence.system / online
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0b0d0f]/90">
        <div className="relative overflow-hidden border-b border-white/[0.07] px-5 py-6 sm:px-7 sm:py-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(204,255,0,0.07),transparent_28rem)]" />

          <div className="relative grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-2 animate-ping rounded-full bg-[#ccff00]/50" />
                  <span className="relative inline-flex size-2 rounded-full bg-[#ccff00]" />
                </span>

                <span className="mono text-[10px] uppercase tracking-[0.18em] text-[#ccff00]">
                  Current focus
                </span>
              </div>

              <motion.div
                key={selectedTechnology?.name}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                <h3 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                  {selectedTechnology?.name ?? "Next.js"}
                </h3>

                <p className="mt-3 max-w-md text-sm leading-6 text-white/90">
                  {selectedTechnology?.description}
                </p>
              </motion.div>
            </div>

            <div className="relative min-h-[150px] overflow-hidden rounded-2xl border border-white/[0.07] bg-black/20 p-5">
              <div className="mono mb-5 flex items-center justify-between text-[9px] uppercase tracking-[0.15em] text-white/80">
                <span>frontend</span>
                <span>backend</span>
                <span>data</span>
              </div>

              <div className="relative mt-8 h-px bg-white/[0.08]">
                <motion.div
                  className="absolute -top-[3px] size-[7px] rounded-full bg-[#ccff00] shadow-[0_0_16px_rgba(204,255,0,0.9)]"
                  animate={
                    prefersReducedMotion
                      ? { left: "15%" }
                      : { left: ["8%", "45%", "88%", "45%", "8%"] }
                  }
                  transition={
                    prefersReducedMotion
                      ? undefined
                      : {
                          duration: 5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                  }
                />

                <div className="absolute -top-1.5 left-[15%] size-3 rounded-full border border-white/20 bg-[#0b0d0f]" />
                <div className="absolute -top-1.5 left-1/2 size-3 rounded-full border border-white/20 bg-[#0b0d0f]" />
                <div className="absolute -top-1.5 right-[8%] size-3 rounded-full border border-white/20 bg-[#0b0d0f]" />
              </div>

              <div className="mono mt-6 grid grid-cols-3 text-[9px] uppercase tracking-[0.12em] text-white/80">
                <span>UI</span>
                <span className="text-center">API</span>
                <span className="text-right">DB</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-white/[0.07] p-4 sm:p-5">
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((category) => {
              const isActive = activeCategory === category

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 rounded-full border px-3.5 py-2 text-[11px] font-medium transition-colors ${
                    isActive
                      ? "border-[#ccff00]/30 bg-[#ccff00]/10 text-[#ccff00]"
                      : "border-white/[0.07] bg-white/[0.02] text-white/90 hover:border-white/15 hover:text-white/85"
                  }`}
                >
                  {category}
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
          <div className="p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="mono text-[9px] uppercase tracking-[0.16em] text-white/80">
                Technologies
              </span>

              <span className="mono text-[9px] text-white/80">
                {visibleTechnologies.length.toString().padStart(2, "0")} items
              </span>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              {visibleTechnologies.map((technology, index) => {
                const Icon = technology.icon
                const isSelected = selectedTechnology?.name === technology.name

                return (
                  <motion.button
                    key={technology.name}
                    type="button"
                    onClick={() => setSelectedTechnology(technology)}
                    initial={
                      prefersReducedMotion
                        ? false
                        : { opacity: 0, y: 14 }
                    }
                    whileInView={
                      prefersReducedMotion
                        ? undefined
                        : { opacity: 1, y: 0 }
                    }
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{
                      duration: 0.35,
                      delay: prefersReducedMotion ? 0 : index * 0.045,
                    }}
                    whileHover={
                      prefersReducedMotion
                        ? undefined
                        : { y: -2 }
                    }
                    whileTap={{ scale: 0.985 }}
                    className={`group relative overflow-hidden rounded-xl border p-4 text-left transition-colors ${
                      isSelected
                        ? "border-[#ccff00]/20 bg-[#ccff00]/[0.045]"
                        : "border-white/[0.06] bg-white/[0.015] hover:border-white/[0.12]"
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="active-stack-line"
                        className="absolute left-0 top-0 h-full w-px bg-[#ccff00]"
                      />
                    )}

                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex size-9 items-center justify-center rounded-lg border ${
                            isSelected
                              ? "border-[#ccff00]/20 bg-[#ccff00]/10 text-[#ccff00]"
                              : "border-white/[0.07] bg-white/[0.025] text-white/90"
                          }`}
                        >
                          <Icon className="size-4" />
                        </span>

                        <div>
                          <p className="text-sm font-medium text-white/90">
                            {technology.name}
                          </p>

                          <p className="mono mt-1 text-[9px] uppercase tracking-[0.12em] text-white/80">
                            {technology.category}
                          </p>
                        </div>
                      </div>

                      <ChevronRight
                        className={`mt-2 size-3.5 transition-transform ${
                          isSelected
                            ? "translate-x-0 text-[#ccff00]"
                            : "text-white/80 group-hover:translate-x-0.5"
                        }`}
                      />
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>

          <div className="border-t border-white/[0.07] bg-black/15 p-5 sm:p-6 lg:border-l lg:border-t-0">
            {selectedTechnology && (
              <motion.div
                key={selectedTechnology.name}
                initial={prefersReducedMotion ? false : { opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2">
                  <Terminal className="size-3.5 text-[#ccff00]" />
                  <span className="mono text-[9px] uppercase tracking-[0.16em] text-white/80">
                    Evidence
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-white">
                  {selectedTechnology.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/90">
                  {selectedTechnology.description}
                </p>

                <div className="mt-6 space-y-2">
                  {selectedTechnology.evidence.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-white/80"
                    >
                      <Check className="mt-0.5 size-3.5 shrink-0 text-[#ccff00]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-7 border-t border-white/[0.07] pt-5">
                  <p className="mono text-[9px] uppercase tracking-[0.16em] text-white/80">
                    Used in
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedTechnology.projects.map((project) => (
                      <span
                        key={project}
                        className="rounded-full border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 text-[10px] text-white/80"
                      >
                        {project}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-4">
        {(Object.keys(categoryDescriptions) as Category[]).map((category) => {
          const Icon = categoryIcons[category]

          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className="group rounded-xl border border-white/[0.06] bg-white/[0.015] p-4 text-left transition-colors hover:border-white/[0.12]"
            >
              <div className="flex items-center justify-between">
                <Icon className="size-4 text-white/80 transition-colors group-hover:text-[#ccff00]" />
                <ChevronRight className="size-3 text-white/80" />
              </div>

              <p className="mt-5 text-sm font-medium text-white/90">
                {category}
              </p>

              <p className="mt-1 text-xs leading-5 text-white/80">
                {categoryDescriptions[category]}
              </p>
            </button>
          )
        })}
      </div>
    </section>
  )
}
