"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { skillGroups, strengths } from "@/data/portfolio";

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="section">
      <div className="shell">
        <SectionHeading
          id="skills-heading"
          eyebrow="04 / Skills"
          title="The toolkit."
          description="What I reach for, grouped the way I actually use it — plus an honest read on where I'm strongest."
        />

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <ul className="grid list-none gap-4 sm:grid-cols-2">
            {skillGroups.map((group, i) => (
              <Reveal
                as="li"
                key={group.name}
                delay={Math.min(i * 0.05, 0.2)}
                className="card p-5 transition-colors duration-200 hover:border-line2"
              >
                <div className="mb-4 flex items-baseline justify-between gap-3">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.12em]">
                    {group.name}
                  </h3>
                  <span className="font-mono text-[11px] text-subtle">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <ul className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li key={item}>
                      <Tag>{item}</Tag>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.1} className="card p-6 lg:sticky lg:top-28 lg:self-start">
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em]">
              Strength map
            </h3>
            <p className="mt-1 text-xs text-muted">Self-rated across six axes.</p>

            <Radar />

            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {strengths.map((axis) => (
                <li key={axis.label} className="flex items-center justify-between gap-2">
                  <span className="truncate text-xs text-muted">{axis.label}</span>
                  <span className="tnum font-mono text-xs font-semibold text-accent">
                    {axis.value}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const SIZE = 240;
const CENTER = SIZE / 2;
const RADIUS = 96;
const RINGS = [0.25, 0.5, 0.75, 1];

function pointAt(index: number, count: number, ratio: number) {
  const angle = (Math.PI * 2 * index) / count - Math.PI / 2;
  return [
    CENTER + Math.cos(angle) * RADIUS * ratio,
    CENTER + Math.sin(angle) * RADIUS * ratio,
  ] as const;
}

function polygon(ratios: number[]) {
  return ratios
    .map((ratio, i) => pointAt(i, ratios.length, ratio))
    .map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`)
    .join(" ");
}

/**
 * Decorative chart — the numbers are also rendered as a text list beside it, so
 * the SVG itself is hidden from assistive tech. Labels live outside the SVG,
 * which is what kept the old version from clipping long axis names.
 */
function Radar() {
  const reduce = useReducedMotion();
  const count = strengths.length;
  const shape = polygon(strengths.map((s) => s.value / 100));

  return (
    <div className="mt-5 grid place-items-center">
      <svg
        aria-hidden
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="h-auto w-full max-w-[15rem] text-line2"
      >
        {RINGS.map((ring) => (
          <polygon
            key={ring}
            points={polygon(Array.from({ length: count }, () => ring))}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.45}
            strokeWidth={1}
          />
        ))}

        {Array.from({ length: count }).map((_, i) => {
          const [x, y] = pointAt(i, count, 1);
          return (
            <line
              key={i}
              x1={CENTER}
              y1={CENTER}
              x2={x}
              y2={y}
              stroke="currentColor"
              strokeOpacity={0.35}
              strokeWidth={1}
            />
          );
        })}

        <motion.g
          initial={reduce ? false : { opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
        >
          <polygon
            points={shape}
            className="fill-accent/25 stroke-accent"
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
          {strengths.map((axis, i) => {
            const [x, y] = pointAt(i, count, axis.value / 100);
            return <circle key={axis.label} cx={x} cy={y} r={3} className="fill-accent" />;
          })}
        </motion.g>

        {strengths.map((axis, i) => {
          const [x, y] = pointAt(i, count, 1.14);
          return (
            <text
              key={axis.label}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-subtle font-mono text-[9px]"
            >
              {axis.short}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
