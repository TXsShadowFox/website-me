"use client";

import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { personal } from "@/data/portfolio";

const LINKS = [
  { href: `mailto:${personal.email}`, label: "Email", Icon: Mail, external: false },
  { href: personal.github, label: "GitHub", Icon: Github, external: true },
  { href: personal.linkedin, label: "LinkedIn", Icon: Linkedin, external: true },
];

export function Footer() {
  const reduce = useReducedMotion();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line py-10">
      <div className="shell">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="text-sm font-medium">
              {personal.name}
              <span className="text-accent">.</span>
            </p>
            <p className="mt-1 text-xs text-subtle">
              © {year} · Built with Next.js, Tailwind CSS &amp; Framer Motion
            </p>
          </div>

          <div className="flex items-center gap-2">
            {LINKS.map(({ href, label, Icon, external }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent/40 hover:text-accent"
              >
                <Icon className="h-4 w-4" aria-hidden />
              </a>
            ))}
            <button
              type="button"
              onClick={() =>
                window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
              }
              aria-label="Back to top"
              className="ml-1 grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent/40 hover:text-accent"
            >
              <ArrowUp className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
