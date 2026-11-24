export type SpeakerId = "omar" | "yusuf" | "farah" | "sohaib" | "hassan";

export interface CdSpeaker {
  id: SpeakerId;
  honorific: string;
  name: string;
  fullName: string;
  image: string;
  bio: string;
}

export interface CdSession {
  title: string;
  description?: string;
  speakers: SpeakerId[];
  closingDuaBy?: SpeakerId;
}

export const cdEvent = {
  slug: "contemplating-death",
  title: "Contemplating Death",
  kicker: "A one day knowledge seminar with Mathabah",
  verse: "“Every soul shall taste death.”",
  verseReference: "Qur’an 21:35",
  dateLabel: "Saturday, January 16, 2027",
  dateIso: "2027-01-16",
  startIso: "2027-01-16T11:00:00-05:00",
  endIso: "2027-01-16T19:00:00-05:00",
  startLabel: "11 AM",
  endLabel: "7 PM",
  timezoneLabel: "ET",
  venueName: "Jame Masjid",
  venueAddress: "5761 Coopers Ave, Mississauga, ON L4Z 1R9",
  venueMapUrl:
    "https://www.google.com/maps/search/?api=1&query=5761+Coopers+Ave+Mississauga+ON+L4Z+1R9",
  priceCents: 5000,
  currency: "CAD",
  contactEmail: "irfan@mathabah.org",
  reflectionHeading:
    "If today were your last day, would you be ready to meet Allah?",
  lunchNote:
    "Lunch served by Al-Dar Catering: An authentic taste of Palestinian cuisine in the heart of Canada. In support of Palestinian Refugees in Canada.",
} as const;

export const cdSpeakers: CdSpeaker[] = [
  {
    id: "omar",
    honorific: "Shaykh",
    name: "Omar Subedar",
    fullName: "Shaykh Omar Subedar",
    image: "/contemplating-death/omar.webp",
    bio: "Shaykh Omar Subedar was born and raised in the Greater Toronto Area, Canada. In 1990, he enrolled at the Institute of Islamic Education in Dewsbury, West Yorkshire, United Kingdom, where he memorized the Qur’an in 1993. He subsequently completed a seven-year Dars-i Nizami program, graduating in 2001 and receiving the designation of Scholar of Islamic Sciences and Arabic Literature. Shaykh Omar currently serves as the Director of Mathabah Institute, CEO of Bukhari Academy, Chief Operating Officer of the Halal Monitoring Authority and a Khateeb at Bramalea Islamic Cultural Centre. He is also the founder of Muslims4Canada and has authored several books, including The First Steps in Practising Islam, Plan Your Day the Prophet’s Way, How to Live the Life of the Prophet ﷺ, Rethink Your World and his commentary on Sahih al-Bukhari.",
  },
  {
    id: "yusuf",
    honorific: "Mufti",
    name: "Yūsuf Badāt",
    fullName: "Mufti Yūsuf Badāt",
    image: "/contemplating-death/yusuf.webp",
    bio: "Mufti Yūsuf Badāt is the main Imam at the Islamic Foundation of Toronto, where he provides spiritual leadership and guidance to the community. He also serves as a director and instructor at Mathabah Institute and is the President of Imam Services Inc. Mufti Yūsuf began his scholarly journey by memorizing the Qur’an at age fourteen and later completed a six-year ‘alim course at Darul Uloom Zakariya in South Africa, graduating in 1998. He holds a jurisprudence authorization (ifta) from Darul Ilm Birmingham in the UK and has received formal authorizations in hadith under the guidance of the Grand Mufti of South Africa, Mufti Radha-ul-Haq. In addition, Mufti Yūsuf is an Ontario registered minister of religion, a licensed marriage officer, and a certified mediator. He also holds a diploma from the Toronto School of Business.",
  },
  {
    id: "farah",
    honorific: "Dr.",
    name: "Farah Islam",
    fullName: "Dr. Farah Islam",
    image: "/contemplating-death/farah.webp",
    bio: "Dr. Farah Islam is a dedicated professor, researcher, and passionate mental health advocate. She is currently a student in the Scholar of Islamic Sciences ‘Alimiyyah program at Mathabah Institute. Dr. Farah is also a postdoctoral fellow in the Social Aetiology of Mental Illness program at the Centre for Addiction and Mental Health and the University of Toronto. Her research focuses on mental health concerns and barriers to service for racialized and migrant communities, with a special emphasis on South Asian and Muslim populations. She uplifts and supports women as Outreach Director and Educator at Rahmah Inclusive Education. In addition, she lends her expertise as an advisor to the Nisa Foundation, Ruh Care, and ABRAR Trauma and Mental Health Services.",
  },
  {
    id: "sohaib",
    honorific: "Shaykh",
    name: "Sohaib Zuberi",
    fullName: "Shaykh Sohaib Zuberi",
    image: "/contemplating-death/sohaib.webp",
    bio: "Shaykh Sohaib Zuberi completed his memorization of the Qur’an while studying Business Economics at York University. After graduating from university, he completed a course in management from Cornell University and obtained a teaching certification from Cambridge University. He subsequently pursued Islamic sciences at Al-Rashid Islamic Institute, where he completed a rigorous seven-year Ālim program, followed by iftaa studies in Islamic jurisprudence at Jamia Qasim ul Uloom in Scarborough, Ontario. Shaykh Sohaib serves as a Philanthropy and Partnership Manager at Islamic Relief Canada and is an instructor at Mathabah Learning Centre. He is also a volunteer Imam and community educator who regularly delivers khutbahs, teaches Islamic courses and leads halaqas throughout the Greater Toronto Area.",
  },
  {
    id: "hassan",
    honorific: "Ustadh",
    name: "Hassan Syed",
    fullName: "Ustadh Hassan Syed",
    image: "/contemplating-death/hassan.webp",
    bio: "Ustadh Hassan Syed was raised in Toronto and studied Theoretical Mathematics at the University of Waterloo and Psychology at York University before pursuing graduate certification as a Life Coach. He received his traditional ijazah in the Islamic sciences from Shaykh Nūr al-Dīn al-Ṣādiq of Syria through private studies. He subsequently pursued further studies in Arabic and Islamic sciences through Cambridge Islamic College under the tutelage of Shaykh Muhammad Akram Nadwi, earning diplomas in Arabic and Islamic Studies, Classical Islamic Texts and Islamic Spiritual Texts, among other studies. He has also pursued studies in Qur’anic exegesis, Tajweed and Qira’at, and continues his studies through Mathabah Learning Centre and Irshad Centre for Hanafi Studies. Since 2012, Ustadh Hassan has served the community through Friday and Eid prayers, academic seminars and educational programming throughout the Greater Toronto Area and beyond.",
  },
];

/** Sessions before lunch, then sessions after lunch. */
export const cdMorningSessions: CdSession[] = [
  {
    title: "The Reality of Time: Introduction",
    description:
      "Qur’anic reflections (3:185, 3:145) and Hadith on the blessings of health and free time (Ṣaḥīḥ al-Bukhārī, 6412). Includes an engagement activity.",
    speakers: ["hassan"],
  },
  {
    title: "How the Sahabah Viewed Death",
    description: "Using examples of a male and female Companion.",
    speakers: ["yusuf"],
  },
  {
    title:
      "Keeping Death Close: Reflecting on Grief and the End of Life Through a Psychospiritual Lens",
    description:
      "Islamic teachings, personal reflections, community case studies and mental health research exploring how contemplating death can transform the way we live, grow and prepare for our return to Allah. Includes an engagement activity.",
    speakers: ["farah"],
  },
];

export const cdAfternoonSessions: CdSession[] = [
  {
    title: "Etiquettes of Dealing with Death",
    speakers: ["omar"],
  },
  {
    title: "The Qur’an on Death",
    description:
      "Reflections on remembering death, living for Allah and the glad tidings of the righteous (Qur’an 6:162 and 16:32, with a narration from Ibn Mājah).",
    speakers: ["sohaib"],
  },
  {
    title: "Lessons from the Death of the Prophet ﷺ",
    speakers: ["omar"],
  },
  {
    title: "Wrap-Up: Conclusions & Takeaways",
    speakers: ["hassan", "omar"],
    closingDuaBy: "yusuf",
  },
];

export const cdSourceOptions = [
  { value: "social", label: "Social media" },
  { value: "friend", label: "Friend or family" },
  { value: "masjid", label: "Masjid" },
  { value: "other", label: "Other" },
] as const;

export function getCdSpeaker(id: SpeakerId): CdSpeaker {
  const speaker = cdSpeakers.find((s) => s.id === id);
  if (!speaker) throw new Error(`Unknown speaker: ${id}`);
  return speaker;
}
