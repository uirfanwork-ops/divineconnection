"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LogoMark } from "./LogoMark";

export function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] w-full overflow-hidden bg-ink text-bone"
    >
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { scale, y }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero/aozat-hero.svg"
          aria-hidden
          className="h-full w-full object-cover"
        >
          <source src="/hero/aozat-hero.mp4" type="video/mp4" />
        </video>
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(139,130,120,0.10) 0%, rgba(31,26,20,0.35) 100%)",
          }}
        />
      </motion.div>

      <div className="relative z-10 flex h-full items-center">
        <div className="container-page w-full">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="max-w-[920px]"
          >
            <div className="flex items-center gap-3 text-amber">
              <LogoMark size={18} />
              <span className="text-[13px] uppercase tracking-[0.32em] text-bone">
                AOZAT
              </span>
            </div>

            <h1 className="text-hero mt-10">
              <span className="block text-bone">Buildings that</span>
              <span className="block italic text-sand">
                earn their ground.
              </span>
            </h1>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1.2, delay: 1.2 }}
        className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-3"
      >
        <span className="text-[11px] uppercase tracking-[0.32em] text-amber">
          Scroll
        </span>
        <span aria-hidden className="block h-10 w-px bg-amber/70" />
      </motion.div>
    </section>
  );
}
