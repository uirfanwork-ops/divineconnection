# Aozat General Contractors

Marketing site for Aozat General Contractors, a commercial and industrial GC
working across the Greater Toronto Area. Editorial, architectural, image-led.

## Stack

- Next.js 14 (App Router) with TypeScript
- Tailwind CSS with a hand-tuned token set in `tailwind.config.ts`
- Framer Motion for scroll reveals and image parallax
- `next/image` with AVIF and WebP formats
- `next/font/google` loading Cormorant Garamond (display) and Inter (sans)
  via CSS variables. Swap to a self-hosted licensed pair (Editorial New, Söhne)
  in `src/app/layout.tsx` when fonts are purchased.
- MDX-ready content folder at `content/projects/`, loader in `src/lib/mdx.ts`.

## Local dev

```bash
npm install
npm run dev
```

The dev server runs on http://localhost:3000.

## Project structure

```
src/
  app/
    layout.tsx                 root metadata, font wiring, Cursor mount
    page.tsx                   home
    work/page.tsx              archive
    work/[slug]/page.tsx       case study
    capabilities/page.tsx
    studio/page.tsx
    journal/page.tsx
    journal/[slug]/page.tsx
    inquire/page.tsx
    sitemap.ts                 sitemap generation
    robots.ts                  robots policy
    opengraph-image.tsx        edge OG card
    globals.css                base, type scale, hairlines, cursor
  components/
    Nav.tsx                    fixed nav, overlay + solid variants
    Hero.tsx                   video parallax hero
    Manifesto.tsx
    ProjectGrid.tsx
    ProjectCard.tsx            arched-mask aware card
    ProjectMeta.tsx
    ProjectBody.tsx            paragraphs, pullquotes, image blocks
    Capabilities.tsx
    Approach.tsx
    StudioTeaser.tsx
    JournalGrid.tsx
    InquireCTA.tsx
    InquireForm.tsx            client form, currently logs to state
    Footer.tsx
    LogoMark.tsx               inline SVG, currentColor for tinting
    Cursor.tsx                 dot cursor, desktop only, reduced-motion aware
    Reveal.tsx                 framer-motion fade and stagger primitives
  lib/
    projects.ts                typed project list, source of truth today
    journal.ts                 typed journal post list
    mdx.ts                     MDX loader stub for the eventual CMS
content/
  projects/                    MDX entries, mirror of projects.ts
  journal/                     placeholder for journal MDX
public/
  brand/aozat-mark.svg         logomark
  hero/                        hero video and poster
  projects/                    project covers and gallery
  studio/                      studio teaser images
```

## Adding a project

1. Append a typed entry to `src/lib/projects.ts`. Use the existing entries as
   a template. Set `featured: true` to place it on the home grid.
2. Drop a cover image into `public/projects/` as
   `<slug>-cover.{svg,jpg,webp}` plus any gallery images as
   `<slug>-01.{ext}`, `<slug>-02.{ext}`, etc.
3. Mirror the entry as an MDX file in `content/projects/<slug>.mdx` with the
   same front matter, so the eventual Sanity migration is one to one.

The arched-top image mask is set per project with the `arched: true` flag.
Use it on no more than one or two cards per page.

## Swapping the hero video

Replace `public/hero/aozat-hero.mp4` and `public/hero/aozat-hero.jpg` (poster)
with new files of the same name.

Encoding guidelines:

- h264, mp4 container
- 1920 by 1080, 24 or 30 fps
- Target bitrate under 4 MB total
- No audio track
- `preload="metadata"` is already set in `Hero.tsx`, so the poster paints
  first and the video streams in.

If the new clip changes the colour temperature substantially, retune the
gradient overlay in `Hero.tsx`.

## Fonts

The site ships with Cormorant Garamond and Inter via `next/font/google`,
which is the documented fallback. To swap in the licensed pair:

1. Drop the font files into `public/fonts/`.
2. Replace the imports in `src/app/layout.tsx` with `next/font/local` calls
   referencing the new files.
3. Keep the CSS variables `--font-display` and `--font-sans` as the contract.
   No component touches the font names directly.

License notes:

- Editorial New (Pangram Pangram) is commercial-licensed per domain.
- Soehne (Klim) is commercial-licensed per visit tier.
- Tiempos Headline (Klim) is a Tiempos alternative if Editorial New is not
  acquired.

## Deploying to Vercel

```bash
vercel link
vercel --prod
```

The site is fully static apart from the OG image, which runs on the Edge
runtime. No environment variables are required for the marketing site
itself. When Sanity is wired up, add the dataset and token variables.

## Performance targets

- Lighthouse 95 plus on all four metrics.
- Hero video under 4 MB, poster JPG under 200 KB.
- All other images served via `next/image`, AVIF and WebP enabled.
- Fonts subset to Latin, weights limited to what the site uses.

## Accessibility

- `prefers-reduced-motion` removes parallax and scale on every section that
  uses them. Opacity fades are kept.
- The custom cursor is opt-in via media query and disables itself on touch
  and when reduced motion is requested.
- Focus rings are amber, 2px, with a 2px offset.
- Hero video is muted and decorative.

## Conventions

- No em dashes anywhere in the codebase, content, or comments.
- One dark section on the home page (Inquire CTA). The rest is daylit.
- Italic is used for emphasis, always in warm sand or clay.
