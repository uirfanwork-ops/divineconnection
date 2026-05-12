import Link from "next/link";
import { LogoMark } from "./LogoMark";
import { Reveal } from "./Reveal";

export function InquireCTA() {
  return (
    <section className="relative overflow-hidden bg-ink text-bone">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center text-amber"
      >
        <LogoMark size={480} className="opacity-[0.08]" />
      </div>

      <div className="container-page relative z-10 section-pad">
        <Reveal className="mx-auto max-w-prose-lg text-center">
          <p className="text-eyebrow-amber">Inquire</p>
          <h2 className="text-h2 mt-8 text-bone">
            Tell us about the{" "}
            <span className="italic text-sand">building you have in mind.</span>
          </h2>
          <div className="mt-12 flex justify-center">
            <Link
              href="/inquire"
              data-cursor="link"
              className="group inline-flex items-center gap-3 border border-amber px-10 py-4 text-[11px] uppercase tracking-nav text-amber transition-colors duration-300 hover:bg-amber hover:text-ink"
            >
              Start a conversation
              <span
                aria-hidden
                className="inline-block translate-y-[1px] transition-transform duration-300 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
