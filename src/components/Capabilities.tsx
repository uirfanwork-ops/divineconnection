import Link from "next/link";
import { Reveal, RevealStagger, RevealItem } from "./Reveal";

const items = [
  { num: "01", title: "Commercial buildout" },
  { num: "02", title: "Industrial construction" },
  { num: "03", title: "Multi-unit residential, CMHC fluent" },
  { num: "04", title: "Tenant fit-outs and restaurants" },
  { num: "05", title: "Pre-construction and tender support" },
];

export function Capabilities() {
  return (
    <section className="bg-mistBone section-pad">
      <div className="container-page grid grid-cols-12 gap-x-8 gap-y-10">
        <Reveal className="col-span-12 md:col-span-3">
          <p className="text-eyebrow">Capabilities</p>
          <h2 className="text-h2 mt-6 text-ink">What we build.</h2>
        </Reveal>

        <RevealStagger className="col-span-12 md:col-span-9">
          <ul>
            {items.map((item, i) => (
              <RevealItem key={item.num}>
                <li
                  className={`group flex items-baseline justify-between gap-6 px-2 py-7 transition-colors duration-300 hover:bg-bone ${
                    i === 0 ? "border-t border-hairline" : ""
                  } border-b border-hairline`}
                >
                  <span className="font-display text-[24px] leading-tight text-ink transition-colors duration-300 group-hover:text-clay">
                    {item.title}
                  </span>
                  <span className="text-[11px] uppercase tracking-nav text-clay">
                    {item.num}
                  </span>
                </li>
              </RevealItem>
            ))}
          </ul>
          <div className="mt-10">
            <Link
              href="/capabilities"
              className="link-underline text-[11px] uppercase tracking-nav text-clay"
              data-cursor="link"
            >
              Full capabilities
            </Link>
          </div>
        </RevealStagger>
      </div>
    </section>
  );
}
