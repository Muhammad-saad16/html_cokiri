import Hero from "./sections/Hero";
import ProgramsSection from "./sections/ProgramsSection";
import EventsSection from "./sections/EventsSection";
import PreFooter from "./sections/PreFooter";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <ProgramsSection />
      <EventsSection />
      <PreFooter />
    </main>
  );
}
