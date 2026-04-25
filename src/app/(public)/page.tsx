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

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <GalleryMarquee />
      <AboutSection />
      <QualitiesSection />
      <SpeakersSection />
      <VenueSection />
      <WhatIsIncludedSection />
      <FaqSection />
      <PricingSection />
      <CtaSection />
    </>
  );
}
