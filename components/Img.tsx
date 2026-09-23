"use client";

import Image, { type ImageLoader, type ImageProps } from "next/image";

// Unsplash resizes on its own CDN, so ask it for the right width directly
// instead of routing through the Next.js image optimizer.
const unsplashLoader: ImageLoader = ({ src, width, quality }) =>
  `${src}&w=${width}&q=${quality ?? 75}`;

export default function Img(props: ImageProps) {
  const isUnsplash = typeof props.src === "string" && props.src.startsWith("https://images.unsplash.com/");
  return <Image {...props} loader={isUnsplash ? unsplashLoader : undefined} />;
}
