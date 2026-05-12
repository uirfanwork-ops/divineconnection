import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { InquireCTA } from "@/components/InquireCTA";
import { WorkArchive } from "@/components/WorkArchive";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Project archive across commercial, industrial, multi-unit residential, and restaurants in the Greater Toronto Area.",
};

export default function WorkPage() {
  return (
    <>
      <Nav variant="solid" />
      <main className="bg-bone pt-32 section-pad">
        <div className="container-page">
          <Reveal>
            <p className="text-eyebrow">Work</p>
            <h1 className="text-h1 mt-8 max-w-prose-lg text-ink">
              Project archive.
            </h1>
            <p className="mt-8 max-w-prose text-body-lg text-mist">
              A working list of completed projects. Filter by category. Each
              entry opens to its own page.
            </p>
          </Reveal>

          <WorkArchive projects={projects} />
        </div>
      </main>
      <InquireCTA />
      <Footer />
    </>
  );
}
