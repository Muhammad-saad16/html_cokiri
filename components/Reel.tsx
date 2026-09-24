"use client";

import Link from "next/link";
import { useRef, useState } from "react";

/** A vertical product video that shows its poster and only loads/plays on hover or tap. */
export default function Reel({ video, poster, title, href }: { video: string; poster: string; title: string; href: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    ref.current?.play().then(() => setPlaying(true)).catch(() => {});
  };
  const stop = () => {
    ref.current?.pause();
    setPlaying(false);
  };

  return (
    <div className="reel" onMouseEnter={play} onMouseLeave={stop}>
      <video ref={ref} src={video} poster={poster} muted loop playsInline preload="none" />
      <button
        className={`reel__play${playing ? " is-playing" : ""}`}
        onClick={() => (playing ? stop() : play())}
        aria-label={playing ? `Pause ${title} video` : `Play ${title} video`}
      >
        {playing ? "❚❚" : "▶"}
      </button>
      <Link href={href} className="reel__info">
        <strong>{title}</strong>
        <span>Shop Now →</span>
      </Link>
    </div>
  );
}
