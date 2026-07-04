import ImageManager from "../components/ImageManager";
import { seedEvents } from "../lib/seedData";

export default function AdminEventsPage() {
  return (
    <ImageManager
      title="Events"
      storageKey="cokri-admin-events"
      seedData={seedEvents}
    />
  );
}
