export interface ScheduleEvent {
  time: string;
  title: string;
  description?: string;
  speaker?: string;
  location?: string;
  type: "lecture" | "workshop" | "prayer" | "meal" | "activity" | "break" | "ceremony";
}

export interface ScheduleDay {
  date: string;
  dayLabel: string;
  title: string;
  events: ScheduleEvent[];
}

export const schedule: ScheduleDay[] = [
  {
    date: "2025-08-15",
    dayLabel: "Day 1",
    title: "Arrival and Opening",
    events: [
      {
        time: "2:00 PM",
        title: "Check-in and Registration",
        description: "Arrive at Blue Mountain Resort, collect your welcome package, and settle into your accommodations.",
        location: "Main Lobby",
        type: "break",
      },
      {
        time: "4:30 PM",
        title: "Asr Prayer",
        location: "Prayer Hall",
        type: "prayer",
      },
      {
        time: "5:00 PM",
        title: "Opening Ceremony",
        description: "Welcome address, retreat overview, Quran recitation, and introductions.",
        speaker: "Organizing Committee",
        location: "Main Hall",
        type: "ceremony",
      },
      {
        time: "6:30 PM",
        title: "Maghrib Prayer",
        location: "Prayer Hall",
        type: "prayer",
      },
      {
        time: "7:00 PM",
        title: "Dinner",
        description: "Halal catered dinner. An opportunity to meet fellow attendees.",
        location: "Dining Hall",
        type: "meal",
      },
      {
        time: "8:15 PM",
        title: "Isha Prayer and Night Reflection",
        location: "Prayer Hall",
        type: "prayer",
      },
      {
        time: "9:00 PM",
        title: "Keynote: The Servants of Allah",
        description: "An inspiring opening lecture on what it truly means to be a servant of Allah in today's world.",
        speaker: "Sheikh Ahmad Hassan",
        location: "Main Hall",
        type: "lecture",
      },
      {
        time: "10:30 PM",
        title: "Qiyam al-Layl (Optional)",
        description: "Voluntary night prayer for those who wish to stand before Allah in the stillness of the night.",
        location: "Prayer Hall",
        type: "prayer",
      },
    ],
  },
  {
    date: "2025-08-16",
    dayLabel: "Day 2",
    title: "Deep Dive",
    events: [
      {
        time: "5:30 AM",
        title: "Fajr Prayer and Morning Adhkar",
        location: "Prayer Hall",
        type: "prayer",
      },
      {
        time: "6:15 AM",
        title: "Sunrise Reflection Walk",
        description: "A guided nature walk through the mountain trails, reflecting on Allah's signs in creation.",
        location: "Mountain Trails",
        type: "activity",
      },
      {
        time: "7:30 AM",
        title: "Breakfast",
        location: "Dining Hall",
        type: "meal",
      },
      {
        time: "9:00 AM",
        title: "Session: Purification of the Heart",
        description: "Understanding and treating the spiritual diseases that distance us from Allah. Practical steps for tazkiyah (self-purification).",
        speaker: "Sheikh Ahmad Hassan",
        location: "Main Hall",
        type: "lecture",
      },
      {
        time: "10:30 AM",
        title: "Workshop: Perfecting Your Salah",
        description: "An interactive workshop focusing on khushu (humility and focus) in prayer, with practical exercises.",
        speaker: "Ustadh Bilal Mahmoud",
        location: "Workshop Room A",
        type: "workshop",
      },
      {
        time: "12:30 PM",
        title: "Dhuhr Prayer",
        location: "Prayer Hall",
        type: "prayer",
      },
      {
        time: "1:00 PM",
        title: "Lunch",
        location: "Dining Hall",
        type: "meal",
      },
      {
        time: "2:30 PM",
        title: "Session: The Quran as Your Daily Companion",
        description: "Developing a meaningful relationship with the Book of Allah. Practical tips for consistent recitation, memorization, and reflection.",
        speaker: "Qari Yusuf Ali",
        location: "Main Hall",
        type: "lecture",
      },
      {
        time: "4:00 PM",
        title: "Outdoor Activities",
        description: "Choose from group sports, hiking, or free time for personal reflection in nature.",
        location: "Resort Grounds",
        type: "activity",
      },
      {
        time: "5:00 PM",
        title: "Asr Prayer",
        location: "Prayer Hall",
        type: "prayer",
      },
      {
        time: "5:30 PM",
        title: "Workshop: Brotherhood and Community Building",
        description: "Small group discussions on building strong Muslim communities, supporting one another, and fulfilling our obligations to our brothers.",
        speaker: "Ustadh Bilal Mahmoud",
        location: "Workshop Rooms",
        type: "workshop",
      },
      {
        time: "6:45 PM",
        title: "Maghrib Prayer",
        location: "Prayer Hall",
        type: "prayer",
      },
      {
        time: "7:15 PM",
        title: "Dinner",
        location: "Dining Hall",
        type: "meal",
      },
      {
        time: "8:30 PM",
        title: "Isha Prayer",
        location: "Prayer Hall",
        type: "prayer",
      },
      {
        time: "9:00 PM",
        title: "Evening Session: Stories of the Righteous",
        description: "Inspirational stories from the lives of the Sahaba and the scholars of Islam that teach us how to navigate modern challenges.",
        speaker: "Sheikh Ahmad Hassan",
        location: "Main Hall",
        type: "lecture",
      },
      {
        time: "10:30 PM",
        title: "Qiyam al-Layl and Dua Session",
        description: "Extended night prayer followed by a collective dua session.",
        location: "Prayer Hall",
        type: "prayer",
      },
    ],
  },
  {
    date: "2025-08-17",
    dayLabel: "Day 3",
    title: "Renewal and Departure",
    events: [
      {
        time: "5:30 AM",
        title: "Fajr Prayer and Quran Recitation",
        location: "Prayer Hall",
        type: "prayer",
      },
      {
        time: "6:30 AM",
        title: "Morning Reflection",
        description: "Personal time for journaling, dhikr, and setting intentions for the journey ahead.",
        location: "Resort Grounds",
        type: "activity",
      },
      {
        time: "7:30 AM",
        title: "Breakfast",
        location: "Dining Hall",
        type: "meal",
      },
      {
        time: "9:00 AM",
        title: "Session: Living with Purpose",
        description: "Aligning your career, family life, and personal goals with your ultimate purpose as a servant of Allah.",
        speaker: "Ustadh Bilal Mahmoud",
        location: "Main Hall",
        type: "lecture",
      },
      {
        time: "10:30 AM",
        title: "Panel: Q&A with the Scholars",
        description: "An open Q&A session where attendees can ask questions on any topic related to faith, life, and personal growth.",
        speaker: "All Speakers",
        location: "Main Hall",
        type: "workshop",
      },
      {
        time: "12:00 PM",
        title: "Dhuhr Prayer",
        location: "Prayer Hall",
        type: "prayer",
      },
      {
        time: "12:30 PM",
        title: "Closing Ceremony",
        description: "Final reflections, commitments to action, exchange of contact information, and collective dua for the journey ahead.",
        speaker: "Organizing Committee",
        location: "Main Hall",
        type: "ceremony",
      },
      {
        time: "1:30 PM",
        title: "Farewell Lunch",
        description: "A final meal together before departure.",
        location: "Dining Hall",
        type: "meal",
      },
      {
        time: "3:00 PM",
        title: "Check-out and Departure",
        description: "Safe travels, and may Allah accept our efforts and keep our hearts connected.",
        location: "Main Lobby",
        type: "break",
      },
    ],
  },
];
