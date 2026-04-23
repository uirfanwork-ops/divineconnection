"use client";

import { useEffect, useState } from "react";

export function LeafSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M40 5C20 25 5 50 10 80C15 90 25 95 40 95C55 95 65 90 70 80C75 50 60 25 40 5Z" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M40 20V90" stroke="currentColor" strokeWidth="0.5" />
      <path d="M40 40L25 55" stroke="currentColor" strokeWidth="0.5" />
      <path d="M40 50L55 65" stroke="currentColor" strokeWidth="0.5" />
      <path d="M40 60L28 72" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  );
}

export function TreeSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 120" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M30 5L10 45H22L8 75H20L5 105H55L40 75H52L38 45H50L30 5Z" stroke="currentColor" strokeWidth="1" fill="none" />
      <line x1="30" y1="105" x2="30" y2="120" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function MountainSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 60" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M0 60L30 15L45 30L60 5L80 35L95 20L120 60" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  );
}

export function StarSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M20 2L24 14L37 14L27 22L30 35L20 27L10 35L13 22L3 14L16 14Z" stroke="currentColor" strokeWidth="0.8" fill="none" />
    </svg>
  );
}

export function CrescentSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 50 60" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M35 5C20 5 8 17 8 32C8 47 20 59 35 59C25 55 18 44 18 32C18 20 25 9 35 5Z" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  );
}

interface FloatingElement {
  id: number;
  Component: React.ComponentType<{ className?: string }>;
  x: string;
  y: string;
  size: string;
  delay: number;
  speed: number;
}

const elements: FloatingElement[] = [
  { id: 1, Component: LeafSvg, x: "3%", y: "8%", size: "w-28", delay: 0, speed: 0.3 },
  { id: 2, Component: TreeSvg, x: "88%", y: "15%", size: "w-20", delay: 2, speed: 0.2 },
  { id: 3, Component: StarSvg, x: "12%", y: "35%", size: "w-14", delay: 1, speed: 0.4 },
  { id: 4, Component: MountainSvg, x: "75%", y: "45%", size: "w-40", delay: 3, speed: 0.15 },
  { id: 5, Component: CrescentSvg, x: "45%", y: "5%", size: "w-20", delay: 0.5, speed: 0.25 },
  { id: 6, Component: LeafSvg, x: "90%", y: "60%", size: "w-24", delay: 1.5, speed: 0.35 },
  { id: 7, Component: StarSvg, x: "65%", y: "75%", size: "w-12", delay: 4, speed: 0.45 },
  { id: 8, Component: TreeSvg, x: "5%", y: "55%", size: "w-16", delay: 2.5, speed: 0.2 },
  { id: 9, Component: CrescentSvg, x: "30%", y: "80%", size: "w-18", delay: 3.5, speed: 0.3 },
  { id: 10, Component: LeafSvg, x: "55%", y: "25%", size: "w-20", delay: 1, speed: 0.25 },
  { id: 11, Component: MountainSvg, x: "15%", y: "70%", size: "w-32", delay: 2, speed: 0.18 },
  { id: 12, Component: TreeSvg, x: "78%", y: "90%", size: "w-14", delay: 1, speed: 0.22 },
  { id: 13, Component: StarSvg, x: "40%", y: "50%", size: "w-10", delay: 3, speed: 0.35 },
  { id: 14, Component: CrescentSvg, x: "85%", y: "30%", size: "w-16", delay: 0, speed: 0.28 },
];

export function FloatingNatureVectors() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    function handleScroll() {
      setScrollY(window.scrollY);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {elements.map((el) => {
        const translateY = scrollY * el.speed * -0.5;
        return (
          <div
            key={el.id}
            className="absolute"
            style={{
              left: el.x,
              top: el.y,
              transform: `translateY(${translateY}px) rotate(${scrollY * el.speed * 0.05}deg)`,
              transition: "transform 0.1s linear",
            }}
          >
            <el.Component
              className={`${el.size} text-[var(--gold)] opacity-[0.12]`}
            />
          </div>
        );
      })}
    </div>
  );
}
