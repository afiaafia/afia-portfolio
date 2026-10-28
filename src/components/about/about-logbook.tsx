"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowDownRight,
  ArrowUpRight,
  Bug,
  Code2,
  GitBranch,
  Layers3,
  Terminal,
  Wrench,
} from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

type ProofKey = "project" | "debugging" | "decision"

const proofTabs: {
  id: ProofKey
  number: string
  label: string
}[] = [
  { id: "project", number: "01", label: "What I've built" },
  { id: "debugging", number: "02", label: "How I debug" },
  { id: "decision", number: "03", label: "How I decide" },
]

const proofContent: Record<
  ProofKey,
  {
    eyebrow: string
    title: string
    description: string
    detail: string
    href: string
    linkLabel: string
  }
> = {
  project: {
    eyebrow: "PROJECT / BAZAR DOR",
    title: "A clearer way to explore product prices.",
    description:
      "Bazar Dor brings product information and price trends into a clean, accessible interface, making it easier to explore products and compare prices.",
    detail:
      "Built with Next.js, TypeScript, and API integration.",
    href: "https://bazar-dor-pi.vercel.app/",
    linkLabel: "Visit Bazar Dor",
  },
  debugging: {
    eyebrow: "PROCESS / DEBUGGING",
    title: "Understand the cause. Then fix the symptom.",
    description:
      "My debugging process starts by reproducing the problem, narrowing down its cause, testing a fix, and checking that the result behaves as expected.",
    detail:
      "The goal is to understand why something failed—not just make the error disappear.",
    href: "/work",
    linkLabel: "Explore project work",
  },
  decision: {
    eyebrow: "BACKEND / TASK VAULT",
    title: "The implementation matters as much as the feature.",
    description:
      "Task Vault is where I practise backend fundamentals through APIs, input validation, TypeScript, and MongoDB.",
    detail:
      "I focus on understanding how the pieces connect, not only whether the code runs.",
    href: "/work/task-vault",
    linkLabel: "Explore Task Vault",
  },
}

const principles = [
  {
    number: "01",
    title: "Build",
    description: "Turn requirements into working features.",
    icon: Layers3,
  },
  {
    number: "02",
    title: "Investigate",
    description: "Trace unexpected behaviour to its cause.",
    icon: Bug,
  },
  {
    number: "03",
    title: "Refine",
    description: "Improve clarity, structure, and usability.",
    icon: Wrench,
  },
]

export function AboutLogbook() {
  const [activeTab, setActiveTab] = useState<ProofKey>("project")
  const shouldReduceMotion = useReducedMotion()

  const reveal = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 22 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.55, ease: "easeOut" as const },
      }

  const selectedProof = proofContent[activeTab]

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="grid-background pointer-events-none" />

      <div className="relative mx-auto max-w-[1200px] px-4 pb-24 pt-16 sm:px-6 sm:pt-24 lg:px-10 lg:pb-32">
        {/* Intro */}
        <motion.section
          {...reveal}
          className="relative"
          aria-labelledby="about-heading"
        >
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <span className="mono text-[10px] uppercase tracking-[0.2em] text-white/90">
              About / Engineering logbook
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-[#ccff00]/15 bg-[#ccff00]/[0.04] px-3 py-1.5">
              <span className="size-1.5 rounded-full bg-[#ccff00]" />
              <span className="mono text-[9px] uppercase tracking-[0.12em] text-[#ccff00]">
                Learning through building
              </span>
            </span>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <h1
                id="about-heading"
                className="display-heading max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.06em] text-white sm:text-7xl lg:text-[6.5rem]"
              >
                I build.
                <br />
                I debug.
                <br />
                <span className="text-[#ccff00]">
                  I understand why.
                </span>
              </h1>
            </div>

            <div className="max-w-md pb-1 lg:justify-self-end">
              <p className="text-base leading-7 text-white/90">
                I&apos;m a Computer Science and Technology diploma student
                focused on full-stack web development. I learn by building
                applications, investigating problems, and understanding the
                decisions behind the code.
              </p>

              <Link
                href="/work"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#ccff00] transition-colors hover:text-white"
              >
                See the work behind the words
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          <div className="mt-12 h-px origin-left bg-linear-to-r from-[#ccff00]/60 via-white/10 to-transparent sm:mt-16" />
        </motion.section>

        {/* Working principles */}
        <section className="mt-14 sm:mt-20" aria-label="Working principles">
          <motion.div {...reveal} className="mb-6">
            <p className="mono text-[10px] uppercase tracking-[0.2em] text-white/90">
              01 / Working principles
            </p>
            <h2 className="mt-3 text-2xl font-medium tracking-[-0.04em] text-white sm:text-3xl">
              Three parts of the same process.
            </h2>
          </motion.div>

          <div className="grid gap-3 md:grid-cols-3">
            {principles.map((principle, index) => {
              const Icon = principle.icon

              return (
                <motion.article
                  key={principle.number}
                  {...reveal}
                  transition={
                    shouldReduceMotion
                      ? undefined
                      : {
                          duration: 0.45,
                          delay: index * 0.09,
                          ease: "easeOut",
                        }
                  }
                  whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                  className="group rounded-2xl border border-white/[0.08] bg-white/2 p-5 transition-colors duration-300 hover:border-[#ccff00]/25 hover:bg-[#ccff00]/[0.025] sm:p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="mono text-[10px] tracking-[0.16em] text-white/90">
                      {principle.number}
                    </span>

                    <Icon className="size-5 text-[#ccff00]/90 transition-transform duration-300 group-hover:scale-110 group-hover:text-[#ccff00]" />
                  </div>

                  <h3 className="mt-9 text-xl font-medium tracking-[-0.035em] text-white">
                    {principle.title}
                  </h3>

                  <p className="mt-2 max-w-xs text-sm leading-6 text-white/90">
                    {principle.description}
                  </p>
                </motion.article>
              )
            })}
          </div>
        </section>

        {/* Interactive proof panel */}
        <section className="mt-16 sm:mt-24" aria-labelledby="proof-heading">
          <motion.div {...reveal} className="mb-6">
            <p className="mono text-[10px] uppercase tracking-[0.2em] text-white/90">
              02 / Beyond the introduction
            </p>

            <h2
              id="proof-heading"
              className="mt-3 text-2xl font-medium tracking-[-0.04em] text-white sm:text-3xl"
            >
              Show me the reasoning.
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-6 text-white/90">
              Choose a thread. Each one reveals a different part of how I
              approach development.
            </p>
          </motion.div>

          <motion.div
            {...reveal}
            className="overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0b0d0f]/90 shadow-2xl shadow-black/20"
          >
            <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3 sm:px-5">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#ff6058]/70" />
                <span className="size-2 rounded-full bg-[#ffbd2e]/70" />
                <span className="size-2 rounded-full bg-[#28c840]/70" />
              </div>

              <span className="mono text-[10px] text-white/90">
                engineering-notes
              </span>

              <Terminal className="size-4 text-white/90" />
            </div>

            <div className="grid md:grid-cols-[0.75fr_1.25fr]">
              <div
                className="border-b border-white/[0.07] p-3 md:border-b-0 md:border-r"
                role="tablist"
                aria-label="Explore engineering evidence"
                aria-orientation="vertical"
              >
                {proofTabs.map((tab) => {
                  const isActive = activeTab === tab.id

                  return (
                    <button
                      key={tab.id}
                      id={`proof-tab-${tab.id}`}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls="proof-panel"
                      onClick={() => setActiveTab(tab.id)}
                      className={`group flex w-full items-center justify-between gap-3 rounded-xl px-3 py-4 text-left transition-colors duration-200 ${
                        isActive
                          ? "bg-[#ccff00]/[0.07] text-white"
                          : "text-white/90 hover:bg-white/[0.035] hover:text-white/90"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`mono text-[10px] ${
                            isActive ? "text-[#ccff00]" : "text-white/90"
                          }`}
                        >
                          {tab.number}
                        </span>

                        <span className="text-sm font-medium">
                          {tab.label}
                        </span>
                      </span>

                      <ArrowUpRight
                        className={`size-4 transition-transform duration-200 ${
                          isActive
                            ? "text-[#ccff00]"
                            : "text-white/90 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        }`}
                      />
                    </button>
                  )
                })}
              </div>

              <div
                id="proof-panel"
                role="tabpanel"
                aria-labelledby={`proof-tab-${activeTab}`}
                className="min-h-[300px] p-5 sm:p-8 lg:p-10"
              >
                <motion.div
                  key={activeTab}
                  initial={
                    shouldReduceMotion ? false : { opacity: 0, y: 10 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
                >
                  <p className="mono text-[10px] uppercase tracking-[0.17em] text-[#ccff00]/90">
                    {selectedProof.eyebrow}
                  </p>

                  <h3 className="mt-5 max-w-lg text-2xl font-medium leading-tight tracking-[-0.045em] text-white sm:text-3xl">
                    {selectedProof.title}
                  </h3>

                  <p className="mt-4 max-w-lg text-sm leading-7 text-white/90">
                    {selectedProof.description}
                  </p>

                  <div className="mt-6 flex items-start gap-3 border-l border-[#ccff00]/35 pl-4">
                    <Code2 className="mt-0.5 size-4 shrink-0 text-[#ccff00]" />
                    <p className="text-xs leading-6 text-white/90">
                      {selectedProof.detail}
                    </p>
                  </div>

                  <Link
                    href={selectedProof.href}
                    className="group mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-xs font-medium text-white/90 transition-colors hover:border-[#ccff00]/35 hover:text-[#ccff00]"
                  >
                    {selectedProof.linkLabel}
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </motion.div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-white/[0.07] px-4 py-3 sm:px-5">
              <span className="mono text-[9px] text-white/90">
                EVIDENCE OVER ADJECTIVES
              </span>
              <span className="mono text-[9px] text-white/90">
                {activeTab.toUpperCase()} / 03
              </span>
            </div>
          </motion.div>
        </section>

        {/* Current focus */}
        <motion.section
          {...reveal}
          className="mt-16 border-t border-white/[0.08] pt-8 sm:mt-24 sm:pt-10"
        >
          <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <p className="mono text-[10px] uppercase tracking-[0.2em] text-white/90">
                03 / Current focus
              </p>

              <h2 className="mt-3 max-w-2xl text-2xl font-medium tracking-[-0.04em] text-white sm:text-3xl">
                Better foundations. More complete applications.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-white/90">
                Currently focused on frontend and backend fundamentals,
                API integration, data validation, and maintainable
                application structure.
              </p>
            </div>

            <Link
              href="/stack"
              className="group inline-flex items-center gap-2 text-sm font-medium text-white/90 transition-colors hover:text-[#ccff00]"
            >
              Explore my stack
              <ArrowDownRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </Link>
          </div>
        </motion.section>

        {/* Closing */}
        <motion.div
          {...reveal}
          className="mt-14 flex flex-col gap-4 rounded-2xl border border-[#ccff00]/15 bg-[#ccff00]/[0.035] p-5 sm:mt-20 sm:flex-row sm:items-center sm:justify-between sm:p-7"
        >
          <div>
            <p className="mono text-[10px] uppercase tracking-[0.16em] text-[#ccff00]/90">
              Want to see the actual work?
            </p>

            <p className="mt-2 text-lg font-medium tracking-[-0.03em] text-white">
              The projects are the proof.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-4 py-2.5 text-xs font-semibold text-black transition-transform hover:-translate-y-0.5"
            >
              Explore projects
              <ArrowUpRight className="size-3.5" />
            </Link>

            <Link
              href="/build-log"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-xs font-medium text-white/90 transition-colors hover:border-white/25 hover:text-white"
            >
              Build Log
              <GitBranch className="size-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
