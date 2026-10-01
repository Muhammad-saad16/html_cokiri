import type { Metadata } from "next";
import CollectionView from "@/components/CollectionView";
import { getCategories, getProducts } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Shop All",
  description: "Shop Kangan jewellery, handbags, perfumes and watches with door-to-door delivery in Pakistan and Bahrain.",
};

export default async function ShopPage() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  return (
    <CollectionView
      active="all"
      categories={categories}
      title="Shop All"
      kicker="The Kangan Collection"
      intro="Jewellery, handbags, watches and perfumes — tap any piece to see it up close and place your order."
      products={products}
    />
  );
}
