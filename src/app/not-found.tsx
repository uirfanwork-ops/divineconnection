import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Nav variant="solid" />
      <main className="bg-bone pt-32 section-pad">
        <div className="container-page">
          <p className="text-eyebrow">Not found</p>
          <h1 className="text-h1 mt-8 max-w-prose-lg text-ink">
            That page is not in our archive.
          </h1>
          <p className="mt-8 max-w-prose text-body-lg text-mist">
            The link may be old, or the page may have been moved during a
            recent revision.
          </p>
          <Link
            href="/"
            className="link-underline mt-12 inline-block text-[11px] uppercase tracking-nav text-clay"
          >
            Return home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
