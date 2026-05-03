"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { siteConfig } from "../../../content/site-config";

export function HeroSection() {
  const { hero, retreatDate, retreatVenue } = siteConfig;
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    function handleScroll() {
      setScrollY(window.scrollY);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
      {/* YouTube Background Video */}
      <div
        className="absolute inset-0 -top-20"
        style={{ transform: `translateY(${scrollY * 0.4}px)` }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/kCrXcwxAvFM?autoplay=1&mute=1&loop=1&playlist=kCrXcwxAvFM&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&iv_load_policy=3"
            title="Divine Connections Background"
            allow="autoplay; encrypted-media"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[120%] min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 scale-[1.2] object-cover"
            style={{ aspectRatio: "16/9" }}
            frameBorder="0"
          />
        </div>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0a1a0a]" />

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
