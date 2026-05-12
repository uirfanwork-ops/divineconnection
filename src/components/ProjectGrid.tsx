import Link from "next/link";
import { type Project } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";

type Props = {
  projects: Project[];
  variant?: "home" | "archive";
};

export function ProjectGrid({ projects, variant = "home" }: Props) {
  const bg = variant === "home" ? "bg-sandSoft" : "bg-bone";

  return (
    <section className={`${bg} section-pad`}>
      <div className="container-page">
        {variant === "home" ? (
          <div className="flex items-end justify-between gap-6">
            <Reveal className="flex-1">
              <p className="text-eyebrow">Selected works</p>
              <h2 className="text-h2 mt-6 max-w-prose-lg text-ink">
                Recent projects.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                href="/work"
                className="link-underline shrink-0 text-[11px] uppercase tracking-nav text-clay"
                data-cursor="link"
              >
                View archive
              </Link>
            </Reveal>
          </div>
        ) : null}

        <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-20 md:grid-cols-2 md:gap-y-24">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              offsetDown={i % 2 === 1}
              priority={i < 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
