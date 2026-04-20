import Link from "next/link";
import { Calendar, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { siteConfig } from "../../../content/site-config";

export function HeroSection() {
  const { hero, retreatDate, retreatVenue, retreatCity } = siteConfig;

  return (
    <section className="starfield relative overflow-hidden bg-gradient-to-b from-slate-950 via-blue-950/50 to-slate-950">
      {/* Nebula effects */}
      <div
        className="nebula nebula-blue h-[600px] w-[600px]"
        style={{ top: "-20%", left: "-15%" }}
      />
      <div
        className="nebula nebula-purple h-[500px] w-[500px]"
        style={{ top: "10%", right: "-15%", animationDelay: "10s" }}
      />
      <div
        className="nebula nebula-teal h-[400px] w-[400px]"
        style={{ bottom: "-10%", left: "20%", animationDelay: "20s" }}
      />

      <div className="container relative z-10 py-24 md:py-36 lg:py-44">
        <div className="mx-auto max-w-4xl text-center">
          {/* Floating badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-medium text-slate-300 animate-fade-in-up">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span>{retreatDate}</span>
            <span className="h-1 w-1 rounded-full bg-amber-400" />
            <span>{retreatVenue}</span>
          </div>

          {/* Title */}
          <h1
            className="text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl animate-fade-in-up"
            style={{ animationDelay: "0.1s", opacity: 0 }}
          >
            <span className="block text-slate-100">{hero.title}</span>
            <span className="mt-2 block gradient-text-gold">
              {hero.subtitle}
            </span>
          </h1>

          <p
            className="mx-auto mt-8 max-w-2xl text-balance text-lg leading-relaxed text-slate-400 sm:text-xl animate-fade-in-up"
            style={{ animationDelay: "0.2s", opacity: 0 }}
          >
            {hero.description}
          </p>

          {/* CTAs */}
          <div
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up"
            style={{ animationDelay: "0.3s", opacity: 0 }}
          >
            <Link
              href={hero.ctaHref}
              className="btn-glow group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-8 text-base font-semibold text-slate-900 transition-all hover:from-amber-400 hover:to-amber-500"
            >
              {hero.ctaText}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={hero.secondaryCtaHref}
              className="glass inline-flex h-14 items-center justify-center rounded-full px-8 text-base font-semibold text-slate-200 transition-all hover:bg-white/10"
            >
              {hero.secondaryCtaText}
            </Link>
          </div>

          {/* Info badges */}
          <div
            className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.4s", opacity: 0 }}
          >
            <div className="glass-glow-blue rounded-2xl p-5 text-left">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20">
                  <Calendar className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                    Dates
                  </p>
                  <p className="text-sm font-semibold text-slate-200">
                    {retreatDate}
                  </p>
                </div>
              </div>
            </div>
            <div className="glass-glow-gold rounded-2xl p-5 text-left">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20">
                  <MapPin className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                    Location
                  </p>
                  <p className="text-sm font-semibold text-slate-200">
                    {retreatCity}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
