import Link from "next/link";
import { Check, Clock, Mail } from "lucide-react";
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

        <div className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-2">
          {tiers.map((tier, index) => {
            const features = Array.isArray(tier.features) ? (tier.features as string[]) : [];
            const isEarlyBird = index === 0;
            const spotsLeft = tier.max_spots !== null ? tier.max_spots - tier.spots_taken : null;

            return (
              <div
                key={tier.id}
                className={`relative flex flex-col border p-8 transition-colors ${
                  isEarlyBird
                    ? "border-[var(--gold)] bg-[var(--bg-card)]"
                    : "border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--border-color)]"
                }`}
              >
                {isEarlyBird && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="btn-gold-filled flex items-center gap-1.5 py-1 px-4 text-[10px]">
                      <Clock className="h-3 w-3" />
                      Limited Time
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

                <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {tier.description}
                </p>

                {isEarlyBird && (
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-[var(--gold)]">
                    Until July 13th, 2026
                  </p>
                )}

                {spotsLeft !== null && spotsLeft <= 10 && (
                  <p className="mt-2 text-xs font-medium uppercase tracking-wider text-[var(--gold)]">
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
                  className={`${isEarlyBird ? "btn-gold-filled" : "btn-outline-gold"} w-full text-center ${
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

        {/* Installment note */}
        <div className="mx-auto mt-10 max-w-4xl text-center">
          <p className="flex items-center justify-center gap-2 text-sm text-[var(--text-secondary)]">
            <Mail className="h-4 w-4 text-[var(--gold)]" />
            Installment options available. Email{" "}
            <a
              href="mailto:finance@mathabah.org"
              className="font-semibold text-[var(--gold)] underline underline-offset-4 hover:text-[var(--gold-light)]"
            >
              finance@mathabah.org
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
