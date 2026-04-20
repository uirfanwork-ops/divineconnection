import Link from "next/link";
import { Calendar, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { siteConfig } from "../../../content/site-config";

export function HeroSection() {
  const { hero, retreatDate, retreatVenue, retreatCity } = siteConfig;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="blob blob-blue h-[500px] w-[500px]"
          style={{ top: "-10%", left: "-10%" }}
        />
        <div
          className="blob blob-orange h-[400px] w-[400px]"
          style={{ top: "20%", right: "-10%", animationDelay: "4s" }}
        />
        <div
          className="blob blob-blue h-[350px] w-[350px]"
          style={{ bottom: "-10%", left: "30%", animationDelay: "8s" }}
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-60" />

      <div className="container relative z-10 py-20 md:py-32 lg:py-40">
        <div className="mx-auto max-w-4xl text-center">
          {/* Date badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full glass px-5 py-2 text-sm font-medium text-blue-900 animate-fade-in-up">
            <Sparkles className="h-4 w-4 text-orange-500" />
            <span>{retreatDate}</span>
            <span className="h-1 w-1 rounded-full bg-orange-400" />
            <span>{retreatVenue}</span>
          </div>

          {/* Main heading */}
          <h1
            className="text-balance text-5xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl md:text-7xl lg:text-8xl animate-fade-in-up"
            style={{ animationDelay: "0.1s", opacity: 0 }}
          >
            <span className="block">{hero.title}</span>
            <span className="mt-2 block gradient-orange">
              {hero.subtitle}
            </span>
          </h1>

          <p
            className="mx-auto mt-8 max-w-2xl text-balance text-lg leading-relaxed text-slate-600 sm:text-xl animate-fade-in-up"
            style={{ animationDelay: "0.2s", opacity: 0 }}
          >
            {hero.description}
          </p>

          {/* CTA buttons */}
          <div
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up"
            style={{ animationDelay: "0.3s", opacity: 0 }}
          >
            <Link
              href={hero.ctaHref}
              className="btn-glow group inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-8 text-base font-semibold text-white transition-all hover:from-orange-600 hover:to-orange-700"
            >
              {hero.ctaText}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={hero.secondaryCtaHref}
              className="glass-strong inline-flex h-14 items-center justify-center rounded-xl px-8 text-base font-semibold text-blue-900 transition-all hover:bg-white/90"
            >
              {hero.secondaryCtaText}
            </Link>
          </div>

          {/* Info badges */}
          <div
            className="mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.4s", opacity: 0 }}
          >
            <div className="glass rounded-2xl p-5 text-left">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <Calendar className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Dates
                  </p>
                  <p className="text-sm font-semibold text-slate-900">
                    {retreatDate}
                  </p>
                </div>
              </div>
            </div>
            <div className="glass rounded-2xl p-5 text-left">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                  <MapPin className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Location
                  </p>
                  <p className="text-sm font-semibold text-slate-900">
                    {retreatCity}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
