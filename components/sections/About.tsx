"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { WordReveal } from "@/components/ui/WordReveal";
import { bio, stats } from "@/data/portfolio";

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section">
      <div className="shell">
        <SectionHeading
          id="about-heading"
          title="About"
          action={
            <Link href="/#experience" className="mono-link">
              View experience
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          }
        />

        <div className="max-w-3xl">
          <WordReveal text={bio} className="text-base leading-relaxed text-body sm:text-lg" />

          <p className="mt-8 font-serif text-xl italic text-heading sm:text-2xl">
            “I train the model, then I ship it.”
          </p>
        </div>

        <Reveal>
          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse gap-1">
                <dt className="text-[11px] leading-snug text-muted">{stat.label}</dt>
                <dd className="tnum text-2xl font-bold tracking-tight text-heading">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
