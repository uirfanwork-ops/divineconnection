import Link from "next/link";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Speakers", href: "/#speakers" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
];

export function Header() {
  return (
    <header className="absolute top-0 z-50 w-full">
      <div className="container flex h-20 items-center justify-center">
        <nav className="flex items-center gap-8">
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
      </div>
    </header>
  );
}
