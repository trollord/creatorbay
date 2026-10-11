import { useId } from "react";

// Flat SVG of the Creator Bay "B", using the same coordinates as the 3D mark, with the
// logo's isometric extrusion faked by stacking the body up and to the right.
const BODY =
  "M-30 73L30 73Q50 73 50 53L50 12L29 0L44 -15L44 -53Q44 -73 24 -73L-30 -73Q-50 -73 -50 -53L-50 53Q-50 73 -30 73Z";
const FACE =
  "M-27 62L27 62Q39 62 39 50L39 10.5L7.7 4.5L-22.3 30A2.6 2.6 0 0 1 -25.7 26L4.3 0.5L33 -11.5L33 -50Q33 -62 21 -62L-27 -62Q-39 -62 -39 -50L-39 50Q-39 62 -27 62Z";

export default function BLogo({
  className,
  body = "#1d1d1d",
  face = "#ffffff",
  title = "Creator Bay",
}: {
  className?: string;
  body?: string;
  face?: string;
  title?: string;
}) {
  const id = useId();
  const steps = Array.from({ length: 12 }, (_, i) => 12 - i);
  return (
    <svg viewBox="-54 -88 122 166" className={className} role="img" aria-label={title}>
      <defs>
        <path id={`${id}b`} d={BODY} />
      </defs>
      {steps.map((k) => (
        <use key={k} href={`#${id}b`} x={k * 1.1} y={-k * 0.95} fill={body} />
      ))}
      <use href={`#${id}b`} fill={body} />
      <path d={FACE} fill={face} />
    </svg>
  );
}
