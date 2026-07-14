interface TestimonialAvatarProps {
  color: string;
}

export default function TestimonialAvatar({ color }: TestimonialAvatarProps) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      aria-hidden="true"
      className="shrink-0 rounded-full"
    >
      <circle cx="24" cy="24" r="24" fill={color} />
      <circle cx="24" cy="19" r="8" fill="#ffffff" fillOpacity="0.9" />
      <path
        d="M8 42c1.5-9 8.5-14 16-14s14.5 5 16 14"
        fill="#ffffff"
        fillOpacity="0.9"
      />
    </svg>
  );
}
