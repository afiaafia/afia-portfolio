"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowUpRight,
  CircleUserRound,
  Code2,
  FileText,
  Home,
  Mail,
  Search,
  Shuffle,
  Terminal,
  Wrench,
} from "lucide-react"
import { Command } from "cmdk"

type CommandItem = {
  label: string
  href: string
  icon: typeof Home
  external?: boolean
}

const navigationCommands: CommandItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "About", href: "/about", icon: CircleUserRound },
  { label: "Work", href: "/work", icon: Code2 },
  { label: "Stack", href: "/stack", icon: Wrench },
  { label: "Build Log", href: "/build-log", icon: Terminal },
  { label: "GitHub", href: "/github", icon: Code2 },
  { label: "Resume", href: "/resume", icon: FileText },
  { label: "Contact", href: "/contact", icon: Mail },
]

export function CommandPalette() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function handleKeyboard(event: KeyboardEvent) {
      const isCommandK =
        (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k"

      if (isCommandK) {
        event.preventDefault()
        setOpen((current) => !current)
      }

      if (event.key === "Escape") {
        setOpen(false)
      }
    }

    function handleOpenEvent() {
      setOpen(true)
    }

    window.addEventListener("keydown", handleKeyboard)
    window.addEventListener("open-command-palette", handleOpenEvent)

    return () => {
      window.removeEventListener("keydown", handleKeyboard)
      window.removeEventListener(
        "open-command-palette",
        handleOpenEvent,
      )
    }
  }, [])

  function navigate(href: string, external = false) {
    setOpen(false)

    if (external) {
      window.open(href, "_blank", "noopener,noreferrer")
      return
    }

    router.push(href)
  }

  return (
    <div
      className={`fixed inset-0 z-[100] items-start justify-center bg-black/65 px-4 pt-[12vh] backdrop-blur-md ${
        open ? "flex" : "hidden"
      }`}
      role="presentation"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) {
          setOpen(false)
        }
      }}
    >
      <Command
        label="AFIA.OS Command Palette"
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#0d0f11] shadow-[0_30px_100px_rgba(0,0,0,0.55)]"
        shouldFilter
      >
        <div className="flex items-center gap-3 border-b border-white/[0.07] px-4">
          <Search className="size-4 shrink-0 text-white/30" />

          <Command.Input
            autoFocus
            placeholder="Search AFIA.OS..."
            className="h-14 w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25"
          />

          <kbd className="hidden rounded-md border border-white/10 px-2 py-1 text-[10px] text-white/30 sm:block">
            ESC
          </kbd>
        </div>

        <Command.List className="max-h-[55vh] overflow-y-auto p-2">
          <Command.Empty className="px-4 py-10 text-center text-sm text-white/35">
            No command found.
          </Command.Empty>

          <Command.Group
            heading="Navigation"
            className="px-1 pb-2 text-[10px] uppercase tracking-[0.18em] text-white/25"
          >
            {navigationCommands.map((item) => {
              const Icon = item.icon

              return (
                <Command.Item
                  key={item.href}
                  value={item.label}
                  onSelect={() => navigate(item.href, item.external)}
                  className="group flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/60 outline-none transition-colors data-[selected=true]:bg-white/[0.06] data-[selected=true]:text-white"
                >
                  <Icon className="size-4 text-white/30 transition-colors group-data-[selected=true]:text-[#ccff00]" />

                  <span>{item.label}</span>

                  <ArrowUpRight className="ml-auto size-3.5 text-white/20 group-data-[selected=true]:text-[#ccff00]" />
                </Command.Item>
              )
            })}
          </Command.Group>

          <Command.Group
            heading="Actions"
            className="border-t border-white/[0.07] px-1 pt-3 text-[10px] uppercase tracking-[0.18em] text-white/25"
          >
            <Command.Item
              value="Random Build"
              onSelect={() => navigate("/build-log")}
              className="group flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/60 outline-none transition-colors data-[selected=true]:bg-white/[0.06] data-[selected=true]:text-white"
            >
              <Shuffle className="size-4 text-white/30 transition-colors group-data-[selected=true]:text-[#ccff00]" />

              <span>Random Build</span>

              <ArrowUpRight className="ml-auto size-3.5 text-white/20 group-data-[selected=true]:text-[#ccff00]" />
            </Command.Item>

            <Command.Item
              value="Open GitHub Profile"
              onSelect={() =>
                navigate("https://github.com/afiaafia", true)
              }
              className="group flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/60 outline-none transition-colors data-[selected=true]:bg-white/[0.06] data-[selected=true]:text-white"
            >
              <Code2 className="size-4 text-white/30 transition-colors group-data-[selected=true]:text-[#ccff00]" />

              <span>Open GitHub Profile</span>

              <ArrowUpRight className="ml-auto size-3.5 text-white/20 group-data-[selected=true]:text-[#ccff00]" />
            </Command.Item>
          </Command.Group>
        </Command.List>

        <div className="flex items-center justify-between border-t border-white/[0.07] px-4 py-3">
          <p className="mono text-[10px] text-white/20">
            AFIA.OS COMMAND SYSTEM
          </p>

          <div className="flex items-center gap-2 text-[10px] text-white/20">
            <kbd className="rounded border border-white/10 px-1.5 py-0.5">
              ↑↓
            </kbd>
            <span>navigate</span>

            <kbd className="rounded border border-white/10 px-1.5 py-0.5">
              ↵
            </kbd>
            <span>open</span>
          </div>
        </div>
      </Command>
    </div>
  )
}
