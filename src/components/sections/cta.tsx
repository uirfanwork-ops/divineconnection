import Link from "next/link";
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
        <div className="mt-10">
          <Link href={cta.buttonHref} className="btn-outline-gold">
            {cta.buttonText}
          </Link>
        </div>
        <p className="mt-6 text-sm text-[var(--text-secondary)]">
          Any questions or concerns, please email us at{" "}
          <a href="mailto:events@mathabah.org" className="text-[var(--gold-light)] underline underline-offset-2">
            events@mathabah.org
          </a>
        </p>
        <p className="mt-8 text-xs italic text-[var(--text-muted)]">
          &quot;{siteConfig.footer.quranVerse.text}&quot; ({siteConfig.footer.quranVerse.reference})
        </p>
      </div>
    </section>
  );
}
