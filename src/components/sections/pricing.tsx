import Link from "next/link";
import { Check } from "lucide-react";
import { formatCents } from "@/lib/utils";
import type { Database } from "@/types/database";

type PricingTier = Database["public"]["Tables"]["pricing_tiers"]["Row"];

interface PricingSectionProps {
  tiers: PricingTier[];
}

export function PricingSection({ tiers }: PricingSectionProps) {
  return (
    <section id="pricing" className="bg-muted py-16 md:py-24">
      <div className="container">
        <h2 className="text-center text-3xl font-bold text-foreground md:text-4xl">
          Choose Your Tier
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
          Select the option that best fits your needs. All tiers include full
          access to lectures, workshops, meals, and activities.
        </p>

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
          {tiers.map((tier, index) => {
            const features = Array.isArray(tier.features)
              ? (tier.features as string[])
              : [];
            const isPopular = index === 1;
            const spotsLeft =
              tier.max_spots !== null
                ? tier.max_spots - tier.spots_taken
                : null;

            return (
              <div
                key={tier.id}
                className={`relative flex flex-col rounded-lg border bg-background p-6 shadow-sm ${
                  isPopular ? "border-primary shadow-md" : ""
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="text-xl font-bold text-foreground">
                    {tier.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {tier.description}
                  </p>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground">
                    {formatCents(tier.price_cents, tier.currency)}
                  </span>
                  <span className="ml-1 text-sm text-muted-foreground">
                    {tier.currency}
                  </span>
                </div>

                {spotsLeft !== null && (
                  <p
                    className={`mb-4 text-sm font-medium ${
                      spotsLeft <= 10
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }`}
                  >
                    {spotsLeft > 0
                      ? `${spotsLeft} spots remaining`
                      : "Sold out"}
                  </p>
                )}

                <ul className="mb-6 flex-1 space-y-3">
                  {features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={
                    spotsLeft === 0
                      ? "#"
                      : `/register?tier=${tier.id}`
                  }
                  className={`inline-flex h-11 w-full items-center justify-center rounded-md text-sm font-semibold transition-colors ${
                    isPopular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border border-primary bg-background text-primary hover:bg-primary/5"
                  } ${spotsLeft === 0 ? "pointer-events-none opacity-50" : ""}`}
                  aria-disabled={spotsLeft === 0}
                >
                  {spotsLeft === 0 ? "Sold Out" : "Register Now"}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
