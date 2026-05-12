import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { InquireCTA } from "@/components/InquireCTA";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Commercial, industrial, multi-unit residential, restaurants, and pre-construction.",
};

const sections = [
  {
    num: "01",
    title: "Commercial buildout",
    body: "Tenant fit-outs, office buildouts, medical practices, and ground-up commercial work across the GTA. We work with the operator from the rezoning through occupancy when it matters, and from drawings through handover when it does not.",
    detail:
      "Typical project: 4,000 to 60,000 sq ft. We are comfortable carrying the consultant team, or stepping into a fully drawn set.",
  },
  {
    num: "02",
    title: "Industrial construction",
    body: "Tilt-up shells, light industrial, dock packages, and selective interior fits for operators. Slabs to FF50 are routine. We hold tight municipal noise and traffic covenants without surprises.",
    detail:
      "Typical project: 30,000 to 200,000 sq ft shell with a coordinated office volume.",
  },
  {
    num: "03",
    title: "Multi-unit residential, CMHC fluent",
    body: "Purpose-built rental from four units to forty. We work CMHC MLI Select packages alongside the building so the financing and the construction are one project, not two.",
    detail:
      "Typical project: six to forty units, brick or hybrid construction, single phase.",
  },
  {
    num: "04",
    title: "Tenant fit-outs and restaurants",
    body: "Hospitality work that holds its room. Twelve seat tasting counters, sixty four seat bistros, full kitchen rebuilds, and heritage-sensitive interventions. Kitchen extract, gas, and water are coordinated from the first sketch.",
    detail: "Typical project: 1,200 to 8,000 sq ft, twelve to twenty weeks.",
  },
  {
    num: "05",
    title: "Pre-construction and tender support",
    body: "Constructability review, value engineering, schedule modelling, and tender administration before the project goes into the field. The cleanest sites are the ones with the fewest decisions made on them.",
    detail:
      "Often a precursor to a full construction contract. Available standalone for developers, lenders, or architects.",
  },
];

export default function CapabilitiesPage() {
  return (
    <>
      <Nav variant="solid" />
      <main className="bg-bone pt-32 section-pad">
        <div className="container-page">
          <Reveal>
            <p className="text-eyebrow">Capabilities</p>
            <h1 className="text-h1 mt-8 max-w-prose-lg text-ink">
              What we build, and how far we carry it.
            </h1>
          </Reveal>

          <div className="mt-24 space-y-24">
            {sections.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.05}>
                <div className="grid grid-cols-12 gap-x-8 gap-y-8 border-t border-hairline pt-12">
                  <div className="col-span-12 md:col-span-3">
                    <p className="text-[11px] uppercase tracking-nav text-clay">
                      {s.num}
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-9 max-w-prose-lg space-y-6">
                    <h2 className="text-h2 text-ink">{s.title}</h2>
                    <p className="text-body-lg text-ink">{s.body}</p>
                    <p className="text-caption text-mist">{s.detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <InquireCTA />
      <Footer />
    </>
  );
}
