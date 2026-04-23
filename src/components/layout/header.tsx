import Link from "next/link";
import { siteConfig } from "../../../content/site-config";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Speakers", href: "/#speakers" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
];

export function Header() {
  return (
    <header className="absolute top-0 z-50 w-full">
      <div className="container flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 flex-col">
          <span className="font-heading text-base font-bold tracking-wide text-[var(--text-primary)] sm:text-xl">
            {siteConfig.shortName.toUpperCase()}
          </span>
          <span className="label-gold -mt-0.5 text-[8px]">
            {siteConfig.footer.tagline}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
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

        <Link
          href="/register"
          className="btn-outline-gold shrink-0 px-4 py-2 text-[10px] sm:px-6 sm:py-3 sm:text-xs"
        >
          Register Now
        </Link>
      </div>
    </header>
  );
}
