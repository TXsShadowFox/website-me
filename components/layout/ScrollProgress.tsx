"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/** Hairline reading-progress bar pinned to the very top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: reduce ? scrollYProgress : scaleX }}
      className="fixed inset-x-0 top-0 z-[90] h-0.5 origin-left bg-gradient-to-r from-accent to-accent2"
    />
  );
}
