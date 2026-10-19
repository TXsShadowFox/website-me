import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { lowerFirst } from "@/lib/utils";
import { ProjectCover } from "./ProjectCover";

/**
 * Large featured card: illustrated cover, then title and one-line pitch.
 * The title link's `::after` stretches over the whole card, so there is one tab
 * stop with a meaningful name instead of a link wrapping a whole block.
 */
export function WorkCard({ project }: { project: Project }) {
  return (
    <article className="group relative">
      {project.cover && <ProjectCover scene={project.cover} />}

      <div className="mt-5 flex items-center gap-2 font-mono text-[11px] text-subtle">
        <span>{project.year}</span>
        <span aria-hidden>·</span>
        <span>{project.category}</span>
      </div>

      <h3 className="mt-2 flex items-start justify-between gap-3 text-lg font-semibold tracking-tight text-heading">
        <Link
          href={`/projects/${project.id}`}
          // The focus ring is drawn on the stretched overlay (the whole card)
          // instead of around the title text.
          className="outline-none transition-colors after:absolute after:inset-0 after:rounded-2xl after:content-[''] group-hover:text-fg focus-visible:ring-0 focus-visible:after:ring-2 focus-visible:after:ring-accent focus-visible:after:ring-offset-4 focus-visible:after:ring-offset-canvas"
        >
          {project.title}
        </Link>
        <ArrowUpRight
          aria-hidden
          className="mt-1 h-4 w-4 shrink-0 text-subtle transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
        />
      </h3>

      <p className="mt-1.5 text-sm leading-relaxed text-muted">{project.kicker}</p>

      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-subtle">
        {project.metrics.map((metric) => (
          <li key={metric.label}>
            <span className="text-body">{metric.value}</span> {lowerFirst(metric.label)}
          </li>
        ))}
      </ul>
    </article>
  );
}
