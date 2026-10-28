"use client"

import { useRef, useState } from "react"
import {
  ArrowDownRight,
  ArrowUpRight,
  ExternalLink,
  FolderKanban,
  GitBranch,
  Grip,
  Move,
  RotateCcw,
} from "lucide-react"

type Project = {
  id: string
  number: string
  name: string
  category: string
  description: string
  detail: string
  url: string
  linkLabel: string
  icon: "store" | "fitness" | "code"
  x: number
  y: number
  accent: string
}

const initialProjects: Project[] = [
  {
    id: "bazar-dor",
    number: "01",
    name: "Bazar Dor",
    category: "PRODUCT DISCOVERY",
    description:
      "A product discovery experience focused on exploring products and price trends.",
    detail:
      "Explore the live interface and see how product information is presented in a dedicated web experience.",
    url: "https://bazar-dor-pi.vercel.app/",
    linkLabel: "Open live project",
    icon: "store",
    x: 225,
    y: 125,
    accent: "#CCFF00",
  },
  {
    id: "fit-log",
    number: "02",
    name: "Fit Log",
    category: "WORKOUT PLANNING",
    description:
      "A workout discovery and planning application with dynamic content.",
    detail:
      "Visit the deployed application to explore its workout library and planning experience.",
    url: "https://b14-a6-fit-log-six.vercel.app/",
    linkLabel: "Open live project",
    icon: "fitness",
    x: 755,
    y: 145,
    accent: "#B9A5FF",
  },
  {
    id: "restaurant-menu-a",
    number: "03",
    name: "Restaurant Menu A",
    category: "GITHUB REPOSITORY",
    description:
      "A restaurant menu project, presented here through its source repository.",
    detail:
      "Open the GitHub repository to inspect the project's source code.",
    url: "https://github.com/afiaafia/restaurant-menu-a",
    linkLabel: "View source on GitHub",
    icon: "code",
    x: 480,
    y: 390,
    accent: "#82D9C2",
  },
]

const connections = [
  ["bazar-dor", "fit-log"],
  ["fit-log", "restaurant-menu-a"],
  ["restaurant-menu-a", "bazar-dor"],
] as const

function ProjectGlyph({ project }: { project: Project }) {
  if (project.icon === "store") {
    return <FolderKanban className="size-5" strokeWidth={1.6} />
  }
  if (project.icon === "fitness") {
    return <Move className="size-5" strokeWidth={1.6} />
  }
  return <GitBranch className="size-5" strokeWidth={1.6} />
}

export function ProjectUniverse() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const draggedRef = useRef(false)
  const [projects, setProjects] = useState(initialProjects)
  const [activeId, setActiveId] = useState("bazar-dor")
  const [dragging, setDragging] = useState<{
    id: string
    pointerX: number
    pointerY: number
    originX: number
    originY: number
  } | null>(null)

  const activeProject =
    projects.find((project) => project.id === activeId) ?? projects[0]

  function startDrag(
    event: React.PointerEvent<HTMLButtonElement>,
    project: Project,
  ) {
    if (event.button !== 0) return
    draggedRef.current = false
    event.stopPropagation()
    setActiveId(project.id)
    event.currentTarget.setPointerCapture(event.pointerId)
    setDragging({
      id: project.id,
      pointerX: event.clientX,
      pointerY: event.clientY,
      originX: project.x,
      originY: project.y,
    })
  }

  function moveNode(event: React.PointerEvent<HTMLButtonElement>) {
    if (!dragging || !canvasRef.current) return
    if (
      Math.hypot(
        event.clientX - dragging.pointerX,
        event.clientY - dragging.pointerY,
      ) > 5
    ) {
      draggedRef.current = true
    }
    const rect = canvasRef.current.getBoundingClientRect()
    const deltaX = ((event.clientX - dragging.pointerX) / rect.width) * 1000
    const deltaY = ((event.clientY - dragging.pointerY) / rect.height) * 520

    setProjects((current) =>
      current.map((project) =>
        project.id === dragging.id
          ? {
              ...project,
              x: Math.max(95, Math.min(905, dragging.originX + deltaX)),
              y: Math.max(65, Math.min(455, dragging.originY + deltaY)),
            }
          : project,
      ),
    )
  }

  function handleProjectClick(project: Project) {
    if (draggedRef.current) {
      draggedRef.current = false
      return
    }
    setActiveId(project.id)
    window.open(project.url, "_blank", "noopener,noreferrer")
  }

  function resetUniverse() {
    setProjects(initialProjects)
    setActiveId("bazar-dor")
    setDragging(null)
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="grid-background pointer-events-none" />

      <section className="relative mx-auto max-w-350 px-4 pb-20 pt-12 sm:px-6 sm:pt-16 lg:px-10 lg:pb-28">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="mono flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/90">
            <span className="size-1.5 rounded-full bg-[#ccff00] shadow-[0_0_12px_rgba(204,255,0,.7)]" />
            Project archive
            <span className="text-white/90">/</span>
            Interactive canvas
          </div>

          <button
            type="button"
            onClick={resetUniverse}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs text-white/90 transition hover:border-[#ccff00]/40 hover:text-[#ccff00]"
          >
            <RotateCcw className="size-3.5" />
            Reset universe
          </button>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_280px] lg:items-end">
          <div>
            <p className="mono text-xs uppercase tracking-[0.2em] text-white/90">
              Three projects. One evolving journey.
            </p>
            <h1 className="display-heading mt-4 max-w-4xl text-5xl font-semibold leading-[0.94] sm:text-7xl lg:text-[6.5rem]">
              Work in
              <br />
              <span className="text-[#ccff00]">motion.</span>
            </h1>
          </div>
          <p className="max-w-sm text-sm leading-6 text-white/90 lg:pb-2">
            Explore the projects I have built. Move the nodes, follow the
            connections, and open a project to learn more.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-white/[0.09] bg-[#0a0c0e]/90 shadow-2xl shadow-black/20">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] px-4 py-3 sm:px-5">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#CCFF00]" />
              <span className="mono text-[10px] uppercase tracking-[0.15em] text-white/90">
                Project universe
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-white/90">
              <Grip className="size-3.5" />
              Drag nodes to rearrange
            </div>
          </div>

          <div
            ref={canvasRef}
            className="relative hidden h-[520px] touch-none overflow-hidden sm:block"
            onPointerMove={(event) => {
              if (!dragging || !canvasRef.current) return
              if (
                Math.hypot(
                  event.clientX - dragging.pointerX,
                  event.clientY - dragging.pointerY,
                ) > 5
              ) {
                draggedRef.current = true
              }
              const rect = canvasRef.current.getBoundingClientRect()
              const deltaX =
                ((event.clientX - dragging.pointerX) / rect.width) * 1000
              const deltaY =
                ((event.clientY - dragging.pointerY) / rect.height) * 520

              setProjects((current) =>
                current.map((project) =>
                  project.id === dragging.id
                    ? {
                        ...project,
                        x: Math.max(
                          95,
                          Math.min(905, dragging.originX + deltaX),
                        ),
                        y: Math.max(
                          65,
                          Math.min(455, dragging.originY + deltaY),
                        ),
                      }
                    : project,
                ),
              )
            }}
            onPointerUp={() => setDragging(null)}
            onPointerCancel={() => setDragging(null)}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(204,255,0,0.055),transparent_55%)]" />
            <div
              className="grid-background pointer-events-none opacity-60"
              style={{ backgroundSize: "32px 32px" }}
            />

            <svg
              className="pointer-events-none absolute inset-0 size-full"
              viewBox="0 0 1000 520"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {connections.map(([from, to]) => {
                const a = projects.find((project) => project.id === from)!
                const b = projects.find((project) => project.id === to)!
                return (
                  <g key={`${from}-${to}`}>
                    <path
                      d={`M ${a.x} ${a.y} Q ${(a.x + b.x) / 2} ${(a.y + b.y) / 2 - 35} ${b.x} ${b.y}`}
                      fill="none"
                      stroke={activeId === from || activeId === to ? "#CCFF00" : "#65705D"}
                      strokeOpacity={activeId === from || activeId === to ? 0.7 : 0.25}
                      strokeWidth={activeId === from || activeId === to ? 1.5 : 1}
                      strokeDasharray="5 8"
                    />
                    <circle
                      cx={(a.x + b.x) / 2}
                      cy={(a.y + b.y) / 2}
                      r="2"
                      fill="#CCFF00"
                      opacity="0.7"
                    />
                  </g>
                )
              })}
            </svg>

            {projects.map((project) => {
              const active = project.id === activeId
              return (
                <button
                  key={project.id}
                  type="button"
                  aria-label={`Select ${project.name}. Drag to move.`}
                  aria-pressed={active}
                  onPointerDown={(event) => startDrag(event, project)}
                  onPointerMove={moveNode}
                  onPointerUp={() => setDragging(null)}
                  onClick={() => handleProjectClick(project)}
                  className={`absolute z-10 flex w-[190px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-2xl border p-4 text-left transition-[border-color,background,box-shadow] duration-200 ${
                    active
                      ? "border-[#ccff00]/60 bg-[#171c10] shadow-[0_0_36px_rgba(204,255,0,0.10)]"
                      : "border-white/10 bg-[#111417]/95 hover:border-white/25"
                  } ${dragging?.id === project.id ? "cursor-grabbing" : "cursor-grab"}`}
                  style={{
                    left: `${project.x / 10}%`,
                    top: `${(project.y / 520) * 100}%`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="mono text-[10px] text-white/90">
                      NODE / {project.number}
                    </span>
                    <span
                      className="flex size-8 items-center justify-center rounded-lg border"
                      style={{
                        color: project.accent,
                        borderColor: `${project.accent}40`,
                        backgroundColor: `${project.accent}0D`,
                      }}
                    >
                      <ProjectGlyph project={project} />
                    </span>
                  </div>
                  <span className="mt-4 text-base font-semibold text-white">
                    {project.name}
                  </span>
                  <span className="mono mt-1 text-[9px] tracking-[0.1em] text-white/90">
                    {project.category}
                  </span>
                  <span
                    className="mt-4 h-px w-full"
                    style={{ backgroundColor: `${project.accent}55` }}
                  />
                  <span className="mt-3 flex items-center justify-between text-[10px] text-white/90">
                    {active ? "Currently selected" : "Select node"}
                    <ArrowUpRight
                      className="size-3.5"
                      style={{ color: project.accent }}
                    />
                  </span>
                </button>
              )
            })}

            <div className="pointer-events-none absolute bottom-4 left-5 mono text-[9px] uppercase tracking-[0.16em] text-white/90">
              X / Y · Interactive workspace
            </div>
          </div>

          <div className="grid gap-3 p-3 sm:hidden">
            {projects.map((project) => (
              <button
                key={project.id}
                type="button"
                onClick={() => handleProjectClick(project)}
                className={`flex items-center gap-3 rounded-2xl border p-4 text-left ${
                  activeId === project.id
                    ? "border-[#ccff00]/40 bg-[#ccff00]/[0.05]"
                    : "border-white/[0.08] bg-white/2"
                }`}
              >
                <span
                  className="flex size-10 shrink-0 items-center justify-center rounded-xl border"
                  style={{
                    color: project.accent,
                    borderColor: `${project.accent}40`,
                  }}
                >
                  <ProjectGlyph project={project} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium text-white">
                    {project.name}
                  </span>
                  <span className="mono mt-1 block text-[9px] text-white/90">
                    {project.category}
                  </span>
                </span>
                <ArrowUpRight className="size-4 text-white/90" />
              </button>
            ))}
          </div>
        </div>

        <section
          aria-live="polite"
          className="mt-5 grid overflow-hidden rounded-3xl border border-white/[0.09] bg-white/2.5 lg:grid-cols-[0.7fr_1.3fr]"
        >
          <div className="border-b border-white/[0.07] p-5 sm:p-7 lg:border-b-0 lg:border-r">
            <div className="mono flex items-center gap-2 text-[10px] uppercase tracking-[0.17em] text-white/90">
              <span className="size-1.5 rounded-full bg-[#ccff00]" />
              Selected project / {activeProject.number}
            </div>
            <h2 className="display-heading mt-5 text-3xl font-semibold text-white sm:text-4xl">
              {activeProject.name}
              <span className="text-[#ccff00]">.</span>
            </h2>
            <p className="mono mt-3 text-[10px] uppercase tracking-[0.12em] text-white/90">
              {activeProject.category}
            </p>
          </div>

          <div className="flex flex-col justify-between gap-6 p-5 sm:p-7">
            <div>
              <p className="max-w-2xl text-sm leading-7 text-white/90">
                {activeProject.description}
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/90">
                {activeProject.detail}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={activeProject.url}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-5 py-3 text-xs font-semibold text-black transition hover:-translate-y-0.5"
              >
                {activeProject.linkLabel}
                {activeProject.url.includes("github.com") ? (
                  <GitBranch className="size-4" />
                ) : (
                  <ExternalLink className="size-4" />
                )}
              </a>
              <button
                type="button"
                onClick={() => {
                  const index = projects.findIndex(
                    (project) => project.id === activeId,
                  )
                  setActiveId(projects[(index + 1) % projects.length].id)
                }}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-xs text-white/90 transition hover:border-white/25 hover:text-white"
              >
                Next project
                <ArrowDownRight className="size-4" />
              </button>
            </div>
          </div>
        </section>

        <p className="mono mt-5 text-[9px] uppercase tracking-[0.15em] text-white/90">
          End of current archive · More projects can be added when their links are provided
        </p>
      </section>
    </main>
  )
}
