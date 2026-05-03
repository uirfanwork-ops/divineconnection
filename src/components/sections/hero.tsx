"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "../../../content/site-config";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

export function HeroSection() {
  const { hero, retreatDate, retreatVenue } = siteConfig;
  const [scrollY, setScrollY] = useState(0);
  const playerRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrollY(window.scrollY);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      new window.YT.Player("yt-hero-player", {
        videoId: "kCrXcwxAvFM",
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: "kCrXcwxAvFM",
          controls: 0,
          showinfo: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          disablekb: 1,
          iv_load_policy: 3,
          origin: window.location.origin,
        },
        events: {
          onReady: (event: { target: { mute: () => void; playVideo: () => void } }) => {
            event.target.mute();
            event.target.playVideo();
            setVideoReady(true);
          },
          onStateChange: (event: { data: number; target: { playVideo: () => void } }) => {
            if (event.data === 0) {
              event.target.playVideo();
            }
          },
        },
      });
    };

    return () => {
      window.onYouTubeIframeAPIReady = undefined;
    };
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

      {/* YouTube Background Video */}
      <div
        className="absolute inset-0 -top-20"
        style={{ transform: `translateY(${scrollY * 0.4}px)` }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            ref={playerRef}
            id="yt-hero-player"
            className={`pointer-events-none absolute left-1/2 top-1/2 aspect-video w-[300%] max-w-none -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 md:w-[180%] ${videoReady ? "opacity-100" : "opacity-0"}`}
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
