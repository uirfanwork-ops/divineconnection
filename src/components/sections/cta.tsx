import Link from "next/link";
import { siteConfig } from "../../../content/site-config";

export function CtaSection() {
  const { cta } = siteConfig;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0a1a0a] via-[#0d1f0d] to-[var(--bg-primary)] py-24 md:py-32">
      <div className="absolute inset-0 bg-black/30" />
      <div className="container relative text-center">
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
        <p className="mt-8 text-xs italic text-[var(--text-muted)]">
          &quot;{siteConfig.footer.quranVerse.text}&quot; ({siteConfig.footer.quranVerse.reference})
        </p>
      </div>
    </section>
  );
}
