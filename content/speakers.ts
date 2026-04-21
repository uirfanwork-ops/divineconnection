export interface Speaker {
  name: string;
  title: string;
  bio: string;
  imageUrl?: string;
  topics: string[];
}

export const speakers: Speaker[] = [
  {
    name: "Sh. Sulaiman",
    title: "Scholar",
    bio: "A respected scholar known for his deep insights into Islamic spirituality and practical guidance for Muslim men navigating modern challenges. His sessions focus on the heart's connection to Allah and building a life of purpose rooted in faith.",
    topics: ["Spiritual Purification", "Islamic Identity", "Brotherhood"],
  },
  {
    name: "Sh. Omar",
    title: "Scholar",
    bio: "An engaging teacher whose sessions bridge traditional Islamic knowledge with contemporary life. Drawing from the Quran and Sunnah, he guides attendees through practical frameworks for strengthening their relationship with Allah in daily life.",
    topics: ["Quranic Guidance", "Faith in Daily Life", "Community"],
  },
  {
    name: "Sh. Yusuf",
    title: "Scholar",
    bio: "A passionate educator dedicated to making the beauty of Islamic knowledge accessible to all. His interactive sessions combine scholarly depth with relatable examples, inspiring attendees to take meaningful action in their spiritual journey.",
    topics: ["Islamic Knowledge", "Personal Growth", "Taqwa"],
  },
  {
    name: "Sh. Sohaib",
    title: "Scholar",
    bio: "An inspiring speaker whose sessions explore the intersection of faith, character, and community building. He brings a unique perspective on how the teachings of Islam can transform our relationships, families, and neighborhoods.",
    topics: ["Character Development", "Family", "Community Building"],
  },
  {
    name: "Dr. Shariq",
    title: "Speaker",
    bio: "Bringing a unique blend of academic expertise and spiritual insight, Dr. Shariq's sessions address the intellectual and practical dimensions of faith. His thought-provoking discussions encourage critical reflection and deeper understanding.",
    topics: ["Faith & Intellect", "Mental Wellness", "Purpose"],
  },
];
