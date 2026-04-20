import Link from "next/link";
import { Sparkles, Mail } from "lucide-react";
import { siteConfig } from "../../../content/site-config";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-950 to-slate-950" />
      <div
        className="blob blob-blue absolute h-[400px] w-[400px] opacity-20"
        style={{ top: "-20%", left: "-10%" }}
      />
      <div
        className="blob blob-orange absolute h-[300px] w-[300px] opacity-15"
        style={{ bottom: "-20%", right: "-10%", animationDelay: "6s" }}
      />

      <div className="container relative py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white">
                  {siteConfig.shortName}
                </h3>
                <p className="text-xs text-orange-300">
                  {siteConfig.footer.tagline}
                </p>
              </div>
            </div>
            <p className="mt-6 text-sm text-slate-400">
              A transformative Islamic retreat experience dedicated to
              nurturing the spiritual growth of Muslim men.
            </p>
            <div className="mt-6 space-y-1 text-sm text-slate-400">
              <p>
                <span className="font-medium text-slate-300">Dates:</span>{" "}
                {siteConfig.retreatDate}
              </p>
              <p>
                <span className="font-medium text-slate-300">Venue:</span>{" "}
                {siteConfig.retreatVenue}
              </p>
              <p>
                <span className="font-medium text-slate-300">Location:</span>{" "}
                {siteConfig.retreatCity}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-orange-300">
              Explore
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/#about"
                  className="text-sm text-slate-300 transition-colors hover:text-orange-400"
                >
                  About the Retreat
                </Link>
              </li>
              <li>
                <Link
                  href="/#schedule"
                  className="text-sm text-slate-300 transition-colors hover:text-orange-400"
                >
                  Schedule
                </Link>
              </li>
              <li>
                <Link
                  href="/#speakers"
                  className="text-sm text-slate-300 transition-colors hover:text-orange-400"
                >
                  Speakers
                </Link>
              </li>
              <li>
                <Link
                  href="/#pricing"
                  className="text-sm text-slate-300 transition-colors hover:text-orange-400"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-sm font-medium text-orange-400 transition-colors hover:text-orange-300"
                >
                  Register Now
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-orange-300">
              Legal
            </h4>
            <ul className="mt-4 space-y-3">
              {siteConfig.footer.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 transition-colors hover:text-orange-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-orange-300">
                Contact
              </h4>
              <a
                href={`mailto:${siteConfig.supportEmail}`}
                className="mt-3 inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-orange-400"
              >
                <Mail className="h-4 w-4" />
                {siteConfig.supportEmail}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-center text-sm text-slate-500">
            &copy; {currentYear} {siteConfig.footer.copyright}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
