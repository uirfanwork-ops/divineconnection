"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { clsx } from "clsx";
import { type Project } from "@/lib/projects";

type Props = {
  project: Project;
  index?: number;
  offsetDown?: boolean;
  arched?: boolean;
  priority?: boolean;
  sizes?: string;
};

export function ProjectCard({
  project,
  index = 0,
  offsetDown = false,
  arched,
  priority,
  sizes = "(min-width: 1024px) 44vw, (min-width: 768px) 48vw, 92vw",
}: Props) {
  const reduce = useReducedMotion();
  const showArch = arched ?? project.arched;

  return (
    <Link
      href={`/work/${project.slug}`}
      className={clsx(
        "group relative block",
        offsetDown && "md:translate-y-[60px]",
      )}
      data-cursor="link"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
          delay: index * 0.08,
        }}
      >
        <div
          className={clsx(
            "relative aspect-[4/5] w-full overflow-hidden bg-sandSoft",
          )}
          style={
            showArch
              ? {
                  borderTopLeftRadius: "50% 90px",
                  borderTopRightRadius: "50% 90px",
                }
              : undefined
          }
        >
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes={sizes}
            priority={priority}
            className={clsx(
              "object-cover transition-transform duration-700 ease-out",
              !reduce && "group-hover:scale-[1.03]",
            )}
          />
          <span className="pointer-events-none absolute left-5 top-5 z-10 text-[11px] uppercase tracking-nav text-bone">
            No. {project.number}
          </span>
        </div>

        <div className="mt-6 flex items-baseline justify-between gap-6">
          <h3 className="text-h3 text-ink transition-colors duration-300 group-hover:text-clay">
            {project.title}
          </h3>
        </div>
        <p className="mt-2 text-caption text-mist">
          {project.category}. {project.year}.
        </p>
      </motion.div>
    </Link>
  );
}
