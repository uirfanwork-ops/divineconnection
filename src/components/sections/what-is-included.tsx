import {
  Bed, UtensilsCrossed, GraduationCap, Gift, Moon, Trees, Handshake, Monitor,
} from "lucide-react";
import { whatIsIncluded } from "../../../content/what-is-included";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Bed, UtensilsCrossed, GraduationCap, Gift, Moon, Trees, Handshake, Monitor,
};

const iconStyles = [
  "from-amber-400 to-amber-600 shadow-amber-500/30",
  "from-emerald-400 to-emerald-600 shadow-emerald-500/30",
  "from-blue-400 to-blue-600 shadow-blue-500/30",
  "from-purple-400 to-purple-600 shadow-purple-500/30",
  "from-teal-400 to-teal-600 shadow-teal-500/30",
  "from-rose-400 to-rose-600 shadow-rose-500/30",
  "from-sky-400 to-sky-600 shadow-sky-500/30",
  "from-indigo-400 to-indigo-600 shadow-indigo-500/30",
];

export function WhatIsIncludedSection() {
  return (
    <section className="starfield relative overflow-hidden py-20 md:py-28 bg-gradient-to-b from-slate-950 via-indigo-950/30 to-slate-950">
      <div className="nebula nebula-gold h-[500px] w-[500px]" style={{ top: "-10%", right: "5%" }} />
      <div className="nebula nebula-blue h-[400px] w-[400px]" style={{ bottom: "5%", left: "-5%", animationDelay: "12s" }} />

      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <Gift className="h-3 w-3" />
              What Is Included
            </span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-slate-100 md:text-5xl">
            Everything you need,{" "}
            <span className="gradient-text-gold">taken care of</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whatIsIncluded.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <div key={item.title} className="glass-card group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
                {Icon && (
                  <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${iconStyles[index]} shadow-lg`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                )}
                <h3 className="text-lg font-bold text-slate-100">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
