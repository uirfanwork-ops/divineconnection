export interface Speaker {
  name: string;
  title: string;
  bio: string;
  imageUrl?: string;
  topics: string[];
  sessionTitle?: string;
}

export const speakers: Speaker[] = [
  {
    name: "Sh. Sulaiman Moola",
    title: "Keynote Scholar",
    bio: "A world-renowned scholar whose depth of knowledge and masterful delivery will bring the verses of Sūrah Al-Furqān to life. His intensive tafsīr sessions on the ʿIbād ur Raḥmān form the heart of the retreat program.",
    sessionTitle: "Intensive Tafsīr: ʿIbād ur Raḥmān (Sūrah Al-Furqān, 63–76)",
    topics: ["Tafsir", "Spiritual Purification", "Islamic Identity"],
  },
  {
    name: "Sh. Omar",
    title: "Scholar",
    bio: "An engaging teacher whose sessions bridge traditional Islamic knowledge with contemporary life. Drawing from the Quran and Sunnah, he guides attendees through practical frameworks for strengthening their relationship with Allah in daily life.",
    sessionTitle: "Faith in Action: Living the Quran Daily",
    topics: ["Quranic Guidance", "Faith in Daily Life"],
  },
  {
    name: "Sh. Yusuf",
    title: "Scholar",
    bio: "A passionate educator dedicated to making the beauty of Islamic knowledge accessible to all. His interactive sessions combine scholarly depth with relatable examples, inspiring attendees to take meaningful action in their spiritual journey.",
    sessionTitle: "The Path of Taqwa: Practical Steps to God-Consciousness",
    topics: ["Islamic Knowledge", "Personal Growth"],
  },
  {
    name: "Sh. Sohaib",
    title: "Scholar",
    bio: "An inspiring speaker whose sessions explore the intersection of faith, character, and community building. He brings a unique perspective on how the teachings of Islam can transform our relationships, families, and neighborhoods.",
    sessionTitle: "Building Bonds: Brotherhood, Family, and Community",
    topics: ["Character Development", "Family", "Community Building"],
  },
  {
    name: "Dr. Shariq",
    title: "Speaker",
    bio: "Bringing a unique blend of academic expertise and spiritual insight, Dr. Shariq's sessions address the intellectual and practical dimensions of faith. His thought-provoking discussions encourage critical reflection and deeper understanding.",
    sessionTitle: "Mind and Soul: Integrating Faith with Modern Life",
    topics: ["Faith & Intellect", "Mental Wellness"],
  },
];
