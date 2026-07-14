export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatarColor: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Ahmed Raza",
    role: "Shariah Diploma Graduate",
    quote:
      "The One-Year Shariah Diploma gave me a foundation I could not have built on my own. The teachers are patient, knowledgeable, and genuinely invested in every student's growth.",
    avatarColor: "#d97706",
  },
  {
    name: "Fatima Sheikh",
    role: "Parent of a Student",
    quote:
      "Sending my son to City of Knowledge was one of the best decisions we made as a family. He has grown in character as much as in knowledge.",
    avatarColor: "#4b3621",
  },
  {
    name: "Bilal Hussain",
    role: "Ilm-e-Din Course Alumnus",
    quote:
      "The Ilm-e-Din course is structured beautifully for people balancing work and study. I finished it feeling confident in essentials I had always wanted to learn properly.",
    avatarColor: "#1f2937",
  },
  {
    name: "Ayesha Malik",
    role: "Weekly Tafsir Circle Attendee",
    quote:
      "Every session of the Tafsir circle leaves me with something practical to reflect on. The scholars explain complex ideas in a way that stays with you all week.",
    avatarColor: "#725a42",
  },
  {
    name: "Usman Tariq",
    role: "Research Symposium Participant",
    quote:
      "Presenting at the Research Symposium connected me with scholars and students who share the same passion for Islamic thought and contemporary research.",
    avatarColor: "#8d4b00",
  },
  {
    name: "Zainab Qureshi",
    role: "Dars-e-Qur'an & Sirah Student",
    quote:
      "I have attended many study circles over the years, but the depth and warmth of teaching here is unmatched. It truly feels like a city built around knowledge.",
    avatarColor: "#525c6d",
  },
];
