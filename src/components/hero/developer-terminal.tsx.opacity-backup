import Image from "next/image"
import { Code2 } from "lucide-react"

export function DeveloperTerminal() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0f11]/90 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/15" />
        </div>

        <div className="mono text-[10px] tracking-[0.08em] text-white/25">
          developer.workspace
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="mb-7 flex items-center gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3 sm:p-4">
          <div className="relative size-[88px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] sm:size-28">
            <Image
              src="/images/avatars/afia.jpg"
              alt="Afia — Full-Stack Web Developer"
              fill
              sizes="(max-width: 640px) 88px, 112px"
              className="object-cover"
              priority
            />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold tracking-[-0.02em] text-white sm:text-base">
                Afia A.
              </p>

              <span
                className="size-1.5 rounded-full bg-[#ccff00] shadow-[0_0_10px_rgba(204,255,0,0.65)]"
                aria-label="Currently active"
              />
            </div>

            <p className="mt-1 text-xs leading-5 text-white/40 sm:text-sm">
              Full-Stack Web Developer
            </p>

            <p className="mono mt-2 text-[9px] uppercase tracking-[0.14em] text-white/20">
              /developer/profile
            </p>
          </div>
        </div>

        <div className="mono space-y-5 text-xs leading-6">
          <div>
            <div className="flex gap-2">
              <span className="text-[#ccff00]">$</span>
              <span className="text-white/70">whoami</span>
            </div>

            <p className="pl-5 text-white/45">
              afia — full-stack web developer
            </p>
          </div>

          <div>
            <div className="flex gap-2">
              <span className="text-[#ccff00]">$</span>
              <span className="text-white/70">stack</span>
            </div>

            <div className="mt-1 flex flex-wrap gap-2 pl-5">
              {[
                "React",
                "Next.js",
                "TypeScript",
                "Node.js",
                "Express",
                "MongoDB",
              ].map((technology) => (
                <span
                  key={technology}
                  className="rounded-md border border-white/[0.07] bg-white/[0.025] px-2 py-1 text-[10px] text-white/40"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="flex gap-2">
              <span className="text-[#ccff00]">$</span>
              <span className="text-white/70">principle</span>
            </div>

            <p className="pl-5 text-white/45">
              learn by building
            </p>
          </div>

          <div className="border-t border-white/[0.07] pt-4">
            <div className="flex items-center gap-2 text-white/30">
              <Code2 className="size-3.5 text-[#ccff00]" />
              <span>workspace ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
