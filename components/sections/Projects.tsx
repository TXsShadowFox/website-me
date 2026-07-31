"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useId, useMemo, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FilterTag } from "@/components/ui/Tag";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectDialog } from "@/components/projects/ProjectDialog";
import { projectCategories, projects, type Project } from "@/data/portfolio";

const ALL = "All";

/** Featured work leads, everything else keeps its authored order. */
const ORDERED = [...projects].sort(
  (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))
);

function matchesQuery(project: Project, query: string) {
  const haystack = [
    project.title,
    project.kicker,
    project.blurb,
    project.category,
    ...project.stack,
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

export function Projects() {
  const [category, setCategory] = useState<string>(ALL);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Project | null>(null);
  const reduce = useReducedMotion();
  const searchId = useId();

  const counts = useMemo(() => {
    const map = new Map<string, number>([[ALL, ORDERED.length]]);
    projectCategories.forEach((c) =>
      map.set(c, ORDERED.filter((p) => p.category === c).length)
    );
    return map;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ORDERED.filter(
      (p) =>
        (category === ALL || p.category === category) &&
        (q === "" || matchesQuery(p, q))
    );
  }, [category, query]);

  const isFiltered = category !== ALL || query.trim() !== "";

  const reset = () => {
    setCategory(ALL);
    setQuery("");
  };

  return (
    <section id="projects" aria-labelledby="projects-heading" className="section">
      <div className="shell">
        <SectionHeading
          id="projects-heading"
          eyebrow="03 / Projects"
          title="Things I've built."
          description="Eleven systems across retrieval, agents, computer vision, and applied ML. Open any card for the problem, the approach, and what it actually delivers."
        />

        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="group"
            aria-label="Filter projects by category"
            className="flex flex-wrap gap-1.5"
          >
            <FilterTag
              active={category === ALL}
              count={counts.get(ALL)}
              onClick={() => setCategory(ALL)}
            >
              {ALL}
            </FilterTag>
            {projectCategories.map((c) => (
              <FilterTag
                key={c}
                active={category === c}
                count={counts.get(c)}
                onClick={() => setCategory(c)}
              >
                {c}
              </FilterTag>
            ))}
          </div>

          <div className="relative lg:w-72">
            <label htmlFor={searchId} className="sr-only">
              Search projects by name or technology
            </label>
            <Search
              aria-hidden
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle"
            />
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or stack…"
              // WebKit draws its own clear button on type=search; hide it so it
              // does not sit on top of ours.
              className="w-full rounded-full border border-line bg-surface py-2.5 pl-10 pr-9 text-sm outline-none transition-colors placeholder:text-subtle focus:border-accent/50 [&::-webkit-search-cancel-button]:appearance-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 grid h-5 w-5 -translate-y-1/2 place-items-center rounded-full text-subtle transition-colors hover:text-fg"
              >
                <X className="h-3.5 w-3.5" aria-hidden />
              </button>
            )}
          </div>
        </div>

        {/* Announce result counts to screen readers as filters change. */}
        <p aria-live="polite" className="sr-only">
          {filtered.length} of {ORDERED.length} projects shown.
        </p>

        <motion.ul
          layout={!reduce}
          className="grid list-none gap-5 sm:grid-cols-2 xl:grid-cols-3"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((project, i) => (
              <motion.li
                key={project.id}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
                transition={{
                  duration: 0.35,
                  // Cap the stagger so the last card never feels stuck.
                  delay: Math.min(i * 0.05, 0.25),
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <ProjectCard project={project} onOpen={setActive} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {filtered.length === 0 && (
          <div className="card mt-2 grid place-items-center gap-3 p-12 text-center">
            <p className="text-sm text-muted">
              Nothing matches{" "}
              {query.trim() && (
                <span className="font-mono text-fg">“{query.trim()}”</span>
              )}
              {query.trim() && category !== ALL && " in "}
              {category !== ALL && <span className="text-fg">{category}</span>}.
            </p>
            <button type="button" onClick={reset} className="btn-ghost">
              Clear filters
            </button>
          </div>
        )}

        {isFiltered && filtered.length > 0 && (
          <p className="mt-8 text-center text-xs text-subtle">
            Showing {filtered.length} of {ORDERED.length} projects ·{" "}
            <button
              type="button"
              onClick={reset}
              className="font-medium text-accent underline-offset-4 hover:underline"
            >
              show all
            </button>
          </p>
        )}
      </div>

      <ProjectDialog project={active} onClose={() => setActive(null)} />
    </section>
  );
}
