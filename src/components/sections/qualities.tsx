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
    <section className="border-y border-[var(--border-subtle)] bg-dark-alt py-24 md:py-32">
      <div className="container">
        <div className="text-center">
          <p className="label-gold">Why Attend</p>
          <h2 className="font-heading mt-3 text-4xl font-bold uppercase tracking-wide text-[var(--text-primary)] md:text-5xl">
            The Retreat Experience
          </h2>
        </div>

        <div className="mt-16 grid gap-px bg-[var(--border-subtle)] sm:grid-cols-2 lg:grid-cols-3">
          {qualities.map((quality) => {
            const Icon = iconMap[quality.icon];
            return (
              <div
                key={quality.title}
                className="bg-dark-alt p-8 transition-colors hover:bg-[var(--bg-card)]"
              >
                {Icon && (
                  <Icon className="mb-5 h-7 w-7 text-[var(--gold)]" />
                )}
                <h3 className="font-heading text-xl font-semibold uppercase tracking-wide text-[var(--text-primary)]">
                  {quality.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
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
