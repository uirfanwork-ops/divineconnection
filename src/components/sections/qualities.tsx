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
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white" />
      <div
        className="blob blob-blue absolute h-[400px] w-[400px] opacity-20"
        style={{ top: "10%", right: "-10%" }}
      />
      <div
        className="blob blob-orange absolute h-[300px] w-[300px] opacity-20"
        style={{ bottom: "10%", left: "-10%", animationDelay: "6s" }}
      />

      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-orange-900">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              Why Attend
            </span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Six reasons this retreat will{" "}
            <span className="gradient-text">transform you</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {qualities.map((quality, index) => {
            const Icon = iconMap[quality.icon];
            const isOrange = index % 2 === 1;
            return (
              <div
                key={quality.title}
                className="group relative rounded-2xl glass-strong p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {Icon && (
                  <div
                    className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${
                      isOrange
                        ? "bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg shadow-orange-500/30"
                        : "bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-500/30"
                    }`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                )}
                <h3 className="text-xl font-bold text-slate-900">
                  {quality.title}
                </h3>
                <p className="mt-3 leading-relaxed text-slate-600">
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
