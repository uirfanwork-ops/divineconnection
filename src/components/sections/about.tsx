import { siteConfig } from "../../../content/site-config";

export function AboutSection() {
  const { about } = siteConfig;

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold text-foreground md:text-4xl">
            {about.title}
          </h2>
          <div className="mt-8 space-y-6">
            {about.description.map((paragraph, index) => (
              <p
                key={index}
                className="text-lg leading-relaxed text-muted-foreground"
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
