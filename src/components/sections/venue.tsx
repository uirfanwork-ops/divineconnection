import { MapPin, Check, Mountain } from "lucide-react";
import { siteConfig } from "../../../content/site-config";

export function VenueSection() {
  const { venue } = siteConfig;

  return (
    <section id="venue" className="relative py-20 md:py-28 bg-constellation">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <Mountain className="h-3 w-3" />
              The Venue
            </span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-slate-100 md:text-5xl">{venue.title}</h2>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="glass-strong overflow-hidden rounded-3xl">
            <div className="grid md:grid-cols-2">
              <div className="starfield relative flex h-64 items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-900/60 via-teal-900/40 to-blue-900/30 md:h-auto md:min-h-[400px]">
                <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-xl ring-8 ring-white/5">
                  <MapPin className="h-12 w-12 text-emerald-400" />
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-emerald-400/60">Location</p>
                  <p className="mt-1 text-lg font-bold text-slate-100">{venue.name}</p>
                </div>
              </div>

              <div className="p-8 md:p-10">
                <h3 className="text-2xl font-bold text-slate-100">{venue.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{venue.address}</p>
                <p className="mt-4 leading-relaxed text-slate-400">{venue.description}</p>

                <div className="mt-6">
                  <h4 className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500">Venue Features</h4>
                  <ul className="grid gap-2.5 sm:grid-cols-2">
                    {venue.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-slate-400">
                        <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                          <Check className="h-2.5 w-2.5 text-emerald-400" />
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
