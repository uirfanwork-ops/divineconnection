import Link from "next/link";
import { Moon, Mail } from "lucide-react";
import { siteConfig } from "../../../content/site-config";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="starfield relative overflow-hidden border-t border-white/5 bg-gradient-to-b from-slate-950 via-blue-950/20 to-slate-950">
      <div className="container relative py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/20">
                <Moon className="h-4 w-4 text-slate-900" />
              </div>
              <div>
                <h3 className="font-bold text-slate-100">{siteConfig.shortName}</h3>
                <p className="text-xs text-amber-400/80">{siteConfig.footer.tagline}</p>
              </div>
            </div>
            <div className="mt-6 space-y-1 text-sm text-slate-500">
              <p><span className="text-slate-400">Dates:</span> {siteConfig.retreatDate}</p>
              <p><span className="text-slate-400">Venue:</span> {siteConfig.retreatVenue}</p>
              <p><span className="text-slate-400">Location:</span> {siteConfig.retreatCity}</p>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-widest text-amber-400/60">Explore</h4>
            <ul className="mt-4 space-y-3">
              {[
                { label: "About", href: "/#about" },
                { label: "Schedule", href: "/#schedule" },
                { label: "Speakers", href: "/#speakers" },
                { label: "Pricing", href: "/#pricing" },
                { label: "Register", href: "/register" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 transition-colors hover:text-amber-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-widest text-amber-400/60">Legal</h4>
            <ul className="mt-4 space-y-3">
              {siteConfig.footer.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 transition-colors hover:text-amber-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <a
                href={`mailto:${siteConfig.supportEmail}`}
                className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-amber-400"
              >
                <Mail className="h-4 w-4" />
                {siteConfig.supportEmail}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-8">
          <p className="text-center text-sm text-slate-600">
            &copy; {currentYear} {siteConfig.footer.copyright}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
