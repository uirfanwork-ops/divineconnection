import { createClient } from "@/lib/supabase/server";
import { RegistrationForm } from "@/components/registration-form";
import { siteConfig } from "../../../../content/site-config";
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

const fallbackTiers: PricingTier[] = [
  {
    id: "00000000-0000-0000-0000-000000000001", created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    name: "Economy", description: "Shared dormitory-style cabin, full access to all sessions, all meals included.",
    price_cents: 15000, currency: "CAD", max_spots: 50, spots_taken: 0, is_active: true, sort_order: 1, stripe_price_id: null, features: [],
  },
  {
    id: "00000000-0000-0000-0000-000000000002", created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    name: "Standard", description: "Shared cabin (2 per room), all halal meals, full access to lectures and workshops.",
    price_cents: 25000, currency: "CAD", max_spots: 60, spots_taken: 0, is_active: true, sort_order: 2, stripe_price_id: null, features: [],
  },
  {
    id: "00000000-0000-0000-0000-000000000003", created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    name: "Premium", description: "Private cabin, priority check-in, all meals, exclusive Q&A session with speakers.",
    price_cents: 40000, currency: "CAD", max_spots: 40, spots_taken: 0, is_active: true, sort_order: 3, stripe_price_id: null, features: [],
  },
];

async function loadTiers(): Promise<PricingTier[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("pricing_tiers").select("*").eq("is_active", true).order("sort_order", { ascending: true });
    if (error || !data || data.length === 0) return fallbackTiers;
    return data;
  } catch {
    return fallbackTiers;
  }
}

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const params = await searchParams;
  const tiers = await loadTiers();

  return (
    <div className="bg-[#f5f0e8] py-16 md:py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#8b7355]">
              Registration
            </p>
            <h1 className="font-heading mt-3 text-4xl font-bold uppercase tracking-wide text-[#1a1a1a] md:text-5xl">
              Secure Your Spot
            </h1>
            <p className="mt-4 text-sm uppercase tracking-[0.15em] text-[#6b6560]">
              {siteConfig.retreatDate} | {siteConfig.retreatVenue}
            </p>
            <p className="mt-1 text-xs text-[#8b7355]">
              {siteConfig.retreatAddress}
            </p>
            <div className="mx-auto mt-6 flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-[#c9a84c]" />
              <div className="h-2 w-2 rotate-45 border border-[#c9a84c]" />
              <div className="h-px w-12 bg-[#c9a84c]" />
            </div>
            <p className="mt-4 text-sm text-[#6b6560]">
              Fields marked with <span className="font-semibold text-[#c9a84c]">*</span> are required.
            </p>
          </div>

          <div className="border border-[#e0d5c5] bg-[#faf6f0] p-6 md:p-10">
            <RegistrationForm tiers={tiers} preselectedTierId={params.tier} mode="light" />
          </div>
        </div>
      </div>
    </div>
  );
}
