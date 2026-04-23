import {
  Heart,
  BookOpen,
  Users,
  Mountain,
  Compass,
  Trophy,
} from "lucide-react";
import { qualities } from "../../../content/qualities";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart, BookOpen, Users, Mountain, Compass, Trophy,
};

export function QualitiesSection() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="container">
        <div className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#8b7355]">Why Attend</p>
          <h2 className="font-heading mt-3 text-4xl font-bold uppercase tracking-wide text-[#1a1a1a] md:text-5xl">
            The Retreat Experience
          </h2>
        </div>

        <div className="mt-16 grid gap-px bg-[#e0d5c5] sm:grid-cols-2 lg:grid-cols-3">
          {qualities.map((quality) => {
            const Icon = iconMap[quality.icon];
            return (
              <div
                key={quality.title}
                className="bg-[#faf6f0] p-8 transition-colors hover:bg-white"
              >
                {Icon && (
                  <Icon className="mb-5 h-7 w-7 text-[#c9a84c]" />
                )}
                <h3 className="font-heading text-xl font-semibold uppercase tracking-wide text-[#1a1a1a]">
                  {quality.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#4a4540]">
                  {quality.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
