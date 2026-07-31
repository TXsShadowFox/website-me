"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
  /** Milliseconds. */
  duration?: number;
  className?: string;
};

export function Counter({
  value,
  prefix = "",
  suffix = "",
  duration = 1200,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (reduce) {
      setDisplay(value);
      return;
    }

    let raf = 0;
    let start: number | null = null;

    const tick = (now: number) => {
      start ??= now;
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduce]);

  const rendered = `${prefix}${display.toLocaleString("en-US")}${suffix}`;

  return (
    // The animated digits are decorative churn for a screen reader; expose the
    // final value once and hide the ticking span.
    <span ref={ref} className={className}>
      <span aria-hidden className="tnum">
        {rendered}
      </span>
      <span className="sr-only">{`${prefix}${value.toLocaleString("en-US")}${suffix}`}</span>
    </span>
  );
}
