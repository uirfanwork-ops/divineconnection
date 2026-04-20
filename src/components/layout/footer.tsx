import Link from "next/link";
import { Mail } from "lucide-react";
import { siteConfig } from "../../../content/site-config";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-primary)] bg-topo">
      <div className="container py-16">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-heading text-2xl font-bold uppercase tracking-wide text-[var(--text-primary)]">
              {siteConfig.shortName}
            </h3>
            <p className="label-gold mt-1 text-[10px]">
              {siteConfig.footer.tagline}
            </p>
            <div className="divider-gold mt-4" />
            <div className="mt-6 space-y-1 text-sm text-[var(--text-secondary)]">
              <p>{siteConfig.retreatDate}</p>
              <p>{siteConfig.retreatVenue}</p>
              <p>{siteConfig.retreatAddress}</p>
            </div>
            <p className="mt-6 text-xs italic text-[var(--text-muted)]">
              &quot;{siteConfig.footer.quranVerse.text}&quot;
              <br />
              ({siteConfig.footer.quranVerse.reference})
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="label-gold text-[10px]">Explore</p>
            <ul className="mt-4 space-y-3">
              {[
                { label: "About", href: "/#about" },
                { label: "Schedule", href: "/#schedule" },
                { label: "Speakers", href: "/#speakers" },
                { label: "Pricing", href: "/#pricing" },
                { label: "Register", href: "/register" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--gold)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + Contact */}
          <div>
            <p className="label-gold text-[10px]">Legal</p>
            <ul className="mt-4 space-y-3">
              {siteConfig.footer.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--gold)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <a
                href={`mailto:${siteConfig.supportEmail}`}
                className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--gold)]"
              >
                <Mail className="h-4 w-4" />
                {siteConfig.supportEmail}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[var(--border-subtle)] pt-8">
          <p className="text-center text-xs uppercase tracking-wider text-[var(--text-muted)]">
            &copy; {currentYear} {siteConfig.footer.copyright}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
