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

      {/* Floating Stars */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <div className="hero-orb absolute left-[20%] top-[25%] h-1.5 w-1.5 rounded-full bg-[#c9a84c] shadow-[0_0_6px_2px_rgba(201,168,76,0.6)] [animation-delay:0s]" />
        <div className="hero-orb absolute right-[18%] top-[30%] h-1 w-1 rounded-full bg-white shadow-[0_0_4px_2px_rgba(255,255,255,0.5)] [animation-delay:-3s]" />
        <div className="hero-orb absolute left-[35%] top-[55%] h-2 w-2 rounded-full bg-[#c9a84c] shadow-[0_0_8px_3px_rgba(201,168,76,0.5)] [animation-delay:-7s]" />
        <div className="hero-orb absolute right-[30%] top-[20%] h-1 w-1 rounded-full bg-[#d9b96a] shadow-[0_0_5px_2px_rgba(217,185,106,0.5)] [animation-delay:-5s]" />
        <div className="hero-orb absolute left-[10%] top-[60%] h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_6px_2px_rgba(255,255,255,0.4)] [animation-delay:-2s]" />
        <div className="hero-orb absolute right-[12%] top-[65%] h-1 w-1 rounded-full bg-[#c9a84c] shadow-[0_0_4px_2px_rgba(201,168,76,0.6)] [animation-delay:-9s]" />
        <div className="hero-orb absolute left-[45%] top-[18%] h-1 w-1 rounded-full bg-white shadow-[0_0_4px_1px_rgba(255,255,255,0.5)] [animation-delay:-4s]" />
        <div className="hero-orb absolute right-[40%] top-[72%] h-1.5 w-1.5 rounded-full bg-[#d9b96a] shadow-[0_0_6px_2px_rgba(217,185,106,0.4)] [animation-delay:-6s]" />
        <div className="hero-orb absolute left-[28%] top-[40%] h-1 w-1 rounded-full bg-[#c9a84c] shadow-[0_0_4px_2px_rgba(201,168,76,0.5)] [animation-delay:-1s]" />
        <div className="hero-orb absolute right-[22%] top-[48%] h-2 w-2 rounded-full bg-white shadow-[0_0_6px_3px_rgba(255,255,255,0.3)] [animation-delay:-8s]" />
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
