import { MapPin, Check } from "lucide-react";
import { siteConfig } from "../../../content/site-config";

export function VenueSection() {
  const { venue } = siteConfig;

  return (
    <section id="venue" className="bg-topo bg-dark py-24 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Visual */}
            <div className="flex items-center justify-center border border-[var(--border-subtle)] bg-gradient-to-br from-[#0a1a0a] to-[var(--bg-card)] p-12">
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

            {/* Details */}
            <div>
              <p className="label-gold">The Venue</p>
              <h2 className="font-heading mt-3 text-3xl font-bold uppercase tracking-wide text-[var(--text-primary)] md:text-4xl">
                Nature&apos;s Embrace
              </h2>
              <div className="divider-gold mt-4" />
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
