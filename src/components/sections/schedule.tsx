import { schedule } from "../../../content/schedule";
import type { ScheduleEvent } from "../../../content/schedule";

const typeStyles: Record<
  ScheduleEvent["type"],
  { border: string; bg: string; dot: string; label: string }
> = {
  prayer:       { border: "border-l-amber-700",   bg: "bg-amber-100/60",   dot: "bg-amber-700",   label: "Prayer" },
  sh_sulaiman:  { border: "border-l-blue-600",    bg: "bg-blue-100/60",    dot: "bg-blue-600",    label: "Sh. Sulaiman" },
  sh_omar:      { border: "border-l-orange-500",  bg: "bg-orange-100/60",  dot: "bg-orange-500",  label: "Sh. Omar" },
  sh_yusuf:     { border: "border-l-red-500",     bg: "bg-red-100/60",     dot: "bg-red-500",     label: "Sh. Yusuf" },
  sh_sohaib:    { border: "border-l-teal-500",    bg: "bg-teal-100/60",    dot: "bg-teal-500",    label: "Sh. Sohaib" },
  dr_shariq:    { border: "border-l-rose-600",    bg: "bg-rose-100/60",    dot: "bg-rose-600",    label: "Dr. Shariq" },
  meals:        { border: "border-l-green-600",   bg: "bg-green-100/60",   dot: "bg-green-600",   label: "Meals" },
  outdoor:      { border: "border-l-emerald-500", bg: "bg-emerald-100/60", dot: "bg-emerald-500", label: "Outdoor" },
  break:        { border: "border-l-stone-400",   bg: "bg-stone-200/50",   dot: "bg-stone-400",   label: "Break / Free" },
};

export function ScheduleSection() {
  return (
    <section id="schedule" className="bg-[#f5f0e8] py-24 md:py-32">
      <div className="container">
        {/* Header */}
        <div className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#8b7355]">
            Mathabah&apos;s Annual Retreat
          </p>
          <h2 className="font-heading mt-3 text-4xl font-bold text-[#1a1a1a] md:text-5xl">
            Divine Connections
          </h2>
          <p className="mt-2 font-heading text-base italic text-[#8b7355]">
            Program Schedule &mdash; August 2026
          </p>
          <div className="mx-auto mt-4 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-[#c9a84c]" />
            <div className="h-2 w-2 rotate-45 border border-[#c9a84c]" />
            <div className="h-px w-12 bg-[#c9a84c]" />
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {Object.entries(typeStyles).map(([key, style]) => (
            <div key={key} className="flex items-center gap-1.5">
              <span className={`h-2.5 w-2.5 rounded-full ${style.dot}`} />
              <span className="text-xs text-[#6b6560]">{style.label}</span>
            </div>
          ))}
        </div>

        {/* Desktop: 4-column grid */}
        <div className="mt-12 hidden overflow-hidden border border-[#e0d5c5] lg:grid lg:grid-cols-4">
          {schedule.map((day, colIdx) => (
            <div
              key={day.date}
              className={`bg-[#faf6f0] ${colIdx < 3 ? "border-r border-[#e0d5c5]" : ""}`}
            >
              {/* Day header */}
              <div className="border-b border-[#e0d5c5] bg-[#f5f0e8] p-6 text-center">
                <h3 className="font-heading text-2xl font-bold text-[#1a1a1a]">
                  {day.dayLabel}
                </h3>
                <p className="mt-0.5 font-heading text-xs italic text-[#8b7355]">
                  {day.subtitle}
                </p>
              </div>

              {/* Events */}
              <div className="space-y-1.5 p-3">
                {day.events.map((event, idx) => {
                  const style = typeStyles[event.type];
                  return (
                    <div
                      key={idx}
                      className={`border-l-[3px] ${style.border} ${style.bg} px-3 py-2.5`}
                    >
                      <p className="text-[10px] font-medium text-[#8b7355]">
                        {event.time}
                      </p>
                      <p
                        className={`text-sm font-semibold ${
                          event.type === "break"
                            ? "text-[#8b7355]"
                            : "text-[#1a1a1a]"
                        }`}
                      >
                        {event.title}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: stacked day cards */}
        <div className="mt-12 space-y-6 lg:hidden">
          {schedule.map((day) => (
            <div
              key={day.date}
              className="border border-[#e0d5c5] bg-[#faf6f0]"
            >
              <div className="border-b border-[#e0d5c5] bg-[#f5f0e8] p-5">
                <h3 className="font-heading text-2xl font-bold text-[#1a1a1a]">
                  {day.dayLabel}
                </h3>
                <p className="mt-0.5 font-heading text-xs italic text-[#8b7355]">
                  {day.subtitle}
                </p>
              </div>

              <div className="space-y-1.5 p-3">
                {day.events.map((event, idx) => {
                  const style = typeStyles[event.type];
                  return (
                    <div
                      key={idx}
                      className={`border-l-[3px] ${style.border} ${style.bg} px-4 py-3`}
                    >
                      <p className="text-[11px] font-medium text-[#8b7355]">
                        {event.time}
                      </p>
                      <p
                        className={`text-sm font-semibold ${
                          event.type === "break"
                            ? "text-[#8b7355]"
                            : "text-[#1a1a1a]"
                        }`}
                      >
                        {event.title}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
