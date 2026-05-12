import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { InquireCTA } from "@/components/InquireCTA";
import { Reveal } from "@/components/Reveal";
import { ProjectMeta } from "@/components/ProjectMeta";
import { ProjectBody } from "@/components/ProjectBody";
import { getAdjacentProjects, getProject, projects } from "@/lib/projects";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Params;
}): Metadata {
  const project = getProject(params.slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.lede,
    openGraph: {
      title: project.title,
      description: project.lede,
      images: [{ url: project.cover.src }],
    },
  };
}

export default function ProjectPage({ params }: { params: Params }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(project.slug);

  return (
    <>
      <Nav variant="solid" />
      <main className="pt-24">
        <section className="relative bg-bone">
          <div className="container-page pt-12">
            <Reveal>
              <Link
                href="/work"
                className="link-underline text-[11px] uppercase tracking-nav text-clay"
                data-cursor="link"
              >
                Back to work
              </Link>
            </Reveal>
          </div>

          <Reveal className="mt-12">
            <div className="container-page">
              <div
                className="relative aspect-[16/10] w-full overflow-hidden bg-sandSoft"
                style={
                  project.arched
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
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          <div className="container-page mt-16 grid grid-cols-12 gap-x-8 gap-y-10 pb-16">
            <Reveal className="col-span-12 md:col-span-3">
              <p className="text-eyebrow">No. {project.number}</p>
            </Reveal>
            <Reveal delay={0.05} className="col-span-12 md:col-span-9">
              <h1 className="text-h1 text-ink">{project.title}</h1>
              <p className="mt-10 max-w-prose text-body-lg text-ink">
                {project.lede}
              </p>
            </Reveal>
          </div>

          <div className="container-page pb-8">
            <ProjectMeta project={project} />
          </div>
        </section>

        <ProjectBody project={project} />

        <section className="bg-bone">
          <div className="container-page py-20">
            <div className="hairline mb-16 w-full" />
            <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
              {prev && (
                <Link
                  href={`/work/${prev.slug}`}
                  className="group max-w-md"
                  data-cursor="link"
                >
                  <p className="text-[11px] uppercase tracking-nav text-mist">
                    Previous
                  </p>
                  <p className="mt-3 font-display text-[28px] text-ink transition-colors duration-300 group-hover:text-clay">
                    {prev.title}
                  </p>
                </Link>
              )}
              {next && (
                <Link
                  href={`/work/${next.slug}`}
                  className="group max-w-md md:text-right"
                  data-cursor="link"
                >
                  <p className="text-[11px] uppercase tracking-nav text-mist">
                    Next
                  </p>
                  <p className="mt-3 font-display text-[28px] text-ink transition-colors duration-300 group-hover:text-clay">
                    {next.title}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>
      <InquireCTA />
      <Footer />
    </>
  );
}
