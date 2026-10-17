import { notFound } from "next/navigation";
import { Download } from "lucide-react";
import { getItem } from "@/lib/cms";
import Reveal from "@/components/motion/Reveal";
import { DetailHeader, Prose } from "@/components/Detail";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const pub = await getItem("publications", slug);
  if (!pub) return {};
  return { title: pub.title, description: pub.summary?.slice(0, 160) };
}

export default async function ResearchDetailPage({ params }) {
  const { slug } = await params;
  const pub = await getItem("publications", slug);
  if (!pub) notFound();

  return (
    <>
      <DetailHeader back={{ href: "/research", label: "All books" }} kicker={pub.type?.replace("_", " ")} title={pub.title} meta="By Dr. Umair Mahmood Siddiqui" />
      <section className="bg-coal pb-20">
        <Reveal as="article" className="mx-auto mt-12 grid max-w-4xl items-start gap-10 px-4 sm:px-6 md:grid-cols-[16rem_1fr]">
          {pub.coverImageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={pub.coverImageUrl}
              alt={pub.title}
              className="mx-auto w-56 rounded-r-md rounded-l-sm shadow-[12px_16px_30px_rgba(14,31,61,0.4)] md:w-full"
            />
          )}
          <div className="md:pt-10">
            {pub.summary && <p className="font-display text-2xl leading-snug text-ivory">{pub.summary}</p>}
            <Prose text={pub.content} className="mt-6" />
            {pub.fileUrl && (
              <a href={pub.fileUrl} target="_blank" rel="noopener noreferrer" className="btn-red mt-8">
                <Download size={16} /> Read / Download
              </a>
            )}
          </div>
        </Reveal>
      </section>
    </>
  );
}
