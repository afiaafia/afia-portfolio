import Link from "next/link"
import Image from "next/image"
import { ArrowDown, ArrowUpRight, FileText } from "lucide-react"
import { FaLinkedinIn } from "react-icons/fa6"


export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Subtle background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-10 -z-10 size-105 rounded-full bg-violet-600/12 blur-[130px]"
      />

      <div className="mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:py-24">
        {/* Left: Introduction */}
        <div className="animate-in fade-in slide-in-from-bottom-3 duration-700">
          <div className="mb-7 flex items-center gap-3">
            <span className="h-px w-8 bg-violet-400" />
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-violet-300">
              Full-Stack Web Developer
            </p>
          </div>

          <h1 className="max-w-2xl text-5xl font-semibold leading-[1.08] tracking-[-0.065em] text-white sm:text-6xl lg:text-7xl">
            I build for
            <br />
            the web
            <span className="text-violet-400">.</span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-7 text-white/90 sm:text-lg sm:leading-8">
            Thoughtful interfaces. Useful products. Clean code.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/resume"
              className="group inline-flex items-center gap-2 rounded-xl bg-violet-500 px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-400 hover:shadow-[0_8px_30px_rgba(139,92,246,0.22)]"
            >
              <FileText className="size-4" aria-hidden="true" />
              Resume / CV
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="https://linkedin.com/in/afia-afia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit LinkedIn profile"
              title="LinkedIn"
              className="inline-flex size-11 items-center justify-center rounded-xl border border-white/10 text-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400/40 hover:bg-violet-400/6 hover:text-violet-300"
            >
              <FaLinkedinIn className="size-5" aria-hidden="true" />
            </Link>


          </div>

          <div className="mt-8">
            <span className="text-xs tracking-wide text-white/90">
              Design · Development · Detail
            </span>
          </div>
        </div>

        {/* Right: Portrait */}
        <div className="relative mx-auto w-full max-w-97.5 lg:ml-auto">
          <div
            aria-hidden="true"
            className="absolute -inset-5 -z-10 rounded-4xl bg-linear-to-br from-violet-500/20 via-purple-500/6 to-transparent opacity-80 blur-2xl transition-opacity duration-500 hover:opacity-100"
          />

          <div className="group relative aspect-4/5 overflow-hidden rounded-3xl border border-white/9 bg-[#171320]">
            <Image
              src="/images/afia-portrait.jpg"
              alt="Afia Mubassira"
              fill
              priority
              sizes="(max-width: 1024px) 85vw, 390px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
            />

            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#0b0a12]/40 via-transparent to-violet-950/10" />
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.18em] text-white/90">
              Afia Mubassira
            </p>
            <Link
              href="/about"
              className="group inline-flex items-center gap-1.5 text-xs text-white/90 transition-colors hover:text-violet-300"
            >
              More about me
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>

      <Link
        href="/#stack"
        aria-label="Scroll to technology stack"
        className="mx-auto mb-8 hidden w-fit items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/90 transition-colors hover:text-violet-300 md:flex"
      >
        Scroll to explore
        <ArrowDown className="size-3.5 animate-bounce" />
      </Link>
    </section>
  )
}
