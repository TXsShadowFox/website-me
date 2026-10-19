import type { CSSProperties } from "react";

const OUTER = ["PyTorch", "FastAPI", "Redis", "Qdrant", "Next.js"];
const INNER = ["RAG", "Agents", "MLOps"];

/** Centre of the `i`-th of `n` chips on a ring, as percentages of the ring. */
function place(i: number, n: number, offsetDeg: number): CSSProperties {
  const angle = ((360 / n) * i + offsetDeg) * (Math.PI / 180);
  return {
    left: `${50 + 50 * Math.cos(angle)}%`,
    top: `${50 + 50 * Math.sin(angle)}%`,
  };
}

/**
 * The hero's portrait slot: a monogram with the stack orbiting it. Rings turn
 * one way and each chip turns the other at the same rate, so labels stay
 * upright. Decorative only; motion stops under prefers-reduced-motion.
 */
export function Orbit({ initials }: { initials: string }) {
  return (
    <div aria-hidden className="relative h-56 w-56 select-none sm:h-64 sm:w-64">
      <div className="absolute inset-[22%] rounded-full bg-accent/20 blur-3xl" />

      <div className="absolute inset-0 rounded-full border border-dashed border-line2 motion-safe:animate-orbit">
        {OUTER.map((label, i) => (
          <div
            key={label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={place(i, OUTER.length, -90)}
          >
            <span className="block motion-safe:animate-orbit-reverse">
              <span className="block whitespace-nowrap rounded-full border border-line bg-surface px-2.5 py-1 font-mono text-[10px] text-body shadow-sm shadow-black/10">
                {label}
              </span>
            </span>
          </div>
        ))}
      </div>

      <div className="absolute inset-[19%] rounded-full border border-line motion-safe:animate-orbit-slow">
        {INNER.map((label, i) => (
          <div
            key={label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={place(i, INNER.length, -30)}
          >
            <span className="block motion-safe:animate-orbit-slow-reverse">
              <span className="block whitespace-nowrap rounded-full border border-accent/30 bg-canvas px-2 py-0.5 font-mono text-[10px] text-accent">
                {label}
              </span>
            </span>
          </div>
        ))}
      </div>

      <div className="absolute inset-[34%] grid place-items-center rounded-full border border-accent/40 bg-gradient-to-br from-surface to-surface2 shadow-[0_0_80px_-12px_rgb(var(--accent)/0.55)]">
        <span className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">{initials}</span>
      </div>

      {/* "Online" dot on the core's upper-right edge. */}
      <span className="absolute left-[61.3%] top-[38.7%] grid h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-canvas">
        <span className="h-2 w-2 rounded-full bg-positive" />
      </span>
    </div>
  );
}
