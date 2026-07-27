import { siteConfig } from "../../../content/site-config";
import { ParallaxBg } from "@/components/parallax-bg";

export function CtaSection() {
  const { cta } = siteConfig;

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <ParallaxBg src="/gallery/08.jpg" overlay="dark" speed={0.25} />

      <div className="container relative z-10 text-center">
        <p className="label-gold">Limited Spots</p>
        <h2 className="font-heading mt-4 text-balance text-4xl font-bold uppercase tracking-wide text-[var(--text-primary)] md:text-5xl lg:text-6xl">
          {cta.title}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-[var(--text-secondary)]">
          {cta.description}
        </p>
        <div className="mx-auto mt-10 max-w-xl rounded-md border border-red-400/50 bg-red-950/40 px-6 py-4 text-sm leading-relaxed text-red-100 backdrop-blur-sm sm:text-base">
          <strong className="block font-bold uppercase tracking-wide text-red-200">Event Sold Out</strong>
          <span className="mt-2 block">
            This event has been sold out. For any inquiries, please email{" "}
            <a href="mailto:events@mathabah.org" className="underline underline-offset-2 hover:text-white">
              events@mathabah.org
            </a>.
          </span>
        </div>
        <p className="mt-8 text-xs italic text-[var(--text-muted)]">
          &quot;{siteConfig.footer.quranVerse.text}&quot; ({siteConfig.footer.quranVerse.reference})
        </p>
      </div>
    </section>
  );
}
