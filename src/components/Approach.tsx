import { Reveal, RevealStagger, RevealItem } from "./Reveal";

const steps = [
  {
    num: "01",
    title: "Discover",
    body: "We sit with the brief. The site, the budget, the lender, and the operator. Nothing is drawn yet.",
  },
  {
    num: "02",
    title: "Drawings",
    body: "We work alongside the architect and consultants on a buildable set. Coordination is the project.",
  },
  {
    num: "03",
    title: "Build",
    body: "One project lead on site from groundbreaking to handover. The schedule is treated like a plan, not a forecast.",
  },
  {
    num: "04",
    title: "Hand off",
    body: "A complete close-out, with the operator walked through every system. We answer the phone after.",
  },
];

export function Approach() {
  return (
    <section className="bg-bone section-pad">
      <div className="container-page">
        <Reveal>
          <p className="text-eyebrow">Approach</p>
          <h2 className="text-h2 mt-6 text-ink">How we work.</h2>
        </Reveal>

        <RevealStagger className="mt-16">
          <ol className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
            {steps.map((step, i) => (
              <RevealItem key={step.num}>
                <li className="relative">
                  {i > 0 && (
                    <span
                      aria-hidden
                      className="absolute -left-4 top-7 hidden h-px w-8 bg-hairline md:block"
                    />
                  )}
                  <div className="font-display text-[56px] leading-none text-clay">
                    {step.num}
                  </div>
                  <h3 className="text-h3 mt-6 text-ink">{step.title}</h3>
                  <p className="mt-4 max-w-[28ch] font-display text-[18px] leading-snug text-ink/80">
                    {step.body}
                  </p>
                </li>
              </RevealItem>
            ))}
          </ol>
        </RevealStagger>
      </div>
    </section>
  );
}
