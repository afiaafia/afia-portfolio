import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/afiaafia",
    icon: SiGithub,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/afia-afia",
    icon: FaLinkedinIn,
  },
  {
    label: "Email",
    href: "mailto:afiastudent461@gmail.com",
    icon: Mail,
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#08090B]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="h-px w-full bg-linear-to-r from-transparent via-violet-400/60 to-transparent" />

        <div className="flex flex-col gap-5 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Link
              href="/"
              aria-label="Afia Mubassira — Home"
              className="inline-flex items-center gap-1 text-xl font-bold tracking-tight text-white transition-colors hover:text-violet-300"
            >
              AFIA<span className="text-violet-400">.</span>
            </Link>

            <p className="font-mono text-xs tracking-wide text-white/85">
              <span className="text-violet-400">&gt;</span>{" "}
              building_for_the_web
            </p>
          </div>

          <nav
            aria-label="Social links"
            className="flex flex-wrap items-center gap-3"
          >
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={label === "Email" ? undefined : "_blank"}
                rel={label === "Email" ? undefined : "noreferrer"}
                aria-label={label}
                className="group inline-flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-400/6 text-violet-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400/50 hover:bg-violet-400/12 hover:text-violet-300"
              >
                <Icon
                  aria-hidden="true"
                  className="h-4.5 w-4.5 transition-transform duration-300 group-hover:scale-110"
                />
                <span className="sr-only">{label}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="border-t border-white/[0.07] py-4">
          <div className="flex flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">
            <p className="text-xs text-white/60">
              © {new Date().getFullYear()} Afia Mubassira. All rights reserved.
            </p>

            <p className="text-sm text-white/65">
              Crafted with care <span className="text-violet-400">♡</span> and code.
            </p>

            <Link
              href="/"
              className="group inline-flex items-center gap-2 font-mono text-[10px] tracking-wider text-white/55 transition-colors duration-300 hover:text-violet-300 motion-reduce:transition-none sm:mt-0"
            >
              BACK TO TOP
              <ArrowUpRight className="h-3 w-3 -rotate-45 transition-transform group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
