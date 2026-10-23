"use client"

import Link from "next/link"
import {
  Activity,
  ArrowUpRight,
  Code2,
  ExternalLink,
  GitBranch,
  Terminal,
} from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { useEffect, useState } from "react"

type Repo = {
  id: string
  number: string
  name: string
  description: string
  stack: string
  signal: string
  portfolioHref: string
  githubHref: string
  terminal: string[]
}

const repositories: Repo[] = [
  {
    id: "fit-log",
    number: "01",
    name: "B14-A6-FIT-LOG",
    description:
      "Workout discovery and planning application built around API-driven data, dynamic pages, and responsive UI.",
    stack: "Next.js · React · TypeScript",
    signal: "API → UI → PLAN",
    portfolioHref: "/work/fit-log",
    githubHref: "https://github.com/afiaafia/b14-a6-fit-log",
    terminal: [
      "$ git status",
      "✓ working tree clean",
      "$ next build",
      "✓ production ready",
    ],
  },
  {
    id: "dev-stack-builder",
    number: "02",
    name: "DEV-STACK-BUILDER-V2",
    description:
      "Developer-focused stack building project exploring interactive configuration and practical frontend engineering.",
    stack: "React · TypeScript · Frontend",
    signal: "INPUT → CONFIG → BUILD",
    portfolioHref: "/work",
    githubHref: "https://github.com/afiaafia/dev-stack-builder-v2",
    terminal: [
      "$ git status",
      "✓ working tree clean",
      "$ build",
      "✓ project compiled",
    ],
  },
  {
    id: "restaurant-menu",
    number: "03",
    name: "RESTAURANT-MENU-A",
    description:
      "Responsive restaurant menu interface focused on clean information hierarchy and practical UI implementation.",
    stack: "HTML · CSS · JavaScript",
    signal: "CONTENT → UI → EXPERIENCE",
    portfolioHref: "/work",
    githubHref: "https://github.com/afiaafia/restaurant-menu-a",
    terminal: [
      "$ git status",
      "✓ working tree clean",
      "$ deploy",
      "✓ interface ready",
    ],
  },
]

const activityItems = [
  {
    label: "FIT LOG",
    repo: "b14-a6-fit-log",
    detail: "API-driven workout planner",
  },
  {
    label: "DEV STACK",
    repo: "dev-stack-builder-v2",
    detail: "Interactive developer tooling",
  },
  {
    label: "MENU",
    repo: "restaurant-menu-a",
    detail: "Responsive interface build",
  },
]

function RepositoryCard({
  repo,
  index,
  selected,
  onSelect,
  shouldReduceMotion,
}: {
  repo: Repo
  index: number
  selected: boolean
  onSelect: () => void
  shouldReduceMotion: boolean | null
}) {
  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              y: 30,
            }
      }
      whileInView={
        shouldReduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
            }
      }
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.65,
        delay: 0.12 + index * 0.1,
        ease: "easeOut",
      }}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -7,
            }
      }
      whileTap={
        shouldReduceMotion
          ? undefined
          : {
              scale: 0.985,
            }
      }
      className="h-full"
    >
      <div
        onClick={onSelect}
        className={`group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border bg-[#0b0d0f] p-5 transition-colors duration-300 ${
          selected
            ? "border-lime-300/50 bg-[#0e1110]"
            : "border-white/10 hover:border-white/20"
        }`}
      >
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
            selected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(204,255,0,0.08), transparent 45%)",
          }}
        />

        <div className="relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-[0.18em] text-white/90">
                {repo.number}
              </span>

              <span className="h-px w-7 bg-white/20" />

              <span className="font-mono text-[10px] tracking-[0.16em] text-white/90">
                REPOSITORY
              </span>
            </div>

            <motion.div
              animate={
                selected && !shouldReduceMotion
                  ? {
                      x: [0, 4, 0],
                    }
                  : {
                      x: 0,
                    }
              }
              transition={
                selected && !shouldReduceMotion
                  ? {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
                  : undefined
              }
            >
              <ArrowUpRight className="h-4 w-4 text-white/90" />
            </motion.div>
          </div>

          <h3 className="mt-7 text-2xl font-semibold tracking-[-0.04em] text-white">
            {repo.name}
          </h3>

          <p className="mt-3 min-h-14 text-sm leading-6 text-white/90">
            {repo.description}
          </p>

          <div className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-black/30">
            <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
              <Terminal className="h-3.5 w-3.5 text-white/90" />

              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/90">
                BUILD SIGNAL
              </span>
            </div>

            <div className="min-h-[112px] px-3 py-3 font-mono text-[10px] leading-6">
              {repo.terminal.map((line, lineIndex) => (
                <motion.div
                  key={`${repo.id}-${line}`}
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          opacity: 0,
                          x: -8,
                        }
                  }
                  whileInView={
                    shouldReduceMotion
                      ? undefined
                      : {
                          opacity: 1,
                          x: 0,
                        }
                  }
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.35,
                    delay: 0.2 + index * 0.1 + lineIndex * 0.07,
                  }}
                  className={
                    line.startsWith("✓")
                      ? "text-lime-300"
                      : "text-white/90"
                  }
                >
                  {line}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] tracking-[0.08em] text-white/90">
              {repo.stack}
            </span>

            <span className="rounded-full border border-lime-300/20 bg-lime-300/[0.04] px-3 py-1.5 font-mono text-[10px] tracking-[0.08em] text-white">
              {repo.signal}
            </span>
          </div>

          <div className="mt-auto flex items-center justify-between gap-4 pt-7">
            <Link
              href={repo.portfolioHref}
              onClick={(event) => event.stopPropagation()}
              className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/90 transition-colors duration-300 hover:text-white"
            >
              Explore
            </Link>

            <a
              href={repo.githubHref}
              target="_blank"
              rel="noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white transition-transform duration-300 hover:translate-x-1"
            >
              GitHub
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function GitHubOverview() {
  const shouldReduceMotion = useReducedMotion()
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null)

  const [profile, setProfile] = useState<{
    name: string
    login: string
    publicRepos: number | null
    followers: number | null
  } | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadGitHubProfile() {
      try {
        const response = await fetch("/api/github", {
          cache: "no-store",
        })

        if (!response.ok) return

        const payload = await response.json()
        const user = payload?.user ?? payload?.profile ?? payload

        if (!user || cancelled) return

        setProfile({
          name: user.name ?? "Afia A.",
          login: user.login ?? "afiaafia",
          publicRepos:
            typeof user.public_repos === "number"
              ? user.public_repos
              : null,
          followers:
            typeof user.followers === "number"
              ? user.followers
              : null,
        })
      } catch {
        // Keep the section functional when GitHub data is unavailable.
      }
    }

    loadGitHubProfile()

    return () => {
      cancelled = true
    }
  }, [])

  const selectedRepository =
    repositories.find((repo) => repo.id === selectedRepo) ?? null

  return (
    <section
      id="github"
      className="relative scroll-mt-24 overflow-hidden border-t border-white/10 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 28,
                }
          }
          whileInView={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                }
          }
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.22em] text-white/90">
            <span className="h-px w-8 bg-lime-300" />
            <span>06 / GITHUB</span>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <h2 className="text-balance text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
                CODE THAT EXISTS
                <br />
                OUTSIDE THIS PORTFOLIO.
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-7 text-white/90 sm:text-lg">
                Projects, experiments, fixes, and learning — visible in the
                codebase, not just described here.
              </p>
            </div>

            <motion.a
              href="https://github.com/afiaafia"
              target="_blank"
              rel="noreferrer"
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: -3,
                    }
              }
              whileTap={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: 0.97,
                    }
              }
              className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3.5 font-mono text-xs uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:border-lime-300/40 hover:bg-lime-300/[0.05] lg:self-end"
            >
              Open GitHub
              <ArrowUpRight className="h-4 w-4" />
            </motion.a>
          </div>
        </motion.div>

        {/* PROFILE SNAPSHOT */}
        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 24,
                }
          }
          whileInView={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                }
          }
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.7,
            delay: 0.08,
            ease: "easeOut",
          }}
          className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-[#0b0d0f]"
        >
          <div className="flex flex-col gap-4 border-b border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-center gap-3">
              <Code2 className="h-4 w-4 text-lime-300" />

              <span className="font-mono text-xs tracking-[0.16em] text-white">
                GITHUB / {profile?.login?.toUpperCase() ?? "AFIAAFIA"}
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/90">
              <span className="relative flex h-2.5 w-2.5">
                {!shouldReduceMotion && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-300/60" />
                )}

                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime-300" />
              </span>

              Live profile
            </div>
          </div>

          <div className="grid gap-px bg-white/10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="bg-[#0b0d0f] p-5 sm:p-7">
              <div className="flex items-center gap-4">
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          rotate: [0, 3, -3, 0],
                        }
                  }
                  transition={
                    shouldReduceMotion
                      ? undefined
                      : {
                          duration: 5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                  }
                  className="flex h-14 w-14 items-center justify-center rounded-2xl border border-lime-300/20 bg-lime-300/[0.05]"
                >
                  <Code2 className="h-6 w-6 text-lime-300" />
                </motion.div>

                <div>
                  <div className="text-xl font-semibold tracking-tight text-white">
                    {profile?.name ?? "Afia A."}
                  </div>

                  <div className="mt-1 font-mono text-xs tracking-[0.12em] text-white/90">
                    @{profile?.login ?? "afiaafia"}
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
                  <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/90">
                    PUBLIC REPOSITORIES
                  </div>

                  <div className="mt-2 text-2xl font-semibold text-white">
                    {profile?.publicRepos ?? "—"}
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
                  <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/90">
                    FOLLOWERS
                  </div>

                  <div className="mt-2 text-2xl font-semibold text-white">
                    {profile?.followers ?? "—"}
                  </div>
                </div>
              </div>
            </div>

            {/* BUILD SIGNAL */}
            <div className="relative overflow-hidden bg-[#090b0d] p-5 sm:p-7">
              <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-lime-300/30 to-transparent" />

              <div className="relative flex items-center justify-between">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/90">
                    BUILD SIGNAL
                  </div>

                  <div className="mt-2 text-lg font-medium text-white">
                    Project → code → evidence
                  </div>
                </div>

                <Activity className="h-5 w-5 text-lime-300" />
              </div>

              <div className="relative mt-10 flex items-center">
                {[
                  { label: "PROJECT", Icon: Code2 },
                  { label: "CODE", Icon: GitBranch },
                  { label: "EVIDENCE", Icon: Activity },
                ].map((item, index) => {
                  const Icon = item.Icon

                  return (
                    <div
                      key={item.label}
                      className="flex min-w-0 flex-1 items-center"
                    >
                      <div className="relative z-10 flex shrink-0 flex-col items-center gap-2">
                        <motion.div
                          animate={
                            shouldReduceMotion
                              ? undefined
                              : {
                                  scale: [1, 1.08, 1],
                                }
                          }
                          transition={
                            shouldReduceMotion
                              ? undefined
                              : {
                                  duration: 2,
                                  delay: index * 0.35,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-lime-300/30 bg-[#0b0d0f]"
                        >
                          <Icon className="h-4 w-4 text-lime-300" />
                        </motion.div>

                        <span className="font-mono text-[8px] tracking-[0.12em] text-white/90">
                          {item.label}
                        </span>
                      </div>

                      {index < 2 && (
                        <motion.div
                          animate={
                            shouldReduceMotion
                              ? undefined
                              : {
                                  backgroundPosition: ["0% 0%", "100% 0%"],
                                }
                          }
                          transition={
                            shouldReduceMotion
                              ? undefined
                              : {
                                  duration: 2.2,
                                  repeat: Infinity,
                                  ease: "linear",
                                  delay: index * 0.3,
                                }
                          }
                          className="mx-2 h-px flex-1 bg-gradient-to-r from-white/10 via-lime-300/40 to-white/10 bg-[length:200%_100%]"
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ACTIVITY FEED */}
        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 20,
                }
          }
          whileInView={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                }
          }
          viewport={{ once: true, amount: 0.14 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-10 rounded-3xl border border-white/10 bg-[#0b0d0f] p-5 sm:p-7"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/90">
                ACTIVITY FEED
              </div>

              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                What the code points to.
              </h3>
            </div>

            <Activity className="h-5 w-5 text-lime-300" />
          </div>

          <div className="mt-7 grid gap-5 sm:grid-cols-3">
            {activityItems.map((item, index) => (
              <motion.div
                key={item.repo}
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 12,
                      }
                }
                whileInView={
                  shouldReduceMotion
                    ? undefined
                    : {
                        opacity: 1,
                        y: 0,
                      }
                }
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: 0.1 + index * 0.09,
                }}
                className="relative border-l border-white/10 pl-5"
              >
                <span className="absolute -left-[4px] top-1.5 h-2 w-2 rounded-full bg-lime-300 shadow-[0_0_12px_rgba(204,255,0,0.5)]" />

                <div className="font-mono text-[9px] tracking-[0.16em] text-white/90">
                  {item.label}
                </div>

                <div className="mt-2 text-sm font-medium text-white">
                  {item.repo}
                </div>

                <div className="mt-1 text-xs leading-5 text-white/90">
                  {item.detail}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* REPOSITORIES */}
        <div className="mt-12">
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 20,
                  }
            }
            whileInView={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            viewport={{ once: true, amount: 0.16 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6 flex items-end justify-between gap-4"
          >
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/90">
                SELECTED REPOSITORIES
              </div>

              <h3 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">
                Follow the code.
              </h3>
            </div>

            <div className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/90 sm:flex">
              <GitBranch className="h-4 w-4 text-lime-300" />
              repository network
            </div>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {repositories.map((repo, index) => (
              <RepositoryCard
                key={repo.id}
                repo={repo}
                index={index}
                selected={selectedRepo === repo.id}
                onSelect={() =>
                  setSelectedRepo(
                    selectedRepo === repo.id ? null : repo.id,
                  )
                }
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </div>
        </div>

        {/* FOCUS MODE */}
        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 22,
                }
          }
          whileInView={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                }
          }
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.7,
            delay: 0.1,
            ease: "easeOut",
          }}
          className="mt-10 flex flex-col gap-5 rounded-3xl border border-white/10 bg-[#0b0d0f] p-5 sm:p-7 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/90">
              FOCUS MODE
            </div>

            <div className="mt-3 text-xl font-medium text-white sm:text-2xl">
              {selectedRepository
                ? `${selectedRepository.name} selected.`
                : "Tap a repository to inspect its signal."}
            </div>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/90">
              {selectedRepository
                ? `${selectedRepository.signal} · ${selectedRepository.stack}`
                : "Each repository card responds to scroll, hover, and tap interaction."}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            {selectedRepository && (
              <a
                href={selectedRepository.githubHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:border-lime-300/40"
              >
                Open repo
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}

            <a
              href="https://github.com/afiaafia"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-lime-300 px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.14em] text-black transition-transform duration-300 hover:-translate-y-0.5"
            >
              Open GitHub
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  scaleX: 0,
                }
          }
          whileInView={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 1,
                  scaleX: 1,
                }
          }
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: 0.15,
            ease: "easeOut",
          }}
          className="mt-14 h-px origin-left bg-gradient-to-r from-transparent via-lime-300/35 to-transparent"
        />
      </div>
    </section>
  )
}
