import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, FlaskConical, Github } from "lucide-react";
import { ProjectCover } from "@/components/projects/ProjectCover";
import { RichText } from "@/components/ui/RichText";
import { Tag } from "@/components/ui/Tag";
import { getResearch, personal, research } from "@/data/portfolio";
import { cn } from "@/lib/utils";

type Props = { params: { slug: string } };

// Every paper page is prerendered; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return research.map((paper) => ({ slug: paper.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const paper = getResearch(params.slug);
  if (!paper) return {};

  const url = `/research/${paper.id}`;
  return {
    title: paper.title,
    description: paper.kicker,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: `${personal.name} — Portfolio`,
      title: `${paper.title} — ${personal.name}`,
      description: paper.kicker,
      // A child's openGraph replaces the parent's, so the shared card is re-attached.
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${paper.title} — ${personal.name}`,
      description: paper.kicker,
      images: ["/opengraph-image.png"],
    },
  };
}

export default function ResearchPage({ params }: Props) {
  const paper = getResearch(params.slug);
  if (!paper) notFound();

  const index = research.findIndex((p) => p.id === paper.id);
  const other = research[(index + 1) % research.length];

  return (
    <article className="pb-20 pt-32 sm:pt-40">
      <div className="shell">
        <Link href="/#research" className="mono-link">
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          All research
        </Link>

        <header className="mt-8 max-w-3xl">
          <p className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">
            <FlaskConical className="h-3.5 w-3.5 text-accent" aria-hidden />
            Research
            <span aria-hidden>·</span>
            {paper.field}
            <span aria-hidden>·</span>
            {paper.year}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-heading sm:text-5xl">
            {paper.title}
          </h1>
          <p className="mt-4 font-serif text-xl italic leading-snug text-body sm:text-2xl">
            {paper.paperTitle}
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{paper.kicker}</p>

          <div className="mt-7 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface2 px-3 py-1.5 font-mono text-[11px] text-body">
              <span
                className="h-1.5 w-1.5 rounded-full bg-accent motion-safe:animate-pulse-soft"
                aria-hidden
              />
              {paper.status}
            </span>
            {paper.repo && (
              <a href={paper.repo} target="_blank" rel="noopener noreferrer" className="pill">
                <Github className="h-3.5 w-3.5" aria-hidden />
                Code on GitHub
                <ArrowUpRight className="h-3 w-3" aria-hidden />
              </a>
            )}
            <a href={paper.basePaper.href} target="_blank" rel="noopener noreferrer" className="pill">
              Base paper
              <ArrowUpRight className="h-3 w-3" aria-hidden />
            </a>
          </div>
        </header>

        <ProjectCover scene={paper.cover} variant="banner" className="mt-12" />

        <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {paper.metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col-reverse gap-1 bg-surface p-5 sm:p-6">
              <dt className="text-xs text-muted">{metric.label}</dt>
              <dd className="tnum text-2xl font-bold tracking-tight text-heading">{metric.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16">
          <div className="min-w-0 max-w-3xl space-y-12">
            <Block title="Summary">
              <p className="text-base leading-relaxed text-body sm:text-[17px]">
                <RichText text={paper.abstract} />
              </p>
            </Block>

            <Block title="The question">
              <p className="text-base leading-relaxed text-body">
                <RichText text={paper.question} />
              </p>
            </Block>

            <Block title="What's new">
              <ol className="space-y-5">
                {paper.contributions.map((item, i) => (
                  <li key={item.title} className="flex gap-4">
                    <span className="tnum mt-1 font-mono text-xs text-subtle">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-[15px] font-semibold tracking-tight text-heading">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-[15px] leading-relaxed text-body">
                        <RichText text={item.detail} />
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Block>

            <Block title="How it was tested">
              <ul className="space-y-3">
                {paper.method.map((step) => (
                  <li key={step.slice(0, 40)} className="flex gap-3 text-[15px] leading-relaxed text-body">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-subtle" aria-hidden />
                    <span>
                      <RichText text={step} />
                    </span>
                  </li>
                ))}
              </ul>
            </Block>

            <Block title="Results">
              <figure className="card overflow-hidden">
                {/* Kept outside the scroller so it stays put while a wide table scrolls on phones. */}
                <figcaption className="border-b border-line px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.12em] text-subtle">
                  {paper.table.caption}
                </figcaption>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-line">
                        {paper.table.columns.map((column, i) => (
                          <th
                            key={column}
                            scope="col"
                            className={cn(
                              "px-5 py-3 font-mono text-[11px] font-medium text-muted",
                              i > 0 && "text-right"
                            )}
                          >
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {paper.table.rows.map((row) => (
                        <tr
                          key={row.cells[0]}
                          className={cn(
                            "border-b border-line last:border-0",
                            row.highlight && "bg-accent/[0.07]"
                          )}
                        >
                          {row.cells.map((cell, i) =>
                            i === 0 ? (
                              <th
                                key={i}
                                scope="row"
                                className={cn(
                                  "min-w-[9rem] px-5 py-3 font-medium",
                                  row.highlight ? "text-heading" : "text-body"
                                )}
                              >
                                {cell}
                              </th>
                            ) : (
                              <td
                                key={i}
                                className={cn(
                                  "tnum whitespace-nowrap px-5 py-3 text-right font-mono text-[13px]",
                                  row.highlight ? "text-accent" : "text-body",
                                  i === row.cells.length - 1 && "font-semibold"
                                )}
                              >
                                {cell}
                              </td>
                            )
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {paper.table.note && (
                  <p className="border-t border-line px-5 py-3 text-xs text-subtle">
                    {paper.table.note}
                  </p>
                )}
              </figure>

              <ul className="mt-8 space-y-3">
                {paper.findings.map((finding) => (
                  <li key={finding.slice(0, 40)} className="flex gap-3 text-[15px] leading-relaxed text-body">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-positive" aria-hidden />
                    <span>
                      <RichText text={finding} />
                    </span>
                  </li>
                ))}
              </ul>
            </Block>

            <Block title="Limitations and next steps">
              <ul className="space-y-3">
                {paper.limitations.map((item) => (
                  <li key={item.slice(0, 40)} className="flex gap-3 text-[15px] leading-relaxed text-body">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-subtle" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Block>
          </div>

          <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            <div>
              <h2 className="eyebrow">Builds on</h2>
              <a
                href={paper.basePaper.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-lift group mt-3 block p-4"
              >
                <span className="block text-sm font-semibold leading-snug text-heading">
                  {paper.basePaper.title}
                </span>
                <span className="mt-2 flex items-center justify-between gap-2 font-mono text-[11px] text-subtle">
                  <span>
                    {paper.basePaper.authors} · {paper.basePaper.venue}
                  </span>
                  <ArrowUpRight
                    className="h-3 w-3 shrink-0 transition-colors group-hover:text-accent"
                    aria-hidden
                  />
                </span>
              </a>
              <p className="mt-3 text-xs leading-relaxed text-subtle">
                Independent academic, non-commercial follow-up that builds on the authors&apos;
                released code and credits their work.
              </p>
            </div>
            <div>
              <h2 className="eyebrow">Stack</h2>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {paper.stack.map((tech) => (
                  <li key={tech}>
                    <Tag className="text-body">{tech}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <nav
          aria-label="More research"
          className="mt-20 grid gap-4 border-t border-line pt-10 sm:grid-cols-2"
        >
          <Link href="/#work" className="card card-lift group flex flex-col gap-2 p-5">
            <span className="mono-link group-hover:text-heading">
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              Back to
            </span>
            <span className="text-base font-semibold tracking-tight text-heading">Projects</span>
          </Link>
          <Link
            href={`/research/${other.id}`}
            className="card card-lift group flex flex-col items-end gap-2 p-5 text-right"
          >
            <span className="mono-link group-hover:text-heading">
              Other paper
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </span>
            <span className="text-base font-semibold tracking-tight text-heading">{other.title}</span>
          </Link>
        </nav>
      </div>
    </article>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 text-xl font-bold tracking-tight text-heading">{title}</h2>
      {children}
    </section>
  );
}
