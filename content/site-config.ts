export const siteConfig = {
  name: "Divine Connections: Servants of Allah",
  shortName: "Divine Connections",
  tagline: "Strengthen Your Bond with Allah and Your Brothers in Faith",
  description:
    "A transformative Islamic retreat experience designed to deepen your connection with Allah (SWT), build lasting bonds with fellow believers, and rejuvenate your spiritual journey.",
  url: "https://divineconnections.ca",
  ogImage: "/og-image.jpg",
  retreatDate: "August 15-17, 2025",
  retreatDateShort: "Aug 15-17, 2025",
  retreatLocation: "Blue Mountain Resort, Collingwood, Ontario",
  retreatVenue: "Blue Mountain Resort",
  retreatCity: "Collingwood, Ontario",
  organizerName: "Divine Connections",
  organizerEmail: "info@divineconnections.ca",
  supportEmail: "support@divineconnections.ca",
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
      "Join us for a life-changing weekend retreat in the serene mountains of Collingwood, Ontario. Reconnect with your Creator, learn from esteemed scholars, and forge bonds of brotherhood that last a lifetime.",
    ctaText: "Register Now",
    ctaHref: "/register",
    secondaryCtaText: "View Schedule",
    secondaryCtaHref: "#schedule",
  },
  about: {
    title: "About the Retreat",
    description: [
      "Divine Connections: Servants of Allah is a weekend retreat dedicated to nurturing the spiritual growth of Muslim men. Set against the beautiful backdrop of Blue Mountain Resort in Collingwood, Ontario, this retreat offers a unique blend of Islamic knowledge, spiritual reflection, and brotherhood.",
      "Our carefully curated program features lectures from renowned scholars, interactive workshops, guided dhikr sessions, and outdoor activities that bring you closer to Allah's creation. Whether you are a student of knowledge or just beginning your journey, this retreat is designed to meet you where you are.",
      "Step away from the distractions of daily life. Immerse yourself in an environment that inspires taqwa, fosters genuine connections, and leaves you with practical tools to strengthen your deen long after the retreat ends.",
    ],
  },
  venue: {
    title: "The Venue",
    name: "Blue Mountain Resort",
    address: "190 Gord Canning Dr, The Blue Mountains, ON L9Y 3Z2",
    description:
      "Nestled in the heart of Ontario's Niagara Escarpment, Blue Mountain Resort offers a breathtaking natural setting perfect for spiritual reflection. The resort features modern conference facilities, comfortable accommodations, and stunning mountain views that remind us of the magnificence of Allah's creation.",
    features: [
      "Full conference facilities with modern A/V equipment",
      "Comfortable shared and private accommodations",
      "Halal catering arranged for all meals",
      "Dedicated prayer space with wudu facilities",
      "Scenic mountain trails for reflection walks",
      "Free parking for all attendees",
    ],
    mapEmbedUrl: "",
  },
  cta: {
    title: "Ready to Transform Your Spiritual Journey?",
    description:
      "Spaces are limited. Secure your spot today and join us for a weekend that will strengthen your connection with Allah and your brothers in faith.",
    buttonText: "Register Now",
    buttonHref: "/register",
  },
  footer: {
    copyright: "Divine Connections",
    tagline: "Servants of Allah",
    links: [
      { label: "Privacy Policy", href: "/policies/privacy" },
      { label: "Terms of Service", href: "/policies/terms" },
      { label: "Refund Policy", href: "/policies/refund" },
      { label: "Code of Conduct", href: "/policies/code-of-conduct" },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
