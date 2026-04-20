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

const iconStyles = [
  "from-blue-400 to-blue-600 shadow-blue-500/30",
  "from-amber-400 to-amber-600 shadow-amber-500/30",
  "from-emerald-400 to-emerald-600 shadow-emerald-500/30",
  "from-purple-400 to-purple-600 shadow-purple-500/30",
  "from-teal-400 to-teal-600 shadow-teal-500/30",
  "from-rose-400 to-rose-600 shadow-rose-500/30",
];

export function QualitiesSection() {
  return (
    <section className="starfield relative overflow-hidden py-20 md:py-28 bg-gradient-to-b from-slate-950/50 via-blue-950/20 to-slate-950/50">
      <div
        className="nebula nebula-teal h-[400px] w-[400px]"
        style={{ top: "10%", right: "-10%" }}
      />

      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <Mountain className="h-3 w-3" />
              Why Attend
            </span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-slate-100 md:text-5xl">
            Six reasons to{" "}
            <span className="gradient-text-gold">transform your journey</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {qualities.map((quality, index) => {
            const Icon = iconMap[quality.icon];
            return (
              <div
                key={quality.title}
                className="glass-card group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
              >
                {Icon && (
                  <div
                    className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${iconStyles[index]} shadow-lg`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                )}
                <h3 className="text-xl font-bold text-slate-100">
                  {quality.title}
                </h3>
                <p className="mt-3 leading-relaxed text-slate-400">
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
