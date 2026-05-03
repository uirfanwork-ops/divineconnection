import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { siteConfig } from "../../../../content/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Gallery - ${siteConfig.shortName}`,
  description: "Photos from previous Divine Connections retreats.",
};

const galleryImages = [
  "/gallery/01.jpg",
  "/gallery/02.jpg",
  "/gallery/03.jpg",
  "/gallery/04.jpg",
  "/gallery/05.jpg",
  "/gallery/06.jpg",
  "/gallery/07.jpg",
  "/gallery/08.jpg",
  "/gallery/09.jpg",
  "/gallery/10.jpg",
  "/gallery/11.jpg",
  "/gallery/12.jpg",
  "/gallery/13.jpg",
  "/gallery/14.jpg",
  "/gallery/15.jpg",
  "/gallery/026.jpeg",
  "/gallery/027.jpeg",
  "/gallery/031.jpeg",
  "/gallery/034.jpeg",
  "/gallery/035.jpeg",
  "/gallery/036.jpeg",
  "/gallery/038.jpeg",
  "/gallery/040.jpeg",
  "/gallery/042.jpeg",
  "/gallery/049.jpeg",
  "/gallery/051.jpeg",
  "/gallery/054.jpeg",
  "/gallery/059.jpeg",
  "/gallery/061.jpeg",
  "/gallery/063.jpeg",
  "/gallery/065.jpeg",
  "/gallery/066.jpeg",
  "/gallery/069.jpeg",
  "/gallery/070.jpeg",
  "/gallery/071.jpeg",
  "/gallery/072.jpeg",
  "/gallery/079.jpeg",
  "/gallery/080.jpeg",
  "/gallery/083.jpeg",
  "/gallery/084.jpeg",
  "/gallery/085.jpeg",
  "/gallery/087.jpeg",
  "/gallery/094.jpeg",
  "/gallery/095.jpeg",
  "/gallery/096.jpeg",
  "/gallery/099.jpeg",
];

export default function GalleryPage() {
  return (
    <div className="bg-dark bg-topo py-16 md:py-24">
      <div className="container">
        {/* Header */}
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[var(--text-muted)] transition-colors hover:text-[var(--gold)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Home
          </Link>
        </div>
        <div className="mb-12">
          <p className="label-gold">2025 Retreat</p>
          <h1 className="font-heading mt-3 text-4xl font-bold uppercase tracking-wide text-[var(--text-primary)] md:text-5xl">
            Photo Gallery
          </h1>
          <div className="mt-4 flex items-center gap-3">
            <div className="h-px w-12 bg-[var(--gold)]" />
            <div className="h-2 w-2 rotate-45 border border-[var(--gold)]" />
            <div className="h-px w-12 bg-[var(--gold)]" />
          </div>
          <p className="mt-4 text-sm text-[var(--text-secondary)]">
            Moments captured from last year&apos;s Divine Connections retreat.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {galleryImages.map((src, idx) => (
            <div
              key={idx}
              className="group mb-4 break-inside-avoid overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-card)] transition-colors hover:border-[var(--border-color)]"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={src}
                  alt={`Retreat photo ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  unoptimized
                />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-sm text-[var(--text-secondary)]">
            Want to be part of this year&apos;s memories?
          </p>
          <Link href="/register" className="btn-outline-gold mt-4 inline-flex">
            Register for 2026
          </Link>
        </div>
      </div>
    </div>
  );
}
