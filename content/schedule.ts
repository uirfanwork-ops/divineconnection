export interface ScheduleEvent {
  time: string;
  title: string;
  speaker?: string;
  type: "prayer" | "sh_sulaiman" | "sh_omar" | "sh_yusuf" | "sh_sohaib" | "dr_shariq" | "meals" | "outdoor" | "break";
}

export interface ScheduleDay {
  date: string;
  dayLabel: string;
  subtitle: string;
  events: ScheduleEvent[];
}

export const schedule: ScheduleDay[] = [
  {
    date: "2026-07-31",
    dayLabel: "Friday",
    subtitle: "Arrival Day",
    events: [
      { time: "2:00 PM", title: "Arrival", type: "break" },
      { time: "2:00 - 6:30 PM", title: "Setup & Settle In", type: "break" },
      { time: "6:30 PM", title: "Asr - Welcome & Intro", type: "prayer" },
      { time: "6:45 PM", title: "Quranic Recitation", type: "prayer" },
      { time: "7:00 PM", title: "Ust. Hassan - Intro Talk", speaker: "Ust. Hassan", type: "outdoor" },
      { time: "7:30 - 8:30 PM", title: "Dinner", type: "meals" },
      { time: "8:45 PM", title: "Maghrib", type: "prayer" },
      { time: "9:30 - 10:30 PM", title: "Sh. Sulaiman - Session 1", speaker: "Sh. Sulaiman", type: "sh_sulaiman" },
      { time: "10:30 PM", title: "Isha", type: "prayer" },
    ],
  },
  {
    date: "2026-08-01",
    dayLabel: "Saturday",
    subtitle: "Full Day",
    events: [
      { time: "4:00 AM", title: "Tahajjud", type: "prayer" },
      { time: "4:30 AM", title: "Fajr", type: "prayer" },
      { time: "4:45 - 8:00 AM", title: "Free Time / Rest", type: "break" },
      { time: "8:00 - 8:45 AM", title: "Breakfast", type: "meals" },
      { time: "9:00 - 10:30 AM", title: "Sh. Omar - Session 1", speaker: "Sh. Omar", type: "sh_omar" },
      { time: "10:30 AM - 12:00 PM", title: "Sh. Yusuf - Session 1", speaker: "Sh. Yusuf", type: "sh_yusuf" },
      { time: "12:00 - 1:00 PM", title: "Break", type: "break" },
      { time: "1:00 - 2:00 PM", title: "Lunch & Dhuhr", type: "meals" },
      { time: "2:00 - 3:00 PM", title: "Dr. Shariq - Session 1", speaker: "Dr. Shariq", type: "dr_shariq" },
      { time: "3:00 - 4:00 PM", title: "Break", type: "break" },
      { time: "4:00 - 6:00 PM", title: "Sh. Sulaiman - Session 2", speaker: "Sh. Sulaiman", type: "sh_sulaiman" },
      { time: "6:00 - 7:15 PM", title: "Sh. Sohaib - Session 1", speaker: "Sh. Sohaib", type: "sh_sohaib" },
      { time: "7:15 - 8:45 PM", title: "Break / Free Time", type: "break" },
      { time: "8:45 PM", title: "Maghrib", type: "prayer" },
      { time: "9:00 - 10:15 PM", title: "Dinner", type: "meals" },
      { time: "10:15 PM", title: "Isha", type: "prayer" },
    ],
  },
  {
    date: "2026-08-02",
    dayLabel: "Sunday",
    subtitle: "Full Day",
    events: [
      { time: "4:00 AM", title: "Tahajjud", type: "prayer" },
      { time: "4:30 AM", title: "Fajr", type: "prayer" },
      { time: "4:45 - 8:00 AM", title: "Free Time / Rest", type: "break" },
      { time: "8:00 - 8:45 AM", title: "Breakfast", type: "meals" },
      { time: "9:00 - 10:30 AM", title: "Sh. Omar - Session 2", speaker: "Sh. Omar", type: "sh_omar" },
      { time: "10:30 AM - 12:00 PM", title: "Sh. Yusuf - Session 2", speaker: "Sh. Yusuf", type: "sh_yusuf" },
      { time: "12:00 - 1:00 PM", title: "Break", type: "break" },
      { time: "1:00 - 2:00 PM", title: "Lunch & Dhuhr", type: "meals" },
      { time: "2:00 - 3:00 PM", title: "Dr. Shariq - Session 2", speaker: "Dr. Shariq", type: "dr_shariq" },
      { time: "3:00 - 4:00 PM", title: "Break", type: "break" },
      { time: "4:00 - 6:00 PM", title: "Sh. Sulaiman - Session 3", speaker: "Sh. Sulaiman", type: "sh_sulaiman" },
      { time: "6:00 - 7:15 PM", title: "Sh. Sohaib - Session 2", speaker: "Sh. Sohaib", type: "sh_sohaib" },
      { time: "7:15 - 8:45 PM", title: "Break / Free Time", type: "break" },
      { time: "8:45 PM", title: "Maghrib", type: "prayer" },
      { time: "9:00 - 10:15 PM", title: "Dinner", type: "meals" },
      { time: "10:15 PM", title: "Isha", type: "prayer" },
    ],
  },
  {
    date: "2026-08-03",
    dayLabel: "Monday",
    subtitle: "Departure Day",
    events: [
      { time: "4:00 AM", title: "Tahajjud", type: "prayer" },
      { time: "4:30 AM", title: "Fajr", type: "prayer" },
      { time: "4:45 - 8:00 AM", title: "Free Time / Rest", type: "break" },
      { time: "8:00 - 8:45 AM", title: "Breakfast", type: "meals" },
      { time: "9:00 - 10:00 AM", title: "Sh. Yusuf - Session 3", speaker: "Sh. Yusuf", type: "sh_yusuf" },
      { time: "10:00 - 11:00 AM", title: "Sh. Omar - Session 3", speaker: "Sh. Omar", type: "sh_omar" },
      { time: "11:00 - 11:15 AM", title: "Break", type: "break" },
      { time: "10:15 AM - 12:15 PM", title: "Sh. Sulaiman - Session 4", speaker: "Sh. Sulaiman", type: "sh_sulaiman" },
      { time: "12:30 - 1:15 PM", title: "Break & Lunch", type: "meals" },
      { time: "1:30 PM", title: "Farewell Talk", type: "outdoor" },
      { time: "2:45 PM", title: "Dhuhr", type: "prayer" },
      { time: "3:00 PM", title: "Departure", type: "break" },
    ],
  },
];
