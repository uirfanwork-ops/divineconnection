"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "../../../content/site-config";

export function HeroSection() {
  const { hero, retreatDate, retreatVenue } = siteConfig;
  const [scrollY, setScrollY] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrollY(window.scrollY);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
      {/* Fallback Background Image */}
      <div
        className="absolute inset-0 -top-20"
        style={{ transform: `translateY(${scrollY * 0.4}px)` }}
      >
        <Image
          src="/gallery/hero.jpg"
          alt="Divine Connections Retreat"
          fill
          priority
          className={`object-cover transition-opacity duration-1000 ${videoReady ? "opacity-0" : "opacity-100"}`}
          sizes="100vw"
          quality={85}
        />
      </div>

      {/* Self-hosted Background Video */}
      <div
        className="absolute inset-0 -top-20"
        style={{ transform: `translateY(${scrollY * 0.4}px)` }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoReady(true)}
          className={`absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover transition-opacity duration-1000 ${videoReady ? "opacity-100" : "opacity-0"}`}
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0a1a0a]" />

      <div className="container relative z-10 px-6 py-32 text-center">
        <h1 className="font-heading text-3xl font-bold uppercase tracking-wide text-[var(--text-primary)] sm:text-5xl md:text-6xl lg:text-8xl">
          {hero.title}
        </h1>
        <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--gold-light)] sm:text-sm sm:tracking-[0.3em] md:text-base">
          {hero.subtitle}
        </p>
        <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--gold-light)] sm:text-sm sm:tracking-[0.3em] md:text-base">
          {retreatDate}
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
