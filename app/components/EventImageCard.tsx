import Image from "next/image";

interface EventImageCardProps {
  imageSrc: string;
  imageAlt: string;
}

export default function EventImageCard({
  imageSrc,
  imageAlt,
}: EventImageCardProps) {
  return (
    <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-lg border border-outline-variant/40 transition-all duration-200 hover:border-outline/60 hover:shadow-[0_12px_24px_-10px_rgba(75,54,33,0.08)]">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      />
    </div>
  );
}
