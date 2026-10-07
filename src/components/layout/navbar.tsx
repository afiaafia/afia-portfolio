import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { siteConfig } from "@/config/site"

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-[#090a0c]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="lg:hidden">
          <Link
            href="/"
            className="text-sm font-semibold tracking-[0.18em] text-white"
          >
            {siteConfig.shortName}
          </Link>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
            Workspace
          </span>
          <span className="text-white/15">/</span>
          <span className="text-xs text-white/55">Home</span>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 sm:flex">
            <span className="text-[10px] uppercase tracking-[0.14em] text-white/30">
              Press
            </span>
            <kbd className="rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-white/55">
              Ctrl K
            </kbd>
          </div>

          <Link
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-white/55 transition-colors hover:text-white"
          >
            GitHub
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </header>
  )
}
