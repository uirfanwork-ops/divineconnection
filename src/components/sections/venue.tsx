import { MapPin, Check } from "lucide-react";
import { siteConfig } from "../../../content/site-config";

export function VenueSection() {
  const { venue } = siteConfig;

  return (
    <section id="venue" className="relative bg-dark py-24 md:py-32 overflow-hidden">
      {/* Background image with heavy gradient */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: "url('/gallery/05.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-l from-[#111111] via-[#111111]/80 to-[#111111]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#111111] via-transparent to-[#111111]" />

      <div className="container relative">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="flex items-center justify-center border border-[var(--border-subtle)] bg-[var(--bg-card)]/50 p-12">
              <div className="text-center">
                <MapPin className="mx-auto h-16 w-16 text-[var(--gold)] opacity-50" />
                <p className="label-gold mt-6 text-[10px]">Retreat Venue</p>
                <h3 className="font-heading mt-2 text-3xl font-bold uppercase tracking-wide text-[var(--text-primary)]">
                  {venue.name}
                </h3>
                <p className="mt-2 text-xs text-[var(--text-muted)]">
                  {venue.address}
                </p>
              </div>
            </div>

            <div>
              <p className="label-gold">The Venue</p>
              <h2 className="font-heading mt-3 text-3xl font-bold uppercase tracking-wide text-[var(--text-primary)] md:text-4xl">
                Nature&apos;s Embrace
              </h2>
              <div className="mt-4 h-px w-16 bg-[var(--gold)] opacity-50" />
              <p className="mt-6 text-base leading-relaxed text-[var(--text-secondary)]">
                {venue.description}
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {venue.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" />
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
