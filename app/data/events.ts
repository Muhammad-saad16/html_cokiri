export interface Event {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export const events: Event[] = [
  {
    title: "Weekly Qur'anic Tafsir Circle",
    date: "Every Sunday",
    time: "10:00 AM – 12:00 PM",
    location: "City of Knowledge Campus",
    description:
      "A guided study circle exploring the meanings and applications of selected Qur'anic chapters for contemporary life.",
    imageSrc: "/events/image1.png",
    imageAlt: "Weekly Qur'anic Tafsir Circle poster",
  },
  {
    title: "Seerah Lecture Series",
    date: "First Saturday of each month",
    time: "5:00 PM – 7:00 PM",
    location: "Main Auditorium",
    description:
      "Monthly lectures on the life and teachings of the Prophet Muhammad (peace be upon him) and their relevance today.",
    imageSrc: "/events/image2.png",
    imageAlt: "Seerah Lecture Series poster",
  },
  {
    title: "Research Symposium 2025",
    date: "August 15, 2025",
    time: "9:00 AM – 4:00 PM",
    location: "City of Knowledge Campus",
    description:
      "A day-long symposium bringing together scholars and students to present research on Islamic thought and contemporary issues.",
    imageSrc: "/events/image3.png",
    imageAlt: "Research Symposium poster",
  },
  {
    title: "Youth Islamic Ethics Workshop",
    date: "July 22, 2025",
    time: "2:00 PM – 5:00 PM",
    location: "Seminar Hall",
    description:
      "An interactive workshop for young adults on ethics, character building, and navigating modern challenges through Islamic principles.",
    imageSrc: "/events/image4.png",
    imageAlt: "Youth Islamic Ethics Workshop poster",
  },
  {
    title: "Family Tarbiyah Session",
    date: "July 29, 2025",
    time: "11:00 AM – 1:00 PM",
    location: "Community Hall",
    description:
      "A family-oriented session focused on nurturing faith, values, and Islamic identity within the household.",
    imageSrc: "/events/image5.png",
    imageAlt: "Family Tarbiyah Session poster",
  },
  {
    title: "Online Fiqh of Worship Course",
    date: "Starting August 5, 2025",
    time: "7:00 PM – 8:30 PM (Tuesdays)",
    location: "Online (Zoom)",
    description:
      "A four-week online course covering the essential rulings of prayer, fasting, zakat, and Hajj for everyday practice.",
    imageSrc: "/events/image6.png",
    imageAlt: "Online Fiqh of Worship Course poster",
  },
];
