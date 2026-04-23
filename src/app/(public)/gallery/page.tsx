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
  { src: "/gallery/01.jpg", caption: "Retreat gathering" },
  { src: "/gallery/02.jpg", caption: "Outdoor session" },
  { src: "/gallery/03.jpg", caption: "Group prayer" },
  { src: "/gallery/04.jpg", caption: "Nature trails" },
  { src: "/gallery/05.jpg", caption: "Brotherhood" },
  { src: "/gallery/06.jpg", caption: "Lecture session" },
  { src: "/gallery/07.jpg", caption: "Morning reflection" },
  { src: "/gallery/08.jpg", caption: "Group activity" },
  { src: "/gallery/09.jpg", caption: "Dhikr circle" },
  { src: "/gallery/10.jpg", caption: "Outdoor recreation" },
  { src: "/gallery/11.jpg", caption: "Retreat moments" },
  { src: "/gallery/12.jpg", caption: "Scenic views" },
  { src: "/gallery/13.jpg", caption: "Community bonding" },
  { src: "/gallery/14.jpg", caption: "Spiritual journey" },
  { src: "/gallery/15.jpg", caption: "Retreat memories" },
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
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              className="group mb-4 break-inside-avoid overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-card)] transition-colors hover:border-[var(--border-color)]"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={img.src}
                  alt={img.caption}
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
