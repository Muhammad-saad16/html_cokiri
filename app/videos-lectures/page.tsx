import { Metadata } from "next";
import VideoGrid from "../components/VideoGrid";
import { getVideos } from "../../sanity/lib/queries";
import { getYouTubeId } from "../../sanity/lib/youtube";

export const metadata: Metadata = {
  title: "Videos & Lectures | City of Knowledge",
  description:
    "Watch lectures, seminars, and educational videos from City of Knowledge Islamic Research Institute.",
};

export default async function VideosLecturesPage() {
  const videoIds = (await getVideos()).map((v) => getYouTubeId(v.youtubeUrl));

  return (
    <main className="flex flex-col bg-paper-white">
      {/* Page Header */}
      <section className="pt-4 pb-4 md:pt-6 md:pb-6">
        <div className="mx-auto max-w-[1280px] px-5 text-center md:px-20">
          <span className="mb-4 inline-block font-hanken text-xs font-bold uppercase tracking-[0.05em] text-heritage-orange">
            Media
          </span>
          <h1 className="font-serif text-[28px] font-semibold leading-9 text-on-surface md:text-[48px] md:font-bold md:leading-[56px]">
            Videos & Lectures
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-6 text-on-surface-variant md:text-lg md:leading-7">
            A collection of recorded lectures, seminars, and educational sessions
            from the institute.
          </p>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-[1280px] px-5 md:px-20">
          <VideoGrid videoIds={videoIds} />
        </div>
      </section>
    </main>
  );
}
