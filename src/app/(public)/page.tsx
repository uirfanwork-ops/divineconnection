import { HeroSection } from "@/components/sections/hero";
import { GalleryMarquee } from "@/components/sections/gallery-marquee";
import { AboutSection } from "@/components/sections/about";
import { QualitiesSection } from "@/components/sections/qualities";
import { SpeakersSection } from "@/components/sections/speakers";
import { VenueSection } from "@/components/sections/venue";
import { WhatIsIncludedSection } from "@/components/sections/what-is-included";
import { FaqSection } from "@/components/sections/faq";
import { PricingSection } from "@/components/sections/pricing";
import { CtaSection } from "@/components/sections/cta";
import { getSpeakers } from "@/lib/speakers";

export default async function HomePage() {
  const speakers = await getSpeakers();

  return (
    <>
      <HeroSection />
      <AboutSection />
      <GalleryMarquee />
      <QualitiesSection />
      <SpeakersSection speakers={speakers} />
      <VenueSection />
      <WhatIsIncludedSection />
      <FaqSection />
      <PricingSection />
      <CtaSection />
    </>
  );
}
