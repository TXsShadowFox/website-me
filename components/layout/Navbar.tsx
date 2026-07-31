"use client";

import { useEffect, useMemo, useState } from "react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks, personal } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/useActiveSection";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MobileNav } from "./MobileNav";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const sectionIds = useMemo(() => navLinks.map((l) => l.href.slice(1)), []);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        id="site-header"
        className="fixed inset-x-0 top-0 z-[80] pt-3 transition-[padding] duration-300 sm:pt-4"
      >
        <div className="shell">
          <div
            className={cn(
              "flex items-center justify-between gap-4 rounded-full px-3 py-2 transition-all duration-300 ease-out",
              scrolled
                ? "glass border border-line shadow-card"
                : "border border-transparent"
            )}
          >
            <a
              href="#top"
              aria-label={`${personal.name} — back to top`}
              className="group flex shrink-0 items-center gap-2.5 rounded-full pl-1 pr-2"
            >
              <span
                aria-hidden
                className="grid h-8 w-8 place-items-center rounded-xl bg-accent font-mono text-[11px] font-bold tracking-tight text-accent-fg"
              >
                {personal.initials}
              </span>
              <span className="hidden text-sm font-semibold tracking-tight sm:inline">
                {personal.firstName}
                <span className="text-accent">.</span>
              </span>
            </a>

            <nav aria-label="Sections" className="hidden md:block">
              <ul className="flex items-center gap-0.5">
                {navLinks.map((link) => {
                  const isActive = active === link.href.slice(1);
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                          "relative block rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-200",
                          isActive
                            ? "text-fg"
                            : "text-muted hover:text-fg"
                        )}
                      >
                        {isActive && (
                          <span
                            aria-hidden
                            className="absolute inset-0 rounded-full bg-accent/12"
                          />
                        )}
                        <span className="relative">{link.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex shrink-0 items-center gap-2">
              <ThemeToggle />
              <a
                href="#contact"
                className="hidden rounded-full bg-accent px-4 py-2 text-[13px] font-medium text-accent-fg transition-colors hover:bg-accent-strong lg:inline-flex"
              >
                Get in touch
              </a>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-muted transition-colors hover:text-fg md:hidden"
              >
                <Menu className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileNav
        open={menuOpen}
        active={active}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}
