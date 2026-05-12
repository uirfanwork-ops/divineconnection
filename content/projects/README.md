# Projects

Project entries live here as MDX with frontmatter. The live site currently
reads from `src/lib/projects.ts` for typed structure and image gallery
layouts. When the Sanity studio is wired up, this folder will become the
source of truth, with the data file regenerated at build time from the MDX
front matter.

To add a new project today:

1. Add the typed entry to `src/lib/projects.ts`.
2. Add a matching MDX file here with the same slug and front matter, so the
   eventual CMS migration is one to one.
3. Drop cover and gallery images into `public/projects/` using the
   `<slug>-cover.svg` and `<slug>-01.svg` naming convention.

When the CMS is wired:

1. Replace the export in `src/lib/projects.ts` with a build-time loader that
   reads every MDX in this folder, parses the front matter with `gray-matter`,
   and renders the body with `next-mdx-remote/rsc`.
2. Keep the typed `Project` definition. The CMS is fed by the types, not the
   other way around.
