"use client";

import { ArrowUpRight, Github, Star } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const MAX_VISIBLE_STACK = 5;

type Props = {
  project: Project;
  onOpen: (project: Project) => void;
};

/**
 * The whole card is clickable, but the accessible control is the title button —
 * its `::after` stretches over the card. That keeps one tab stop with a
 * meaningful name instead of wrapping headings and links inside a <button>.
 *
 * `isolate` on the article plus `-z-10` on the glow puts the decoration above
 * the card background but under every content node, so nothing between the
 * button and the article may be positioned — that would re-anchor the overlay.
 */
export function ProjectCard({ project, onOpen }: Props) {
  const visible = project.stack.slice(0, MAX_VISIBLE_STACK);
  const overflow = project.stack.length - visible.length;

  return (
    <article
      className={cn(
        "group relative isolate flex h-full flex-col overflow-hidden rounded-2xl border bg-surface p-6 transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift",
        "focus-within:-translate-y-1 focus-within:border-accent/40",
        project.featured ? "border-line2" : "border-line"
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 -z-10 h-56 w-56 rounded-full bg-accent/0 blur-3xl transition-colors duration-500 group-hover:bg-accent/20"
      />

      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
          {project.category}
        </span>
        <span className="flex items-center gap-2">
          {project.featured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent/12 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
              <Star className="h-2.5 w-2.5 fill-current" aria-hidden />
              Featured
            </span>
          )}
          <span className="font-mono text-[11px] text-subtle">{project.year}</span>
        </span>
      </div>

      <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight">
        <button
          type="button"
          onClick={() => onOpen(project)}
          className="text-left outline-none transition-colors after:absolute after:inset-0 after:rounded-2xl after:content-[''] group-hover:text-accent"
        >
          {project.title}
        </button>
      </h3>

      <p className="mt-1.5 text-sm text-muted">{project.kicker}</p>

      <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-muted">
        {project.blurb}
      </p>

      {project.metrics.length > 0 && (
        <dl className="mt-5 grid grid-cols-3 gap-2 rounded-xl border border-line bg-surface2 p-3">
          {project.metrics.slice(0, 3).map((metric) => (
            <div key={metric.label} className="min-w-0">
              <dt className="sr-only">{metric.label}</dt>
              <dd>
                <span className="block truncate font-mono text-sm font-semibold text-fg">
                  {metric.value}
                </span>
                <span className="mt-0.5 block text-[10px] leading-tight text-subtle">
                  {metric.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      )}

      {/* Pushes the footer to the bottom so cards in a row line up. */}
      <ul className="mt-5 flex flex-1 flex-wrap content-start gap-1.5">
        {visible.map((tech) => (
          <li key={tech}>
            <Tag>{tech}</Tag>
          </li>
        ))}
        {overflow > 0 && (
          <li>
            <Tag className="text-subtle">+{overflow}</Tag>
          </li>
        )}
      </ul>

      <div className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-4">
        <span className="text-xs font-medium text-muted transition-colors group-hover:text-accent">
          Read the breakdown
        </span>
        <span className="flex items-center gap-2">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source on GitHub`}
              className="relative z-10 grid h-8 w-8 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent/40 hover:text-accent"
            >
              <Github className="h-3.5 w-3.5" aria-hidden />
            </a>
          )}
          <span
            aria-hidden
            className="grid h-8 w-8 place-items-center rounded-full border border-line text-muted transition-all duration-200 group-hover:border-accent/40 group-hover:bg-accent/10 group-hover:text-accent"
          >
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </span>
      </div>
    </article>
  );
}
