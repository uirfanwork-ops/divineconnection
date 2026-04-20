import { siteConfig } from "../../../content/site-config";

export function AboutSection() {
  const { about } = siteConfig;

  return (
    <section id="about" className="bg-topo bg-dark py-24 md:py-32">
      <div className="container">
        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <p className="label-gold">{siteConfig.organizerName}</p>
            <h2 className="font-heading mt-3 text-4xl font-bold uppercase tracking-wide text-[var(--text-primary)] md:text-5xl">
              {about.title}
            </h2>
          </div>
          <div className="space-y-6">
            {about.description.map((paragraph, index) => (
              <p
                key={index}
                className="text-base leading-relaxed text-[var(--text-secondary)]"
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
