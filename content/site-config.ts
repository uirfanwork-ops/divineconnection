export const siteConfig = {
  name: "Divine Connections: Servants of Allah",
  shortName: "Divine Connections",
  tagline: "Strengthen Your Bond with Allah and Your Brothers & Sisters in Faith",
  description:
    "An intensive Islamic academic retreat featuring in-depth study of the ʿIbād ul Raḥmān verses, scholarly lectures, and spiritual growth in the embrace of nature.",
  url: "https://divineconnections.ca",
  ogImage: "/og-image.jpg",
  retreatDate: "July 31 - August 3, 2026",
  retreatDateShort: "Jul 31 - Aug 3, 2026",
  retreatLocation: "Mansfield Outdoor Centre, Mulmur, Ontario",
  retreatVenue: "Mansfield Outdoor Centre",
  retreatCity: "Mulmur, Ontario",
  retreatAddress: "937365 Airport Rd, Mulmur, ON L9V 3T6",
  organizerName: "Divine Connections",
  organizerEmail: "admin@mathabah.org",
  supportEmail: "admin@mathabah.org",
  financeEmail: "finance@mathabah.org",
  maxAttendees: 150,
  currency: "CAD",
  socialLinks: {
    instagram: "https://instagram.com/divineconnections",
    facebook: "https://facebook.com/divineconnections",
    email: "mailto:admin@mathabah.org",
  },
  hero: {
    title: "Divine Connections",
    subtitle: "Servants of Allah",
    description:
      "Join us for an intensive four-day Islamic academic retreat at Mansfield Outdoor Centre. Study under esteemed scholars, immerse yourself in the tafsīr of the ʿIbād ul Raḥmān, and forge bonds of brotherhood and sisterhood that last a lifetime.",
    ctaText: "Register Now",
    ctaHref: "/register",
    secondaryCtaText: "View Schedule",
    secondaryCtaHref: "#schedule",
  },
  about: {
    title: "About the Retreat",
    description: [
      "Divine Connections: Servants of Allah is a four-day intensive Islamic academic retreat dedicated to nurturing the spiritual and intellectual growth of Muslim men and women. Set at the beautiful Mansfield Outdoor Centre in Mulmur, Ontario, this retreat offers a rigorous blend of Islamic scholarship, spiritual reflection, and brotherhood and sisterhood in the embrace of nature.",
      "At the heart of our program is an in-depth tafsīr study of Sūrah Al-Furqān, verses 63 to 76 — the powerful āyāt describing the ʿIbād ul Raḥmān, the Servants of the Most Gracious. These sessions will be delivered by world-renowned scholar Shaykh Sulaiman Moola, whose depth of knowledge and masterful delivery will bring these verses to life. While the classes are intensive and rich in content, they are designed for every Muslim regardless of prior background. The only prerequisite is a serious commitment to show up, engage, and grow.",
      "Alongside the tafsīr program, you will experience interactive workshops, guided dhikr sessions, and reflective nature walks that bring you closer to Allāh's creation.",
      "Step away from the distractions of daily life. Immerse yourself in focused study, meaningful discourse, and leave with a renewed heart and practical tools to strengthen your dīn long after the retreat ends.",
    ],
  },
  venue: {
    title: "The Venue",
    name: "Mansfield Outdoor Centre",
    address: "937365 Airport Rd, Mulmur, ON L9V 3T6",
    description:
      "Nestled in the rolling hills of Mulmur, Ontario, Mansfield Outdoor Centre offers a serene natural setting perfect for spiritual reflection and outdoor activities. With expansive grounds, forest trails, and open skies that reveal constellations at night, the venue invites guests to witness the signs of Allah in His creation.",
    features: [
      "Indoor and outdoor conference facilities",
      "Comfortable shared cabin accommodations",
      "Halal catering arranged for all meals",
      "Dedicated prayer space with wudu facilities",
      "Forest trails for reflection walks and hikes",
      "Outdoor sports and recreation areas",
      "Free parking for all attendees",
      "Clear skies for star gazing and contemplation",
    ],
    mapEmbedUrl: "",
  },
  cta: {
    title: "Ready to Transform Your Spiritual Journey?",
    description:
      "Spaces are limited. Secure your spot today and join us for four days of intensive study, spiritual growth, and meaningful connections with your brothers and sisters in faith.",
    buttonText: "Register Now",
    buttonHref: "/register",
  },
  footer: {
    copyright: "Divine Connections",
    tagline: "Servants of Allah",
    quranVerse: {
      text: "Indeed, in the remembrance of Allah do hearts find rest.",
      reference: "Qur'an 13:28",
    },
    links: [
      { label: "Privacy Policy", href: "/policies/privacy" },
      { label: "Terms of Service", href: "/policies/terms" },
      { label: "Refund Policy", href: "/policies/refund" },
      { label: "Code of Conduct", href: "/policies/code-of-conduct" },
      { label: "Waiver", href: "/policies/waiver" },
      { label: "Consent Form", href: "/policies/consent" },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
