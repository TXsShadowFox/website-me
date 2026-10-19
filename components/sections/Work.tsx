import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { WorkCard } from "@/components/projects/WorkCard";
import { projects } from "@/data/portfolio";

const FEATURED = projects.filter((p) => p.featured);

export function Work() {
  return (
    <section id="work" aria-labelledby="work-heading" className="section">
      <div className="shell">
        <SectionHeading
          id="work-heading"
          title="Work"
          description="Flagship builds, each with a full case study: the problem, how it works and the numbers behind it."
          action={
            <Link href="/projects" className="mono-link">
              View all {projects.length}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          }
        />

        <ul className="grid list-none gap-x-6 gap-y-14 sm:grid-cols-2">
          {FEATURED.map((project, i) => (
            <Reveal as="li" key={project.id} delay={(i % 2) * 0.08}>
              <WorkCard project={project} />
            </Reveal>
          ))}
        </ul>

        <Reveal className="card mt-14 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className="text-sm font-semibold text-heading sm:text-base">
              Want the design docs, eval reports or a live walkthrough of any of these?
            </p>
            <p className="mt-1 text-xs text-muted">Let&apos;s connect!</p>
          </div>
          <Link href="/#contact" className="pill w-fit shrink-0">
            Get in touch
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
