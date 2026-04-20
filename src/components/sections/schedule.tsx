import { Clock, MapPin, User } from "lucide-react";
import { schedule } from "../../../content/schedule";
import type { ScheduleEvent } from "../../../content/schedule";

const typeStyles: Record<
  ScheduleEvent["type"],
  { bg: string; text: string; dot: string; label: string }
> = {
  lecture: { bg: "bg-blue-500/15", text: "text-blue-300", dot: "bg-blue-400", label: "Lecture" },
  workshop: { bg: "bg-purple-500/15", text: "text-purple-300", dot: "bg-purple-400", label: "Workshop" },
  prayer: { bg: "bg-emerald-500/15", text: "text-emerald-300", dot: "bg-emerald-400", label: "Prayer" },
  meal: { bg: "bg-amber-500/15", text: "text-amber-300", dot: "bg-amber-400", label: "Meal" },
  activity: { bg: "bg-sky-500/15", text: "text-sky-300", dot: "bg-sky-400", label: "Activity" },
  break: { bg: "bg-slate-500/15", text: "text-slate-400", dot: "bg-slate-500", label: "Break" },
  ceremony: { bg: "bg-rose-500/15", text: "text-rose-300", dot: "bg-rose-400", label: "Ceremony" },
};

export function ScheduleSection() {
  return (
    <section id="schedule" className="relative py-20 md:py-28 bg-constellation">
      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-400">
              <Clock className="h-3 w-3" />
              Three Day Schedule
            </span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-slate-100 md:text-5xl">
            Your weekend,{" "}
            <span className="gradient-text-sky">hour by hour</span>
          </h2>
        </div>

        {/* Legend */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {(Object.keys(typeStyles) as Array<keyof typeof typeStyles>).map((type) => (
            <span
              key={type}
              className={`inline-flex items-center gap-1.5 rounded-full ${typeStyles[type].bg} ${typeStyles[type].text} px-3 py-1 text-xs font-medium`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${typeStyles[type].dot}`} />
              {typeStyles[type].label}
            </span>
          ))}
        </div>

        <div className="mt-12 space-y-8">
          {schedule.map((day, dayIndex) => (
            <div key={day.date} className="glass-strong overflow-hidden rounded-3xl">
              {/* Day header */}
              <div className="starfield relative border-b border-white/5 bg-gradient-to-r from-blue-900/60 via-indigo-900/40 to-purple-900/30 p-6">
                <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/20 backdrop-blur-xl border border-amber-500/30">
                      <span className="text-xl font-bold text-amber-400">{dayIndex + 1}</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-amber-400/80">{day.dayLabel}</p>
                      <h3 className="text-2xl font-bold text-slate-100">{day.title}</h3>
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-2 backdrop-blur-xl">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Date</p>
                    <p className="text-sm font-semibold text-slate-200">
                      {new Date(day.date).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Desktop table */}
              <div className="hidden md:block">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/[0.02]">
                      <th className="w-32 px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-widest text-slate-500">Time</th>
                      <th className="px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-widest text-slate-500">Session</th>
                      <th className="w-32 px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-widest text-slate-500">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {day.events.map((event, idx) => {
                      const style = typeStyles[event.type];
                      return (
                        <tr key={idx} className="border-b border-white/5 transition-colors hover:bg-white/[0.03]">
                          <td className="whitespace-nowrap px-6 py-5 align-top">
                            <div className="flex items-center gap-2 text-sm font-semibold text-amber-400/90">
                              <Clock className="h-3.5 w-3.5 text-amber-500/60" />
                              {event.time}
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <h4 className="font-semibold text-slate-200">{event.title}</h4>
                            {event.description && (
                              <p className="mt-1 text-sm leading-relaxed text-slate-500">{event.description}</p>
                            )}
                            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                              {event.speaker && (
                                <span className="inline-flex items-center gap-1"><User className="h-3 w-3" />{event.speaker}</span>
                              )}
                              {event.location && (
                                <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{event.location}</span>
                              )}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-5 align-top">
                            <span className={`inline-flex items-center gap-1.5 rounded-full ${style.bg} ${style.text} px-2.5 py-1 text-xs font-medium`}>
                              <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                              {style.label}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="space-y-3 p-4 md:hidden">
                {day.events.map((event, idx) => {
                  const style = typeStyles[event.type];
                  return (
                    <div key={idx} className="glass-card rounded-xl p-4">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-sm font-semibold text-amber-400/90">
                          <Clock className="h-3.5 w-3.5 text-amber-500/60" />
                          {event.time}
                        </div>
                        <span className={`inline-flex items-center gap-1 rounded-full ${style.bg} ${style.text} px-2 py-0.5 text-[10px] font-medium`}>
                          <span className={`h-1 w-1 rounded-full ${style.dot}`} />
                          {style.label}
                        </span>
                      </div>
                      <h4 className="mt-2 font-semibold text-slate-200">{event.title}</h4>
                      {event.description && (
                        <p className="mt-1 text-sm leading-relaxed text-slate-500">{event.description}</p>
                      )}
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
