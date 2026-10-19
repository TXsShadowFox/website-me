import { ArrowUpRight, GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { achievements, certifications, education } from "@/data/portfolio";

export function Credentials() {
  return (
    <section id="credentials" aria-labelledby="credentials-heading" className="section">
      <div className="shell">
        <SectionHeading
          id="credentials-heading"
          title="Credentials"
          description="Education, certifications and the practice behind them."
        />

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <Reveal className="card p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface2 text-accent">
                <GraduationCap className="h-5 w-5" aria-hidden />
              </span>
              <span className="font-mono text-xs text-subtle">
                {education.start} – {education.end}
              </span>
            </div>
            <h3 className="mt-5 text-lg font-semibold leading-snug tracking-tight text-heading">
              {education.school}
            </h3>
            <p className="mt-1.5 text-sm text-body">
              {education.degree} · {education.specialization}
            </p>
            <p className="mt-1 font-mono text-[11px] text-subtle">{education.location}</p>

            <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-5">
              {education.coursework.map((course) => (
                <li key={course}>
                  <Tag>{course}</Tag>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.06} className="card flex flex-col p-6 sm:p-7">
            <p className="eyebrow">Practice</p>
            <ul className="mt-4 flex flex-1 flex-col justify-center divide-y divide-line">
              {achievements.map((item) => (
                <li key={item.label} className="flex items-baseline gap-4 py-4 first:pt-0 last:pb-0">
                  <span className="tnum min-w-[3.5rem] text-2xl font-bold tracking-tight text-heading">
                    {item.value}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1 text-sm text-body transition-colors hover:text-fg"
                    >
                      {item.label}
                      <ArrowUpRight
                        className="h-3.5 w-3.5 text-subtle transition-colors group-hover:text-accent"
                        aria-hidden
                      />
                    </a>
                  ) : (
                    <span className="text-sm text-body">{item.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <ul className="mt-4 grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => {
            const body = (
              <>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[11px] tracking-[0.14em] text-subtle">
                    CERT {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="rounded-md border border-line bg-surface2 px-2 py-0.5 font-mono text-[10px] text-muted">
                    {cert.kind}
                  </span>
                </div>
                <h3 className="mt-4 text-[15px] font-semibold leading-snug tracking-tight text-heading">
                  {cert.name}
                </h3>
                <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4 font-mono text-[11px] text-subtle">
                  <span>
                    {cert.issuer ?? "Course"}
                    {cert.via && ` · via ${cert.via}`}
                  </span>
                  {cert.href && (
                    <span className="inline-flex items-center gap-1 transition-colors group-hover:text-accent">
                      Verify
                      <ArrowUpRight className="h-3 w-3" aria-hidden />
                    </span>
                  )}
                </div>
              </>
            );

            return (
              <Reveal as="li" key={cert.name} delay={Math.min(i * 0.05, 0.2)}>
                {cert.href ? (
                  <a
                    href={cert.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card card-lift group flex h-full flex-col p-5 sm:min-h-[10.5rem]"
                  >
                    {body}
                  </a>
                ) : (
                  <div className="card flex h-full flex-col p-5 sm:min-h-[10.5rem]">{body}</div>
                )}
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
