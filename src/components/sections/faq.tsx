"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faq } from "../../../content/faq";
import { cn } from "@/lib/utils";
import { ParallaxBg } from "@/components/parallax-bg";

export function FaqSection() {
  return (
    <section id="faq" className="relative overflow-hidden py-24 md:py-32">
      <ParallaxBg src="/gallery/05.jpg" overlay="cream" speed={0.15} />

      <div className="container relative z-10">
        <div className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#8b7355]">Questions</p>
          <h2 className="font-heading mt-3 text-4xl font-bold uppercase tracking-wide text-[#1a1a1a] md:text-5xl">
            Frequently Asked
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-px border border-[#e0d5c5]">
          {faq.map((item, index) => (
            <FaqItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#faf6f0]/90 backdrop-blur-sm">
      <button
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-[#f5f0e8]/90"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-base font-medium text-[#1a1a1a]">
          {question}
        </span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-[#c9a84c] transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-200 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="border-t border-[#e0d5c5] px-6 py-5 text-sm leading-relaxed text-[#4a4540]">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
