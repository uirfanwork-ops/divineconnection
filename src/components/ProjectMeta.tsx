import { type Project } from "@/lib/projects";
import { Reveal } from "./Reveal";

const rows: Array<{ key: keyof Project; label: string }> = [
  { key: "location", label: "Location" },
  { key: "year", label: "Year" },
  { key: "scope", label: "Scope" },
  { key: "size", label: "Size" },
  { key: "value", label: "Value" },
];

export function ProjectMeta({ project }: { project: Project }) {
  return (
    <Reveal>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-y border-hairline py-10 md:grid-cols-5">
        {rows.map(({ key, label }) => (
          <div key={key as string}>
            <dt className="text-[11px] uppercase tracking-nav text-mist">
              {label}
            </dt>
            <dd className="mt-3 font-display text-[20px] text-ink">
              {String(project[key])}
            </dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}
