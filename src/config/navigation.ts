import {
  CircleUserRound,
  Code2,
  FileText,
  Home,
  Mail,
  Terminal,
  Wrench,
} from "lucide-react"

export const navigationItems = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "About",
    href: "/about",
    icon: CircleUserRound,
  },
  {
    label: "Work",
    href: "/work",
    icon: Code2,
  },
  {
    label: "Stack",
    href: "/stack",
    icon: Wrench,
  },
  {
    label: "Build Log",
    href: "/build-log",
    icon: Terminal,
  },
  {
    label: "GitHub",
    href: "/github",
    icon: Code2,
  },
  {
    label: "Resume",
    href: "/resume",
    icon: FileText,
  },
  {
    label: "Contact",
    href: "/contact",
    icon: Mail,
  },
] as const
