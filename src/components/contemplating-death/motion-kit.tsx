"use client";

import { useEffect, useRef, useState } from "react";
import {
  MotionConfig,
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Honours the visitor's reduced-motion setting for every animation below it. */
export function MotionRoot({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export function useIsDesktop(minWidth = 741): boolean {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const query = window.matchMedia(`(min-width: ${minWidth}px)`);
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [minWidth]);
  return isDesktop;
}

type RevealTag = "div" | "li" | "article" | "p" | "h2" | "figure";

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 28,
  blur = false,
  className,
}: {
  children: React.ReactNode;
  as?: RevealTag;
  delay?: number;
  y?: number;
  blur?: boolean;
  className?: string;
}) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, filter: blur ? "blur(10px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.95, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

function ScrubWord({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span className="scrub-word" style={{ opacity }}>
      {word}
    </motion.span>
  );
}

/** Heading whose words light up one by one as the visitor scrolls through it. */
export function ScrubHeading({ text, id }: { text: string; id?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 88%", "start 38%"],
  });
  const words = text.split(" ");

  return (
    <h2 ref={ref} id={id} aria-label={text}>
      {words.map((word, index) => {
        const start = index / words.length;
        const end = Math.min(1, start + 2.2 / words.length);
        return (
          <span key={`${word}-${index}`} aria-hidden="true">
            <ScrubWord
              word={word}
              progress={scrollYProgress}
              range={[start, end]}
            />
            {index < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </h2>
  );
}

/** Background layer that drifts slower than the page for a sense of depth. */
export function ParallaxLayer({
  className,
  distance = 9,
}: {
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${distance}%`, `${distance}%`]
  );
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y }}
      aria-hidden="true"
    />
  );
}

/** Thin gold line under the header showing how far down the page the visitor is. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.4,
  });
  return (
    <motion.span
      className="scroll-progress"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}

/** Vertical rail that draws itself as the visitor scrolls down the schedule. */
export function TimelineRail({
  targetRef,
}: {
  targetRef: React.RefObject<HTMLElement>;
}) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 72%", "end 62%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.5,
  });
  return (
    <div className="timeline-rail" aria-hidden="true">
      <motion.span style={{ scaleY }} />
    </div>
  );
}
