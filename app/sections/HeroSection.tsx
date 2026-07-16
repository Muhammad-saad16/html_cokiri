import Hero from "./Hero";
import { getHeroSlides } from "../../sanity/lib/queries";
import { urlFor } from "../../sanity/lib/image";

export default async function HeroSection() {
  const slides = (await getHeroSlides()).map((slide) => ({
    src: urlFor(slide.image).width(1600).height(900).url(),
    alt: slide.alt,
  }));

  return <Hero slides={slides} />;
}
