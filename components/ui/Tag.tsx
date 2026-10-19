"use client";

import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

/** Static, non-interactive label (tech stack, metadata). */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-line bg-surface2/70 px-2 py-1 font-mono text-[11px] leading-none text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}

type FilterProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  count?: number;
};

/**
 * Interactive filter pill. `aria-pressed` is set here rather than by callers so
 * the toggle semantics can never be forgotten at a call site.
 */
export function FilterTag({ active = false, count, className, children, ...rest }: FilterProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-200",
        active
          ? "border-line2 bg-fg/[0.07] text-fg"
          : "border-line text-muted hover:border-line2 hover:text-fg",
        className
      )}
      {...rest}
    >
      {children}
      {count !== undefined && (
        <span className={cn("tnum font-mono text-[10px]", active ? "text-accent" : "text-subtle")}>
          {count}
        </span>
      )}
    </button>
  );
}
