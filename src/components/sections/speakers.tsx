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

const topSpeakerIds = ["sulaiman-moola", "omar-subedar", "yusuf-badat"];

const panelScholars = [
  { name: "Dr. Shariq Lodhi", id: "shariq-lodhi" },
  { name: "Ustādh Tamseel Ahmed", id: "tamseel" },
  { name: "Ustādh Hassan Syed", id: "hassan-syed" },
];

export function SpeakersSection({ speakers }: { speakers: Speaker[] }) {
  const topSpeakers = topSpeakerIds
    .map((id) => speakers.find((s) => s.id === id))
    .filter(Boolean) as Speaker[];

  return (
    <section id="speakers" className="relative overflow-hidden">
      <ParallaxBg src="/gallery/026.jpeg" overlay="dark" speed={0.2} />

      <div className="relative z-10 py-24 md:py-32">
        <div className="container text-center">
          <p className="label-gold">Our Speakers</p>
          <h2 className="font-heading mt-3 text-4xl font-bold uppercase tracking-wide text-[var(--text-primary)] md:text-5xl">
            Study Sessions at the Retreat
          </h2>
        </div>

        {/* Top 3 speaker cards */}
        <div className="container mt-16 grid gap-6 md:grid-cols-3">
          {topSpeakers.map((speaker) => {
            const imgSrc = speakerImages[speaker.id];
            return (
              <div
                key={speaker.id}
                className="overflow-hidden rounded-2xl border border-white/15 bg-black/40 backdrop-blur-sm"
              >
                <div className="relative aspect-[3/4]">
                  {imgSrc && (
                    <Image
                      src={imgSrc}
                      alt={speaker.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      unoptimized
                    />
                  )}
                </div>
                <div className="p-5 md:p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#c9a84c]">
                    {speaker.category}
                  </p>
                  <h3 className="font-heading mt-1 text-xl font-bold uppercase tracking-wide text-white md:text-2xl">
                    {speaker.name}
                  </h3>
                  {speaker.sessionTitle && (
                    <div className="mt-3 flex items-start gap-2">
                      <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-[#c9a84c]" />
                      <p className="text-sm font-semibold leading-snug text-[#c9a84c]/80">
                        {speaker.sessionTitle}
                      </p>
                    </div>
                  )}
                  <div className="mt-3 h-px w-12 bg-[#c9a84c]/30" />
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    {speaker.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom joint session card */}
        <div className="container mt-6">
          <div className="overflow-hidden rounded-2xl border border-white/15 bg-black/40 backdrop-blur-sm md:flex">
            <div className="grid grid-cols-3 md:w-1/2 md:shrink-0">
              {panelScholars.map((scholar) => {
                const imgSrc = speakerImages[scholar.id];
                return (
                  <div key={scholar.id} className="relative aspect-[3/4] md:aspect-auto md:h-72">
                    {imgSrc ? (
                      <Image
                        src={imgSrc}
                        alt={scholar.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 33vw, 17vw"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full items-end justify-center bg-black/20 pb-4">
                        <span className="text-sm text-white/40">
                          {scholar.name}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-1 flex-col justify-center p-6 text-center md:p-8 md:text-left">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#c9a84c]">
                Discussion Panel
              </p>
              <h3 className="font-heading mt-2 text-xl font-bold uppercase tracking-wide text-white md:text-2xl">
                {panelScholars.map((s) => s.name).join("  ·  ")}
              </h3>
              <div className="mt-3 flex items-start justify-center gap-2 md:justify-start">
                <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-[#c9a84c]" />
                <p className="text-sm font-semibold leading-snug text-[#c9a84c]/80 md:text-base">
                  Discussions on Practical Application of Servanthood in
                  Everyday Life
                </p>
              </div>
              <div className="mt-3 h-px w-12 bg-[#c9a84c]/30 md:mx-0 mx-auto" />
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Guided by Ustādh Hassan Syed, this discussion panel brings
                together Dr. Shariq Lodhi and Ustādh Tamseel Ahmed to explore how the
                qualities of the ʿIbād ur Raḥmān were lived by the great figures
                of our tradition — and how we can embody them today. From the
                examples set by the Companions and the righteous generations to
                the unique challenges of modern life, the scholars examine what
                true servanthood looks like in practice: in our homes, our
                workplaces, and our communities. An insightful, candid exchange
                on bridging timeless principles with the realities we face now.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
