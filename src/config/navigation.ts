import {
  CircleUserRound,
  Code2,
  FileText,
  FolderKanban,
  Home,
  Mail,
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
    label: "Projects",
    href: "/#selected-work",
    icon: FolderKanban,
  },
  {
    label: "Stack",
    href: "/#stack",
    icon: Wrench,
  },
  {
    label: "GitHub",
    href: "/github",
    icon: Code2,
  },
] as const
