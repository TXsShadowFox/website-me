import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Github } from "lucide-react";
import { CategoryIcon } from "@/components/projects/CategoryIcon";
import { ProjectCover } from "@/components/projects/ProjectCover";
import { RichText } from "@/components/ui/RichText";
import { Tag } from "@/components/ui/Tag";
import { getProject, personal, projects, type ProjectLink } from "@/data/portfolio";

type Props = { params: { slug: string } };

/** Same order as the projects page: featured work first. */
const ORDERED = [...projects].sort(
  (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))
);

// Every case study is prerendered; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};

  const url = `/projects/${project.id}`;
  return {
    title: project.title,
    description: project.kicker,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: `${personal.name} — Portfolio`,
      title: `${project.title} — ${personal.name}`,
      description: project.kicker,
      // A child's openGraph replaces the parent's, so the shared card is re-attached.
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — ${personal.name}`,
      description: project.kicker,
      images: ["/opengraph-image.png"],
    },
  };
}

export default function ProjectPage({ params }: Props) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const index = ORDERED.findIndex((p) => p.id === project.id);
  const prev = ORDERED[(index - 1 + ORDERED.length) % ORDERED.length];
  const next = ORDERED[(index + 1) % ORDERED.length];

  const links: (ProjectLink & { primary?: boolean })[] = [
    ...(project.demo ? [{ label: "Live demo", href: project.demo, primary: true }] : []),
    ...(project.repo ? [{ label: "Source on GitHub", href: project.repo }] : []),
    ...(project.links ?? []),
  ];

  return (
    <article className="pb-20 pt-32 sm:pt-40">
      <div className="shell">
        <Link href="/projects" className="mono-link">
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          All projects
        </Link>

        <header className="mt-8 max-w-3xl">
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">
            <CategoryIcon category={project.category} className="h-3.5 w-3.5 text-accent" />
            {project.category}
            <span aria-hidden>·</span>
            {project.year}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-heading sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-body sm:text-xl">{project.kicker}</p>

          {links.length > 0 && (
            <ul className="mt-7 flex flex-wrap gap-2">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={link.primary ? "pill-accent" : "pill"}
                  >
                    {link.href.startsWith("https://github.com") && (
                      <Github className="h-3.5 w-3.5" aria-hidden />
                    )}
                    {link.label}
                    <ArrowUpRight className="h-3 w-3" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </header>

        {project.cover && (
          <ProjectCover scene={project.cover} variant="banner" className="mt-12" />
        )}

        {project.metrics.length > 0 && (
          <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col-reverse gap-1 bg-surface p-5 sm:p-6">
                <dt className="text-xs text-muted">{metric.label}</dt>
                <dd className="tnum text-2xl font-bold tracking-tight text-heading">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16">
          <div className="max-w-3xl space-y-12">
            <Block title="Overview">
              <p className="text-base leading-relaxed text-body sm:text-[17px]">
                <RichText text={project.blurb} />
              </p>
            </Block>

            <Block title="The problem">
              <p className="text-base leading-relaxed text-body">
                <RichText text={project.problem} />
              </p>
            </Block>

            <Block title="How it works">
              <ol className="space-y-4">
                {project.approach.map((step, i) => (
                  <li key={step.slice(0, 40)} className="flex gap-4 text-[15px] leading-relaxed text-body">
                    <span className="tnum mt-0.5 font-mono text-xs text-subtle">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <RichText text={step} />
                    </span>
                  </li>
                ))}
              </ol>
            </Block>

            <Block title="What it delivers">
              <ul className="space-y-3">
                {project.results.map((result) => (
                  <li key={result.slice(0, 40)} className="flex gap-3 text-[15px] leading-relaxed text-body">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-positive" aria-hidden />
                    <span>
                      <RichText text={result} />
                    </span>
                  </li>
                ))}
              </ul>
            </Block>
          </div>

          <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            <div>
              <h2 className="eyebrow">Stack</h2>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <li key={tech}>
                    <Tag className="text-body">{tech}</Tag>
                  </li>
                ))}
              </ul>
            </div>
            {!project.repo && (
              <p className="text-xs leading-relaxed text-subtle">
                Source available on request —{" "}
                <Link href="/#contact" className="text-link">
                  get in touch
                </Link>
                .
              </p>
            )}
          </aside>
        </div>

        <nav
          aria-label="More case studies"
          className="mt-20 grid gap-4 border-t border-line pt-10 sm:grid-cols-2"
        >
          <Link href={`/projects/${prev.id}`} className="card card-lift group flex flex-col gap-2 p-5">
            <span className="mono-link group-hover:text-heading">
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              Previous
            </span>
            <span className="text-base font-semibold tracking-tight text-heading">{prev.title}</span>
          </Link>
          <Link
            href={`/projects/${next.id}`}
            className="card card-lift group flex flex-col items-end gap-2 p-5 text-right"
          >
            <span className="mono-link group-hover:text-heading">
              Next
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </span>
            <span className="text-base font-semibold tracking-tight text-heading">{next.title}</span>
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
