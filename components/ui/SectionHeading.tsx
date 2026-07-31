"use client";

import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

type Props = {
  /** Rendered on the h2 so `aria-labelledby` on the <section> resolves. */
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: Props) {
  return (
    <Reveal
      className={cn(
        "mb-10 max-w-2xl sm:mb-14",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3",
          align === "center" && "justify-center"
        )}
      >
        <span className="eyebrow">{eyebrow}</span>
        <span aria-hidden className="h-px flex-1 bg-line" />
      </div>

      <h2
        id={id}
        className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-[1.1]"
      >
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}
