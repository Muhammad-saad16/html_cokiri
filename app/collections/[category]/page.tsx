import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CollectionView from "@/components/CollectionView";
import { CATEGORIES, CATEGORY_INFO, PRODUCTS, isCategory } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps<"/collections/[category]">): Promise<Metadata> {
  const { category } = await params;
  if (!isCategory(category)) return {};
  const info = CATEGORY_INFO[category];
  return { title: info.title, description: info.intro };
}

export default async function CollectionPage({ params }: PageProps<"/collections/[category]">) {
  const { category } = await params;
  if (!isCategory(category)) notFound();
  const info = CATEGORY_INFO[category];

  return (
    <CollectionView
      active={category}
      title={info.title}
      kicker={info.kicker}
      intro={info.intro}
      image={info.image}
      video={info.video}
      products={PRODUCTS.filter((p) => p.cat === category)}
    />
  );
}
