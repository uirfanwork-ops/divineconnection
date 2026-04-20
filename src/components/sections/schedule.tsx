import { Clock, MapPin, User } from "lucide-react";
import { schedule } from "../../../content/schedule";
import type { ScheduleEvent } from "../../../content/schedule";

const typeStyles: Record<
  ScheduleEvent["type"],
  { bg: string; text: string; dot: string; label: string }
> = {
  lecture: {
    bg: "bg-blue-100",
    text: "text-blue-900",
    dot: "bg-blue-500",
    label: "Lecture",
  },
  workshop: {
    bg: "bg-purple-100",
    text: "text-purple-900",
    dot: "bg-purple-500",
    label: "Workshop",
  },
  prayer: {
    bg: "bg-emerald-100",
    text: "text-emerald-900",
    dot: "bg-emerald-500",
    label: "Prayer",
  },
  meal: {
    bg: "bg-amber-100",
    text: "text-amber-900",
    dot: "bg-amber-500",
    label: "Meal",
  },
  activity: {
    bg: "bg-sky-100",
    text: "text-sky-900",
    dot: "bg-sky-500",
    label: "Activity",
  },
  break: {
    bg: "bg-slate-100",
    text: "text-slate-700",
    dot: "bg-slate-400",
    label: "Break",
  },
  ceremony: {
    bg: "bg-orange-100",
    text: "text-orange-900",
    dot: "bg-orange-500",
    label: "Ceremony",
  },
};

export function ScheduleSection() {
  return (
    <section id="schedule" className="relative py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/40 to-white" />

      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-900">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              Three Day Schedule
            </span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Your weekend,{" "}
            <span className="gradient-text">hour by hour</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Worship, knowledge, brotherhood, and renewal.
          </p>
        </div>

        {/* Legend */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {(Object.keys(typeStyles) as Array<keyof typeof typeStyles>).map(
            (type) => (
              <span
                key={type}
                className={`inline-flex items-center gap-1.5 rounded-full ${typeStyles[type].bg} ${typeStyles[type].text} px-3 py-1 text-xs font-medium`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${typeStyles[type].dot}`}
                />
                {typeStyles[type].label}
              </span>
            )
          )}
        </div>

        <div className="mt-12 space-y-8">
          {schedule.map((day, dayIndex) => (
            <div
              key={day.date}
              className="glass-strong overflow-hidden rounded-3xl"
            >
              {/* Day header */}
              <div className="relative border-b border-white/40 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 p-6">
                <div className="absolute inset-0 bg-grid opacity-10" />
                <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-xl">
                      <span className="text-xl font-bold text-white">
                        {dayIndex + 1}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-widest text-orange-300">
                        {day.dayLabel}
                      </p>
                      <h3 className="text-2xl font-bold text-white">
                        {day.title}
                      </h3>
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/10 px-4 py-2 backdrop-blur-xl">
                    <p className="text-xs font-medium uppercase tracking-wide text-blue-100">
                      Date
                    </p>
                    <p className="text-sm font-semibold text-white">
                      {new Date(day.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Events table (desktop) */}
              <div className="hidden md:block">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/60 backdrop-blur-xl">
                      <th className="w-32 px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                        Time
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                        Session
                      </th>
                      <th className="w-32 px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                        Type
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {day.events.map((event, idx) => {
                      const style = typeStyles[event.type];
                      return (
                        <tr
                          key={idx}
                          className="group border-b border-slate-100 transition-colors hover:bg-blue-50/40"
                        >
                          <td className="whitespace-nowrap px-6 py-5 align-top">
                            <div className="flex items-center gap-2 text-sm font-semibold text-blue-900">
                              <Clock className="h-3.5 w-3.5 text-orange-500" />
                              {event.time}
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <h4 className="font-semibold text-slate-900">
                              {event.title}
                            </h4>
                            {event.description && (
                              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                                {event.description}
                              </p>
                            )}
                            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
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
                          <td className="whitespace-nowrap px-6 py-5 align-top">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full ${style.bg} ${style.text} px-2.5 py-1 text-xs font-medium`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${style.dot}`}
                              />
                              {style.label}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Events list (mobile) */}
              <div className="space-y-4 p-4 md:hidden">
                {day.events.map((event, idx) => {
                  const style = typeStyles[event.type];
                  return (
                    <div
                      key={idx}
                      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-sm font-semibold text-blue-900">
                          <Clock className="h-3.5 w-3.5 text-orange-500" />
                          {event.time}
                        </div>
                        <span
                          className={`inline-flex items-center gap-1 rounded-full ${style.bg} ${style.text} px-2 py-0.5 text-[10px] font-medium`}
                        >
                          <span
                            className={`h-1 w-1 rounded-full ${style.dot}`}
                          />
                          {style.label}
                        </span>
                      </div>
                      <h4 className="mt-2 font-semibold text-slate-900">
                        {event.title}
                      </h4>
                      {event.description && (
                        <p className="mt-1 text-sm leading-relaxed text-slate-600">
                          {event.description}
                        </p>
                      )}
                      <div className="mt-2 space-y-1 text-xs text-slate-500">
                        {event.speaker && (
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {event.speaker}
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </div>
                        )}
                      </div>
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
