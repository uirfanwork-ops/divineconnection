import { MapPin, Check } from "lucide-react";
import { siteConfig } from "../../../content/site-config";

export function VenueSection() {
  const { venue } = siteConfig;

  return (
    <section id="venue" className="relative py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-900">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              The Venue
            </span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            {venue.title}
          </h2>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="glass-strong overflow-hidden rounded-3xl">
            <div className="grid md:grid-cols-2">
              {/* Venue visual */}
              <div className="relative flex h-64 items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-orange-500 md:h-auto md:min-h-[400px]">
                <div className="absolute inset-0 bg-dot opacity-20" />
                <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-white/20 backdrop-blur-xl ring-8 ring-white/10">
                  <MapPin className="h-12 w-12 text-white" />
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-xs font-medium uppercase tracking-widest text-orange-200">
                    Location
                  </p>
                  <p className="mt-1 text-lg font-bold text-white">
                    {venue.name}
                  </p>
                </div>
              </div>

              {/* Venue details */}
              <div className="p-8 md:p-10">
                <h3 className="text-2xl font-bold text-slate-900">
                  {venue.name}
                </h3>
                <p className="mt-1 text-sm text-slate-500">{venue.address}</p>
                <p className="mt-4 leading-relaxed text-slate-600">
                  {venue.description}
                </p>

                <div className="mt-6">
                  <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-700">
                    Venue Features
                  </h4>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {venue.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-slate-600"
                      >
                        <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-orange-100">
                          <Check className="h-3 w-3 text-orange-600" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
