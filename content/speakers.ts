export interface Speaker {
  name: string;
  title: string;
  bio: string;
  imageUrl?: string;
  topics: string[];
}

export const speakers: Speaker[] = [
  {
    name: "Sheikh Ahmad Hassan",
    title: "Keynote Speaker",
    bio: "Sheikh Ahmad Hassan is a graduate of the Islamic University of Madinah with over 20 years of experience in Islamic education and community leadership. He serves as the resident scholar at the Ottawa Islamic Centre and is known for his ability to connect traditional Islamic scholarship with the realities of life in the West. His lectures on spiritual purification and the Seerah have inspired thousands across North America.",
    topics: [
      "Purification of the Heart",
      "The Servants of Allah",
      "Stories of the Righteous",
    ],
  },
  {
    name: "Ustadh Bilal Mahmoud",
    title: "Workshop Facilitator",
    bio: "Ustadh Bilal Mahmoud is a community educator and youth mentor based in Toronto. With a background in counseling and Islamic studies, he specializes in practical workshops that help Muslims apply their faith in everyday life. He has led retreats and seminars across Canada and is passionate about building strong, connected Muslim communities.",
    topics: [
      "Perfecting Your Salah",
      "Brotherhood and Community Building",
      "Living with Purpose",
    ],
  },
  {
    name: "Qari Yusuf Ali",
    title: "Quran Instructor",
    bio: "Qari Yusuf Ali is a certified Quran reciter with ijazah in multiple qira'at (modes of recitation). Born and raised in Montreal, he has dedicated his life to teaching the Quran and making its beauty accessible to all. He currently leads Quran programs at several masajid in the GTA and has a special talent for helping adults develop a daily connection with the Book of Allah.",
    topics: [
      "The Quran as Your Daily Companion",
      "Tajweed Fundamentals",
    ],
  },
];
