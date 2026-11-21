"use client";

import { useEffect, useState } from "react";

/** Cross-fades through several portraits (a single photo just renders). */
export default function RotatingPhoto({ photos = [], alt = "", interval = 4500, className = "" }) {
  const list = photos.filter(Boolean);
  const [i, setI] = useState(0);

  useEffect(() => {
    if (list.length < 2) return;
    const t = setInterval(() => setI((n) => (n + 1) % list.length), interval);
    return () => clearInterval(t);
  }, [list.length, interval]);

  return (
    <div className={`relative h-full w-full ${className}`}>
      {list.map((src, n) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={n === i ? alt : ""}
          aria-hidden={n !== i}
          className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-1000 ${n === i ? "opacity-100" : "opacity-0"}`}
        />
      ))}
    </div>
  );
}
