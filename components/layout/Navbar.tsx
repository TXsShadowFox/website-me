"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks, personal } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/useActiveSection";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MobileNav } from "./MobileNav";

/**
 * Floating capsule nav. Links are `/#section` so they work from the project
 * pages too; on the home page they scroll in place.
 */
export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === "/";

  const sectionIds = useMemo(() => navLinks.map((l) => l.id), []);
  const section = useActiveSection(sectionIds, onHome);
  // Project pages belong to the Work section.
  const active = onHome ? section : pathname.startsWith("/projects") ? "work" : "";

  return (
    <>
      <header
        id="site-header"
        className="pointer-events-none fixed inset-x-0 top-3 z-[80] flex justify-center px-3 sm:top-4 sm:px-4"
      >
        <div className="glass pointer-events-auto flex w-full max-w-page items-center justify-between gap-3 rounded-full border border-line px-3 py-1.5 shadow-2xl shadow-black/20 sm:px-4 sm:py-2">
          <Link
            href="/#top"
            aria-label={`${personal.name} — home`}
            className="shrink-0 rounded-full pl-1.5 text-sm font-semibold tracking-tight text-fg transition-opacity hover:opacity-80 sm:text-[15px]"
          >
            {personal.name}
          </Link>

          <nav aria-label="Sections" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = active === link.id;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "block rounded-full border px-3 py-1 text-xs font-medium transition-colors duration-200",
                        isActive
                          ? "border-line2 bg-fg/[0.06] text-fg"
                          : "border-transparent text-muted hover:bg-fg/[0.05] hover:text-fg"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              className="grid h-8 w-8 place-items-center rounded-full border border-line text-muted transition-colors hover:text-fg md:hidden"
            >
              <Menu className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={menuOpen} active={active} onClose={() => setMenuOpen(false)} />
    </>
  );
}
