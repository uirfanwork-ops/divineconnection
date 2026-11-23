"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ScrollProgress } from "./motion-kit";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="site-header on-dark" data-scrolled={scrolled}>
      <div className="shell header-inner">
        <a
          className="wordmark"
          href="#top"
          aria-label="Mathabah Learning Centre, back to top"
        >
          <Image
            src="/contemplating-death/mathabah-logo.png"
            width={190}
            height={83}
            alt=""
            priority
          />
        </a>
        <nav aria-label="Main navigation">
          <a className="nav-secondary" href="#speakers">
            Speakers
          </a>
          <a className="nav-secondary" href="#schedule">
            Schedule
          </a>
          <a className="nav-secondary" href="#details">
            Event details
          </a>
          <a className="nav-register" href="#register">
            Register
          </a>
        </nav>
      </div>
      <ScrollProgress />
    </header>
  );
}
