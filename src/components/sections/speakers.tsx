"use client";

import Image from "next/image";
import type { Speaker } from "@/lib/speakers";
import { User, BookOpen } from "lucide-react";
import { ParallaxBg } from "@/components/parallax-bg";

const speakerImages: Record<string, string> = {
  "sulaiman-moola": "/gallery/speakers/sh-sulaiman.jpg",
  "omar-subedar": "/gallery/speakers/sh-omar.jpg",
  "yusuf-badat": "/gallery/speakers/mufti-yusuf.jpg",
  "hassan-syed": "/gallery/speakers/ust-hassan.jpg",
  "shariq-lodhi": "/gallery/speakers/dr-shariq.jpg",
};

const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

export function SpeakersSection({ speakers }: { speakers: Speaker[] }) {
  return (
    <section id="speakers" className="relative overflow-hidden">
      <ParallaxBg src="/gallery/031.jpeg" overlay="dark" speed={0.2} />

      <div className="relative z-10 py-24 md:py-32">
        <div className="container text-center">
          <p className="label-gold">Our Speakers</p>
          <h2 className="font-heading mt-3 text-4xl font-bold uppercase tracking-wide text-[var(--text-primary)] md:text-5xl">
            Study Sessions at the Retreat
          </h2>
        </div>

        <div className="container mt-16">
          {speakers.map((speaker, idx) => {
            const imgSrc = speakerImages[speaker.id];
            return (
              <div
                key={speaker.id}
                className="sticky mb-6 last:mb-0"
                style={{ top: `${80 + idx * 24}px` }}
              >
                <div className="flex flex-col overflow-hidden border border-[#d4c9a8] bg-[#f5f0e6] shadow-lg md:flex-row">
                  {/* Left: Medallion / Image */}
                  <div className="relative flex w-full shrink-0 items-center justify-center bg-gradient-to-br from-[#0d150d] to-[#0a1a0a] p-8 md:w-56 md:p-0">
                    {imgSrc && (
                      <Image
                        src={imgSrc}
                        alt={speaker.name}
                        fill
                        className="object-cover opacity-0 transition-opacity duration-300"
                        sizes="224px"
                        unoptimized
                        onLoad={(e) => {
                          (e.target as HTMLImageElement).classList.remove("opacity-0");
                          (e.target as HTMLImageElement).classList.add("opacity-100");
                        }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    )}
                    <div className="relative flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 border-[#c9a84c]/40">
                      <span className="font-heading text-2xl font-bold text-[#c9a84c]">
                        {romanNumerals[idx]}
                      </span>
                      <User className="mt-1 h-6 w-6 text-[#c9a84c]/60" />
                    </div>
                  </div>

                  {/* Right: Content */}
                  <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#c9a84c]">
                      {speaker.category}
                    </p>
                    <h3 className="font-heading mt-1 text-2xl font-bold uppercase tracking-wide text-[#1a1a1a] md:text-3xl">
                      {speaker.name}
                    </h3>

                    {speaker.sessionTitle && (
                      <div className="mt-3 flex items-start gap-2">
                        <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-[#c9a84c]" />
                        <p className="text-sm font-semibold leading-snug text-[#8a7535]">
                          {speaker.sessionTitle}
                        </p>
                      </div>
                    )}

                    <div className="mt-3 h-px w-16 bg-[#c9a84c]/30" />

                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#4a4a4a]">
                      {speaker.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
