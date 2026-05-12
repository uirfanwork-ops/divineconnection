"use client";

import { useMemo, useState } from "react";
import { clsx } from "clsx";
import {
  categories,
  type Project,
  type ProjectCategory,
} from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";

type Filter = "All" | ProjectCategory;

export function WorkArchive({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((p) => p.category === filter);
  }, [filter, projects]);

  return (
    <>
      <div className="mt-12 flex flex-wrap gap-3">
        {categories.map((c) => {
          const active = filter === c;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              data-cursor="link"
              className={clsx(
                "border px-5 py-3 text-[11px] uppercase tracking-nav transition-colors duration-300",
                active
                  ? "border-ink bg-ink text-bone"
                  : "border-hairline text-ink hover:border-ink",
              )}
            >
              {c}
            </button>
          );
        })}
      </div>

      <div className="mt-20 grid grid-cols-1 gap-x-12 gap-y-20 md:grid-cols-2 md:gap-y-24">
        {filtered.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={i}
            offsetDown={i % 2 === 1}
            priority={i < 2}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-body text-mist">
          Nothing in this category yet. Check back soon.
        </p>
      )}
    </>
  );
}
