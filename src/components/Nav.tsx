"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { LogoMark } from "./LogoMark";

const links = [
  { href: "/work", label: "Work" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/studio", label: "Studio" },
  { href: "/journal", label: "Journal" },
  { href: "/inquire", label: "Inquire" },
];

type Variant = "overlay" | "solid";

export function Nav({ variant = "overlay" }: { variant?: Variant }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 24);
    handle();
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onLight = variant === "solid" || scrolled;
  const markColor = onLight ? "text-clay" : "text-amber";
  const textColor = onLight ? "text-ink" : "text-bone";

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          onLight
            ? "bg-bone/95 backdrop-blur-md border-b border-hairline"
            : "bg-transparent",
        )}
      >
        <div className="container-page flex items-center justify-between py-5 md:py-6">
          <Link
            href="/"
            aria-label="Aozat home"
            className={clsx(
              "flex items-center gap-3 transition-colors duration-300",
              markColor,
            )}
          >
            <LogoMark size={32} />
            <span
              className={clsx(
                "font-display text-[22px] leading-none tracking-wordmark",
                textColor,
              )}
            >
              AOZAT
            </span>
          </Link>

          <nav
            className={clsx(
              "hidden items-center gap-7 md:flex",
              textColor,
            )}
            aria-label="Primary"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] uppercase tracking-nav transition-colors duration-300 hover:text-clay"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className={clsx(
              "md:hidden text-[11px] uppercase tracking-nav",
              textColor,
            )}
          >
            Menu
          </button>
        </div>
      </header>

      <div
        className={clsx(
          "fixed inset-0 z-[60] bg-ink text-bone transition-opacity duration-500 md:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <div className="container-page flex items-center justify-between py-5">
          <Link
            href="/"
            aria-label="Aozat home"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 text-amber"
          >
            <LogoMark size={32} />
            <span className="font-display text-[22px] leading-none tracking-wordmark text-bone">
              AOZAT
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="text-[11px] uppercase tracking-nav text-amber"
          >
            Close
          </button>
        </div>

        <nav
          className="container-page mt-16 flex flex-col gap-6"
          aria-label="Mobile primary"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-display text-[40px] leading-none text-bone transition-colors duration-300 hover:text-amber"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="container-page mt-auto pb-10 pt-16">
          <p className="text-eyebrow-amber">Etobicoke, Ontario</p>
          <a
            href="mailto:info@aozat.com"
            className="mt-3 inline-block font-display text-[22px] text-bone"
          >
            info@aozat.com
          </a>
        </div>
      </div>
    </>
  );
}
