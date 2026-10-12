"use client";

import Image, { type ImageLoader, type ImageProps } from "next/image";

// Unsplash resizes on its own CDN, so ask it for the right width directly
// instead of routing through the Next.js image optimizer.
const unsplashLoader: ImageLoader = ({ src, width, quality }) =>
  `${src}&w=${width}&q=${quality ?? 75}`;

export default function Img(props: ImageProps) {
  const src = typeof props.src === "string" ? props.src : "";
  const isUnsplash = src.startsWith("https://images.unsplash.com/");
  // Our own photos are already small, compressed JPEGs (re-encoding them makes them
  // blocky), and photo links pasted in the admin panel can be on any website,
  // so everything except Unsplash is served as-is.
  return <Image {...props} loader={isUnsplash ? unsplashLoader : undefined} unoptimized={props.unoptimized ?? !isUnsplash} />;
}
