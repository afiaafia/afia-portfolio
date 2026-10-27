"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";

const links = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/#selected-work" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Stack", href: "/#stack" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const sectionIds = ["selected-work", "stack", "contact"];
    const visibleSections = new Set<string>();
    const syncHash = () => {
      const hash = window.location.hash;
      setActiveSection(sectionIds.includes(hash.slice(1)) ? hash : "");
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("popstate", syncHash);

    if (pathname !== "/" || !("IntersectionObserver" in window)) {
      return () => {
        window.removeEventListener("hashchange", syncHash);
        window.removeEventListener("popstate", syncHash);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.add(entry.target.id);
          } else {
            visibleSections.delete(entry.target.id);
          }
        });

        const activeId = [...visibleSections]
          .map((id) => document.getElementById(id))
          .filter((element): element is HTMLElement => element !== null)
          .sort(
            (first, second) =>
              first.getBoundingClientRect().top -
              second.getBoundingClientRect().top,
          )[0]?.id;

        if (activeId) {
          setActiveSection(`#${activeId}`);
        } else if (window.scrollY < window.innerHeight * 0.45) {
          setActiveSection("");
        }
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("popstate", syncHash);
    };
  }, [pathname]);

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/" && activeSection === "";
    }

    if (href.startsWith("/#")) {
      return pathname === "/" && activeSection === href.slice(1);
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function handleNavigation(href: string) {
    if (href.startsWith("/#")) {
      setActiveSection(href.slice(1));
    } else if (href === "/") {
      setActiveSection("");
    }

    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#0b0a12]/90 backdrop-blur-2xl">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />

      <div className="mx-auto grid h-[72px] max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-5 sm:px-8">
        <Link
          href="/"
          aria-label="Afia — Home"
          onClick={() => handleNavigation("/")}
          className="group relative shrink-0 text-lg font-bold tracking-[-0.06em] text-white transition-colors duration-300 hover:text-violet-200"
        >
          AFIA
          <span className="text-violet-400 transition-colors duration-300 group-hover:text-purple-300">
            .
          </span>
          <span className="absolute -inset-2 -z-10 rounded-xl bg-violet-500/0 blur-xl transition-colors duration-300 group-hover:bg-violet-500/15" />
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center justify-center gap-1 md:flex"
        >
          {links.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => handleNavigation(item.href)}
                aria-current={active ? "page" : undefined}
                className={`group relative rounded-lg px-3 py-2 text-[13px] font-medium transition-colors duration-300 motion-reduce:transition-none ${
                  active
                    ? "text-violet-300"
                    : "text-white/70 hover:text-violet-200"
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3 -bottom-px h-px origin-center bg-violet-400 transition-transform duration-[280ms] ease-out motion-reduce:transition-none ${
                    active
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center justify-self-end md:flex">
          <button
            type="button"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            aria-label={
              mounted
                ? `Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`
                : "Toggle color theme"
            }
            title={
              mounted
                ? resolvedTheme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
                : "Toggle color theme"
            }
            className="group flex size-9 items-center justify-center rounded-xl border border-violet-400/25 bg-violet-500/[0.08] text-violet-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-300/60 hover:bg-violet-500/20 hover:text-violet-200 hover:shadow-[0_0_22px_rgba(139,92,246,0.22)]"
          >
            {mounted && resolvedTheme === "light" ? (
              <Moon className="size-4 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
            ) : (
              <Sun className="size-4 transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110" />
            )}
          </button>
        </div>

        <div className="col-span-2 flex items-center justify-self-end gap-2 md:hidden">
          <button
            type="button"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            aria-label={
              mounted
                ? `Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`
                : "Toggle color theme"
            }
            title={
              mounted
                ? resolvedTheme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
                : "Toggle color theme"
            }
            className="group flex size-10 items-center justify-center rounded-xl border border-violet-400/25 bg-violet-500/[0.08] text-violet-300 transition-all duration-300 hover:border-violet-300/60 hover:bg-violet-500/20 hover:text-violet-200"
          >
            {mounted && resolvedTheme === "light" ? (
              <Moon className="size-5 transition-transform duration-300 group-hover:-rotate-12" />
            ) : (
              <Sun className="size-5 transition-transform duration-300 group-hover:rotate-45" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/90 transition-all duration-300 hover:border-violet-400/40 hover:bg-violet-400/10 hover:text-violet-200 md:hidden"
          >
            {mobileOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/[0.07] bg-[#0b0a12]/95 px-5 py-5 backdrop-blur-2xl md:hidden">
          <nav aria-label="Mobile navigation" className="mx-auto max-w-7xl">
            <div className="grid gap-2">
              {links.map((item) => {
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => handleNavigation(item.href)}
                    aria-current={active ? "page" : undefined}
                    className={`group flex items-center justify-between rounded-xl border px-4 py-3 text-sm transition-all duration-300 ${
                      active
                        ? "border-violet-400/25 bg-violet-400/[0.08] text-violet-200"
                        : "border-white/[0.06] text-white/90 hover:border-violet-400/25 hover:bg-violet-400/[0.06] hover:text-white"
                    }`}
                  >
                    {item.label}
                    <ArrowUpRight className="relative z-10 size-4 text-violet-300/90 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-200" />
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
