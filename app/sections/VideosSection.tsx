import Link from "next/link";
import VideoGrid from "../components/VideoGrid";
import { getVideos, getHomepage } from "../../sanity/lib/queries";
import { getYouTubeId } from "../../sanity/lib/youtube";

interface VideosSectionProps {
  compactTop?: boolean;
}

export default async function VideosSection({ compactTop = false }: VideosSectionProps) {
  const [videos, homepage] = await Promise.all([getVideos(), getHomepage()]);
  const featuredVideos = videos.slice(0, 8).map((v) => getYouTubeId(v.youtubeUrl));
  const sectionTitle = homepage?.videoSectionTitle || "Videos & Lectures";

  return (
    <section
      className={`pb-16 md:pb-24 ${
        compactTop ? "pt-0" : "pt-16 md:pt-24"
      }`}
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-20">
        {/* Header */}
        <div className="mb-10 text-center md:mb-12">
          <span className="mb-4 inline-block font-hanken text-xs font-bold uppercase tracking-[0.05em] text-heritage-orange">
            Media
          </span>
          <h2 className="font-serif text-[28px] font-semibold leading-9 text-on-surface md:text-[40px] md:leading-[48px]">
            {sectionTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-6 text-on-surface-variant md:text-lg md:leading-7">
            Watch recorded lectures, seminars, and educational sessions from the
            institute.
          </p>
        </div>

        {/* Featured Videos Grid */}
        <VideoGrid videoIds={featuredVideos} />

        {/* Explore More */}
        <div className="mt-10 flex justify-center md:mt-12">
          <Link
            href="/videos-lectures"
            className="inline-flex h-12 items-center justify-center rounded bg-heritage-orange px-6 font-hanken text-xs font-bold uppercase tracking-[0.05em] text-paper-white transition-colors duration-200 hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-orange focus-visible:ring-offset-2 focus-visible:ring-offset-paper-white"
          >
            Explore More
          </Link>
        </div>
      </div>
    </section>
  );
}
