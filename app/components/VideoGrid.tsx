interface VideoGridProps {
  videoIds: string[];
}

export default function VideoGrid({ videoIds }: VideoGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {videoIds.map((id) => (
        <div
          key={id}
          className="overflow-hidden rounded-lg border border-outline-variant/40 bg-surface-container-low shadow-sm"
        >
          <div className="relative aspect-video w-full">
            <iframe
              src={`https://www.youtube.com/embed/${id}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
