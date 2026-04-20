import Link from "next/link";
import { Check } from "lucide-react";
import { formatCents } from "@/lib/utils";
import type { Database } from "@/types/database";

type PricingTier = Database["public"]["Tables"]["pricing_tiers"]["Row"];

export function PricingSection({ tiers }: { tiers: PricingTier[] }) {
  return (
    <section id="pricing" className="border-y border-[var(--border-subtle)] bg-dark-alt bg-topo py-24 md:py-32">
      <div className="container">
        <div className="text-center">
          <p className="label-gold">Pricing</p>
          <h2 className="font-heading mt-3 text-4xl font-bold uppercase tracking-wide text-[var(--text-primary)] md:text-5xl">
            Choose Your Tier
          </h2>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-3">
          {tiers.map((tier, index) => {
            const features = Array.isArray(tier.features) ? (tier.features as string[]) : [];
            const isPopular = index === 1;
            const spotsLeft = tier.max_spots !== null ? tier.max_spots - tier.spots_taken : null;

            return (
              <div
                key={tier.id}
                className={`relative flex flex-col border p-8 transition-colors ${
                  isPopular
                    ? "border-[var(--gold)] bg-[var(--bg-card)]"
                    : "border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--border-color)]"
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="btn-gold-filled py-1 px-4 text-[10px]">
                      Most Popular
                    </span>
                  </div>
                )}

                <p className="label-gold text-[10px]">{tier.name}</p>
                <div className="mt-3 flex items-baseline">
                  <span className="font-heading text-5xl font-bold text-[var(--text-primary)]">
                    {formatCents(tier.price_cents, tier.currency).replace(/\.\d+$/, "")}
                  </span>
                  <span className="ml-2 text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    {tier.currency}
                  </span>
                </div>

                <p className="mt-3 text-sm text-[var(--text-secondary)]">
                  {tier.description}
                </p>

                {spotsLeft !== null && (
                  <p className={`mt-2 text-xs font-medium uppercase tracking-wider ${
                    spotsLeft <= 10 ? "text-[var(--gold)]" : "text-[var(--text-muted)]"
                  }`}>
                    {spotsLeft > 0 ? `${spotsLeft} spots remaining` : "Sold out"}
                  </p>
                )}

                <div className="divider-gold my-6" />

                <ul className="mb-8 flex-1 space-y-3">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={spotsLeft === 0 ? "#" : `/register?tier=${tier.id}`}
                  className={`${isPopular ? "btn-gold-filled" : "btn-outline-gold"} w-full text-center ${
                    spotsLeft === 0 ? "pointer-events-none opacity-50" : ""
                  }`}
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
