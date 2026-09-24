import type { Metadata } from "next";
import CollectionView from "@/components/CollectionView";
import { PRODUCTS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shop All",
  description: "Shop Kangan jewellery, handbags, perfumes and watches with door-to-door delivery in Pakistan and Bahrain.",
};

export default function ShopPage() {
  return (
    <CollectionView
      active="all"
      title="Shop All"
      kicker="The Kangan Collection"
      intro="Jewellery, handbags, perfumes and watches — tap any piece to see it up close and place your order."
      image="/media/hero-poster.jpg"
      video="/media/hero.mp4"
      products={PRODUCTS}
    />
  );
}
