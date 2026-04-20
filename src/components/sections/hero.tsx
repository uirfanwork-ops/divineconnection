import Link from "next/link";
import { siteConfig } from "../../../content/site-config";

export function HeroSection() {
  const { hero, retreatDate, retreatVenue } = siteConfig;

  return (
    <>
      {/* Hero with background image placeholder (dark gradient simulates image overlay) */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a1a0a] via-[#0d1f0d] to-[var(--bg-primary)]">
        {/* Dark overlay */}
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

      {/* Steps Bar */}
      <div className="border-y border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          {[
            { step: 1, label: "Choose a Retreat" },
            { step: 2, label: "Register Online" },
            { step: 3, label: "Enjoy!" },
          ].map(({ step, label }) => (
            <div key={step} className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--gold)] text-xs font-semibold text-[var(--gold)]">
                {step}
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--text-secondary)]">
                {label}
              </span>
            </div>
          ))}
          <Link href="/register" className="btn-outline-gold">
            Register Now
          </Link>
        </div>
      </div>
    </>
  );
}
