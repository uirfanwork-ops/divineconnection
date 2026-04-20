import Link from "next/link";
import { Moon } from "lucide-react";
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
    <header className="sticky top-0 z-50 w-full">
      <div className="glass-strong border-b border-white/5">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/20 transition-transform group-hover:scale-110">
              <Moon className="h-4 w-4 text-slate-900" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold leading-tight text-slate-100">
                {siteConfig.shortName}
              </span>
              <span className="hidden text-[10px] font-medium uppercase tracking-wider text-amber-400/80 sm:block">
                {siteConfig.footer.tagline}
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/register"
            className="btn-glow inline-flex h-10 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-5 text-sm font-semibold text-slate-900 transition-all hover:from-amber-400 hover:to-amber-500"
          >
            Register Now
          </Link>
        </div>
      </div>
    </header>
  );
}
