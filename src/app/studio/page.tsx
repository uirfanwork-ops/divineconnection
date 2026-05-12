import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { InquireCTA } from "@/components/InquireCTA";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Aozat is a Toronto general contractor working in the slow craft of permits, drawings, and disciplined sites.",
};

const team = [
  {
    name: "Aozat Senior Project Lead",
    role: "Operations",
    body: "Twenty-two years across commercial and industrial work. Carries the schedule on every project the studio takes.",
  },
  {
    name: "Aozat Pre-construction",
    role: "Pre-construction",
    body: "Tender administration, cost planning, and constructability review. Reads tenders the way an editor reads a manuscript.",
  },
  {
    name: "Aozat Field Supervision",
    role: "Site",
    body: "One project lead on site from groundbreaking to handover. The crew the lead trusts is the crew on the project.",
  },
];

export default function StudioPage() {
  return (
    <>
      <Nav variant="solid" />
      <main className="bg-bone pt-32">
        <section className="section-pad">
          <div className="container-page grid grid-cols-12 gap-x-8 gap-y-10">
            <Reveal className="col-span-12 md:col-span-3">
              <p className="text-eyebrow">Studio</p>
            </Reveal>
            <Reveal delay={0.05} className="col-span-12 md:col-span-9">
              <h1 className="text-h1 max-w-prose-lg text-ink">
                A small studio for{" "}
                <span className="italic text-clay">long projects.</span>
              </h1>
              <div className="mt-12 max-w-prose space-y-8 text-body-lg text-ink">
                <p>
                  Aozat is a Toronto general contractor for commercial,
                  industrial, and multi-unit residential developers. We were
                  founded on the idea that a builder should be a peer to the
                  architect and the lender, not a subordinate.
                </p>
                <p>
                  We work in the slow craft of permits, drawings, and
                  disciplined sites. The schedules we keep are quiet ones.
                </p>
                <p>
                  We do not take more work than the studio can hold at one
                  time. We answer the phone after handover.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-sandSoft section-pad">
          <div className="container-page">
            <Reveal>
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-sand">
                <Image
                  src="/studio/studio-portrait.svg"
                  alt="Aozat project team on site reviewing drawings."
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <div className="mt-24 grid grid-cols-1 gap-12 md:grid-cols-3">
              {team.map((member, i) => (
                <Reveal key={member.name} delay={i * 0.05}>
                  <p className="text-[11px] uppercase tracking-nav text-clay">
                    {member.role}
                  </p>
                  <h3 className="text-h3 mt-4 text-ink">{member.name}</h3>
                  <p className="mt-4 text-body text-ink/80">{member.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <InquireCTA />
      <Footer />
    </>
  );
}
