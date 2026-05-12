export type JournalPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateLabel: string;
  body: string[];
};

export const journalPosts: JournalPost[] = [
  {
    slug: "the-quiet-schedule",
    title: "The quiet schedule.",
    excerpt:
      "Why the best schedule is the one nobody on site has to look at twice.",
    date: "2026-04-12",
    dateLabel: "April 2026",
    body: [
      "A schedule is a promise. If a project lead has to defend it on a daily basis, it has already begun to fail. The schedules we keep are quiet ones, written with enough float to absorb weather and inspections, and read alongside the drawings rather than against them.",
      "On a recent tilt-up shell, we held the panel sequence to the day for six weeks. The yard was quiet. The trades knew where to be. The slab was poured without overtime. The cleanest sites are the ones where the schedule has become invisible.",
    ],
  },
  {
    slug: "what-a-bid-leaves-out",
    title: "What a bid leaves out.",
    excerpt:
      "Notes on reading a tender, and the line items that decide a project.",
    date: "2026-02-04",
    dateLabel: "February 2026",
    body: [
      "Every bid is a story told in line items. The most important parts of that story are the ones the bidder chose not to tell you. We read tenders the way an editor reads a manuscript, looking for the omissions that will become arguments later.",
      "On a multiplex earlier this year, the lowest bid omitted the gas reroute that the energy model required. The owner caught it. The story changed.",
    ],
  },
  {
    slug: "stone-and-light",
    title: "Stone and light.",
    excerpt:
      "On the difference between a daylit room and a room that is merely lit.",
    date: "2026-01-15",
    dateLabel: "January 2026",
    body: [
      "Daylight is a building material. It is poured, sized, and protected, like concrete or steel. A room that is daylit, properly, has a temperature, a direction, and a season. A room that is merely lit has none of these.",
      "On a Mississauga restaurant fit, we removed a second floor slab over the dining room to get a north-facing clerestory. The room found its temperature in the first hour after opening.",
    ],
  },
];

export function getJournalPost(slug: string): JournalPost | undefined {
  return journalPosts.find((p) => p.slug === slug);
}
