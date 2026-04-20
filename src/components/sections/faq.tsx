"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { faq } from "../../../content/faq";
import { cn } from "@/lib/utils";

export function FaqSection() {
  return (
    <section id="faq" className="relative py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white" />

      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-orange-900">
              <HelpCircle className="h-3 w-3" />
              Questions
            </span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Frequently Asked{" "}
            <span className="gradient-text">Questions</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Everything you need to know before you register.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {faq.map((item, index) => (
            <FaqItem
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cn(
        "glass-strong overflow-hidden rounded-2xl transition-all duration-200",
        isOpen && "ring-2 ring-orange-500/30"
      )}
    >
      <button
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-base font-semibold text-slate-900">
          {question}
        </span>
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-200",
            isOpen ? "bg-orange-500 text-white" : "bg-blue-50 text-blue-700"
          )}
        >
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </div>
      </button>
      <div
        className={cn(
          "grid transition-all duration-200 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="border-t border-slate-100 px-6 py-5 leading-relaxed text-slate-600">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
