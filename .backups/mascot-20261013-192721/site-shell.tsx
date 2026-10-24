import type { ReactNode } from "react"

import { Navbar } from "@/components/layout/navbar"
import { CommandPalette } from "@/components/layout/command-palette"
import { Footer } from "@/components/layout/footer"

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0b0a12] text-white">
      <Navbar />

      <main className="relative min-h-[calc(100vh-4.5rem)]">
        {children}
      </main>

      <Footer />

      <CommandPalette />
    </div>
  )
}
