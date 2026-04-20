import { speakers } from "../../../content/speakers";
import { User, BookOpen } from "lucide-react";

const gradients = [
  "from-blue-600 via-indigo-700 to-purple-800",
  "from-amber-600 via-orange-700 to-rose-800",
  "from-emerald-600 via-teal-700 to-cyan-800",
];

export function SpeakersSection() {
  return (
    <section id="speakers" className="starfield relative overflow-hidden py-20 md:py-28 bg-gradient-to-b from-slate-950/50 via-indigo-950/20 to-slate-950/50">
      <div className="nebula nebula-purple h-[400px] w-[400px]" style={{ bottom: "10%", left: "-10%" }} />

      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 border border-purple-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-purple-400">
              <User className="h-3 w-3" />
              Our Speakers
            </span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-slate-100 md:text-5xl">
            Learn from{" "}
            <span className="gradient-text-gold">qualified scholars</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {speakers.map((speaker, index) => (
            <div
              key={speaker.name}
              className="glass-card group overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
            >
              <div className={`relative flex h-40 items-center justify-center bg-gradient-to-br ${gradients[index % gradients.length]}`}>
                <div className="absolute inset-0 starfield opacity-50" />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-xl ring-4 ring-white/10">
                  <User className="h-10 w-10 text-white/80" />
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-100">{speaker.name}</h3>
                <p className="mt-1 text-sm font-semibold text-amber-400">{speaker.title}</p>
                <p className="mt-4 text-sm leading-relaxed text-slate-400">{speaker.bio}</p>

                <div className="mt-5 border-t border-white/5 pt-4">
                  <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                    <BookOpen className="h-3 w-3" />
                    Topics
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {speaker.topics.map((topic) => (
                      <span key={topic} className="inline-block rounded-full bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 text-xs font-medium text-blue-300">
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
