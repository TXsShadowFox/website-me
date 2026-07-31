"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { personal } from "@/data/portfolio";

const MARQUEE = [
  "PyTorch",
  "TensorFlow",
  "LangGraph",
  "FastAPI",
  "RAG",
  "Docker",
  "Kubernetes",
  "Gemini",
  "Claude",
  "Next.js",
  "ChromaDB",
  "AWS",
  "GCP",
  "Whisper",
];

const SOCIALS = [
  { href: `mailto:${personal.email}`, label: "Email", Icon: Mail, external: false },
  { href: personal.github, label: "GitHub", Icon: Github, external: true },
  { href: personal.linkedin, label: "LinkedIn", Icon: Linkedin, external: true },
];

export function Hero() {
  const reduce = useReducedMotion();

  // One shared entrance so the hero settles as a unit rather than a cascade.
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    // The copy centres in whatever space is left over and the marquee sits on
    // the fold, rather than both centring as one block and leaving a dead gap
    // beneath the strip.
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-32 sm:pt-36"
    >
      <div className="flex flex-1 items-center">
        <div className="shell">
        <motion.p
          {...rise(0)}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 py-1 pl-1.5 pr-3.5 text-xs text-muted backdrop-blur"
        >
          <span className="relative grid h-5 w-5 place-items-center">
            <span className="absolute h-2 w-2 rounded-full bg-positive/60 motion-safe:animate-ping" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-positive" />
          </span>
          {personal.availability}
        </motion.p>

        <motion.h1
          {...rise(0.06)}
          id="hero-heading"
          className="mt-7 max-w-[16ch] text-display font-semibold"
        >
          {personal.firstName}{" "}
          <span className="text-gradient">{personal.lastName}</span>
        </motion.h1>

        <motion.p
          {...rise(0.12)}
          className="mt-5 font-mono text-sm uppercase tracking-[0.2em] text-accent sm:text-base"
        >
          {personal.role}
        </motion.p>

        <motion.p
          {...rise(0.18)}
          className="mt-6 max-w-prose text-lg leading-relaxed text-muted sm:text-xl"
        >
          {personal.tagline}
        </motion.p>

        <motion.div
          {...rise(0.24)}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <a href="#projects" className="btn-primary group">
            View projects
            <ArrowDown
              aria-hidden
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5"
            />
          </a>
          <a href={personal.resumePath} download className="btn-ghost">
            <Download className="h-4 w-4" aria-hidden />
            Résumé
          </a>

          <span aria-hidden className="mx-1 hidden h-6 w-px bg-line sm:block" />

          <ul className="flex items-center gap-1.5">
            {SOCIALS.map(({ href, label, Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </a>
              </li>
            ))}
            </ul>
          </motion.div>
        </div>
      </div>

      <motion.div {...rise(0.32)} className="mt-16 pb-10 sm:mt-20 sm:pb-12">
        <Marquee />
      </motion.div>
    </section>
  );
}

/**
 * Continuous tech strip. The list is duplicated so the translation can loop
 * seamlessly; the copy is hidden from assistive tech to avoid reading it twice.
 */
function Marquee() {
  return (
    <div className="mask-fade-x border-y border-line/70 py-3.5">
      <div className="flex w-max animate-marquee items-center gap-3 [--marquee-duration:48s] motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 || undefined}
            className="flex shrink-0 items-center gap-3 pr-3"
          >
            {MARQUEE.map((item) => (
              <li
                key={`${copy}-${item}`}
                className="flex items-center gap-3 font-mono text-xs text-subtle"
              >
                {item}
                <span aria-hidden className="h-1 w-1 rounded-full bg-accent/50" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
