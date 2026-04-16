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
  Heart,
  BookOpen,
  Users,
  Mountain,
  Compass,
  Trophy,
};

export function QualitiesSection() {
  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="container">
        <h2 className="text-center text-3xl font-bold text-foreground md:text-4xl">
          Why Attend?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
          Six reasons this retreat will transform your spiritual journey.
        </p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {qualities.map((quality) => {
            const Icon = iconMap[quality.icon];
            return (
              <div
                key={quality.title}
                className="rounded-lg bg-background p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                {Icon && (
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                )}
                <h3 className="text-xl font-semibold text-foreground">
                  {quality.title}
                </h3>
                <p className="mt-2 text-muted-foreground">
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
