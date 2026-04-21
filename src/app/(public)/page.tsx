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

const sharedFeatures = [
  "Shared dormitory accommodation (4-6 per room)",
  "All halal meals included",
  "Full access to lectures and workshops",
  "Welcome package",
  "Prayer facilities",
  "Outdoor activities",
  "Post-retreat digital resources",
];

const fallbackTiers: PricingTier[] = [
  {
    id: "fallback-earlybird",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    name: "Early Bird",
    description:
      "Early bird registrations receive a FREE PRINT poster of the Ibaadur Rahman verses (limited time offer!). Available until July 13th, 2026.",
    price_cents: 47500,
    currency: "CAD",
    max_spots: null,
    spots_taken: 0,
    is_active: true,
    sort_order: 1,
    stripe_price_id: null,
    features: [
      "FREE Ibaadur Rahman verses print poster",
      ...sharedFeatures,
    ],
  },
  {
    id: "fallback-regular",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    name: "Regular",
    description:
      "Standard registration for the Divine Connections retreat. Full access to all sessions, meals, and activities.",
    price_cents: 55000,
    currency: "CAD",
    max_spots: null,
    spots_taken: 0,
    is_active: true,
    sort_order: 2,
    stripe_price_id: null,
    features: sharedFeatures,
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
