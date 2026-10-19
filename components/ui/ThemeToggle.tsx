"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Two-state light switch: warm "ink" (dark, the default) or "paper" (light).
 * Before mount the theme is unknown, so it renders the default state — the
 * same markup the server sent — and settles once next-themes has read storage.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const dark = mounted ? resolvedTheme !== "light" : true;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Dark mode"
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="relative inline-flex h-7 w-[52px] shrink-0 items-center rounded-full border border-line2 bg-surface2 shadow-inner shadow-black/10 transition-colors duration-200 hover:border-subtle/60"
    >
      <span aria-hidden className="flex w-full items-center justify-between px-[7px] text-subtle">
        <Sun className="h-3 w-3" />
        <Moon className="h-3 w-3" />
      </span>
      <span
        aria-hidden
        className={cn(
          "absolute left-[3px] top-1/2 grid h-[20px] w-[20px] -translate-y-1/2 place-items-center rounded-full bg-fg text-canvas shadow-md shadow-black/30 transition-transform duration-300 ease-out",
          dark ? "translate-x-[24px]" : "translate-x-0"
        )}
      >
        {dark ? <Moon className="h-3 w-3" /> : <Sun className="h-3 w-3" />}
      </span>
    </button>
  );
}
