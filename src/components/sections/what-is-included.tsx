import {
  Bed,
  UtensilsCrossed,
  GraduationCap,
  Gift,
  Moon,
  Trees,
  Handshake,
  Monitor,
} from "lucide-react";
import { whatIsIncluded } from "../../../content/what-is-included";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Bed,
  UtensilsCrossed,
  GraduationCap,
  Gift,
  Moon,
  Trees,
  Handshake,
  Monitor,
};

export function WhatIsIncludedSection() {
  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="container">
        <h2 className="text-center text-3xl font-bold text-foreground md:text-4xl">
          What Is Included
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
          Everything you need for a transformative weekend is taken care of.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whatIsIncluded.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <div
                key={item.title}
                className="rounded-lg bg-background p-6 shadow-sm"
              >
                {Icon && (
                  <Icon className="mb-3 h-8 w-8 text-primary" />
                )}
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
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
