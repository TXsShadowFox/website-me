"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, FileText } from "lucide-react";
import { Orbit } from "@/components/hero/Orbit";
import { LocalTime } from "@/components/ui/LocalTime";
import { TypedGreeting } from "@/components/ui/TypedGreeting";
import { greetings, heroStatement, personal, workedWith } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const MARK_STYLES = {
  sans: "text-[17px] font-semibold tracking-tight",
  mono: "font-mono text-[13px] font-semibold uppercase tracking-[0.16em]",
  serif: "font-serif text-[21px] italic",
} as const;

export function Hero() {
  const reduce = useReducedMotion();

  // One shared entrance so the hero settles as a unit rather than a cascade.
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-40"
    >
      {/* Warm wash behind the hero, fading out before the first section. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-12 -z-10 h-96 w-full max-w-4xl -translate-x-1/2 bg-gradient-to-b from-accent/[0.08] via-accent/[0.02] to-transparent blur-3xl"
      />

      <div className="shell">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <motion.div {...rise(0)}>
              <TypedGreeting words={greetings} />
            </motion.div>

            <motion.h1
              {...rise(0.08)}
              id="hero-heading"
              className="mt-5 max-w-3xl text-[28px] font-medium leading-[1.22] tracking-tight text-heading sm:text-[36px] sm:leading-[1.18]"
            >
              {heroStatement.map((part) =>
                part.emphasis ? (
                  <span
                    key={part.text}
                    className="underline decoration-subtle/70 decoration-1 underline-offset-[6px]"
                  >
                    {part.text}
                  </span>
                ) : (
                  <span key={part.text}>{part.text}</span>
                )
              )}
            </motion.h1>

            <motion.div {...rise(0.16)} className="mt-8 flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full border border-positive/25 bg-positive/[0.08] px-3 py-1.5 text-xs font-medium text-positive">
                <span className="relative grid h-2 w-2 place-items-center">
                  <span className="absolute h-2 w-2 rounded-full bg-positive/60 motion-safe:animate-ping" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-positive" />
                </span>
                {personal.availability}
              </span>
              <Link href="/#work" className="pill">
                View work
                <ArrowDown className="h-3 w-3" aria-hidden />
              </Link>
              <a href={personal.resumePath} className="pill">
                <FileText className="h-3 w-3" aria-hidden />
                Résumé
              </a>
            </motion.div>
          </div>

          <motion.div
            {...rise(0.2)}
            className="flex flex-col items-center justify-center lg:col-span-4"
          >
            <Orbit initials={personal.initials} />
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
              {personal.locationShort} · {personal.timeZoneLabel}{" "}
              <LocalTime timeZone={personal.timeZone} />
            </p>
          </motion.div>
        </div>

        <motion.div {...rise(0.28)} className="mt-16 sm:mt-20">
          <p className="eyebrow">Worked with</p>
          <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {workedWith.map((company) => (
              <li
                key={company.name}
                className="flex flex-col items-start justify-center gap-1.5 rounded-xl border border-line/80 bg-surface/50 px-5 py-4"
              >
                <span className={cn("text-muted", MARK_STYLES[company.mark])}>
                  {company.name}
                </span>
                <span className="font-mono text-[10px] text-subtle">{company.detail}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
