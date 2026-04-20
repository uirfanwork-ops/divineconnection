import Link from "next/link";
import { Sparkles } from "lucide-react";
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
      <div className="glass-strong border-b border-white/30">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="group flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg shadow-blue-500/30 transition-transform group-hover:scale-110">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold leading-tight text-blue-900">
                {siteConfig.shortName}
              </span>
              <span className="hidden text-[10px] font-medium uppercase tracking-wider text-orange-600 sm:block">
                {siteConfig.footer.tagline}
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/register"
            className="btn-glow relative inline-flex h-10 items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-5 text-sm font-semibold text-white transition-all hover:from-orange-600 hover:to-orange-700"
          >
            Register Now
          </Link>
        </div>
      </div>
    </header>
  );
}
