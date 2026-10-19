import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProjectExplorer } from "@/components/projects/ProjectExplorer";
import { projects } from "@/data/portfolio";

const description = `${projects.length} projects across RAG and LLMs, agents, distributed systems, computer vision and applied ML — each with a full case study.`;

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <section aria-labelledby="all-projects-heading" className="pb-20 pt-32 sm:pt-40">
      <div className="shell">
        <Link href="/#work" className="mono-link">
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          Back home
        </Link>

        <h1
          id="all-projects-heading"
          className="mt-8 text-4xl font-bold tracking-tight text-heading sm:text-5xl"
        >
          All projects
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-body sm:text-lg">
          {description} Open any card for the problem, how it works and what it delivers.
        </p>

        <div className="mt-12">
          <ProjectExplorer />
        </div>
      </div>
    </section>
  );
}
