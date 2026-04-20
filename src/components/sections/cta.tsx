import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { siteConfig } from "../../../content/site-config";

export function CtaSection() {
  const { cta } = siteConfig;

  return (
    <section className="relative py-20 md:py-28 bg-constellation">
      <div className="container">
        <div className="starfield relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-900/60 via-indigo-900/40 to-purple-900/30 p-8 md:p-16">
          {/* Nebula effects */}
          <div className="nebula nebula-gold h-[500px] w-[500px]" style={{ top: "-30%", right: "-10%" }} />
          <div className="nebula nebula-teal h-[400px] w-[400px]" style={{ bottom: "-30%", left: "-10%", animationDelay: "8s" }} />

          <div className="relative text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <Sparkles className="h-3 w-3" />
              Limited Spots Available
            </div>
            <h2 className="text-balance text-4xl font-bold tracking-tight text-slate-100 md:text-5xl lg:text-6xl">
              {cta.title}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-slate-400">
              {cta.description}
            </p>
            <Link
              href={cta.buttonHref}
              className="btn-glow group mt-10 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-10 text-base font-semibold text-slate-900 transition-all hover:from-amber-400 hover:to-amber-500"
            >
              {cta.buttonText}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
