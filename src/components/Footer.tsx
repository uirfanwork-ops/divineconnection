import Link from "next/link";
import { LogoMark } from "./LogoMark";

export function Footer() {
  return (
    <footer className="bg-ink text-bone">
      <div className="container-page pt-20 pb-12">
        <div className="hairline-amber w-full" />

        <div className="grid grid-cols-1 gap-12 pt-12 md:grid-cols-3">
          <div>
            <p className="text-eyebrow-amber">Studio</p>
            <p className="mt-4 font-display text-[24px] leading-snug text-bone">
              Etobicoke, Ontario
            </p>
            <p className="mt-2 text-caption text-mist">
              Working across the Greater Toronto Area.
            </p>
          </div>

          <div>
            <p className="text-eyebrow-amber">Contact</p>
            <ul className="mt-4 space-y-2 text-body text-bone/85">
              <li>
                <a
                  href="mailto:info@aozat.com"
                  className="link-underline hover:text-amber"
                >
                  info@aozat.com
                </a>
              </li>
              <li>
                <a
                  href="mailto:sales@aozat.com"
                  className="link-underline hover:text-amber"
                >
                  sales@aozat.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+14165551234"
                  className="link-underline hover:text-amber"
                >
                  +1 416 555 1234
                </a>
              </li>
              <li>
                <a
                  href="https://aozatgc.com"
                  className="link-underline hover:text-amber"
                >
                  aozatgc.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-eyebrow-amber">Connected</p>
            <ul className="mt-4 space-y-2 text-body text-bone/85">
              <li>
                <a href="#" className="link-underline hover:text-amber">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="link-underline hover:text-amber">
                  Instagram
                </a>
              </li>
              <li>
                <Link href="/privacy" className="link-underline hover:text-amber">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="link-underline hover:text-amber">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-24 flex justify-center text-amber" aria-hidden>
          <LogoMark size={320} className="opacity-[0.14]" />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 text-[11px] uppercase tracking-nav text-mist md:flex-row">
          <p>&copy; {new Date().getFullYear()} Aozat General Contractors</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <li>COR Certified</li>
            <li>WSIB Cleared</li>
            <li>Ontario License 1234567</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
