import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { formatCents } from "@/lib/utils";
import type { Database } from "@/types/database";

type PricingTier = Database["public"]["Tables"]["pricing_tiers"]["Row"];

export function PricingSection({ tiers }: { tiers: PricingTier[] }) {
  return (
    <section id="pricing" className="starfield relative overflow-hidden py-20 md:py-28 bg-gradient-to-b from-slate-950/50 via-blue-950/20 to-slate-950/50">
      <div className="nebula nebula-blue h-[400px] w-[400px]" style={{ top: "20%", left: "-10%" }} />
      <div className="nebula nebula-gold h-[400px] w-[400px]" style={{ bottom: "10%", right: "-10%", animationDelay: "8s" }} />

      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <Sparkles className="h-3 w-3" />
              Pricing
            </span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-slate-100 md:text-5xl">
            Choose your <span className="gradient-text-gold">tier</span>
          </h2>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-3">
          {tiers.map((tier, index) => {
            const features = Array.isArray(tier.features) ? (tier.features as string[]) : [];
            const isPopular = index === 1;
            const spotsLeft = tier.max_spots !== null ? tier.max_spots - tier.spots_taken : null;

            return (
              <div
                key={tier.id}
                className={`relative flex flex-col rounded-3xl p-8 transition-all duration-300 ${
                  isPopular
                    ? "glass-glow-gold -translate-y-2 md:scale-105"
                    : "glass-card hover:-translate-y-1 hover:border-white/20"
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-1.5 text-xs font-bold text-slate-900 shadow-lg shadow-amber-500/40">
                      <Sparkles className="h-3 w-3" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className={`text-2xl font-bold ${isPopular ? "gradient-text-gold" : "text-slate-100"}`}>{tier.name}</h3>
                  <p className="mt-2 text-sm text-slate-400">{tier.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-slate-100">
                      {formatCents(tier.price_cents, tier.currency).replace(/\.\d+$/, "")}
                    </span>
                    <span className="ml-1 text-sm font-medium text-slate-500">{tier.currency}</span>
                  </div>
                  {spotsLeft !== null && (
                    <p className={`mt-2 text-sm font-medium ${spotsLeft <= 10 ? "text-amber-400" : "text-slate-500"}`}>
                      {spotsLeft > 0 ? `${spotsLeft} spots remaining` : "Sold out"}
                    </p>
                  )}
                </div>

                <ul className="mb-8 flex-1 space-y-3">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-slate-400">
                      <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        isPopular ? "bg-gradient-to-br from-amber-400 to-amber-600" : "bg-gradient-to-br from-blue-400 to-blue-600"
                      }`}>
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={spotsLeft === 0 ? "#" : `/register?tier=${tier.id}`}
                  className={`inline-flex h-12 w-full items-center justify-center rounded-xl text-sm font-semibold transition-all ${
                    isPopular
                      ? "btn-glow bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 hover:from-amber-400 hover:to-amber-500"
                      : "bg-white/5 text-slate-200 ring-1 ring-white/10 hover:bg-white/10 hover:ring-white/20"
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
