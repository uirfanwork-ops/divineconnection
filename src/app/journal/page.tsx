import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { InquireCTA } from "@/components/InquireCTA";
import { Reveal } from "@/components/Reveal";
import { journalPosts } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes from the field on construction, drawings, and craft.",
};

export default function JournalPage() {
  return (
    <>
      <Nav variant="solid" />
      <main className="bg-bone pt-32 section-pad">
        <div className="container-page">
          <Reveal>
            <p className="text-eyebrow">Journal</p>
            <h1 className="text-h1 mt-8 max-w-prose-lg text-ink">
              Notes from the field.
            </h1>
            <p className="mt-8 max-w-prose text-body-lg text-mist">
              Occasional writing on construction, drawings, and the small
              disciplines that decide a project.
            </p>
          </Reveal>

          <div className="mt-20 space-y-16">
            {journalPosts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.04}>
                <Link
                  href={`/journal/${post.slug}`}
                  className="group grid grid-cols-12 gap-x-8 gap-y-4 border-t border-hairline pt-10"
                  data-cursor="link"
                >
                  <div className="col-span-12 md:col-span-3">
                    <p className="text-[11px] uppercase tracking-nav text-mist">
                      {post.dateLabel}
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-9 max-w-prose-lg">
                    <h2 className="font-display text-[32px] leading-tight text-ink transition-colors duration-300 group-hover:text-clay md:text-[40px]">
                      {post.title}
                    </h2>
                    <p className="mt-4 text-body-lg text-mist">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <InquireCTA />
      <Footer />
    </>
  );
}
