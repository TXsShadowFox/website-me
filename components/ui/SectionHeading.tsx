"use client";

import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

type Props = {
  /** Rendered on the h2 so `aria-labelledby` on the <section> resolves. */
  id: string;
  title: string;
  description?: string;
  /** Right-aligned affordance, e.g. a "View all" link. */
  action?: ReactNode;
  className?: string;
};

export function SectionHeading({ id, title, description, action, className }: Props) {
  return (
    <Reveal
      className={cn(
        "mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div className="max-w-2xl">
        <h2 id={id} className="text-3xl font-bold tracking-tight text-heading sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0 sm:pb-1.5">{action}</div>}
    </Reveal>
  );
}
