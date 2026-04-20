import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { siteConfig } from "../../../content/site-config";

export function CtaSection() {
  const { cta } = siteConfig;

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="container">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 p-8 md:p-16">
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-grid opacity-10" />
          <div
            className="blob blob-orange absolute h-[500px] w-[500px] opacity-30"
            style={{ top: "-20%", right: "-10%" }}
          />
          <div
            className="blob blob-blue absolute h-[400px] w-[400px] opacity-40"
            style={{ bottom: "-20%", left: "-10%", animationDelay: "5s" }}
          />

          <div className="relative text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-orange-200 backdrop-blur-xl">
              <Sparkles className="h-3 w-3" />
              Limited Spots Available
            </div>
            <h2 className="text-balance text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              {cta.title}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-blue-100">
              {cta.description}
            </p>
            <Link
              href={cta.buttonHref}
              className="btn-glow group mt-10 inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-10 text-base font-semibold text-white transition-all hover:from-orange-600 hover:to-orange-700"
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
