"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const OPTIONS = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "system", label: "System", Icon: Monitor },
  { value: "dark", label: "Dark", Icon: Moon },
] as const;

/**
 * Segmented light / system / dark control. Rendering a fixed-size skeleton
 * before mount keeps the header from shifting during hydration.
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-9 w-[6.75rem] rounded-full border border-line bg-surface2" />;
  }

  return (
    <div
      role="radiogroup"
      aria-label="Color theme"
      className="flex items-center gap-0.5 rounded-full border border-line bg-surface2 p-0.5"
    >
      {OPTIONS.map(({ value, label, Icon }) => {
        const active = theme === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={`${label} theme`}
            title={`${label} theme`}
            onClick={() => setTheme(value)}
            className={cn(
              "grid h-8 w-8 place-items-center rounded-full transition-colors duration-200",
              active
                ? "bg-accent text-accent-fg"
                : "text-subtle hover:bg-surface hover:text-fg"
            )}
          >
            <Icon className="h-[15px] w-[15px]" aria-hidden />
          </button>
        );
      })}
    </div>
  );
}
