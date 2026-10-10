import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CollectionView from "@/components/CollectionView";
import { getCategories, getProducts } from "@/lib/data";

export async function generateMetadata({ params }: PageProps<"/collections/[category]">): Promise<Metadata> {
  const { category } = await params;
  const info = (await getCategories()).find((c) => c.slug === category);
  return info ? { title: info.title, description: info.intro } : {};
}

export default async function CollectionPage({ params }: PageProps<"/collections/[category]">) {
  const { category } = await params;
  const [categories, products] = await Promise.all([getCategories(), getProducts(category)]);
  const info = categories.find((c) => c.slug === category);
  if (!info) notFound();

  return (
    <CollectionView
      active={info.slug}
      categories={categories}
      title={info.title}
      kicker={info.kicker}
      intro={info.intro}
      products={products}
    />
  );
}
