import { logos, type LogoId } from "@/content/site";

// Overlapping circles of platform logos, for service cards.
export function LogoStack({ ids, max = 5 }: { ids: LogoId[]; max?: number }) {
  const shown = ids.slice(0, max);
  const rest = ids.length - shown.length;
  return (
    <span className="flex items-center" aria-label={`Covers ${ids.map((id) => logos[id].name).join(", ")}`} role="img">
      {shown.map((id, i) => (
        <span
          key={id}
          title={logos[id].name}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-[0_0_0_1.5px_#fff,0_0_0_2px_rgba(0,0,0,0.06)]"
          style={{ marginLeft: i ? -6 : 0, zIndex: shown.length - i }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logos[id].src} alt="" className="h-4 w-4 object-contain" />
        </span>
      ))}
      {rest > 0 && (
        <span className="-ml-1.5 flex h-7 min-w-7 items-center justify-center rounded-full bg-surface px-1.5 text-[11px] font-medium text-body shadow-[0_0_0_1.5px_#fff]">
          +{rest}
        </span>
      )}
    </span>
  );
}

// A single logo tile with its name, for the platforms section.
export function LogoTile({ id }: { id: LogoId }) {
  return (
    <span className="flex flex-col items-center gap-3 rounded-[20px] bg-white px-3 py-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_16px_32px_rgba(78,50,23,0.08)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logos[id].src} alt="" className="h-9 w-9 object-contain" />
      <span className="text-sm font-medium">{logos[id].name}</span>
    </span>
  );
}

// A quiet row of platform marks with names, greyscale until hovered.
export function LogoRow({ ids }: { ids: LogoId[] }) {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
      {ids.map((id) => (
        <li key={id} className="flex items-center gap-2 text-sm font-medium text-body opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logos[id].src} alt="" className="h-5 w-5 object-contain" />
          {logos[id].name}
        </li>
      ))}
    </ul>
  );
}
