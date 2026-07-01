export interface Program {
  title: string;
  description: string;
  duration: string;
  eligibility: string;
  audience?: string;
  format?: string;
  href?: string;
}

export const programs: Program[] = [
  {
    title: "One-Year Shariah Diploma",
    description:
      "A comprehensive diploma covering foundational Islamic sciences, including Fiqh, Hadith, Qur'anic studies, and Islamic ethics for serious learners.",
    duration: "1 Year",
    eligibility: "Open to men and women with basic Islamic literacy",
    audience: "Aspiring students and working professionals",
    format: "On-campus",
    href: "/apply/shariah-diploma",
  },
  {
    title: "Ilm-e-Din Course",
    description:
      "A structured foundational course designed to strengthen essential beliefs, worship, and daily Islamic practices for learners from all walks of life.",
    duration: "6 Months",
    eligibility: "Open to all men and women",
    audience: "Beginners and lifelong learners",
    format: "On-campus",
    href: "/apply/ilm-e-din",
  },
  {
    title: "Dars-e-Qur'an & Sirah",
    description:
      "Weekly study circles exploring the Qur'an and the life of the Prophet Muhammad (peace be upon him) with practical, contemporary relevance.",
    duration: "Ongoing (Weekly)",
    eligibility: "Open to all",
    audience: "Local community members and seekers",
    format: "On-campus / Online",
  },
  {
    title: "4-Year Dars-e-Nizami (Aalim)",
    description:
      "A classical Aalim program covering the traditional Dars-e-Nizami curriculum with modern academic engagement for male students.",
    duration: "4 Years",
    eligibility: "Male students with commitment to full-time study",
    audience: "Aspiring scholars",
    format: "On-campus",
    href: "/apply/dars-e-nizami",
  },
  {
    title: "Dars-e-Nizami for Professionals",
    description:
      "A part-time evening Aalim program tailored for working professionals who wish to pursue advanced Islamic studies alongside their careers.",
    duration: "4 Years (Part-time)",
    eligibility: "Working male professionals",
    audience: "Professionals seeking structured part-time learning",
    format: "On-campus (Evenings)",
    href: "/apply/dars-e-nizami-professionals",
  },
  {
    title: "Online Learning",
    description:
      "Recorded lectures, webinars, and digital courses allowing global learners to access authentic Islamic education from anywhere in the world.",
    duration: "Self-paced / Scheduled",
    eligibility: "Open to all",
    audience: "Online and global learners",
    format: "Online",
    href: "/apply/online-learning",
  },
];
