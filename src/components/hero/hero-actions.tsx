import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { siteConfig } from "@/config/site"

export function HeroActions() {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <Link
        href="/work"
        className="group inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-5 py-3 text-sm font-semibold text-black transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(204,255,0,0.12)]"
      >
        Explore work

        <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>

      <Link
        href={siteConfig.github}
        target="_blank"
        rel="noreferrer"
        className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-5 py-3 text-sm font-medium text-white/70 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
      >
        GitHub

        <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
    </div>
  )
}
