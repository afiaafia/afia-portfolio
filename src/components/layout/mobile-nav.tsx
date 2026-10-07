"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"

import { navigationItems } from "@/config/navigation"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 flex size-12 items-center justify-center rounded-full border border-white/10 bg-[#111214]/95 text-white shadow-2xl backdrop-blur-xl lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="size-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] bg-[#08090b]/95 backdrop-blur-xl lg:hidden">
          <div className="flex h-full flex-col p-5">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="text-sm font-semibold tracking-[0.18em] text-white"
              >
                AFIA.OS
              </Link>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex size-10 items-center justify-center rounded-full border border-white/10 text-white/70"
                aria-label="Close navigation"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav className="mt-14" aria-label="Mobile navigation">
              <div className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-4 text-white/75 transition-colors hover:bg-white/[0.05] hover:text-white"
                    >
                      <Icon className="size-4 text-[#ccff00]" />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            </nav>

            <div className="mt-auto border-t border-white/[0.07] pt-5">
              <p className="text-xs leading-5 text-white/35">
                Full-Stack Web Developer · Bangladesh
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
