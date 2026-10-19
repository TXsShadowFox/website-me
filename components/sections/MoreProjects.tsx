import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { getProject, moreProjectIds, projects, type Project } from "@/data/portfolio";

const MORE = moreProjectIds
  .map(getProject)
  .filter((project): project is Project => project !== undefined);

export function MoreProjects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="section">
      <div className="shell">
        <SectionHeading
          id="projects-heading"
          title="More projects"
          description="Retrieval, computer vision, agents and the tools in between."
          action={
            <Link href="/projects" className="mono-link">
              All {projects.length} projects
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          }
        />

        <ul className="grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MORE.map((project, i) => (
            <Reveal as="li" key={project.id} delay={Math.min(i * 0.05, 0.2)}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
