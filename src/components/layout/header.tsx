import Link from "next/link";
import { siteConfig } from "../../../content/site-config";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Schedule", href: "/#schedule" },
  { label: "Speakers", href: "/#speakers" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
];

export function Header() {
  return (
    <header className="absolute top-0 z-50 w-full">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex flex-col">
          <span className="font-heading text-xl font-bold tracking-wide text-[var(--text-primary)]">
            {siteConfig.shortName.toUpperCase()}
          </span>
          <span className="label-gold -mt-0.5 text-[8px]">
            {siteConfig.footer.tagline}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--text-secondary)] transition-colors hover:text-[var(--gold)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/register" className="btn-outline-gold">
          Register Now
        </Link>
      </div>
    </header>
  );
}
