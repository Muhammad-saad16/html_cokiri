import ImageManager from "../components/ImageManager";
import { seedPrograms } from "../lib/seedData";

export default function AdminProgramsPage() {
  return (
    <ImageManager
      title="Programs"
      storageKey="cokri-admin-programs"
      seedData={seedPrograms}
    />
  );
}
