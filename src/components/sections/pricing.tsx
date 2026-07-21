import Link from "next/link";
import { Check } from "lucide-react";
import { ParallaxBg } from "@/components/parallax-bg";

const features = [
  "FREE ʿIbād ur Raḥmān verses print poster",
  "Shared dormitory accommodation (4-6 per room)",
  "All halal meals included",
  "Full access to lectures and workshops",
  "Welcome package",
  "Prayer facilities",
  "Outdoor activities",
  "Post-retreat digital resources",
];

export function PricingSection() {
  return (
    <section id="pricing" className="relative overflow-hidden py-24 md:py-32">
      <ParallaxBg src="/gallery/10.jpg" overlay="dark" speed={0.2} />

      <div className="container relative z-10">
        <div className="text-center">
          <p className="label-gold">Pricing</p>
          <h2 className="font-heading mt-3 text-4xl font-bold uppercase tracking-wide text-[var(--text-primary)] md:text-5xl">
            Registration
          </h2>
        </div>

        <div className="mx-auto mt-16 max-w-lg">
          <div className="relative flex flex-col border border-[#c9a84c] bg-white p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#c9a84c]">Registration</p>
            <div className="mt-3 flex items-baseline">
              <span className="font-heading text-5xl font-bold text-[#1a1a1a]">$475</span>
              <span className="ml-2 text-xs uppercase tracking-wider text-[#999]">CAD</span>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-[#555]">
              All-inclusive registration for the Divine Connections retreat. Includes accommodation, meals, sessions, and activities.
            </p>

            <div className="mt-4 rounded-md border border-red-300 bg-red-50 p-3 text-xs leading-relaxed text-red-800">
              <strong className="block font-bold uppercase tracking-wide">Sisters&apos; Accommodations Sold Out</strong>
              <span className="mt-1 block">
                All sisters&apos; accommodations are at capacity and have been sold out. Please only fill out the form if you would like to be placed on the waitlist. We apologise for any inconvenience.
              </span>
            </div>

            <div className="my-6 h-px w-16 bg-[#c9a84c] opacity-50" />

            <ul className="mb-8 flex-1 space-y-3">
              {features.map((feature) => {
                const isFreeGift = feature.includes("ʿIbād ur Raḥmān") || feature.toLowerCase().includes("free");
                return (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-[#555]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#c9a84c]" />
                    <span className={isFreeGift ? "font-bold text-[#c9a84c]" : ""}>{feature}</span>
                  </li>
                );
              })}
            </ul>

            <Link
              href="/register"
              className="inline-flex w-full items-center justify-center border border-[#c9a84c] bg-[#c9a84c] py-3 text-xs font-medium uppercase tracking-[0.15em] text-white transition-all hover:bg-[#b08930]"
            >
              Register Now
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
