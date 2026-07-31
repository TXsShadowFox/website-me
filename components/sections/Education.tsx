"use client";

import { Award, GraduationCap, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { certifications, education } from "@/data/portfolio";

export function Education() {
  return (
    <section id="education" aria-labelledby="education-heading" className="section">
      <div className="shell">
        <SectionHeading
          id="education-heading"
          eyebrow="05 / Education"
          title="Where I'm learning."
        />

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <Reveal className="card relative overflow-hidden p-6 sm:p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/15 blur-3xl"
            />
            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/12 text-accent">
                  <GraduationCap className="h-5 w-5" aria-hidden />
                </span>
                <span className="font-mono text-xs text-muted">
                  {education.start} — {education.end}
                </span>
              </div>

              <h3 className="mt-6 text-xl font-semibold leading-snug">
                {education.school}
              </h3>
              <p className="mt-2 text-sm font-medium text-accent">{education.degree}</p>
              <p className="mt-1 text-sm text-muted">{education.specialization}</p>

              <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-subtle">
                <MapPin className="h-3 w-3" aria-hidden />
                {education.location}
              </p>

              <div className="mt-6 border-t border-line pt-5">
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-subtle">
                  Relevant coursework
                </h4>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {education.coursework.map((course) => (
                    <li key={course}>
                      <Tag>{course}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <div>
            <h3 className="px-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-subtle">
              Certifications
            </h3>
            <ul className="mt-3 grid gap-3">
              {certifications.map((cert, i) => (
                <Reveal
                  as="li"
                  key={cert.name}
                  delay={Math.min(i * 0.06, 0.2)}
                  className="card group flex items-start gap-4 p-4 transition-colors duration-200 hover:border-accent/40"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent/20">
                    <Award className="h-4 w-4" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-snug">{cert.name}</p>
                    <p className="mt-1 text-xs text-muted">
                      {cert.issuer}
                      <span className="text-subtle"> · via {cert.via}</span>
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
