"use client";

import Image from "next/image";

const galleryImages = [
  { src: "/gallery/01.jpg", alt: "Brothers gathering at the retreat" },
  { src: "/gallery/02.jpg", alt: "Outdoor session in nature" },
  { src: "/gallery/03.jpg", alt: "Group prayer at sunset" },
  { src: "/gallery/04.jpg", alt: "Hiking through forest trails" },
  { src: "/gallery/05.jpg", alt: "Evening bonfire and brotherhood" },
  { src: "/gallery/06.jpg", alt: "Scholar lecture session" },
  { src: "/gallery/07.jpg", alt: "Morning reflection by the lake" },
  { src: "/gallery/08.jpg", alt: "Group photo of retreat attendees" },
  { src: "/gallery/09.jpg", alt: "Dhikr circle under the stars" },
  { src: "/gallery/10.jpg", alt: "Outdoor sports and recreation" },
];

export function GalleryMarquee() {
  // Duplicate images for seamless loop
  const images = [...galleryImages, ...galleryImages];

  return (
    <section className="relative overflow-hidden border-y border-[var(--border-subtle)] bg-[var(--bg-secondary)] py-12 md:py-16">
      {/* Heading */}
      <div className="container mb-10 text-center">
        <p className="label-gold">Last Year&apos;s Retreat</p>
        <h2 className="font-heading mt-2 text-2xl font-bold uppercase tracking-wide text-[var(--text-primary)] md:text-3xl">
          Memories from Divine Connections
        </h2>
      </div>

      {/* Gradient masks on edges */}
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-24 bg-gradient-to-r from-[var(--bg-secondary)] to-transparent md:w-40" />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-24 bg-gradient-to-l from-[var(--bg-secondary)] to-transparent md:w-40" />

      {/* Scrolling track */}
      <div className="marquee-track flex w-max gap-4">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="group relative h-52 w-72 flex-shrink-0 overflow-hidden md:h-64 md:w-96"
          >
            {/* Placeholder gradient (shown until real images are added) */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-elevated)] to-[var(--bg-card)]" />

            {/* Real image - uncomment when images are added to public/gallery/ */}
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover opacity-0 transition-opacity duration-300"
              sizes="(max-width: 768px) 288px, 384px"
              onLoad={(e) => {
                (e.target as HTMLImageElement).classList.remove("opacity-0");
                (e.target as HTMLImageElement).classList.add("opacity-100");
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />

            {/* Placeholder text (shows when no image loads) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs uppercase tracking-widest text-[var(--text-muted)] opacity-30">
                {img.alt}
              </span>
            </div>

            {/* Gold border accent on hover */}
            <div className="absolute inset-0 border border-transparent transition-colors group-hover:border-[var(--gold)]/30" />
          </div>
        ))}
      </div>
    </section>
  );
}
