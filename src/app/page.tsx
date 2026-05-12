import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Capabilities } from "@/components/Capabilities";
import { Approach } from "@/components/Approach";
import { StudioTeaser } from "@/components/StudioTeaser";
import { JournalGrid } from "@/components/JournalGrid";
import { InquireCTA } from "@/components/InquireCTA";
import { Footer } from "@/components/Footer";
import { getFeaturedProjects } from "@/lib/projects";

export default function HomePage() {
  const featured = getFeaturedProjects();
  return (
    <>
      <Nav variant="overlay" />
      <main>
        <Hero />
        <Manifesto />
        <ProjectGrid projects={featured} variant="home" />
        <Capabilities />
        <Approach />
        <StudioTeaser />
        <JournalGrid />
        <InquireCTA />
      </main>
      <Footer />
    </>
  );
}
