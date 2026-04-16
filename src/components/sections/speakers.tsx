import { speakers } from "../../../content/speakers";
import { Users } from "lucide-react";

export function SpeakersSection() {
  return (
    <section id="speakers" className="bg-muted py-16 md:py-24">
      <div className="container">
        <h2 className="text-center text-3xl font-bold text-foreground md:text-4xl">
          Our Speakers
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
          Learn from qualified scholars and educators who bring Islamic
          knowledge to life.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {speakers.map((speaker) => (
            <div
              key={speaker.name}
              className="overflow-hidden rounded-lg bg-background shadow-sm"
            >
              <div className="flex h-48 items-center justify-center bg-primary/10">
                <Users className="h-16 w-16 text-primary/40" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground">
                  {speaker.name}
                </h3>
                <p className="text-sm font-medium text-primary">
                  {speaker.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {speaker.bio}
                </p>
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Topics
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {speaker.topics.map((topic) => (
                      <span
                        key={topic}
                        className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
