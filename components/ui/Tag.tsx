"use client";

import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const base =
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] leading-none tracking-tight transition-colors duration-200";

const idle = "border-line bg-surface2 text-muted";
const selected = "border-accent/50 bg-accent/12 text-accent";

/** Static, non-interactive label (tech stack, metadata). */
export function Tag({
  children,
  className,
  tone = "idle",
}: {
  children: ReactNode;
  className?: string;
  tone?: "idle" | "accent";
}) {
  return (
    <span className={cn(base, tone === "accent" ? selected : idle, className)}>
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
export function FilterTag({
  active = false,
  count,
  className,
  children,
  ...rest
}: FilterProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        base,
        "px-3 py-1.5 text-xs hover:border-line2 hover:text-fg",
        active ? selected : idle,
        className
      )}
      {...rest}
    >
      {children}
      {count !== undefined && (
        <span className={cn("tnum text-[10px]", active ? "text-accent/70" : "text-subtle")}>
          {count}
        </span>
      )}
    </button>
  );
}
