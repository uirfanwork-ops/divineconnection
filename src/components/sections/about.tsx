import { Trees } from "lucide-react";
import { siteConfig } from "../../../content/site-config";

export function AboutSection() {
  const { about } = siteConfig;

  return (
    <section id="about" className="relative py-20 md:py-28 bg-constellation">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <Trees className="h-3 w-3" />
              About the Retreat
            </span>
          </div>
          <h2 className="text-center text-4xl font-bold tracking-tight text-slate-100 md:text-5xl">
            {about.title}
          </h2>
          <div className="mt-10 space-y-6">
            {about.description.map((paragraph, index) => (
              <p
                key={index}
                className="text-lg leading-relaxed text-slate-400"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
