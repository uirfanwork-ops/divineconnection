import Link from "next/link";
import { siteConfig } from "../../../content/site-config";

export function HeroSection() {
  const { hero, retreatDate, retreatVenue } = siteConfig;

  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a1a0a] via-[#0d1f0d] to-[var(--bg-primary)]">
      <div className="absolute inset-0 bg-black/40" />

      <div className="container relative z-10 px-6 py-32 text-center">
        <h1 className="font-heading text-3xl font-bold uppercase tracking-wide text-[var(--text-primary)] sm:text-5xl md:text-6xl lg:text-8xl">
          {hero.title}
        </h1>
        <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--gold-light)] sm:text-sm sm:tracking-[0.3em] md:text-base">
          {hero.subtitle} | {retreatDate}
        </p>
        <p className="mx-auto mt-2 text-[10px] uppercase tracking-[0.15em] text-[var(--text-secondary)] sm:text-xs sm:tracking-[0.2em]">
          {retreatVenue}
        </p>
        <div className="mt-10 sm:mt-12">
          <Link href={hero.ctaHref} className="btn-outline-gold">
            {hero.ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}
