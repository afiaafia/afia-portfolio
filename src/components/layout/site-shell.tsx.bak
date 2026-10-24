import type { ReactNode } from "react"

import { MobileNav } from "@/components/layout/mobile-nav"
import { Navbar } from "@/components/layout/navbar"
import { Sidebar } from "@/components/layout/sidebar"
import { CommandPalette } from "@/components/layout/command-palette"

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#08090b] text-white">
      <Sidebar />

      <div className="lg:pl-64">
        <Navbar />

        <main className="relative min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>

      <MobileNav />
      <CommandPalette />
    </div>
  )
}
