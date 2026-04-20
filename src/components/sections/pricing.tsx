import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { formatCents } from "@/lib/utils";
import type { Database } from "@/types/database";

type PricingTier = Database["public"]["Tables"]["pricing_tiers"]["Row"];

interface PricingSectionProps {
  tiers: PricingTier[];
}

export function PricingSection({ tiers }: PricingSectionProps) {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden py-20 md:py-28"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/40 to-orange-50/40" />
      <div
        className="blob blob-blue absolute h-[400px] w-[400px] opacity-30"
        style={{ top: "20%", left: "-10%" }}
      />
      <div
        className="blob blob-orange absolute h-[400px] w-[400px] opacity-30"
        style={{ bottom: "10%", right: "-10%", animationDelay: "5s" }}
      />

      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-900">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              Pricing
            </span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Choose your{" "}
            <span className="gradient-orange">tier</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            All tiers include full access to lectures, workshops, meals, and
            activities.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-8 md:grid-cols-3">
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
                className={`relative flex flex-col rounded-3xl p-8 transition-all duration-300 ${
                  isPopular
                    ? "glass-strong -translate-y-2 ring-2 ring-orange-500/50 shadow-2xl shadow-orange-500/20 md:scale-105"
                    : "glass hover:-translate-y-1 hover:shadow-xl"
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-1.5 text-xs font-bold text-white shadow-lg shadow-orange-500/40">
                      <Sparkles className="h-3 w-3" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3
                    className={`text-2xl font-bold ${
                      isPopular ? "gradient-orange" : "text-slate-900"
                    }`}
                  >
                    {tier.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    {tier.description}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-slate-900">
                      {formatCents(tier.price_cents, tier.currency).replace(
                        /\.\d+$/,
                        ""
                      )}
                    </span>
                    <span className="ml-1 text-sm font-medium text-slate-500">
                      {tier.currency}
                    </span>
                  </div>
                  {spotsLeft !== null && (
                    <p
                      className={`mt-2 text-sm font-medium ${
                        spotsLeft <= 10 ? "text-orange-600" : "text-slate-500"
                      }`}
                    >
                      {spotsLeft > 0
                        ? `${spotsLeft} spots remaining`
                        : "Sold out"}
                    </p>
                  )}
                </div>

                <ul className="mb-8 flex-1 space-y-3">
                  {features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-slate-600"
                    >
                      <div
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          isPopular
                            ? "bg-gradient-to-br from-orange-400 to-orange-600"
                            : "bg-gradient-to-br from-blue-400 to-blue-600"
                        }`}
                      >
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={
                    spotsLeft === 0 ? "#" : `/register?tier=${tier.id}`
                  }
                  className={`inline-flex h-12 w-full items-center justify-center rounded-xl text-sm font-semibold transition-all ${
                    isPopular
                      ? "btn-glow bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700"
                      : "bg-white text-blue-900 ring-2 ring-blue-200 hover:ring-blue-400"
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
