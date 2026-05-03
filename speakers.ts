// lib/speakers.ts
//
// Loader for the MDX speaker files in content/speakers/*.mdx.
// Parses frontmatter via gray-matter and returns typed Speaker objects.
// Server-only (uses node:fs). Call from server components or route handlers.
//
// Required dependency:
//   pnpm add gray-matter
//
// If you also want to render the description as MDX (rather than markdown),
// pipe `description` through next-mdx-remote/serialize or your existing MDX
// pipeline. For the speakers section as written, plain markdown is enough.

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type Speaker = {
  id: string;
  order: number;
  name: string;
  category: string;
  sessionTitle: string;
  /** Markdown body of the speaker writeup. Supports italics via *...* */
  description: string;
};

const SPEAKERS_DIR = path.join(process.cwd(), "content", "speakers");

let cache: Speaker[] | null = null;

/**
 * Load all speakers from MDX, sorted by `order`.
 * Memoized for the lifetime of the server process.
 */
export async function getSpeakers(): Promise<Speaker[]> {
  if (cache) return cache;

  const filenames = await fs.readdir(SPEAKERS_DIR);
  const mdxFiles = filenames.filter((f) => f.endsWith(".mdx"));

  const speakers = await Promise.all(
    mdxFiles.map(async (filename): Promise<Speaker> => {
      const filepath = path.join(SPEAKERS_DIR, filename);
      const raw = await fs.readFile(filepath, "utf8");
      const { data, content } = matter(raw);

      const required = ["id", "order", "name", "category", "sessionTitle"];
      for (const key of required) {
        if (!(key in data)) {
          throw new Error(
            `Speaker file "${filename}" is missing required frontmatter field: ${key}`
          );
        }
      }

      return {
        id: String(data.id),
        order: Number(data.order),
        name: String(data.name),
        category: String(data.category),
        sessionTitle: String(data.sessionTitle),
        description: content.trim(),
      };
    })
  );

  cache = speakers.sort((a, b) => a.order - b.order);
  return cache;
}

/** Look up a single speaker by slug. */
export async function getSpeakerById(id: string): Promise<Speaker | undefined> {
  const all = await getSpeakers();
  return all.find((s) => s.id === id);
}
