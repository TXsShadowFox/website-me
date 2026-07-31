"use client";

import { Fragment } from "react";
import { MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { experiences } from "@/data/portfolio";

/** Matches the numbers worth pulling out of a bullet: 40%, 50K+, 10+, sub-second. */
const METRIC = /(~?\d+(?:\.\d+)?%|\d+K\+?|\d+\+|sub-second)/g;

function withMetrics(text: string) {
  // `split` with a capturing group keeps the delimiters, so odd indices are matches.
  return text.split(METRIC).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="font-mono font-medium text-accent">
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="section">
      <div className="shell">
        <SectionHeading
          id="experience-heading"
          eyebrow="02 / Experience"
          title="Where I've shipped."
          description="Short, dense track record across ML research, MLOps, and backend systems."
        />

        <ol className="relative">
          <div
            aria-hidden
            className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/60 via-line to-transparent"
          />

          {experiences.map((exp, i) => (
            <Reveal
              as="li"
              key={`${exp.company}-${exp.start}`}
              delay={i * 0.08}
              className="relative pb-10 pl-8 last:pb-0 sm:pl-12"
            >
              <span
                aria-hidden
                className="absolute left-0 top-6 grid h-[15px] w-[15px] place-items-center"
              >
                <span className="absolute inset-0 rounded-full bg-accent/25 motion-safe:animate-pulse-soft" />
                <span className="relative h-[7px] w-[7px] rounded-full bg-accent ring-4 ring-canvas" />
              </span>

              <article className="card p-5 transition-colors duration-200 hover:border-line2 sm:p-7">
                <header className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
                      {exp.role}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-accent">{exp.company}</p>
                  </div>
                  <div className="flex flex-col gap-1 text-xs sm:items-end">
                    <span className="font-mono text-muted">
                      {exp.start} — {exp.end}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-subtle">
                      <MapPin className="h-3 w-3" aria-hidden />
                      {exp.location}
                    </span>
                  </div>
                </header>

                <p className="mt-4 text-sm text-muted">{exp.summary}</p>

                <ul className="mt-4 space-y-2.5">
                  {exp.bullets.map((bullet) => (
                    <li key={bullet.slice(0, 40)} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span
                        aria-hidden
                        className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-accent/70"
                      />
                      <span>{withMetrics(bullet)}</span>
                    </li>
                  ))}
                </ul>

                <ul className="mt-6 flex flex-wrap gap-1.5">
                  {exp.stack.map((tech) => (
                    <li key={tech}>
                      <Tag>{tech}</Tag>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
