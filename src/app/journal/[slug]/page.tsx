import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { InquireCTA } from "@/components/InquireCTA";
import { Reveal } from "@/components/Reveal";
import { getJournalPost, journalPosts } from "@/lib/journal";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return journalPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const post = getJournalPost(params.slug);
  if (!post) return { title: "Note not found" };
  return {
    title: post.title.replace(/\.$/, ""),
    description: post.excerpt,
  };
}

export default function JournalPostPage({ params }: { params: Params }) {
  const post = getJournalPost(params.slug);
  if (!post) notFound();

  return (
    <>
      <Nav variant="solid" />
      <main className="bg-bone pt-32 section-pad">
        <article className="container-page">
          <Reveal>
            <Link
              href="/journal"
              className="link-underline text-[11px] uppercase tracking-nav text-clay"
              data-cursor="link"
            >
              Back to journal
            </Link>
          </Reveal>
          <Reveal delay={0.05} className="mt-16 max-w-prose-lg">
            <p className="text-[11px] uppercase tracking-nav text-mist">
              {post.dateLabel}
            </p>
            <h1 className="text-h1 mt-8 text-ink">{post.title}</h1>
            <p className="mt-10 text-body-lg italic text-clay">
              {post.excerpt}
            </p>
          </Reveal>

          <div className="mx-auto mt-20 max-w-prose space-y-10 text-body-lg text-ink">
            {post.body.map((para, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <p>{para}</p>
              </Reveal>
            ))}
          </div>
        </article>
      </main>
      <InquireCTA />
      <Footer />
    </>
  );
}
