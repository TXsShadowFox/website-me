"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ComponentType, ReactNode } from "react";

type Tag = "div" | "li" | "section" | "article";

type Props = {
  children: ReactNode;
  /** Seconds. Keep staggers short — long ones read as lag on a scroll page. */
  delay?: number;
  y?: number;
  className?: string;
  as?: Tag;
};

/**
 * Scroll-triggered entrance. Framer Motion animates via JS transforms, so the
 * global `prefers-reduced-motion` CSS rule never reaches it — the hook does.
 */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  as = "div",
}: Props) {
  const reduce = useReducedMotion();

  if (reduce) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  // motion[tag] is a union of element-specific components; the props below are
  // valid for every one of them, so a single call signature is enough.
  const Motion = motion[as] as ComponentType<Record<string, unknown>>;

  return (
    <Motion
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Motion>
  );
}
