import Image from "next/image";
import { Check } from "lucide-react";
import { siteConfig } from "../../../content/site-config";
import { ParallaxBg } from "@/components/parallax-bg";

export function VenueSection() {
  const { venue } = siteConfig;

  return (
    <section id="venue" className="relative overflow-hidden py-24 md:py-32">
      <ParallaxBg src="/gallery/02.jpg" overlay="cream" speed={0.15} />

      <div className="container relative z-10">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="relative overflow-hidden border border-[#e0d5c5]">
              <Image
                src="/gallery/venue.jpg"
                alt={venue.name}
                width={800}
                height={600}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#c9a84c]">Retreat Venue</p>
                <h3 className="font-heading mt-2 text-2xl font-bold uppercase tracking-wide text-white md:text-3xl">
                  {venue.name}
                </h3>
                <p className="mt-2 text-xs text-white/70">
                  {venue.address}
                </p>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#8b7355]">The Venue</p>
              <h2 className="font-heading mt-3 text-3xl font-bold uppercase tracking-wide text-[#1a1a1a] md:text-4xl">
                Nature&apos;s Embrace
              </h2>
              <div className="mt-4 h-px w-16 bg-[#c9a84c] opacity-50" />
              <p className="mt-6 text-base leading-relaxed text-[#4a4540]">
                {venue.description}
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {venue.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-[#4a4540]"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#c9a84c]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
