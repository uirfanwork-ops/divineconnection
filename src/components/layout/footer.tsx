import Link from "next/link";
import { siteConfig } from "../../../content/site-config";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-foreground text-background">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-bold">{siteConfig.shortName}</h3>
            <p className="mt-1 text-sm opacity-80">
              {siteConfig.footer.tagline}
            </p>
            <p className="mt-4 text-sm opacity-60">
              {siteConfig.retreatDate}
            </p>
            <p className="text-sm opacity-60">{siteConfig.retreatVenue}</p>
            <p className="text-sm opacity-60">{siteConfig.retreatCity}</p>
          </div>

          <div>
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="#about"
                  className="text-sm opacity-70 transition-opacity hover:opacity-100"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#schedule"
                  className="text-sm opacity-70 transition-opacity hover:opacity-100"
                >
                  Schedule
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-sm opacity-70 transition-opacity hover:opacity-100"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-sm opacity-70 transition-opacity hover:opacity-100"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Policies</h4>
            <ul className="mt-3 space-y-2">
              {siteConfig.footer.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-70 transition-opacity hover:opacity-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <a
                href={`mailto:${siteConfig.supportEmail}`}
                className="text-sm opacity-70 transition-opacity hover:opacity-100"
              >
                {siteConfig.supportEmail}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-background/20 pt-8 text-center text-sm opacity-60">
          &copy; {currentYear} {siteConfig.footer.copyright}. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
