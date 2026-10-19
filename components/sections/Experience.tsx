import { Fragment } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { experiences, personal } from "@/data/portfolio";

/** Numbers worth pulling out of a bullet: 40%, 4.5×, ~80 s, 50K+, 10+. */
const METRIC = /(~?\d+(?:\.\d+)?(?:%|×)|~?\d+ s\b|\d+K\+?|\d+\+)/g;

function withMetrics(text: string) {
  // `split` with a capturing group keeps the delimiters, so odd indices are matches.
  return text.split(METRIC).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="font-medium text-heading">
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
          title="Experience"
          description="Internships and client work across generative AI, ML engineering and backend systems."
          action={
            <a href={personal.resumePath} className="mono-link">
              Résumé PDF
            </a>
          }
        />

        <ol className="divide-y divide-line border-t border-line">
          {experiences.map((exp) => (
            <Reveal
              as="li"
              key={`${exp.company}-${exp.start}`}
              className="grid gap-4 py-8 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-10 md:py-10"
            >
              <div className="font-mono text-xs text-subtle">
                <p>
                  {exp.start} – {exp.end}
                </p>
                <p className="mt-1">{exp.location}</p>
              </div>

              <article>
                <h3 className="text-lg font-semibold tracking-tight text-heading">
                  {exp.company}
                  <span className="mx-2 hidden font-normal text-subtle sm:inline" aria-hidden>
                    /
                  </span>
                  <span className="sr-only">, </span>
                  <span className="mt-0.5 block text-base font-medium text-body sm:mt-0 sm:inline">
                    {exp.role}
                  </span>
                </h3>
                {exp.project && <p className="mt-1 text-sm text-accent">{exp.project}</p>}

                <p className="mt-4 text-sm leading-relaxed text-body">{exp.summary}</p>

                <ul className="mt-4 space-y-2.5">
                  {exp.bullets.map((bullet) => (
                    <li
                      key={bullet.slice(0, 40)}
                      className="flex gap-3 text-sm leading-relaxed text-muted"
                    >
                      <span
                        aria-hidden
                        className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-subtle"
                      />
                      <span>{withMetrics(bullet)}</span>
                    </li>
                  ))}
                </ul>

                <ul className="mt-5 flex flex-wrap gap-1.5">
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
