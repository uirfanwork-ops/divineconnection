import { siteConfig } from "../../../content/site-config";

export function AboutSection() {
  const { about } = siteConfig;

  return (
    <section id="about" className="relative overflow-hidden bg-dark-green py-24 md:py-32">
      {/* Bottom-right image with edge gradients */}
      <div className="pointer-events-none absolute bottom-0 right-0 hidden h-[70%] w-[40%] md:block">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-95"
          style={{ backgroundImage: "url('/gallery/03.jpg')" }}
        />
        {/* Gradient blending on all edges */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1a0a] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a0a] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1a0a] via-[#0a1a0a]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#0a1a0a]/30 to-transparent" />
      </div>

      <div className="container relative">
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
