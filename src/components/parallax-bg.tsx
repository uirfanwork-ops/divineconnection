"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface ParallaxBgProps {
  src: string;
  speed?: number;
  overlay?: "dark" | "cream";
}

export function ParallaxBg({ src, speed = 0.3, overlay = "dark" }: ParallaxBgProps) {
  const [offset, setOffset] = useState(0);
  const [elTop, setElTop] = useState(0);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setElTop(ref.getBoundingClientRect().top + window.scrollY);
        }
      },
      { threshold: 0 }
    );
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref]);

  useEffect(() => {
    function handleScroll() {
      setOffset(window.scrollY);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const translate = (offset - elTop) * speed;

  return (
    <div ref={setRef} className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -inset-y-40 inset-x-0"
        style={{ transform: `translateY(${translate}px)` }}
      >
        <Image
          src={src}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          unoptimized
        />
      </div>
      {overlay === "dark" ? (
        <div className="absolute inset-0 bg-[#0a1a0a]/85" />
      ) : (
        <div className="absolute inset-0 bg-[#faf6f0]/90" />
      )}
    </div>
  );
}
