interface CountBadgeProps {
  count: number;
  label: string;
}

export default function CountBadge({ count, label }: CountBadgeProps) {
  return (
    <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-heritage-orange/10 px-4 py-2">
      <span className="font-hanken text-xs font-bold uppercase tracking-[0.05em] text-heritage-orange">
        {count} {label}
      </span>
    </div>
  );
}
