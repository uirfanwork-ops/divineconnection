# Divine Connections — Speakers Content (MDX)

Drop-in replacement for `content/speakers.ts`. Each speaker is now a separate MDX file with frontmatter, loaded at build/request time by `lib/speakers.ts`.

## File structure

```
content/
  speakers/
    01-sulaiman-moola.mdx
    02-omar-subedar.mdx
    03-yusuf-badat.mdx
    04-hassan-syed.mdx
    05-shariq-lodhi.mdx
lib/
  speakers.ts
```

The numeric prefix (`01-`, `02-`, ...) is purely for filesystem ordering convenience. The canonical display order is the `order` field in the frontmatter, which `getSpeakers()` sorts by.

## Install

```bash
pnpm add gray-matter
```

That's the only new dependency. No need for `next-mdx-remote` unless you want to render the body as full MDX (with components). For the writeups as written, the body is plain markdown and renders fine through any markdown component (`react-markdown`, `marked`, etc.).

## Frontmatter schema

```yaml
id: string             # slug, used for anchors and lookups
order: number          # 1-based display order
name: string           # speaker name with honorific
category: string       # discipline tags, " · " separated
sessionTitle: string   # quoted because it contains a colon
```

## Usage in a server component

```tsx
// app/speakers/page.tsx
import { getSpeakers } from "@/lib/speakers";
import ReactMarkdown from "react-markdown";

export default async function SpeakersPage() {
  const speakers = await getSpeakers();

  return (
    <section>
      {speakers.map((s) => (
        <article key={s.id} id={s.id}>
          <p className="category">{s.category}</p>
          <h2>{s.name}</h2>
          <h3>{s.sessionTitle}</h3>
          <ReactMarkdown>{s.description}</ReactMarkdown>
        </article>
      ))}
    </section>
  );
}
```

## Editing speakers later

To add a speaker, drop a new `06-firstname-lastname.mdx` file into `content/speakers/`. Make sure `id` is unique and `order` reflects where you want them in the list. The loader picks up new files automatically on next build.

To edit a writeup, just edit the body of the MDX file. No code changes needed.

## Notes

- Files are saved as UTF-8 to preserve Arabic transliteration diacritics (ā, ī, ū, ḥ, ʿ, ṣ).
- The ﷺ glyph in `02-omar-subedar.mdx` is a single Unicode character (U+FDFA). Make sure your font stack supports it or it will render as fallback text.
- The `getSpeakers()` loader is memoized at module level. In dev with hot reload, restart the server if you don't see frontmatter changes.
