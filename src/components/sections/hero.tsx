"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "../../../content/site-config";

export function HeroSection() {
  const { hero } = siteConfig;
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

      {/* Glowing Orbs */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <div className="hero-orb absolute left-[15%] top-[20%] h-32 w-32 rounded-full bg-[#c9a84c]/20 blur-3xl [animation-delay:0s]" />
        <div className="hero-orb absolute right-[10%] top-[30%] h-24 w-24 rounded-full bg-[#c9a84c]/15 blur-2xl [animation-delay:-3s]" />
        <div className="hero-orb absolute left-[40%] top-[60%] h-40 w-40 rounded-full bg-[#c9a84c]/10 blur-3xl [animation-delay:-7s]" />
        <div className="hero-orb absolute right-[25%] top-[15%] h-20 w-20 rounded-full bg-white/10 blur-2xl [animation-delay:-5s]" />
        <div className="hero-orb absolute left-[5%] top-[65%] h-28 w-28 rounded-full bg-[#c9a84c]/15 blur-3xl [animation-delay:-2s]" />
        <div className="hero-orb absolute right-[15%] top-[70%] h-36 w-36 rounded-full bg-white/5 blur-3xl [animation-delay:-9s]" />
      </div>

      <div className="container relative z-10 flex flex-col items-center px-6 py-32 text-center">
        <Image
          src="/logo-hero.png"
          alt="Divine Connections — Servants of the Most Merciful — July 31 to August 3, 2026 — Mulmur, ON"
          width={1064}
          height={732}
          priority
          className="w-full max-w-4xl"
          unoptimized
        />
        <div className="mt-10 sm:mt-12">
          <Link href={hero.ctaHref} className="btn-outline-gold">
            {hero.ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}
