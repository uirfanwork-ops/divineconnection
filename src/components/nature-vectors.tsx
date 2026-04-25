"use client";

import { useEffect, useState } from "react";

function GeometricPattern({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,5 61,35 95,35 68,55 79,85 50,68 21,85 32,55 5,35 39,35" stroke="currentColor" strokeWidth="0.6" fill="none" />
      <polygon points="50,20 57,38 77,38 61,50 67,68 50,58 33,68 39,50 23,38 43,38" stroke="currentColor" strokeWidth="0.4" fill="none" />
    </svg>
  );
}

function ArabesqueArch({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 120" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M10 120V50C10 25 25 10 40 10C55 10 70 25 70 50V120" stroke="currentColor" strokeWidth="0.7" fill="none" />
      <path d="M20 120V55C20 35 30 20 40 20C50 20 60 35 60 55V120" stroke="currentColor" strokeWidth="0.4" fill="none" />
      <circle cx="40" cy="45" r="8" stroke="currentColor" strokeWidth="0.4" fill="none" />
      <path d="M32 45L40 37L48 45L40 53Z" stroke="currentColor" strokeWidth="0.3" fill="none" />
    </svg>
  );
}

function OrnateLeaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 120" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M40 5C20 25 5 50 10 85C15 95 25 100 40 100C55 100 65 95 70 85C75 50 60 25 40 5Z" stroke="currentColor" strokeWidth="0.6" fill="none" />
      <path d="M40 15V95" stroke="currentColor" strokeWidth="0.4" />
      <path d="M40 30C30 35 22 45 20 55" stroke="currentColor" strokeWidth="0.3" />
      <path d="M40 30C50 35 58 45 60 55" stroke="currentColor" strokeWidth="0.3" />
      <path d="M40 45C30 50 24 58 22 68" stroke="currentColor" strokeWidth="0.3" />
      <path d="M40 45C50 50 56 58 58 68" stroke="currentColor" strokeWidth="0.3" />
      <path d="M40 60C32 64 26 72 25 80" stroke="currentColor" strokeWidth="0.3" />
      <path d="M40 60C48 64 54 72 55 80" stroke="currentColor" strokeWidth="0.3" />
    </svg>
  );
}

function CrescentMoon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M40 5C22 5 8 19 8 37C8 50 16 55 30 55C38 55 44 50 48 42C35 42 25 33 25 22C25 14 30 8 40 5Z" stroke="currentColor" strokeWidth="0.6" fill="none" />
      <circle cx="44" cy="12" r="2" stroke="currentColor" strokeWidth="0.4" fill="none" />
    </svg>
  );
}

function OrnateTree({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 70 130" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M35 10L15 45H25L10 75H22L5 105H65L48 75H60L45 45H55L35 10Z" stroke="currentColor" strokeWidth="0.6" fill="none" />
      <line x1="35" y1="105" x2="35" y2="125" stroke="currentColor" strokeWidth="0.8" />
      <path d="M28 115C28 115 35 110 42 115" stroke="currentColor" strokeWidth="0.4" />
      <circle cx="35" cy="35" r="3" stroke="currentColor" strokeWidth="0.3" fill="none" />
      <circle cx="28" cy="60" r="2" stroke="currentColor" strokeWidth="0.3" fill="none" />
      <circle cx="42" cy="55" r="2" stroke="currentColor" strokeWidth="0.3" fill="none" />
    </svg>
  );
}

function MountainRange({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 70" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M0 65L20 30L35 42L50 15L65 38L80 22L100 45L115 25L140 65" stroke="currentColor" strokeWidth="0.6" fill="none" />
      <path d="M45 20L50 15L55 20" stroke="currentColor" strokeWidth="0.3" />
      <path d="M75 27L80 22L85 27" stroke="currentColor" strokeWidth="0.3" />
    </svg>
  );
}

interface FloatingElement {
  id: number;
  Component: React.ComponentType<{ className?: string }>;
  side: "left" | "right";
  top: string;
  offset: string;
  size: string;
  speed: number;
}

const elements: FloatingElement[] = [
  { id: 1, Component: OrnateLeaf, side: "left", top: "5%", offset: "2%", size: "w-16", speed: 0.15 },
  { id: 2, Component: GeometricPattern, side: "right", top: "8%", offset: "3%", size: "w-14", speed: 0.2 },
  { id: 3, Component: CrescentMoon, side: "left", top: "18%", offset: "1%", size: "w-12", speed: 0.25 },
  { id: 4, Component: ArabesqueArch, side: "right", top: "22%", offset: "1%", size: "w-10", speed: 0.12 },
  { id: 5, Component: OrnateTree, side: "left", top: "32%", offset: "3%", size: "w-12", speed: 0.18 },
  { id: 6, Component: GeometricPattern, side: "right", top: "38%", offset: "2%", size: "w-10", speed: 0.22 },
  { id: 7, Component: MountainRange, side: "left", top: "48%", offset: "1%", size: "w-20", speed: 0.1 },
  { id: 8, Component: CrescentMoon, side: "right", top: "52%", offset: "2%", size: "w-10", speed: 0.28 },
  { id: 9, Component: OrnateLeaf, side: "right", top: "62%", offset: "1%", size: "w-14", speed: 0.15 },
  { id: 10, Component: ArabesqueArch, side: "left", top: "65%", offset: "2%", size: "w-12", speed: 0.2 },
  { id: 11, Component: OrnateTree, side: "right", top: "75%", offset: "3%", size: "w-10", speed: 0.16 },
  { id: 12, Component: GeometricPattern, side: "left", top: "80%", offset: "1%", size: "w-12", speed: 0.22 },
  { id: 13, Component: MountainRange, side: "right", top: "88%", offset: "1%", size: "w-18", speed: 0.12 },
  { id: 14, Component: CrescentMoon, side: "left", top: "92%", offset: "3%", size: "w-10", speed: 0.3 },
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
    <div className="pointer-events-none fixed inset-0 z-30 hidden overflow-hidden lg:block">
      {elements.map((el) => {
        const parallax = scrollY * el.speed * -0.3;
        const rotation = scrollY * el.speed * 0.02;
        const positionStyle = el.side === "left"
          ? { left: el.offset }
          : { right: el.offset };

        return (
          <div
            key={el.id}
            className="absolute"
            style={{
              ...positionStyle,
              top: el.top,
              transform: `translateY(${parallax}px) rotate(${rotation}deg)`,
            }}
          >
            <el.Component
              className={`${el.size} text-[var(--gold)] opacity-[0.06]`}
            />
          </div>
        );
      })}
    </div>
  );
}
