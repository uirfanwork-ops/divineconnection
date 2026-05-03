"use client";

import Image from "next/image";
import type { Speaker } from "@/lib/speakers";
import { BookOpen } from "lucide-react";
import { ParallaxBg } from "@/components/parallax-bg";

const speakerImages: Record<string, string> = {
  "sulaiman-moola": "/gallery/speakers/sh-sulaiman.jpg",
  "omar-subedar": "/gallery/speakers/sh-omar.jpg",
  "yusuf-badat": "/gallery/speakers/mufti-yusuf.jpg",
  "hassan-syed": "/gallery/speakers/ust-hassan.jpg",
  "shariq-lodhi": "/gallery/speakers/dr-shariq.jpg",
};


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
                  {/* Speaker Image - hidden on mobile */}
                  <div className="relative hidden w-56 shrink-0 md:block md:h-auto">
                    {imgSrc && (
                      <Image
                        src={imgSrc}
                        alt={speaker.name}
                        fill
                        className="object-cover"
                        sizes="224px"
                        unoptimized
                      />
                    )}
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
                        <p className="font-heading text-lg font-bold leading-snug text-[#8a7535] md:text-xl">
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
