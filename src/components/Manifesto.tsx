import { Reveal } from "./Reveal";

export function Manifesto() {
  return (
    <section className="bg-bone section-pad">
      <div className="container-page grid grid-cols-12 gap-x-8 gap-y-10">
        <Reveal className="col-span-12 md:col-span-3">
          <p className="text-eyebrow">Manifesto</p>
        </Reveal>

        <Reveal
          delay={0.05}
          className="col-span-12 md:col-span-9 max-w-prose space-y-8 text-body-lg text-ink"
        >
          <p>
            Aozat is a general contractor for{" "}
            <span className="italic text-clay">
              commercial, industrial, and multi-unit
            </span>{" "}
            developers across the GTA. We work in the slow craft of permits,
            drawings, and disciplined sites. No shortcuts. No theatrics.
          </p>
          <p>
            A site is a long argument with weather, drawings, and trades. We
            keep the argument{" "}
            <span className="italic text-clay">honest and on schedule</span>,
            and we keep one person responsible for it from groundbreaking to
            handover.
          </p>
          <p>
            Our work is held to a single standard, whether it is a sixty seat
            restaurant in Yorkville or a hundred and eighty thousand square foot
            industrial shell in Scarborough.{" "}
            <span className="italic text-clay">
              Buildings should earn their ground.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
