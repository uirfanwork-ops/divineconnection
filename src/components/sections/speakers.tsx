import { speakers } from "../../../content/speakers";
import { User, BookOpen } from "lucide-react";

export function SpeakersSection() {
  return (
    <section id="speakers" className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-orange-50/30 to-blue-50/30" />

      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-orange-900">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              Our Speakers
            </span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Learn from{" "}
            <span className="gradient-orange">qualified scholars</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Teachers who bring traditional Islamic knowledge to life for
            modern seekers.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {speakers.map((speaker, index) => {
            const gradients = [
              "from-blue-500 to-blue-700",
              "from-orange-500 to-orange-700",
              "from-sky-500 to-blue-700",
            ];
            const gradient = gradients[index % gradients.length];
            return (
              <div
                key={speaker.name}
                className="glass-strong group overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                {/* Avatar area */}
                <div
                  className={`relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br ${gradient}`}
                >
                  <div className="absolute inset-0 bg-grid opacity-20" />
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-xl ring-4 ring-white/30">
                    <User className="h-10 w-10 text-white" />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900">
                    {speaker.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-orange-600">
                    {speaker.title}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">
                    {speaker.bio}
                  </p>

                  <div className="mt-5 border-t border-slate-200 pt-4">
                    <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                      <BookOpen className="h-3 w-3" />
                      Topics
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {speaker.topics.map((topic) => (
                        <span
                          key={topic}
                          className="inline-block rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-800"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
