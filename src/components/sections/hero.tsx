import Link from "next/link";
import { siteConfig } from "../../../content/site-config";

export function HeroSection() {
  const { hero, retreatDate, retreatVenue } = siteConfig;

  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a1a0a] via-[#0d1f0d] to-[var(--bg-primary)]">
      <div className="absolute inset-0 bg-black/40" />

      <div className="container relative z-10 py-32 text-center">
        <h1 className="font-heading text-5xl font-bold uppercase tracking-wide text-[var(--text-primary)] sm:text-6xl md:text-7xl lg:text-8xl">
          {hero.title}
        </h1>
        <p className="mt-4 text-sm font-medium uppercase tracking-[0.3em] text-[var(--gold-light)] sm:text-base md:text-lg">
          {hero.subtitle} | {retreatDate}
        </p>
        <p className="mx-auto mt-2 text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">
          {retreatVenue}
        </p>
        <div className="mt-12">
          <Link href={hero.ctaHref} className="btn-outline-gold">
            {hero.ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}
