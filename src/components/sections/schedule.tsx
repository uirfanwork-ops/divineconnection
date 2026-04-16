import { schedule } from "../../../content/schedule";
import type { ScheduleEvent } from "../../../content/schedule";
import { Badge } from "@/components/ui/badge";

const typeColors: Record<ScheduleEvent["type"], string> = {
  lecture: "bg-blue-100 text-blue-800",
  workshop: "bg-purple-100 text-purple-800",
  prayer: "bg-emerald-100 text-emerald-800",
  meal: "bg-amber-100 text-amber-800",
  activity: "bg-sky-100 text-sky-800",
  break: "bg-gray-100 text-gray-800",
  ceremony: "bg-rose-100 text-rose-800",
};

export function ScheduleSection() {
  return (
    <section id="schedule" className="py-16 md:py-24">
      <div className="container">
        <h2 className="text-center text-3xl font-bold text-foreground md:text-4xl">
          Retreat Schedule
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
          Three days of worship, knowledge, brotherhood, and renewal.
        </p>

        <div className="mt-12 space-y-12">
          {schedule.map((day) => (
            <div key={day.date}>
              <div className="mb-6 flex items-baseline gap-3">
                <span className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">
                  {day.dayLabel}
                </span>
                <h3 className="text-xl font-semibold text-foreground">
                  {day.title}
                </h3>
              </div>

              <div className="space-y-1">
                {day.events.map((event, eventIndex) => (
                  <div
                    key={eventIndex}
                    className="flex gap-4 rounded-lg p-3 transition-colors hover:bg-muted/50"
                  >
                    <div className="w-20 shrink-0 pt-0.5 text-sm font-medium text-muted-foreground">
                      {event.time}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-medium text-foreground">
                          {event.title}
                        </h4>
                        <Badge
                          className={`${typeColors[event.type]} border-0 text-xs`}
                          variant="outline"
                        >
                          {event.type}
                        </Badge>
                      </div>
                      {event.description && (
                        <p className="mt-1 text-sm text-muted-foreground">
                          {event.description}
                        </p>
                      )}
                      <div className="mt-1 flex flex-wrap gap-x-4 text-xs text-muted-foreground">
                        {event.speaker && <span>Speaker: {event.speaker}</span>}
                        {event.location && (
                          <span>Location: {event.location}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
