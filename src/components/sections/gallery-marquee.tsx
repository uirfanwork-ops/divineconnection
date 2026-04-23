"use client";

import Image from "next/image";

const galleryImages = [
  { src: "/gallery/01.jpg", alt: "Retreat gathering" },
  { src: "/gallery/02.jpg", alt: "Outdoor session" },
  { src: "/gallery/03.jpg", alt: "Group prayer" },
  { src: "/gallery/04.jpg", alt: "Nature trails" },
  { src: "/gallery/05.jpg", alt: "Brotherhood" },
  { src: "/gallery/06.jpg", alt: "Lecture session" },
  { src: "/gallery/07.jpg", alt: "Morning reflection" },
  { src: "/gallery/08.jpg", alt: "Group activity" },
  { src: "/gallery/09.jpg", alt: "Dhikr circle" },
  { src: "/gallery/10.jpg", alt: "Outdoor recreation" },
  { src: "/gallery/11.jpg", alt: "Retreat moments" },
  { src: "/gallery/12.jpg", alt: "Scenic views" },
  { src: "/gallery/13.jpg", alt: "Community bonding" },
  { src: "/gallery/14.jpg", alt: "Spiritual journey" },
  { src: "/gallery/15.jpg", alt: "Retreat memories" },
];

export function GalleryMarquee() {
  const images = [...galleryImages, ...galleryImages];

  return (
    <section className="relative overflow-hidden border-y border-[var(--border-subtle)] bg-[var(--bg-secondary)] py-12 md:py-16">
      <div className="container mb-10 text-center">
        <p className="label-gold">Last Year&apos;s Retreat</p>
        <h2 className="font-heading mt-2 text-2xl font-bold uppercase tracking-wide text-[var(--text-primary)] md:text-3xl">
          Memories from Divine Connections
        </h2>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-24 bg-gradient-to-r from-[var(--bg-secondary)] to-transparent md:w-40" />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-24 bg-gradient-to-l from-[var(--bg-secondary)] to-transparent md:w-40" />

      <div className="marquee-track flex w-max gap-4">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="group relative h-52 w-72 flex-shrink-0 overflow-hidden md:h-64 md:w-96"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 288px, 384px"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
          </div>
        ))}
      </div>
    </section>
  );
}
