export interface ScheduleEvent {
  time: string;
  title: string;
  description?: string;
  speaker?: string;
  location?: string;
  type:
    | "lecture"
    | "workshop"
    | "prayer"
    | "meal"
    | "activity"
    | "break"
    | "ceremony";
}

export interface ScheduleDay {
  date: string;
  dayLabel: string;
  title: string;
  events: ScheduleEvent[];
}

export const schedule: ScheduleDay[] = [
  {
    date: "2026-07-31",
    dayLabel: "Day 1 - Friday",
    title: "Arrival and Opening",
    events: [
      { time: "2:00 PM", title: "Check-in and Cabin Assignment", description: "Arrive at Mansfield Outdoor Centre, collect your welcome package, and settle into your cabin.", location: "Main Lodge", type: "break" },
      { time: "4:30 PM", title: "Asr Prayer", location: "Prayer Tent", type: "prayer" },
      { time: "5:00 PM", title: "Opening Ceremony", description: "Welcome address, retreat overview, Quran recitation, and introductions under the open sky.", speaker: "Organizing Committee", location: "Main Hall", type: "ceremony" },
      { time: "6:30 PM", title: "Jumu'ah Reflection and Maghrib Prayer", location: "Prayer Tent", type: "prayer" },
      { time: "7:00 PM", title: "Welcome Dinner", description: "Halal catered dinner. An opportunity to meet fellow attendees.", location: "Dining Hall", type: "meal" },
      { time: "8:15 PM", title: "Isha Prayer", location: "Prayer Tent", type: "prayer" },
      { time: "9:00 PM", title: "Keynote: The Servants of Allah", description: "An inspiring opening lecture on what it truly means to be a servant of Allah in today's world.", speaker: "Sheikh Ahmad Hassan", location: "Main Hall", type: "lecture" },
      { time: "10:30 PM", title: "Stargazing and Night Reflection", description: "Gather outside to witness the constellations and reflect on the verses of Allah in the sky.", location: "Open Field", type: "activity" },
    ],
  },
  {
    date: "2026-08-01",
    dayLabel: "Day 2 - Saturday",
    title: "Deep Dive",
    events: [
      { time: "5:00 AM", title: "Tahajjud and Fajr Prayer", location: "Prayer Tent", type: "prayer" },
      { time: "5:45 AM", title: "Sunrise Reflection Walk", description: "A guided nature walk through forest trails, reflecting on Allah's signs in creation.", location: "Forest Trails", type: "activity" },
      { time: "7:30 AM", title: "Breakfast", location: "Dining Hall", type: "meal" },
      { time: "9:00 AM", title: "Session: Purification of the Heart", description: "Understanding and treating the spiritual diseases that distance us from Allah. Practical steps for tazkiyah.", speaker: "Sheikh Ahmad Hassan", location: "Main Hall", type: "lecture" },
      { time: "10:30 AM", title: "Workshop: Perfecting Your Salah", description: "An interactive workshop focusing on khushu in prayer, with practical exercises.", speaker: "Ustadh Bilal Mahmoud", location: "Workshop Room A", type: "workshop" },
      { time: "12:30 PM", title: "Dhuhr Prayer", location: "Prayer Tent", type: "prayer" },
      { time: "1:00 PM", title: "Lunch", location: "Dining Hall", type: "meal" },
      { time: "2:30 PM", title: "Session: The Quran as Your Daily Companion", description: "Developing a meaningful relationship with the Book of Allah.", speaker: "Qari Yusuf Ali", location: "Main Hall", type: "lecture" },
      { time: "4:00 PM", title: "Outdoor Activities", description: "Choose from group sports, hiking, or free time for personal reflection in nature.", location: "Resort Grounds", type: "activity" },
      { time: "5:00 PM", title: "Asr Prayer", location: "Prayer Tent", type: "prayer" },
      { time: "5:30 PM", title: "Workshop: Brotherhood and Community Building", description: "Small group discussions on building strong Muslim communities.", speaker: "Ustadh Bilal Mahmoud", location: "Workshop Rooms", type: "workshop" },
      { time: "7:30 PM", title: "Maghrib Prayer", location: "Prayer Tent", type: "prayer" },
      { time: "7:45 PM", title: "Dinner", location: "Dining Hall", type: "meal" },
      { time: "9:15 PM", title: "Isha Prayer", location: "Prayer Tent", type: "prayer" },
      { time: "9:45 PM", title: "Evening Session: Stories of the Righteous", description: "Inspirational stories from the lives of the Sahaba and scholars of Islam.", speaker: "Sheikh Ahmad Hassan", location: "Main Hall", type: "lecture" },
      { time: "11:00 PM", title: "Bonfire and Brotherhood Circle", description: "Gather around the fire for informal discussions and strengthening of bonds.", location: "Fire Pit", type: "activity" },
    ],
  },
  {
    date: "2026-08-02",
    dayLabel: "Day 3 - Sunday",
    title: "Renewal",
    events: [
      { time: "5:00 AM", title: "Tahajjud and Fajr Prayer", location: "Prayer Tent", type: "prayer" },
      { time: "6:30 AM", title: "Morning Reflection", description: "Personal time for journaling, dhikr, and setting intentions for the journey ahead.", location: "Resort Grounds", type: "activity" },
      { time: "7:30 AM", title: "Breakfast", location: "Dining Hall", type: "meal" },
      { time: "9:00 AM", title: "Session: Living with Purpose", description: "Aligning your career, family life, and personal goals with your ultimate purpose as a servant of Allah.", speaker: "Ustadh Bilal Mahmoud", location: "Main Hall", type: "lecture" },
      { time: "10:30 AM", title: "Group Hike and Reflection", description: "A longer guided hike through the Mansfield trails, with stops for reflection and dhikr.", location: "Forest Trails", type: "activity" },
      { time: "12:30 PM", title: "Dhuhr Prayer", location: "Prayer Tent", type: "prayer" },
      { time: "1:00 PM", title: "Lunch", location: "Dining Hall", type: "meal" },
      { time: "2:30 PM", title: "Panel: Q&A with the Scholars", description: "An open Q&A where attendees can ask questions on any topic related to faith, life, and personal growth.", speaker: "All Speakers", location: "Main Hall", type: "workshop" },
      { time: "4:00 PM", title: "Sports and Recreation", description: "Group sports, team building games, or quiet time in nature.", location: "Sports Field", type: "activity" },
      { time: "5:15 PM", title: "Asr Prayer", location: "Prayer Tent", type: "prayer" },
      { time: "5:45 PM", title: "Workshop: Family, Marriage, and Responsibility", description: "Practical Islamic guidance on marriage, fatherhood, and family life.", speaker: "Sheikh Ahmad Hassan", location: "Workshop Room A", type: "workshop" },
      { time: "7:30 PM", title: "Maghrib Prayer", location: "Prayer Tent", type: "prayer" },
      { time: "7:45 PM", title: "Dinner", location: "Dining Hall", type: "meal" },
      { time: "9:15 PM", title: "Isha Prayer", location: "Prayer Tent", type: "prayer" },
      { time: "9:45 PM", title: "Dhikr Circle and Dua Session", description: "Extended collective remembrance and supplication under the stars.", location: "Open Field", type: "prayer" },
    ],
  },
  {
    date: "2026-08-03",
    dayLabel: "Day 4 - Monday",
    title: "Departure",
    events: [
      { time: "5:00 AM", title: "Tahajjud and Fajr Prayer", location: "Prayer Tent", type: "prayer" },
      { time: "7:00 AM", title: "Breakfast", location: "Dining Hall", type: "meal" },
      { time: "8:30 AM", title: "Final Session: Carrying It Home", description: "How to take the lessons of the retreat into your daily life, family, and community.", speaker: "Ustadh Bilal Mahmoud", location: "Main Hall", type: "lecture" },
      { time: "10:00 AM", title: "Closing Ceremony", description: "Final reflections, commitments to action, exchange of contact information, and collective dua for the journey ahead.", speaker: "Organizing Committee", location: "Main Hall", type: "ceremony" },
      { time: "11:30 AM", title: "Cabin Cleanup and Packing", location: "Cabins", type: "break" },
      { time: "12:30 PM", title: "Dhuhr Prayer", location: "Prayer Tent", type: "prayer" },
      { time: "1:00 PM", title: "Farewell Lunch", description: "A final meal together before departure.", location: "Dining Hall", type: "meal" },
      { time: "2:30 PM", title: "Check-out and Departure", description: "Safe travels, and may Allah accept our efforts and keep our hearts connected.", location: "Main Lodge", type: "break" },
    ],
  },
];
