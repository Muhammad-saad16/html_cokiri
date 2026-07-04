import ImageManager from "../components/ImageManager";
import { seedSlideshow } from "../lib/seedData";

export default function AdminSlideshowPage() {
  return (
    <ImageManager
      title="Slideshow"
      storageKey="cokri-admin-slideshow"
      seedData={seedSlideshow}
      showReorder
    />
  );
}
