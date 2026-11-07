import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ResearchPaper } from "@/data/portfolio";
import { lowerFirst } from "@/lib/utils";
import { ProjectCover } from "@/components/projects/ProjectCover";

/**
 * Same anatomy as `WorkCard`, plus the manuscript title and its status, so a
 * paper reads differently from a product at a glance.
 */
export function ResearchCard({ paper }: { paper: ResearchPaper }) {
  return (
    <article className="group relative">
      <ProjectCover scene={paper.cover} />

      <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] text-subtle">
        <span>{paper.year}</span>
        <span aria-hidden>·</span>
        <span>{paper.field}</span>
      </div>

      <h3 className="mt-2 flex items-start justify-between gap-3 text-lg font-semibold tracking-tight text-heading">
        <Link
          href={`/research/${paper.id}`}
          className="outline-none transition-colors after:absolute after:inset-0 after:rounded-2xl after:content-[''] group-hover:text-fg focus-visible:ring-0 focus-visible:after:ring-2 focus-visible:after:ring-accent focus-visible:after:ring-offset-4 focus-visible:after:ring-offset-canvas"
        >
          {paper.title}
        </Link>
        <ArrowUpRight
          aria-hidden
          className="mt-1 h-4 w-4 shrink-0 text-subtle transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
        />
      </h3>

      <p className="mt-1.5 font-serif text-[15px] italic leading-snug text-body">
        {paper.paperTitle}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{paper.kicker}</p>

      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-subtle">
        {paper.metrics.map((metric) => (
          <li key={metric.label}>
            <span className="text-body">{metric.value}</span> {lowerFirst(metric.label)}
          </li>
        ))}
      </ul>

      <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-line bg-surface2 px-2.5 py-1 font-mono text-[10.5px] text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-accent motion-safe:animate-pulse-soft" aria-hidden />
        {paper.status}
      </p>
    </article>
  );
}
