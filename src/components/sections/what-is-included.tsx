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
    <section className="relative overflow-hidden bg-slate-900 py-20 md:py-28">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />
      <div
        className="blob blob-blue absolute h-[500px] w-[500px] opacity-30"
        style={{ top: "-10%", left: "10%" }}
      />
      <div
        className="blob blob-orange absolute h-[400px] w-[400px] opacity-20"
        style={{ bottom: "10%", right: "10%", animationDelay: "5s" }}
      />

      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
              What Is Included
            </span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Everything you need,{" "}
            <span className="gradient-orange">taken care of</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whatIsIncluded.map((item, index) => {
            const Icon = iconMap[item.icon];
            const isOrange = index % 3 === 0;
            return (
              <div
                key={item.title}
                className="glass-dark group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
              >
                {Icon && (
                  <div
                    className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${
                      isOrange
                        ? "bg-gradient-to-br from-orange-400 to-orange-600"
                        : "bg-gradient-to-br from-blue-400 to-blue-600"
                    }`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                )}
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
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
