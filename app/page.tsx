import Hero from "./sections/Hero";
import ProgramsSection from "./sections/ProgramsSection";
import CarouselSection from "./sections/CarouselSection";
import VideosSection from "./sections/VideosSection";
import PublicationsSection from "./sections/PublicationsSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import PreFooter from "./sections/PreFooter";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <ProgramsSection />
      <CarouselSection compactTop />
      <VideosSection compactTop />
      <PublicationsSection compactTop />
      <TestimonialsSection />
      <PreFooter />
    </main>
  );
}
