import Link from "next/link";
import { journalPosts } from "@/lib/journal";
import { Reveal, RevealStagger, RevealItem } from "./Reveal";

export function JournalGrid() {
  return (
    <section className="bg-bone section-pad">
      <div className="container-page">
        <div className="flex items-end justify-between gap-6">
          <Reveal>
            <p className="text-eyebrow">Journal</p>
            <h2 className="text-h2 mt-6 text-ink">Notes from the field.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/journal"
              className="link-underline shrink-0 text-[11px] uppercase tracking-nav text-clay"
              data-cursor="link"
            >
              Read all notes
            </Link>
          </Reveal>
        </div>

        <RevealStagger className="mt-16">
          <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-3">
            {journalPosts.slice(0, 3).map((post) => (
              <RevealItem key={post.slug}>
                <Link
                  href={`/journal/${post.slug}`}
                  className="group block"
                  data-cursor="link"
                >
                  <p className="text-[11px] uppercase tracking-nav text-mist">
                    {post.dateLabel}
                  </p>
                  <h3 className="mt-6 font-display text-[24px] leading-snug text-ink transition-colors duration-300 group-hover:text-clay">
                    {post.title}
                  </h3>
                  <p className="mt-4 text-body text-mist">{post.excerpt}</p>
                </Link>
              </RevealItem>
            ))}
          </div>
        </RevealStagger>
      </div>
    </section>
  );
}
