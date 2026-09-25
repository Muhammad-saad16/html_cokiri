// Shows the whole image — never cropped. Any leftover space in the box is
// filled with a blurred copy of the same image, so there are no empty bars.
// Size the box with `className` (e.g. "w-full h-64 rounded-xl").
export default function FitImage({ src, alt, className = "", imgClassName = "" }) {
  return (
    <div className={`relative overflow-hidden bg-neutral-200 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover scale-110 blur-xl opacity-70" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className={`relative w-full h-full object-contain ${imgClassName}`} />
    </div>
  );
}
