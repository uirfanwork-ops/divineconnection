import { createClient } from "@/lib/supabase/server";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { QualitiesSection } from "@/components/sections/qualities";
import { ScheduleSection } from "@/components/sections/schedule";
import { SpeakersSection } from "@/components/sections/speakers";
import { VenueSection } from "@/components/sections/venue";
import { WhatIsIncludedSection } from "@/components/sections/what-is-included";
import { FaqSection } from "@/components/sections/faq";
import { PricingSection } from "@/components/sections/pricing";
import { CtaSection } from "@/components/sections/cta";
import type { Database } from "@/types/database";

type PricingTier = Database["public"]["Tables"]["pricing_tiers"]["Row"];

const fallbackTiers: PricingTier[] = [
  {
    id: "fallback-economy",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    name: "Economy",
    description:
      "Ideal for students and those seeking an affordable option. Shared dormitory-style accommodation with full access to all sessions.",
    price_cents: 15000,
    currency: "CAD",
    max_spots: 50,
    spots_taken: 0,
    is_active: true,
    sort_order: 1,
    stripe_price_id: null,
    features: [
      "Shared dormitory accommodation (4-6 per room)",
      "All halal meals included",
      "Full access to lectures and workshops",
      "Welcome package",
      "Prayer facilities",
      "Outdoor activities",
      "Post-retreat digital resources",
    ],
  },
  {
    id: "fallback-standard",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    name: "Standard",
    description:
      "Our most popular option. Comfortable shared accommodation with a roommate, perfect for building brotherhood.",
    price_cents: 25000,
    currency: "CAD",
    max_spots: 60,
    spots_taken: 0,
    is_active: true,
    sort_order: 2,
    stripe_price_id: null,
    features: [
      "Shared room (2 per room)",
      "All halal meals included",
      "Full access to lectures and workshops",
      "Welcome package with premium items",
      "Prayer facilities",
      "Outdoor activities",
      "Networking sessions",
      "Post-retreat digital resources",
    ],
  },
  {
    id: "fallback-premium",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    name: "Premium",
    description:
      "For those who prefer privacy and extra comfort. Private room with the best views and additional perks.",
    price_cents: 40000,
    currency: "CAD",
    max_spots: 40,
    spots_taken: 0,
    is_active: true,
    sort_order: 3,
    stripe_price_id: null,
    features: [
      "Private room with mountain view",
      "All halal meals included",
      "Full access to lectures and workshops",
      "Premium welcome package",
      "Prayer facilities",
      "Outdoor activities",
      "Exclusive Q&A session with speakers",
      "Networking sessions",
      "Post-retreat digital resources",
      "Priority check-in",
    ],
  },
];

async function getPricingTiers(): Promise<PricingTier[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("pricing_tiers")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("Failed to fetch pricing tiers:", error.message);
      return fallbackTiers;
    }

    return data.length > 0 ? data : fallbackTiers;
  } catch {
    return fallbackTiers;
  }
}

export const revalidate = 60;

export default async function HomePage() {
  const tiers = await getPricingTiers();

  return (
    <>
      <HeroSection />
      <AboutSection />
      <QualitiesSection />
      <ScheduleSection />
      <SpeakersSection />
      <VenueSection />
      <WhatIsIncludedSection />
      <FaqSection />
      <PricingSection tiers={tiers} />
      <CtaSection />
    </>
  );
}
