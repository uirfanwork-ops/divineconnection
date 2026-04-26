"use client";

import Image from "next/image";
import { speakers } from "../../../content/speakers";
import { User, BookOpen } from "lucide-react";
import { ParallaxBg } from "@/components/parallax-bg";

const speakerImages: Record<string, string> = {
  "Sh. Sulaiman Moola": "/gallery/speakers/sh-sulaiman.jpg",
  "Sh. Omar": "/gallery/speakers/sh-omar.jpg",
  "Sh. Yusuf": "/gallery/speakers/sh-yusuf.jpg",
  "Sh. Sohaib": "/gallery/speakers/sh-sohaib.jpg",
  "Dr. Shariq": "/gallery/speakers/dr-shariq.jpg",
};

export function SpeakersSection() {
  return (
    <section id="speakers" className="relative overflow-hidden py-24 md:py-32">
      <ParallaxBg src="/gallery/09.jpg" overlay="dark" speed={0.2} />

      <div className="container relative z-10">
        <div className="text-center">
          <p className="label-gold">Our Speakers</p>
          <h2 className="font-heading mt-3 text-4xl font-bold uppercase tracking-wide text-[var(--text-primary)] md:text-5xl">
            Learn from the Best
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {speakers.map((speaker) => {
            const imgSrc = speakerImages[speaker.name];
            return (
              <div
                key={speaker.name}
                className="border border-[var(--border-subtle)] bg-[#0a0f0a]/90 backdrop-blur-sm transition-colors hover:border-[var(--border-color)]"
              >
                <div className="relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-br from-[#0d150d] to-[#050a05]">
                  {imgSrc && (
                    <Image
                      src={imgSrc}
                      alt={speaker.name}
                      fill
                      className="object-cover opacity-0 transition-opacity duration-300"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
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
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[var(--gold)] border-opacity-30">
                    <User className="h-10 w-10 text-[var(--gold)]" />
                  </div>
                </div>

                <div className="p-5">
                  <p className="label-gold text-[10px]">{speaker.title}</p>
                  <h3 className="font-heading mt-1 text-lg font-bold uppercase tracking-wide text-[var(--text-primary)]">
                    {speaker.name}
                  </h3>

                  {speaker.sessionTitle && (
                    <div className="mt-3 flex items-start gap-2 border-t border-[var(--border-subtle)] pt-3">
                      <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" />
                      <p className="text-sm font-semibold leading-snug text-[var(--gold-light)]">
                        {speaker.sessionTitle}
                      </p>
                    </div>
                  )}

                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {speaker.bio}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
