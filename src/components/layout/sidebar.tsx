"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { navigationItems } from "@/config/navigation"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-white/[0.07] bg-[#090a0c]/95 backdrop-blur-xl lg:flex lg:flex-col">
      <div className="flex h-full flex-col">
        <div className="border-b border-white/[0.07] px-6 py-5">
          <Link
            href="/"
            className="group inline-flex items-center gap-3"
            aria-label="Go to homepage"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#ccff00]/20 bg-[#ccff00]/10 text-[11px] font-bold tracking-wider text-[#ccff00]">
              A
            </span>

            <span className="text-sm font-semibold tracking-[0.18em] text-white">
              AFIA.OS
            </span>
          </Link>
        </div>

        <div className="px-4 py-6">
          <p className="mb-3 px-3 text-[10px] font-medium uppercase tracking-[0.2em] text-white/35">
            Workspace
          </p>

          <nav aria-label="Primary navigation">
            <div className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href))

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                      isActive
                        ? "bg-white/[0.07] text-white"
                        : "text-white/50 hover:bg-white/[0.04] hover:text-white",
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-4 transition-colors",
                        isActive
                          ? "text-[#ccff00]"
                          : "text-white/35 group-hover:text-white/70",
                      )}
                      strokeWidth={1.8}
                    />

                    <span>{item.label}</span>

                    {isActive && (
                      <span
                        className="ml-auto size-1.5 rounded-full bg-[#ccff00]"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                )
              })}
            </div>
          </nav>
        </div>

        <div className="mt-auto border-t border-white/[0.07] p-4">
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#ccff00] shadow-[0_0_12px_rgba(204,255,0,0.55)]" />
              <span className="text-xs font-medium text-white/75">
                Currently building
              </span>
            </div>

            <p className="mt-2 text-xs leading-5 text-white/40">
              Full-stack web projects, one layer at a time.
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
