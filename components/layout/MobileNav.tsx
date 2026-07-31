"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Download, Github, Linkedin, Mail, X } from "lucide-react";
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
  { href: `mailto:${personal.email}`, label: "Email", Icon: Mail, external: false },
  { href: personal.github, label: "GitHub", Icon: Github, external: true },
  { href: personal.linkedin, label: "LinkedIn", Icon: Linkedin, external: true },
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
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col border-l border-line bg-surface shadow-lift outline-none"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-subtle">
                Menu
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation menu"
                className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:text-fg"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>

            <nav aria-label="Sections" className="flex-1 overflow-y-auto px-3 py-4">
              <ul className="flex flex-col gap-0.5">
                {navLinks.map((link, i) => {
                  const isActive = active === link.href.slice(1);
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={onClose}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                          "group flex items-center justify-between rounded-xl px-4 py-3.5 text-lg font-medium transition-colors",
                          isActive
                            ? "bg-accent/12 text-accent"
                            : "text-fg hover:bg-surface2"
                        )}
                      >
                        <span className="flex items-baseline gap-3">
                          <span className="font-mono text-[11px] text-subtle">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {link.label}
                        </span>
                        <ArrowUpRight
                          aria-hidden
                          className="h-4 w-4 text-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="border-t border-line px-5 py-5">
              <a
                href={personal.resumePath}
                download
                onClick={onClose}
                className="btn-ghost w-full"
              >
                <Download className="h-4 w-4" aria-hidden />
                Download résumé
              </a>

              <div className="mt-4 flex items-center gap-2">
                {SOCIALS.map(({ href, label, Icon, external }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </Portal>
  );
}
