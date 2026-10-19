import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { lowerFirst } from "@/lib/utils";
import { CategoryIcon } from "./CategoryIcon";

/**
 * Compact card linking to a project's case study. As with WorkCard, the title
 * link stretches over the card; the GitHub link sits above that overlay.
 */
export function ProjectCard({ project }: { project: Project }) {
  const lead = project.metrics[0];

  return (
    <article className="card card-lift group relative flex h-full flex-col p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-line bg-surface2 text-subtle transition-colors duration-300 group-hover:text-accent">
          <CategoryIcon category={project.category} className="h-5 w-5" />
        </span>
        <div className="min-w-0 pt-0.5">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">
            {project.category}
          </p>
          <h3 className="mt-1.5 text-base font-semibold leading-snug tracking-tight text-heading">
            <Link
              href={`/projects/${project.id}`}
              className="outline-none transition-colors after:absolute after:inset-0 after:rounded-2xl after:content-[''] group-hover:text-fg"
            >
              {project.title}
            </Link>
          </h3>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted">{project.kicker}</p>

      {lead && (
        <p className="mt-3 font-mono text-[11px] text-subtle">
          <span className="text-body">{lead.value}</span> {lowerFirst(lead.label)}
        </p>
      )}

      <div className="mt-auto flex items-center justify-between gap-3 pt-5 font-mono text-[11px] text-subtle">
        <span>{project.year}</span>
        <span className="flex shrink-0 items-center gap-2">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source on GitHub`}
              className="relative z-10 grid h-7 w-7 place-items-center rounded-full border border-line text-subtle transition-colors hover:border-line2 hover:text-fg"
            >
              <Github className="h-3.5 w-3.5" aria-hidden />
            </a>
          )}
          <span className="inline-flex items-center gap-1 transition-colors group-hover:text-accent">
            Case study
            <ArrowUpRight className="h-3 w-3" aria-hidden />
          </span>
        </span>
      </div>
    </article>
  );
}
