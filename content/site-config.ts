export const siteConfig = {
  name: "Divine Connections: Servants of Allah",
  shortName: "Divine Connections",
  tagline: "Strengthen Your Bond with Allah and Your Brothers in Faith",
  description:
    "A transformative Islamic retreat experience designed to deepen your connection with Allah (SWT), build lasting bonds with fellow believers, and rejuvenate your spiritual journey.",
  url: "https://divineconnections.ca",
  ogImage: "/og-image.jpg",
  retreatDate: "July 31 - August 3, 2026",
  retreatDateShort: "Jul 31 - Aug 3, 2026",
  retreatLocation: "Mansfield Outdoor Centre, Mulmur, Ontario",
  retreatVenue: "Mansfield Outdoor Centre",
  retreatCity: "Mulmur, Ontario",
  retreatAddress: "937365 Airport Rd, Mulmur, ON L9V 3T6",
  organizerName: "Divine Connections",
  organizerEmail: "info@divineconnections.ca",
  supportEmail: "info@divineconnections.ca",
  financeEmail: "finance@mathabah.org",
  maxAttendees: 150,
  currency: "CAD",
  socialLinks: {
    instagram: "https://instagram.com/divineconnections",
    facebook: "https://facebook.com/divineconnections",
    email: "mailto:info@divineconnections.ca",
  },
  hero: {
    title: "Divine Connections",
    subtitle: "Servants of Allah",
    description:
      "Join us for a transformative four day Islamic retreat at Mansfield Outdoor Centre. Reconnect with your Creator in the quiet of nature, learn from esteemed scholars, and forge bonds of brotherhood that last a lifetime.",
    ctaText: "Register Now",
    ctaHref: "/register",
    secondaryCtaText: "View Schedule",
    secondaryCtaHref: "#schedule",
  },
  about: {
    title: "About the Retreat",
    description: [
      "Divine Connections: Servants of Allah is a four day Islamic retreat dedicated to nurturing the spiritual growth of Muslim men. Set at the beautiful Mansfield Outdoor Centre in Mulmur, Ontario, this retreat offers a unique blend of Islamic knowledge, spiritual reflection, and brotherhood in the embrace of nature.",
      "Our carefully curated program features lectures from renowned scholars, interactive workshops, guided dhikr sessions, hiking, and outdoor activities that bring you closer to Allah's creation. Whether you are a student of knowledge or just beginning your journey, this retreat is designed to meet you where you are.",
      "Step away from the distractions of daily life. Immerse yourself under the open sky, walk among the stars and trees, and leave with a renewed heart and practical tools to strengthen your deen long after the retreat ends.",
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
      "Spaces are limited. Secure your spot today and join us for four days that will strengthen your connection with Allah and your brothers in faith.",
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
