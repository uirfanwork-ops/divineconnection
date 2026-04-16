import { MapPin, Check } from "lucide-react";
import { siteConfig } from "../../../content/site-config";

export function VenueSection() {
  const { venue } = siteConfig;

  return (
    <section id="venue" className="py-16 md:py-24">
      <div className="container">
        <h2 className="text-center text-3xl font-bold text-foreground md:text-4xl">
          {venue.title}
        </h2>

        <div className="mx-auto mt-12 max-w-4xl">
          <div className="overflow-hidden rounded-lg border bg-background shadow-sm">
            <div className="flex h-56 items-center justify-center bg-primary/5">
              <MapPin className="h-16 w-16 text-primary/30" />
            </div>
            <div className="p-6 md:p-8">
              <h3 className="text-2xl font-bold text-foreground">
                {venue.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {venue.address}
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {venue.description}
              </p>

              <div className="mt-6">
                <h4 className="font-semibold text-foreground">
                  Venue Features
                </h4>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {venue.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
