import { MapPin, Check } from "lucide-react";
import { siteConfig } from "../../../content/site-config";

export function VenueSection() {
  const { venue } = siteConfig;

  return (
    <section id="venue" className="bg-cream py-24 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="flex items-center justify-center border border-[#e0d5c5] bg-[#faf6f0] p-12">
              <div className="text-center">
                <MapPin className="mx-auto h-16 w-16 text-[#c9a84c] opacity-50" />
                <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#8b7355]">Retreat Venue</p>
                <h3 className="font-heading mt-2 text-3xl font-bold uppercase tracking-wide text-[#1a1a1a]">
                  {venue.name}
                </h3>
                <p className="mt-2 text-xs text-[#8b7355]">
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
