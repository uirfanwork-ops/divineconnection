"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { cdEvent } from "../../../content/contemplating-death";
import { useIsDesktop } from "./motion-kit";

const EASE = [0.22, 1, 0.36, 1] as const;

const rise = {
  hidden: { opacity: 0, y: 34, filter: "blur(12px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const isDesktop = useIsDesktop();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // On phones the mirror lettering has to stay put between the title and the verse.
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", isDesktop ? "14%" : "0%"]
  );
  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, isDesktop ? 1.08 : 1]
  );
  const copyY = useTransform(scrollYProgress, [0, 1], [0, isDesktop ? -70 : 0]);
  const copyOpacity = useTransform(
    scrollYProgress,
    [0, 0.85],
    [1, isDesktop ? 0.15 : 1]
  );

  return (
    <section ref={ref} className="hero on-dark" aria-labelledby="event-title">
      <div className="hero-visual">
        <motion.div
          className="hero-visual-inner"
          style={{ y: imageY, scale: imageScale }}
        >
          <Image
            src="/contemplating-death/mirror.webp"
            alt="A car side mirror reflecting a cemetery at sunset. The mirror reads: objects in mirror are closer than they appear."
            fill
            priority
            sizes="(max-width: 740px) 100vw, 75vw"
          />
        </motion.div>
      </div>
      <div className="shell hero-inner">
        <motion.div
          className="hero-copy"
          style={{ y: copyY, opacity: copyOpacity }}
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.16, delayChildren: 0.25 }}
        >
          <motion.p
            className="eyebrow hero-kicker"
            variants={rise}
            transition={{ duration: 1, ease: EASE }}
          >
            {cdEvent.kicker}
          </motion.p>
          <h1 id="event-title">
            <motion.span
              className="title-first"
              variants={rise}
              transition={{ duration: 1.2, ease: EASE }}
            >
              Contemplating
            </motion.span>{" "}
            <motion.em
              variants={rise}
              transition={{ duration: 1.5, ease: EASE }}
            >
              Death
            </motion.em>
          </h1>
          <motion.figure
            className="verse"
            variants={rise}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <blockquote>{cdEvent.verse}</blockquote>
            <figcaption>{cdEvent.verseReference}</figcaption>
          </motion.figure>
          <motion.div variants={rise} transition={{ duration: 1, ease: EASE }}>
            <a className="button button-gold" href="#register">
              Register for the event
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </a>
          </motion.div>
        </motion.div>
        <a
          className="scroll-cue"
          href="#details"
          aria-label="Scroll to event details"
        >
          <i aria-hidden="true" />
          Scroll
        </a>
      </div>
    </section>
  );
}
