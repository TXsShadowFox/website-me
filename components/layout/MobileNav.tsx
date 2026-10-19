"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, FileText, X } from "lucide-react";
import { useRef } from "react";
import { navLinks, personal } from "@/data/portfolio";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { Portal } from "@/components/ui/Portal";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  active: string;
  onClose: () => void;
};

const SOCIALS = [
  { href: personal.github, label: "GitHub" },
  { href: personal.linkedin, label: "LinkedIn" },
];

export function MobileNav({ open, active, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  useFocusTrap({ open, onClose, containerRef: panelRef });

  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[110] md:hidden"
          >
            <div
              aria-hidden
              onClick={onClose}
              className="absolute inset-0 bg-canvas/80 backdrop-blur-sm"
            />

            <motion.div
              id="mobile-nav"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
              tabIndex={-1}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-3 top-3 overflow-hidden rounded-3xl border border-line bg-surface shadow-2xl shadow-black/40 outline-none"
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
                <span className="text-sm font-semibold tracking-tight">{personal.name}</span>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close navigation menu"
                  className="grid h-8 w-8 place-items-center rounded-full border border-line text-muted transition-colors hover:text-fg"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </div>

              <nav aria-label="Sections" className="px-2 py-2">
                <ul className="flex flex-col">
                  {navLinks.map((link, i) => {
                    const isActive = active === link.id;
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={onClose}
                          aria-current={isActive ? "true" : undefined}
                          className={cn(
                            "group flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium transition-colors",
                            isActive ? "bg-fg/[0.06] text-fg" : "text-body hover:bg-fg/[0.04]"
                          )}
                        >
                          <span className="flex items-baseline gap-3">
                            <span className="font-mono text-[10px] text-subtle">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            {link.label}
                          </span>
                          <ArrowUpRight
                            aria-hidden
                            className="h-4 w-4 text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="flex flex-wrap items-center gap-2 border-t border-line px-5 py-4">
                <a href={personal.resumePath} onClick={onClose} className="pill-accent">
                  <FileText className="h-3.5 w-3.5" aria-hidden />
                  Résumé
                </a>
                {SOCIALS.map(({ href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pill"
                  >
                    {label}
                    <ArrowUpRight className="h-3 w-3" aria-hidden />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
