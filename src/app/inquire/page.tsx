import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { InquireForm } from "@/components/InquireForm";

export const metadata: Metadata = {
  title: "Inquire",
  description:
    "Tell us about the building you have in mind. We respond to every inquiry.",
};

export default function InquirePage() {
  return (
    <>
      <Nav variant="solid" />
      <main className="bg-bone pt-32 section-pad">
        <div className="container-page grid grid-cols-12 gap-x-8 gap-y-16">
          <Reveal className="col-span-12 md:col-span-5">
            <p className="text-eyebrow">Inquire</p>
            <h1 className="text-h1 mt-8 text-ink">
              Tell us about the{" "}
              <span className="italic text-clay">project.</span>
            </h1>
            <p className="mt-10 max-w-prose text-body-lg text-ink/80">
              We respond to every inquiry inside two business days. A first
              call is informal and free of charge.
            </p>

            <div className="mt-16 space-y-8 border-t border-hairline pt-10">
              <div>
                <p className="text-[11px] uppercase tracking-nav text-mist">
                  General
                </p>
                <a
                  href="mailto:info@aozat.com"
                  className="mt-3 inline-block font-display text-[24px] text-ink hover:text-clay"
                >
                  info@aozat.com
                </a>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-nav text-mist">
                  New work
                </p>
                <a
                  href="mailto:sales@aozat.com"
                  className="mt-3 inline-block font-display text-[24px] text-ink hover:text-clay"
                >
                  sales@aozat.com
                </a>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-nav text-mist">
                  Studio
                </p>
                <p className="mt-3 font-display text-[24px] text-ink">
                  Etobicoke, Ontario
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="col-span-12 md:col-span-7">
            <InquireForm />
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
