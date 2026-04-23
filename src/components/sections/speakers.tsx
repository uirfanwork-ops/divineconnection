import { speakers } from "../../../content/speakers";
import { User } from "lucide-react";

export function SpeakersSection() {
  return (
    <section id="speakers" className="relative bg-dark-green py-24 md:py-32 overflow-hidden">
      {/* Background image with heavy gradient */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: "url('/gallery/07.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1a0a] via-[#0a1a0a]/70 to-[#0a1a0a]" />

      <div className="container relative">
        <div className="text-center">
          <p className="label-gold">Our Speakers</p>
          <h2 className="font-heading mt-3 text-4xl font-bold uppercase tracking-wide text-[var(--text-primary)] md:text-5xl">
            Learn from the Best
          </h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3 lg:grid-cols-5">
          {speakers.map((speaker) => (
            <div
              key={speaker.name}
              className="border border-[var(--border-subtle)] bg-[var(--bg-card)] transition-colors hover:border-[var(--border-color)]"
            >
              <div className="flex h-44 items-center justify-center bg-gradient-to-br from-[var(--bg-elevated)] to-[var(--bg-card)]">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[var(--gold)] border-opacity-30">
                  <User className="h-10 w-10 text-[var(--gold)]" />
                </div>
              </div>
              <div className="p-6">
                <p className="label-gold text-[10px]">{speaker.title}</p>
                <h3 className="font-heading mt-1 text-xl font-bold uppercase tracking-wide text-[var(--text-primary)]">
                  {speaker.name}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {speaker.bio}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {speaker.topics.map((topic) => (
                    <span
                      key={topic}
                      className="inline-block border border-[var(--border-color)] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-[var(--gold)]"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
