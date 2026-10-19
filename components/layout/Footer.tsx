"use client";

import { ArrowUp } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { personal } from "@/data/portfolio";

export function Footer() {
  const reduce = useReducedMotion();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line/70">
      <div className="shell flex flex-col-reverse gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[11px] text-subtle">
          © {year} {personal.name} · Built with Next.js &amp; Tailwind CSS
        </p>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
          className="pill w-fit font-mono"
        >
          Back to top
          <ArrowUp className="h-3 w-3" aria-hidden />
        </button>
      </div>
    </footer>
  );
}
