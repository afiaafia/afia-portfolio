"use client"

import Link from "next/link"
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Mail,
  Phone,
  Send,
} from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import type { FormEvent } from "react"
import { useState } from "react"

const channels = [
  {
    label: "PHONE",
    value: "01326860016",
    href: "tel:+8801326860016",
    icon: Phone,
    external: false,
  },
  {
    label: "EMAIL",
    value: "afiastudent461@gmail.com",
    href: "mailto:afiastudent461@gmail.com",
    icon: Mail,
    external: false,
  },
  {
    label: "LINKEDIN",
    value: "linkedin.com/in/afia-afia",
    href: "https://linkedin.com/in/afia-afia",
    icon: BriefcaseBusiness,
    external: true,
  },
  {
    label: "GITHUB",
    value: "github.com/afiaafia",
    href: "https://github.com/afiaafia",
    icon: Code2,
    external: true,
  },
  {
    label: "RESUME",
    value: "View professional profile",
    href: "/resume",
    icon: ArrowUpRight,
    external: false,
  },
]

const topics = [
  "Project",
  "Collaboration",
  "Freelance",
  "Just saying hello",
]

export function ContactSection() {
  const shouldReduceMotion = useReducedMotion()

  const [topic, setTopic] = useState(topics[0])
  const [status, setStatus] = useState<"idle" | "preparing" | "ready">("idle")

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    const name = String(formData.get("name") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim()
    const message = String(formData.get("message") ?? "").trim()

    if (!name || !email || !message) {
      return
    }

    setStatus("preparing")

    const subject = `${topic} — message from ${name}`

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Topic: ${topic}`,
      "",
      message,
    ].join("\n")

    const mailtoUrl =
      `mailto:afiastudent461@gmail.com` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`

    window.setTimeout(() => {
      setStatus("ready")
      window.location.href = mailtoUrl
    }, 500)
  }

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden border-t border-white/10 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={
            shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
          }
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.22em] text-white/90">
            <span className="h-px w-8 bg-violet-400" />
            <span>08 / CONTACT</span>
          </div>

          <div className="max-w-4xl">
            <h2 className="text-balance text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              GET IN TOUCH

            </h2>

          </div>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -24 }}
            whileInView={
              shouldReduceMotion ? undefined : { opacity: 1, x: 0 }
            }
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
            className="space-y-3"
          >
            {channels.map((channel, index) => {
              const Icon = channel.icon

              const content = (
                <>
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <Icon
                        className="h-5 w-5 text-violet-400 transition-colors duration-300 group-hover:text-violet-300"
                        strokeWidth={1.8}
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="font-mono text-[11px] tracking-[0.18em] text-white/90">
                        {channel.label}
                      </div>

                      <div className="mt-1 truncate text-sm text-white sm:text-base">
                        {channel.value}
                      </div>
                    </div>
                  </div>

                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-violet-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.8}
                  />
                </>
              )

              if (channel.external) {
                return (
                  <motion.a
                    key={channel.label}
                    href={channel.href}
                    target="_blank"
                    rel="noreferrer"
                    initial={
                      shouldReduceMotion ? false : { opacity: 0, y: 18 }
                    }
                    whileInView={
                      shouldReduceMotion
                        ? undefined
                        : { opacity: 1, y: 0 }
                    }
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1 + index * 0.08,
                      ease: "easeOut",
                    }}
                    whileTap={
                      shouldReduceMotion ? undefined : { scale: 0.985 }
                    }
                    className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.05]"
                  >
                    {content}
                  </motion.a>
                )
              }

              return (
                <motion.div
                  key={channel.label}
                  initial={
                    shouldReduceMotion ? false : { opacity: 0, y: 18 }
                  }
                  whileInView={
                    shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                  }
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + index * 0.08,
                    ease: "easeOut",
                  }}
                  whileTap={
                    shouldReduceMotion ? undefined : { scale: 0.985 }
                  }
                >
                  <Link
                    href={channel.href}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.05]"
                  >
                    {content}
                  </Link>
                </motion.div>
              )
            })}

            <div className="mt-8 rounded-2xl border border-violet-400/20 bg-violet-400/[0.04] p-5">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400/70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-violet-400" />
                </span>

                <span className="font-mono text-xs uppercase tracking-[0.16em] text-white">
                  OPEN TO CONNECTIONS
                </span>
              </div>

            </div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
            whileInView={
              shouldReduceMotion ? undefined : { opacity: 1, x: 0 }
            }
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
            className="rounded-3xl border border-white/10 bg-white/[0.025] p-5 sm:p-7"
          >
            <div className="mb-7 flex items-start justify-between gap-6">
              <div>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Start a conversation.
                </h3>
              </div>

            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block font-mono text-xs tracking-[0.14em] text-white/90">
                    NAME
                  </span>

                  <input
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/90 transition-colors duration-300 focus:border-violet-400/60"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block font-mono text-xs tracking-[0.14em] text-white/90">
                    EMAIL
                  </span>

                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/90 transition-colors duration-300 focus:border-violet-400/60"
                  />
                </label>
              </div>

              <div>
                <div className="mb-3 font-mono text-xs tracking-[0.14em] text-white/90">
                  TOPIC
                </div>

                <div className="flex flex-wrap gap-2">
                  {topics.map((item) => {
                    const active = topic === item

                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setTopic(item)}
                        className={`rounded-full border px-3.5 py-2 text-xs transition-colors duration-300 ${
                          active
                            ? "border-violet-400/40 bg-violet-400/10 text-white"
                            : "border-white/10 bg-white/[0.02] text-white/90 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {item}
                      </button>
                    )
                  })}
                </div>
              </div>

              <label className="block">
                <span className="mb-2 block font-mono text-xs tracking-[0.14em] text-white/90">
                  MESSAGE
                </span>

                <textarea
                  name="message"
                  required
                  rows={1}
                  placeholder="Tell me a little about what you want to build, discuss, or explore."
                  onInput={(event) => {
                    const field = event.currentTarget;
                    const styles = window.getComputedStyle(field);
                    const lineHeight = parseFloat(styles.lineHeight) || 24;
                    const padding =
                      parseFloat(styles.paddingTop) +
                      parseFloat(styles.paddingBottom);
                    const maxHeight = lineHeight * 3 + padding;

                    field.style.height = "auto";

                    if (field.scrollHeight > maxHeight) {
                      field.style.height = `${maxHeight}px`;
                      field.style.overflowY = "auto";
                    } else {
                      field.style.height = `${field.scrollHeight}px`;
                      field.style.overflowY = "hidden";
                    }
                  }}
                  className="w-full resize-none overflow-y-hidden rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm leading-6 text-white outline-none placeholder:text-white/90 transition-colors duration-300 focus:border-violet-400/60"
                />
              </label>

              <div className="flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-400 px-5 py-3.5 text-sm font-semibold text-black transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Send className="h-4 w-4" />
                  Send Message
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      <motion.div
        aria-hidden="true"
        initial={shouldReduceMotion ? false : { scaleX: 0, opacity: 0 }}
        whileInView={
          shouldReduceMotion ? undefined : { scaleX: 1, opacity: 1 }
        }
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay: 0.2, ease: "easeOut" }}
        className="mx-auto mt-16 h-px max-w-7xl origin-left bg-gradient-to-r from-transparent via-violet-400/35 to-transparent"
      />
    </section>
  )
}
