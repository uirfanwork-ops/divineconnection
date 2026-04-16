import Link from "next/link";
import { siteConfig } from "../../../content/site-config";

export function CtaSection() {
  const { cta } = siteConfig;

  return (
    <section className="bg-primary py-16 text-primary-foreground md:py-24">
      <div className="container text-center">
        <h2 className="text-3xl font-bold md:text-4xl">{cta.title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg opacity-90">
          {cta.description}
        </p>
        <Link
          href={cta.buttonHref}
          className="mt-8 inline-flex h-12 items-center justify-center rounded-md bg-secondary px-8 text-base font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90"
        >
          {cta.buttonText}
        </Link>
      </div>
    </section>
  );
}
