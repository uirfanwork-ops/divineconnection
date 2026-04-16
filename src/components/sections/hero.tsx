import Link from "next/link";
import { siteConfig } from "../../../content/site-config";

export function HeroSection() {
  const { hero, retreatDate, retreatVenue } = siteConfig;

  return (
    <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary via-primary to-primary/80" />
      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest opacity-90">
            {retreatDate} | {retreatVenue}
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {hero.title}
          </h1>
          <p className="mt-2 text-2xl font-light sm:text-3xl md:text-4xl">
            {hero.subtitle}
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed opacity-90">
            {hero.description}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={hero.ctaHref}
              className="inline-flex h-12 items-center justify-center rounded-md bg-secondary px-8 text-base font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90"
            >
              {hero.ctaText}
            </Link>
            <Link
              href={hero.secondaryCtaHref}
              className="inline-flex h-12 items-center justify-center rounded-md border-2 border-primary-foreground/30 px-8 text-base font-semibold text-primary-foreground transition-colors hover:border-primary-foreground/60 hover:bg-primary-foreground/10"
            >
              {hero.secondaryCtaText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
