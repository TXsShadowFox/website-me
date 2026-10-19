"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";

type Props = {
  text: string;
  className?: string;
};

/**
 * A paragraph whose words brighten one after another as it scrolls into view.
 * Words keep real spaces between them, so copy-paste and screen readers get
 * ordinary text; only opacity is animated.
 */
export function WordReveal({ text, className }: Props) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });

  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {reduce
        ? text
        : words.map((word, i) => (
            <Word
              key={`${word}-${i}`}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1) / words.length]}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </Word>
          ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.22, 1]);
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}
