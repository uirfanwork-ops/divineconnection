import { siteConfig } from "../../../content/site-config";

export function AboutSection() {
  const { about } = siteConfig;

  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-900">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              About the Retreat
            </span>
          </div>
          <h2 className="text-center text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            {about.title}
          </h2>
          <div className="mt-10 space-y-6">
            {about.description.map((paragraph, index) => (
              <p
                key={index}
                className="text-lg leading-relaxed text-slate-600"
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
