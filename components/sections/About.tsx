"use client";

import { MapPin, Clock, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { personal, stats, summary } from "@/data/portfolio";

const FOCUS = [
  {
    title: "Retrieval systems",
    body: "Hybrid dense + sparse retrieval, reciprocal rank fusion, rerankers, and citations that survive review.",
  },
  {
    title: "Agentic workflows",
    body: "LangGraph pipelines where specialists run in parallel and a coordinator reconciles their output.",
  },
  {
    title: "Shipping the model",
    body: "Containers, migrations, structured logs, rate limits, metrics — the layer that turns a notebook into a product.",
  },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section">
      <div className="shell">
        <SectionHeading
          id="about-heading"
          eyebrow="01 / About"
          title="I train the model, then I ship it."
          description="Final-year CS student specialising in AI & ML, most at home where research meets production infrastructure."
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-14">
          <div>
            <div className="max-w-prose space-y-5 text-base leading-relaxed text-muted sm:text-[17px]">
              {summary.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            <ul className="mt-10 grid gap-3 sm:grid-cols-3">
              {FOCUS.map((item, i) => (
                <Reveal as="li" key={item.title} delay={i * 0.06} className="card p-5">
                  <Sparkles className="h-4 w-4 text-accent" aria-hidden />
                  <h3 className="mt-3 text-sm font-semibold">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.body}</p>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal delay={0.1} className="lg:sticky lg:top-28 lg:self-start">
            <div className="card overflow-hidden">
              <div className="flex items-center gap-3 border-b border-line px-5 py-4">
                <span
                  aria-hidden
                  className="grid h-11 w-11 place-items-center rounded-xl bg-accent font-mono text-sm font-bold text-accent-fg"
                >
                  {personal.initials}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{personal.name}</p>
                  <p className="truncate text-xs text-muted">{personal.role}</p>
                </div>
              </div>

              <dl className="divide-y divide-line">
                <Row icon={<MapPin className="h-3.5 w-3.5" />} label="Based in">
                  {personal.location}
                </Row>
                <Row icon={<Clock className="h-3.5 w-3.5" />} label="Timezone">
                  {personal.timezone}
                </Row>
              </dl>

              {/* 1px gaps over a line-coloured background draw clean grid
                  separators without `divide-*` mis-bordering the second cell. */}
              <div className="grid grid-cols-2 gap-px border-t border-line bg-line">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-surface p-5">
                    <div className="font-mono text-2xl font-semibold tracking-tight text-fg">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="mt-1 text-xs font-medium">{stat.label}</div>
                    <div className="mt-0.5 text-[11px] text-subtle">{stat.hint}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Row({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-3.5">
      <dt className="flex items-center gap-2 text-xs text-subtle">
        <span aria-hidden className="text-accent">
          {icon}
        </span>
        {label}
      </dt>
      <dd className="truncate text-xs font-medium">{children}</dd>
    </div>
  );
}
