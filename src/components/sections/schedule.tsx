import { MapPin, User } from "lucide-react";
import { schedule } from "../../../content/schedule";
import type { ScheduleEvent } from "../../../content/schedule";

const typeColors: Record<ScheduleEvent["type"], string> = {
  lecture: "text-[var(--gold)]",
  workshop: "text-purple-400",
  prayer: "text-emerald-400",
  meal: "text-amber-400",
  activity: "text-sky-400",
  break: "text-[var(--text-muted)]",
  ceremony: "text-rose-400",
};

const typeLabels: Record<ScheduleEvent["type"], string> = {
  lecture: "Lecture",
  workshop: "Workshop",
  prayer: "Prayer",
  meal: "Meal",
  activity: "Activity",
  break: "Break",
  ceremony: "Ceremony",
};

export function ScheduleSection() {
  return (
    <section id="schedule" className="bg-topo bg-dark py-24 md:py-32">
      <div className="container">
        <div className="text-center">
          <p className="label-gold">Four Day Schedule</p>
          <h2 className="font-heading mt-3 text-4xl font-bold uppercase tracking-wide text-[var(--text-primary)] md:text-5xl">
            Your Weekend, Hour by Hour
          </h2>
        </div>

        <div className="mt-16 space-y-12">
          {schedule.map((day, dayIndex) => (
            <div key={day.date}>
              {/* Day header */}
              <div className="mb-6 flex flex-col gap-3 border-b border-[var(--border-color)] pb-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center border border-[var(--gold)] font-heading text-xl font-bold text-[var(--gold)]">
                    {dayIndex + 1}
                  </span>
                  <div>
                    <p className="label-gold text-[10px]">{day.dayLabel}</p>
                    <h3 className="font-heading text-2xl font-bold uppercase tracking-wide text-[var(--text-primary)]">
                      {day.title}
                    </h3>
                  </div>
                </div>
                <p className="text-xs uppercase tracking-[0.15em] text-[var(--text-muted)]">
                  {new Date(day.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>

              {/* Events table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <tbody>
                    {day.events.map((event, idx) => (
                      <tr
                        key={idx}
                        className="group border-b border-[var(--border-subtle)] transition-colors hover:bg-[var(--bg-secondary)]"
                      >
                        <td className="w-28 whitespace-nowrap py-4 pr-4 align-top">
                          <span className="text-sm font-semibold text-[var(--gold)]">
                            {event.time}
                          </span>
                        </td>
                        <td className="py-4 pr-4">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-heading text-base font-semibold text-[var(--text-primary)]">
                              {event.title}
                            </h4>
                            <span
                              className={`text-[10px] font-semibold uppercase tracking-widest ${typeColors[event.type]}`}
                            >
                              {typeLabels[event.type]}
                            </span>
                          </div>
                          {event.description && (
                            <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                              {event.description}
                            </p>
                          )}
                          <div className="mt-1.5 flex flex-wrap gap-4 text-[11px] text-[var(--text-muted)]">
                            {event.speaker && (
                              <span className="inline-flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {event.speaker}
                              </span>
                            )}
                            {event.location && (
                              <span className="inline-flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {event.location}
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
