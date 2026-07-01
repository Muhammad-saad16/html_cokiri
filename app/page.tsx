import Hero from "./sections/Hero";
import ProgramsSection from "./sections/ProgramsSection";
import EventsSection from "./sections/EventsSection";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <ProgramsSection />
      <EventsSection />
    </main>
  );
}
