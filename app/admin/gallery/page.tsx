import ImageManager from "../components/ImageManager";
import { seedGallery } from "../lib/seedData";

export default function AdminGalleryPage() {
  return (
    <ImageManager
      title="Gallery"
      storageKey="cokri-admin-gallery"
      seedData={seedGallery}
    />
  );
}
