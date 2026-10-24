import { ArrowDownRight } from "lucide-react"

import { DeveloperTerminal } from "@/components/hero/developer-terminal"
import { HeroActions } from "@/components/hero/hero-actions"
import { StatusIndicator } from "@/components/hero/status-indicator"

export function Hero() {
  return (
    <section className="relative">
      <div className="grid-background" />

      <div className="relative mx-auto max-w-[1400px] px-4 pb-20 pt-14 sm:px-6 sm:pb-24 sm:pt-20 lg:px-10 lg:pb-28 lg:pt-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <StatusIndicator />

              <span className="mono text-[10px] uppercase tracking-[0.18em] text-white/25">
                /home
              </span>
            </div>

            <p className="mono mt-8 text-[10px] uppercase tracking-[0.22em] text-white/30">
              Afia A. / Full-Stack Web Developer
            </p>

            <h1 className="display-heading mt-4 max-w-4xl text-5xl font-semibold leading-[0.88] sm:text-7xl lg:text-[7.5rem]">
              I BUILD
              <br />
              TO
              <br />
              <span className="text-white/25">UNDERSTAND.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-7 text-white/52 sm:text-lg">
              I&apos;m a Computer Science &amp; Technology student focused on
              building practical web applications and understanding how
              modern frontend, backend, APIs, and databases fit together.
            </p>

            <HeroActions />

            <div className="mt-10 flex items-center gap-2 text-white/25">
              <ArrowDownRight className="size-4" />

              <span className="mono text-[10px] uppercase tracking-[0.16em]">
                Scroll to explore
              </span>
            </div>
          </div>

          <div className="lg:pt-16">
            <DeveloperTerminal />
          </div>
        </div>
      </div>
    </section>
  )
}
