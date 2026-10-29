// Grainy mesh gradients in the ElevenLabs style: soft colour fields, film grain
// and optional contour lines. Used for card art, the hero and the closing panel.

export type GradientVariant = "dusk" | "ember" | "forest" | "ocean" | "rose" | "sand" | "mint";

const fields: Record<GradientVariant, string> = {
  dusk: [
    "radial-gradient(70% 60% at 20% 15%, #8e93c9 0%, transparent 70%)",
    "radial-gradient(60% 55% at 85% 30%, #b98bb0 0%, transparent 70%)",
    "radial-gradient(70% 60% at 70% 95%, #f39a4c 0%, transparent 70%)",
    "radial-gradient(60% 50% at 15% 85%, #df6a63 0%, transparent 70%)",
    "linear-gradient(180deg, #a48fb8 0%, #d77c6c 100%)",
  ].join(","),
  ember: [
    "radial-gradient(80% 50% at 50% 0%, #9cb6c4 0%, transparent 70%)",
    "radial-gradient(55% 40% at 20% 55%, #f2b66c 0%, transparent 70%)",
    "radial-gradient(60% 45% at 75% 60%, #e2622f 0%, transparent 70%)",
    "radial-gradient(90% 50% at 50% 100%, #2a0c12 0%, transparent 75%)",
    "linear-gradient(180deg, #8ea6b4 0%, #b8573a 55%, #2b0d12 100%)",
  ].join(","),
  forest: [
    "radial-gradient(90% 55% at 50% 0%, #c3d0dc 0%, transparent 70%)",
    "radial-gradient(70% 45% at 40% 60%, #8c9f6c 0%, transparent 70%)",
    "radial-gradient(90% 50% at 50% 100%, #15290f 0%, transparent 75%)",
    "linear-gradient(180deg, #b6c4cf 0%, #6d8452 55%, #16290f 100%)",
  ].join(","),
  ocean: [
    "radial-gradient(70% 55% at 25% 20%, #9dbbe6 0%, transparent 70%)",
    "radial-gradient(60% 50% at 80% 45%, #6f8fe0 0%, transparent 70%)",
    "radial-gradient(80% 55% at 45% 100%, #1b2758 0%, transparent 75%)",
    "linear-gradient(180deg, #86a6dc 0%, #4f6cc4 55%, #1a2552 100%)",
  ].join(","),
  rose: [
    "radial-gradient(70% 55% at 25% 15%, #f6d2c8 0%, transparent 70%)",
    "radial-gradient(60% 50% at 80% 40%, #e996ab 0%, transparent 70%)",
    "radial-gradient(80% 55% at 50% 100%, #6e2f5f 0%, transparent 75%)",
    "linear-gradient(180deg, #f1c3bd 0%, #d47896 55%, #64295a 100%)",
  ].join(","),
  sand: [
    "radial-gradient(70% 55% at 30% 15%, #f3e3c3 0%, transparent 70%)",
    "radial-gradient(60% 50% at 80% 45%, #e0b07a 0%, transparent 70%)",
    "radial-gradient(80% 55% at 45% 100%, #7a4a2a 0%, transparent 75%)",
    "linear-gradient(180deg, #ecd8b4 0%, #c98e5a 55%, #6e4024 100%)",
  ].join(","),
  mint: [
    "radial-gradient(70% 55% at 25% 15%, #d3efe4 0%, transparent 70%)",
    "radial-gradient(60% 50% at 80% 45%, #7cc7b4 0%, transparent 70%)",
    "radial-gradient(80% 55% at 50% 100%, #1d4b4a 0%, transparent 75%)",
    "linear-gradient(180deg, #c6e8dc 0%, #5aa898 55%, #1a4544 100%)",
  ].join(","),
};

// Fine film grain, drawn once as an SVG noise tile.
const grain =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

function Contours() {
  const lines = Array.from({ length: 14 }, (_, i) => i);
  return (
    <svg aria-hidden="true" viewBox="0 0 400 400" preserveAspectRatio="none" className="absolute inset-0 h-full w-full opacity-40">
      {lines.map((i) => {
        const y = 20 + i * 28;
        const a = 10 + (i % 4) * 4;
        return (
          <path
            key={i}
            d={`M-20 ${y} C 60 ${y - a}, 120 ${y + a}, 200 ${y} S 340 ${y - a}, 420 ${y}`}
            fill="none"
            stroke="white"
            strokeOpacity="0.5"
            strokeWidth="0.6"
          />
        );
      })}
    </svg>
  );
}

export function GradientArt({
  variant,
  lines = false,
  animate = false,
  className = "",
  children,
}: {
  variant: GradientVariant;
  lines?: boolean;
  /** Slow colour drift. Off by default; reserved for the few large panels. */
  animate?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`relative isolate overflow-hidden ${className}`} style={{ background: fields[variant] }}>
      {animate && (
        <div aria-hidden="true" className="drift-slow pointer-events-none absolute -inset-[20%] -z-10" style={{ background: fields[variant], opacity: 0.6 }} />
      )}
      {lines && <Contours />}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 mix-blend-overlay" style={{ backgroundImage: grain, opacity: 0.35 }} />
      {/* A soft centre shade keeps white text on light gradients readable. */}
      {children && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(60% 50% at 50% 50%, rgba(0,0,0,0.16), transparent 70%)" }} />
      )}
      <div className="relative">{children}</div>
    </div>
  );
}

// Gradient for each service category, so cards and icons share a colour language.
export const categoryVariant: Record<string, GradientVariant> = {
  Search: "ocean",
  "AI search": "dusk",
  Marketing: "rose",
  Content: "forest",
  "AI tools": "mint",
  Integrations: "sand",
};
