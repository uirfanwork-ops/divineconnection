import {
  Bed, UtensilsCrossed, GraduationCap, Gift, Moon, Trees, Handshake, Monitor,
} from "lucide-react";
import { whatIsIncluded } from "../../../content/what-is-included";
import { ParallaxBg } from "@/components/parallax-bg";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Bed, UtensilsCrossed, GraduationCap, Gift, Moon, Trees, Handshake, Monitor,
};

export function WhatIsIncludedSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <ParallaxBg src="/gallery/07.jpg" overlay="dark" speed={0.2} />

      <div className="container relative z-10">
        <div className="text-center">
          <p className="label-gold">What Is Included</p>
          <h2 className="font-heading mt-3 text-4xl font-bold uppercase tracking-wide text-[var(--text-primary)] md:text-5xl">
            Everything Taken Care Of
          </h2>
        </div>

        <div className="mt-16 grid gap-px bg-[var(--border-subtle)] sm:grid-cols-2 lg:grid-cols-4">
          {whatIsIncluded.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <div key={item.title} className="bg-[#0a1a0a]/80 p-8 backdrop-blur-sm">
                {Icon && <Icon className="mb-4 h-7 w-7 text-[var(--gold)]" />}
                <h3 className="font-heading text-base font-semibold uppercase tracking-wide text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
