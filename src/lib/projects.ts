export type ProjectCategory =
  | "Commercial"
  | "Industrial"
  | "Residential"
  | "Restaurants";

export type ProjectImage = {
  src: string;
  alt: string;
  layout?: "full" | "half-left" | "half-right" | "centered";
  aspect?: "4:5" | "3:4" | "16:9" | "1:1" | "3:2";
  arched?: boolean;
};

export type Project = {
  slug: string;
  number: string;
  title: string;
  category: ProjectCategory;
  year: number;
  location: string;
  scope: string;
  size: string;
  value: string;
  featured?: boolean;
  arched?: boolean;
  cover: {
    src: string;
    alt: string;
  };
  lede: string;
  body: Array<
    | { kind: "paragraph"; text: string }
    | { kind: "pullquote"; text: string; emphasis?: string }
    | { kind: "image"; image: ProjectImage }
    | { kind: "image-pair"; images: [ProjectImage, ProjectImage] }
  >;
};

export const projects: Project[] = [
  {
    slug: "pure-industrial-scarborough",
    number: "01",
    title: "Pure Industrial, Scarborough",
    category: "Industrial",
    year: 2025,
    location: "Scarborough, Ontario",
    scope: "Tilt-up shell, dock package, office fit",
    size: "182,000 sq ft",
    value: "$24.6M",
    featured: true,
    arched: true,
    cover: {
      src: "/projects/pure-industrial-cover.svg",
      alt: "Tilt-up panels rising at the Pure Industrial site in Scarborough.",
    },
    lede: "A 182,000 square foot logistics shell delivered to a national operator on a compressed eleven month schedule, with the office volume held in raw concrete and oak.",
    body: [
      {
        kind: "paragraph",
        text: "The brief called for speed without the usual cost of speed. We worked through the permit set in parallel with the foundation pour, coordinating tilt-up cycles to the day, and held a single project lead on site from groundbreaking to certificate.",
      },
      {
        kind: "image",
        image: {
          src: "/projects/pure-industrial-01.svg",
          alt: "Tilt-up concrete panel raised against an overcast Scarborough sky.",
          layout: "full",
          aspect: "3:2",
        },
      },
      {
        kind: "pullquote",
        text: "We treat the schedule the way a quiet architect treats a plan.",
        emphasis: "a plan",
      },
      {
        kind: "paragraph",
        text: "Dock doors, levelers, and the truck court were sequenced for the operator's planned commissioning. The front office was designed with the client's interior team to feel deliberate rather than tacked on, with a long oak reception bench facing the yard.",
      },
      {
        kind: "image-pair",
        images: [
          {
            src: "/projects/pure-industrial-02.svg",
            alt: "Concrete loading dock at dusk.",
            aspect: "4:5",
          },
          {
            src: "/projects/pure-industrial-03.svg",
            alt: "Oak reception bench inside the front office.",
            aspect: "4:5",
          },
        ],
      },
    ],
  },
  {
    slug: "mississauga-restaurant-fitout",
    number: "02",
    title: "Mississauga restaurant fit-out",
    category: "Restaurants",
    year: 2025,
    location: "Mississauga, Ontario",
    scope: "Full restaurant fit-out, kitchen, millwork",
    size: "4,200 sq ft",
    value: "$1.9M",
    featured: true,
    cover: {
      src: "/projects/mississauga-restaurant-cover.svg",
      alt: "Stone dining room of a Mississauga restaurant at golden hour.",
    },
    lede: "A daylit, stone-floored room for a chef returning to her hometown. The build worked inside an existing two storey envelope, and most of the design moves were about light and air.",
    body: [
      {
        kind: "paragraph",
        text: "We removed a second floor slab over the dining room to bring in a north-facing clerestory, then rebuilt the structural diaphragm in steel and oak. The kitchen extract, gas, and water were rerouted to permit the new ceiling. None of this is visible in the finished room.",
      },
      {
        kind: "image",
        image: {
          src: "/projects/mississauga-restaurant-01.svg",
          alt: "Plaster walls and oak banquette in the main dining room.",
          layout: "full",
          aspect: "3:2",
        },
      },
      {
        kind: "pullquote",
        text: "Hospitality work is mostly about what you choose not to do.",
        emphasis: "what you choose not to do",
      },
    ],
  },
  {
    slug: "thornhill-data-centre-shell",
    number: "03",
    title: "Thornhill data centre shell",
    category: "Industrial",
    year: 2024,
    location: "Thornhill, Ontario",
    scope: "Concrete shell, MEP rough, security envelope",
    size: "64,000 sq ft",
    value: "$18.2M",
    featured: true,
    cover: {
      src: "/projects/thornhill-datacentre-cover.svg",
      alt: "Exterior of the Thornhill data centre shell with cooling yard.",
    },
    lede: "A purpose-built shell for a colocation operator, delivered with the MEP rough and the security envelope. We sequenced the cooling yard against tight municipal noise covenants.",
    body: [
      {
        kind: "paragraph",
        text: "The interior fit was held by the operator's specialist trades. Our scope ended at the meet-me room wall and the generator yard fence. The schedule was inherited from a previous contractor we replaced, and we held the originally promised handover date.",
      },
      {
        kind: "pullquote",
        text: "The cleanest sites are the ones with the fewest decisions made on them.",
        emphasis: "made on them",
      },
    ],
  },
  {
    slug: "etobicoke-multiplex-12-unit",
    number: "04",
    title: "Etobicoke multiplex, 12 unit",
    category: "Residential",
    year: 2024,
    location: "Etobicoke, Ontario",
    scope: "CMHC MLI Select, ground up, 12 unit",
    size: "11,800 sq ft",
    value: "$5.4M",
    featured: true,
    arched: true,
    cover: {
      src: "/projects/etobicoke-multiplex-cover.svg",
      alt: "Brick and limestone facade of the Etobicoke multiplex at dusk.",
    },
    lede: "Twelve units of purpose-built rental on a single residential lot, financed through CMHC MLI Select. The building reads as one quiet brick volume from the street.",
    body: [
      {
        kind: "paragraph",
        text: "We worked the lender package, the energy modelling, and the OBC compliance set against the same drawings, so the financing and the build never split. The result is a sober brick building that holds its neighbours rather than imposing on them.",
      },
      {
        kind: "image",
        image: {
          src: "/projects/etobicoke-multiplex-01.svg",
          alt: "Brick facade and limestone sills, photographed straight on.",
          layout: "full",
          aspect: "3:2",
        },
      },
    ],
  },
  {
    slug: "queen-street-tenant-fit",
    number: "05",
    title: "Queen Street tenant fit",
    category: "Commercial",
    year: 2024,
    location: "Toronto, Ontario",
    scope: "Office tenant fit-out, 3rd floor",
    size: "8,400 sq ft",
    value: "$1.4M",
    cover: {
      src: "/projects/queen-street-cover.svg",
      alt: "Office tenant fit-out on Queen Street West, oak and lime plaster.",
    },
    lede: "A measured office fit for a design-led tenant on Queen West, built inside an 1898 brick warehouse without disguising it.",
    body: [
      {
        kind: "paragraph",
        text: "The existing timber beams and brick walls were repointed, not covered. New partitions were held a half inch off the existing structure with a black reveal to keep the old building reading as itself.",
      },
    ],
  },
  {
    slug: "vaughan-warehouse-conversion",
    number: "06",
    title: "Vaughan warehouse conversion",
    category: "Industrial",
    year: 2023,
    location: "Vaughan, Ontario",
    scope: "Industrial conversion, mezzanine office",
    size: "44,500 sq ft",
    value: "$6.8M",
    cover: {
      src: "/projects/vaughan-warehouse-cover.svg",
      alt: "Vaughan warehouse interior, mezzanine office and ribbon glazing.",
    },
    lede: "An existing warehouse repurposed for a precision parts manufacturer, with a new mezzanine office and ribbon glazing pulled into the south wall.",
    body: [
      {
        kind: "paragraph",
        text: "Floor flatness for the new line was the project. We held the slab pour to FF50, with diamond grinding on a strict survey grid afterward, and the operator commissioned the line on the original date.",
      },
    ],
  },
  {
    slug: "yorkville-restaurant-bistro",
    number: "07",
    title: "Yorkville bistro",
    category: "Restaurants",
    year: 2023,
    location: "Yorkville, Toronto",
    scope: "Restaurant fit-out, 64 seat",
    size: "2,600 sq ft",
    value: "$1.1M",
    cover: {
      src: "/projects/yorkville-bistro-cover.svg",
      alt: "Marble service counter at the Yorkville bistro.",
    },
    lede: "A sixty-four seat bistro tucked behind a heritage facade, held in marble, brass, and aged oak.",
    body: [
      {
        kind: "paragraph",
        text: "The heritage permit ran ahead of the kitchen approvals by six weeks. We carried the demolition and structural reinforcement on a small crew while the kitchen drawings were finalized with the operator and consultant.",
      },
    ],
  },
  {
    slug: "north-york-medical-office",
    number: "08",
    title: "North York medical office",
    category: "Commercial",
    year: 2023,
    location: "North York, Toronto",
    scope: "Medical office build, 22 rooms",
    size: "9,800 sq ft",
    value: "$2.2M",
    cover: {
      src: "/projects/north-york-medical-cover.svg",
      alt: "Plaster walls and oak doors in the North York medical office.",
    },
    lede: "A twenty two room medical practice for a returning client, finished in lime plaster and rift oak, with a careful mechanical layout to keep ceilings flat.",
    body: [
      {
        kind: "paragraph",
        text: "Mechanical and the ceiling design were drawn together from the first sketch. The result is a flat plaster ceiling with no visible diffusers except in the reception, where they are positioned with intention.",
      },
    ],
  },
  {
    slug: "kingsway-townhomes",
    number: "09",
    title: "Kingsway townhomes",
    category: "Residential",
    year: 2023,
    location: "Etobicoke, Ontario",
    scope: "Six townhomes, ground up",
    size: "14,400 sq ft",
    value: "$7.2M",
    cover: {
      src: "/projects/kingsway-townhomes-cover.svg",
      alt: "Limestone-clad townhouse row on the Kingsway.",
    },
    lede: "A row of six limestone-clad townhomes on the Kingsway, sober and quiet, held to the street wall of their neighbours.",
    body: [
      {
        kind: "paragraph",
        text: "We worked with the architect from the rezoning through occupancy. The Kingsway BIA review took eleven meetings. The street is better for it.",
      },
    ],
  },
  {
    slug: "annex-restaurant-tasting",
    number: "10",
    title: "Annex tasting room",
    category: "Restaurants",
    year: 2022,
    location: "The Annex, Toronto",
    scope: "Restaurant fit-out, twelve seat",
    size: "1,400 sq ft",
    value: "$680K",
    cover: {
      src: "/projects/annex-tasting-cover.svg",
      alt: "Twelve seat counter at the Annex tasting room.",
    },
    lede: "A twelve seat counter restaurant inside a narrow Annex shopfront, built without removing any of the original tin ceiling.",
    body: [
      {
        kind: "paragraph",
        text: "The existing tin ceiling stayed. The kitchen extract was rerouted through a new chase that does not touch the heritage finish. The fit took fourteen weeks.",
      },
    ],
  },
  {
    slug: "scarborough-light-industrial",
    number: "11",
    title: "Scarborough light industrial",
    category: "Industrial",
    year: 2022,
    location: "Scarborough, Ontario",
    scope: "Light industrial shell, three unit",
    size: "38,000 sq ft",
    value: "$4.8M",
    cover: {
      src: "/projects/scarborough-light-industrial-cover.svg",
      alt: "Three unit light industrial shell at the loading bay.",
    },
    lede: "A three unit light industrial shell on speculation for a long term client, with shared loading and demised fire walls between units.",
    body: [
      {
        kind: "paragraph",
        text: "All three units leased before substantial completion. The shared loading court was designed for the eventual mix of tenants, not the speculative average.",
      },
    ],
  },
  {
    slug: "leaside-multiplex-8-unit",
    number: "12",
    title: "Leaside multiplex, 8 unit",
    category: "Residential",
    year: 2022,
    location: "Leaside, Toronto",
    scope: "CMHC MLI, eight unit",
    size: "8,600 sq ft",
    value: "$3.6M",
    cover: {
      src: "/projects/leaside-multiplex-cover.svg",
      alt: "Brick and oak facade of the Leaside multiplex.",
    },
    lede: "An eight unit purpose-built rental in Leaside, financed through CMHC MLI, held within the street wall and tree canopy of the existing block.",
    body: [
      {
        kind: "paragraph",
        text: "A measured brick building with a quiet entry sequence. The financing package and the building are the same project. We treat both with the same care.",
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? projects[index - 1] : projects[projects.length - 1],
    next:
      index < projects.length - 1 ? projects[index + 1] : projects[0],
  };
}

export const categories: Array<"All" | ProjectCategory> = [
  "All",
  "Commercial",
  "Industrial",
  "Residential",
  "Restaurants",
];
