import { schedule } from "../../../content/schedule";
import type { ScheduleEvent } from "../../../content/schedule";

const typeStyles: Record<
  ScheduleEvent["type"],
  { border: string; bg: string; dot: string; label: string }
> = {
  prayer:       { border: "border-l-amber-700",   bg: "bg-amber-900/10",    dot: "bg-amber-700",   label: "Prayer" },
  sh_sulaiman:  { border: "border-l-blue-600",    bg: "bg-blue-900/10",     dot: "bg-blue-600",    label: "Sh. Sulaiman" },
  sh_omar:      { border: "border-l-orange-500",  bg: "bg-orange-900/10",   dot: "bg-orange-500",  label: "Sh. Omar" },
  sh_yusuf:     { border: "border-l-red-500",     bg: "bg-red-900/10",      dot: "bg-red-500",     label: "Sh. Yusuf" },
  sh_sohaib:    { border: "border-l-teal-500",    bg: "bg-teal-900/10",     dot: "bg-teal-500",    label: "Sh. Sohaib" },
  dr_shariq:    { border: "border-l-rose-600",    bg: "bg-rose-900/10",     dot: "bg-rose-600",    label: "Dr. Shariq" },
  meals:        { border: "border-l-green-600",   bg: "bg-green-900/10",    dot: "bg-green-600",   label: "Meals" },
  outdoor:      { border: "border-l-emerald-500", bg: "bg-emerald-900/10",  dot: "bg-emerald-500", label: "Outdoor" },
  break:        { border: "border-l-stone-500",   bg: "bg-stone-800/20",    dot: "bg-stone-500",   label: "Break / Free" },
};

export function ScheduleSection() {
  return (
    <section id="schedule" className="bg-dark py-24 md:py-32">
      <div className="container">
        {/* Header */}
        <div className="text-center">
          <p className="label-gold">Mathabah&apos;s Annual Retreat</p>
          <h2 className="font-heading mt-3 text-4xl font-bold text-[var(--text-primary)] md:text-5xl">
            Divine Connections
          </h2>
          <p className="mt-2 font-heading text-base italic text-[var(--text-muted)]">
            Program Schedule &mdash; August 2026
          </p>
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {Object.entries(typeStyles).map(([key, style]) => (
            <div key={key} className="flex items-center gap-1.5">
              <span className={`h-2.5 w-2.5 rounded-full ${style.dot}`} />
              <span className="text-xs text-[var(--text-muted)]">
                {style.label}
              </span>
            </div>
          ))}
        </div>

        {/* Desktop: 4-column grid */}
        <div className="mt-12 hidden lg:grid lg:grid-cols-4 lg:gap-px lg:bg-[var(--border-subtle)]">
          {schedule.map((day) => (
            <div key={day.date} className="bg-[var(--bg-primary)]">
              {/* Day header */}
              <div className="border-b border-[var(--border-subtle)] p-6 text-center">
                <h3 className="font-heading text-2xl font-bold text-[var(--text-primary)]">
                  {day.dayLabel}
                </h3>
                <p className="mt-0.5 font-heading text-xs italic text-[var(--text-muted)]">
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
                      <p className="text-[10px] font-medium text-[var(--text-muted)]">
                        {event.time}
                      </p>
                      <p
                        className={`text-sm font-semibold ${
                          event.type === "break"
                            ? "text-[var(--text-muted)]"
                            : "text-[var(--text-primary)]"
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
        <div className="mt-12 space-y-8 lg:hidden">
          {schedule.map((day) => (
            <div
              key={day.date}
              className="border border-[var(--border-subtle)] bg-[var(--bg-secondary)]"
            >
              {/* Day header */}
              <div className="border-b border-[var(--border-subtle)] p-5">
                <h3 className="font-heading text-2xl font-bold text-[var(--text-primary)]">
                  {day.dayLabel}
                </h3>
                <p className="mt-0.5 font-heading text-xs italic text-[var(--text-muted)]">
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
                      className={`border-l-[3px] ${style.border} ${style.bg} px-4 py-3`}
                    >
                      <p className="text-[11px] font-medium text-[var(--text-muted)]">
                        {event.time}
                      </p>
                      <p
                        className={`text-sm font-semibold ${
                          event.type === "break"
                            ? "text-[var(--text-muted)]"
                            : "text-[var(--text-primary)]"
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
