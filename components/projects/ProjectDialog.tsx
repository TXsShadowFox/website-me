"use client";

import { useState } from "react";
import { Check, ExternalLink, Github, Layers, Target, Wrench } from "lucide-react";
import { Dialog, DialogClose } from "@/components/ui/Dialog";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/data/portfolio";

type Props = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectDialog({ project, onClose }: Props) {
  // Callers close by setting `project` to null. Holding on to the last one lets
  // the content stay on screen for the exit animation instead of blanking out.
  // Syncing during render rather than in an effect avoids a frame of stale
  // content when the visitor opens a different project.
  const [shown, setShown] = useState<Project | null>(project);
  if (project && project !== shown) setShown(project);

  return (
    <Dialog
      open={Boolean(project)}
      onClose={onClose}
      labelledBy="project-dialog-title"
      describedBy="project-dialog-blurb"
    >
      {shown && (
        <>
          <header className="flex items-start justify-between gap-4 border-b border-line px-6 py-5 sm:px-8">
            <div className="min-w-0">
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                {shown.category}
                <span aria-hidden className="h-1 w-1 rounded-full bg-line2" />
                <span className="text-subtle">{shown.year}</span>
              </p>
              <h2
                id="project-dialog-title"
                className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl"
              >
                {shown.title}
              </h2>
              <p className="mt-1 text-sm text-muted">{shown.kicker}</p>
            </div>
            <DialogClose onClick={onClose} label="Close project details" />
          </header>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6 sm:px-8">
            <p
              id="project-dialog-blurb"
              className="text-[15px] leading-relaxed text-fg"
            >
              {shown.blurb}
            </p>

            {shown.metrics.length > 0 && (
              <dl className="mt-6 grid gap-3 sm:grid-cols-3">
                {shown.metrics.map((metric) => (
                  <div key={metric.label} className="rounded-xl border border-line bg-surface2 p-4">
                    <dt className="text-[11px] leading-tight text-subtle">{metric.label}</dt>
                    <dd className="mt-1 font-mono text-lg font-semibold text-accent">
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            <Block icon={<Target className="h-4 w-4" />} title="The problem">
              <p className="text-sm leading-relaxed text-muted">{shown.problem}</p>
            </Block>

            <Block icon={<Wrench className="h-4 w-4" />} title="How it works">
              <ol className="space-y-3">
                {shown.approach.map((step, i) => (
                  <li key={step.slice(0, 40)} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-accent/12 font-mono text-[10px] font-semibold text-accent">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </Block>

            <Block icon={<Check className="h-4 w-4" />} title="What it delivers">
              <ul className="space-y-2.5">
                {shown.results.map((result) => (
                  <li key={result.slice(0, 40)} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-positive" aria-hidden />
                    <span>{result}</span>
                  </li>
                ))}
              </ul>
            </Block>

            <Block icon={<Layers className="h-4 w-4" />} title="Stack">
              <ul className="flex flex-wrap gap-1.5">
                {shown.stack.map((tech) => (
                  <li key={tech}>
                    <Tag>{tech}</Tag>
                  </li>
                ))}
              </ul>
            </Block>

            {(shown.repo || shown.demo) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {shown.repo && (
                  <a
                    href={shown.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                  >
                    <Github className="h-4 w-4" aria-hidden />
                    Source
                  </a>
                )}
                {shown.demo && (
                  <a
                    href={shown.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <ExternalLink className="h-4 w-4" aria-hidden />
                    Live demo
                  </a>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </Dialog>
  );
}

function Block({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8">
      <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-fg">
        <span aria-hidden className="text-accent">
          {icon}
        </span>
        {title}
      </h3>
      {children}
    </section>
  );
}
