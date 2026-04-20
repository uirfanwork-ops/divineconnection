import { createClient } from "@/lib/supabase/server";
import { RegistrationForm } from "@/components/registration-form";
import { siteConfig } from "../../../../content/site-config";
import { Calendar, MapPin, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import type { Database } from "@/types/database";

type PricingTier = Database["public"]["Tables"]["pricing_tiers"]["Row"];

export const metadata: Metadata = {
  title: `Register - ${siteConfig.shortName}`,
  description: `Register for the ${siteConfig.name} retreat, ${siteConfig.retreatDate} at ${siteConfig.retreatVenue}.`,
};

interface RegisterPageProps {
  searchParams: Promise<{ tier?: string }>;
}

// Fallback dummy tiers used when DB isn't available so the form still works.
const fallbackTiers: PricingTier[] = [
  {
    id: "00000000-0000-0000-0000-000000000001",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    name: "Economy",
    description:
      "Shared dormitory-style cabin, full access to all sessions, all meals included.",
    price_cents: 15000,
    currency: "CAD",
    max_spots: 50,
    spots_taken: 0,
    is_active: true,
    sort_order: 1,
    stripe_price_id: null,
    features: [],
  },
  {
    id: "00000000-0000-0000-0000-000000000002",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    name: "Standard",
    description:
      "Shared cabin (2 per room), all halal meals, full access to lectures and workshops.",
    price_cents: 25000,
    currency: "CAD",
    max_spots: 60,
    spots_taken: 0,
    is_active: true,
    sort_order: 2,
    stripe_price_id: null,
    features: [],
  },
  {
    id: "00000000-0000-0000-0000-000000000003",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    name: "Premium",
    description:
      "Private cabin, priority check-in, all meals, exclusive Q&A session with speakers.",
    price_cents: 40000,
    currency: "CAD",
    max_spots: 40,
    spots_taken: 0,
    is_active: true,
    sort_order: 3,
    stripe_price_id: null,
    features: [],
  },
];

async function loadTiers(): Promise<PricingTier[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("pricing_tiers")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return fallbackTiers;
    }
    return data;
  } catch {
    return fallbackTiers;
  }
}

export default async function RegisterPage({
  searchParams,
}: RegisterPageProps) {
  const params = await searchParams;
  const tiers = await loadTiers();

  return (
    <div className="starfield relative overflow-hidden bg-gradient-to-b from-slate-950 via-blue-950/20 to-slate-950">
      <div
        className="nebula nebula-blue h-[500px] w-[500px]"
        style={{ top: "-10%", left: "-10%" }}
      />
      <div
        className="nebula nebula-gold h-[400px] w-[400px]"
        style={{ top: "30%", right: "-10%", animationDelay: "6s" }}
      />

      <div className="container relative py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <div className="mb-4 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400">
                <Sparkles className="h-3 w-3" />
                Secure Your Spot
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-100 md:text-5xl">
              Register for{" "}
              <span className="gradient-text-gold">{siteConfig.shortName}</span>
            </h1>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm">
                <Calendar className="h-4 w-4 text-blue-400" />
                <span className="font-medium text-slate-300">
                  {siteConfig.retreatDate}
                </span>
              </div>
              <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm">
                <MapPin className="h-4 w-4 text-amber-400" />
                <span className="font-medium text-slate-300">
                  {siteConfig.retreatVenue}
                </span>
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              {siteConfig.retreatAddress}
            </p>

            <p className="mt-6 text-sm text-slate-500">
              Fields marked with{" "}
              <span className="font-semibold text-amber-400">*</span> are
              required.
            </p>
          </div>

          <div className="glass-strong rounded-3xl p-6 md:p-10">
            <RegistrationForm
              tiers={tiers}
              preselectedTierId={params.tier}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
