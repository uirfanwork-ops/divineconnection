"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { faq } from "../../../content/faq";
import { cn } from "@/lib/utils";

export function FaqSection() {
  return (
    <section id="faq" className="relative py-20 md:py-28 bg-constellation">
      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-400">
              <HelpCircle className="h-3 w-3" />
              Questions
            </span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-slate-100 md:text-5xl">
            Frequently Asked{" "}
            <span className="gradient-text-sky">Questions</span>
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
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
    <div className={cn(
      "glass-card overflow-hidden rounded-2xl transition-all duration-200",
      isOpen && "ring-1 ring-amber-500/30"
    )}>
      <button
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-base font-semibold text-slate-200">{question}</span>
        <div className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-200",
          isOpen ? "bg-amber-500 text-slate-900" : "bg-white/5 text-slate-400"
        )}>
          <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")} />
        </div>
      </button>
      <div className={cn(
        "grid transition-all duration-200 ease-in-out",
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      )}>
        <div className="overflow-hidden">
          <p className="border-t border-white/5 px-6 py-5 leading-relaxed text-slate-400">{answer}</p>
        </div>
      </div>
    </div>
  );
}
