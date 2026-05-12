"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function StudioTeaser() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1.12]);

  return (
    <section
      ref={ref}
      className="relative h-[80vh] min-h-[640px] w-full overflow-hidden bg-ink text-bone"
    >
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { scale }}
      >
        <Image
          src="/studio/studio-teaser.svg"
          alt="Aozat site team reviewing drawings against a poured concrete wall."
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(31,26,20,0.20) 0%, rgba(31,26,20,0.55) 100%)",
          }}
        />
      </motion.div>

      <div className="relative z-10 flex h-full items-center">
        <div className="container-page w-full">
          <div className="mx-auto max-w-[920px] text-center">
            <p className="text-eyebrow-amber">Studio</p>
            <p className="text-h2 mt-8 text-bone">
              We measure ourselves against the quietest{" "}
              <span className="italic text-sand">buildings we have built</span>,
              and against the ones we have not built yet.
            </p>
            <Link
              href="/studio"
              className="link-underline mt-10 inline-block text-[11px] uppercase tracking-nav text-amber"
              data-cursor="link"
            >
              Read the story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
