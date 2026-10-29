// Line illustrations. Every stroked shape uses pathLength="1" so the `.draw`
// class can animate it in (see globals.css).

const line = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  pathLength: 1,
};

function Warm({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffc48c" />
        <stop offset="55%" stopColor="#c9b8ff" />
        <stop offset="100%" stopColor="#96beff" />
      </linearGradient>
    </defs>
  );
}

/* How it works */

export function StepTalk() {
  return (
    <svg viewBox="0 0 200 120" className="draw h-full w-full text-ink" aria-hidden="true">
      <Warm id="g-talk" />
      <rect x="20" y="18" width="104" height="44" rx="22" fill="url(#g-talk)" opacity="0.35" />
      <rect x="20" y="18" width="104" height="44" rx="22" {...line} />
      <path d="M44 62 L38 76 L58 62" {...line} />
      <line x1="42" y1="40" x2="102" y2="40" {...line} opacity="0.5" />
      <rect x="84" y="66" width="96" height="40" rx="20" {...line} />
      <circle cx="114" cy="86" r="3" {...line} />
      <circle cx="132" cy="86" r="3" {...line} />
      <circle cx="150" cy="86" r="3" {...line} />
    </svg>
  );
}

export function StepBuild() {
  return (
    <svg viewBox="0 0 200 120" className="draw h-full w-full text-ink" aria-hidden="true">
      <Warm id="g-build" />
      <rect x="24" y="12" width="152" height="96" rx="10" {...line} />
      <line x1="24" y1="28" x2="176" y2="28" {...line} />
      <circle cx="34" cy="20" r="2" {...line} />
      <circle cx="42" cy="20" r="2" {...line} />
      <rect x="38" y="40" width="72" height="30" rx="6" fill="url(#g-build)" opacity="0.4" />
      <line x1="38" y1="44" x2="96" y2="44" {...line} />
      <line x1="38" y1="54" x2="104" y2="54" {...line} opacity="0.5" />
      <rect x="38" y="62" width="30" height="10" rx="5" {...line} />
      <rect x="120" y="40" width="42" height="32" rx="6" {...line} />
      <rect x="38" y="82" width="36" height="16" rx="4" {...line} />
      <rect x="82" y="82" width="36" height="16" rx="4" {...line} />
      <rect x="126" y="82" width="36" height="16" rx="4" {...line} />
    </svg>
  );
}

export function StepGrow() {
  return (
    <svg viewBox="0 0 200 120" className="draw h-full w-full text-ink" aria-hidden="true">
      <Warm id="g-grow" />
      <path d="M28 96 C60 92 70 74 96 70 S140 44 172 22 L172 100 L28 100 Z" fill="url(#g-grow)" opacity="0.35" />
      <line x1="28" y1="100" x2="176" y2="100" {...line} opacity="0.5" />
      <line x1="28" y1="16" x2="28" y2="100" {...line} opacity="0.5" />
      <path d="M28 96 C60 92 70 74 96 70 S140 44 172 22" {...line} />
      <circle cx="172" cy="22" r="4" fill="currentColor" />
    </svg>
  );
}

/* Service categories */

export function CategoryIcon({ category }: { category: string }) {
  const common = { viewBox: "0 0 40 40", className: "draw h-10 w-10 text-ink", "aria-hidden": true } as const;
  switch (category) {
    case "Website":
      return (
        <svg {...common}>
          <rect x="5" y="8" width="30" height="24" rx="4" {...line} />
          <line x1="5" y1="14" x2="35" y2="14" {...line} />
          <rect x="10" y="19" width="12" height="8" rx="2" {...line} />
          <line x1="26" y1="20" x2="30" y2="20" {...line} />
          <line x1="26" y1="25" x2="30" y2="25" {...line} />
        </svg>
      );
    case "Search":
      return (
        <svg {...common}>
          <circle cx="17" cy="17" r="9" {...line} />
          <line x1="24" y1="24" x2="33" y2="33" {...line} />
          <path d="M17 12.5 a3.5 3.5 0 0 1 3.5 3.5 c0 3 -3.5 6 -3.5 6 s-3.5 -3 -3.5 -6 a3.5 3.5 0 0 1 3.5 -3.5 Z" {...line} />
        </svg>
      );
    case "Marketing":
      return (
        <svg {...common}>
          <path d="M8 16 L8 24 L13 24 L26 31 L26 9 L13 16 Z" {...line} />
          <path d="M30 15 C32 17 32 23 30 25" {...line} />
          <path d="M13 24 L15 32 L19 32 L17 24" {...line} />
        </svg>
      );
    case "Content":
      return (
        <svg {...common}>
          <rect x="5" y="12" width="30" height="20" rx="4" {...line} />
          <path d="M14 12 L16 8 L24 8 L26 12" {...line} />
          <circle cx="20" cy="22" r="5.5" {...line} />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M20 5 C21 14 26 19 35 20 C26 21 21 26 20 35 C19 26 14 21 5 20 C14 19 19 14 20 5 Z" {...line} />
          <path d="M31 6 C31.4 8.6 32.4 9.6 35 10 C32.4 10.4 31.4 11.4 31 14 C30.6 11.4 29.6 10.4 27 10 C29.6 9.6 30.6 8.6 31 6 Z" {...line} />
        </svg>
      );
  }
}

/* Hero: floating cards showing what the work does for a business. */

export function MapsCard() {
  return (
    <div className="w-60 rounded-2xl bg-white/90 p-4 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_12px_32px_rgba(78,50,23,0.10)] backdrop-blur">
      <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/google.svg" alt="" className="h-3 w-3" />
        Local search
      </p>
      <div className="mt-3 flex items-center gap-3">
        <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-white">
          <span className="pulse-ring absolute inset-0 rounded-full bg-ink/30" />
          <svg viewBox="0 0 16 16" className="relative h-4 w-4" aria-hidden="true">
            <path d="M8 1.5a4.5 4.5 0 0 1 4.5 4.5c0 3.5-4.5 8.5-4.5 8.5S3.5 9.5 3.5 6A4.5 4.5 0 0 1 8 1.5Z" fill="currentColor" />
            <circle cx="8" cy="6" r="1.6" fill="#000" />
          </svg>
        </span>
        <div>
          <p className="text-sm font-medium">Your Business</p>
          <p className="text-xs text-muted">Top result near you</p>
        </div>
      </div>
    </div>
  );
}

export function AiCard() {
  return (
    <div className="w-72 rounded-2xl bg-white/90 p-4 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_12px_32px_rgba(78,50,23,0.10)] backdrop-blur">
      <p className="ml-auto w-fit rounded-2xl rounded-br-md bg-surface px-3 py-2 text-xs text-body">
        Who&apos;s the best plumber near me?
      </p>
      <div className="mt-3 flex gap-2">
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#ffc48c] via-[#c9b8ff] to-[#96beff]">
          <svg viewBox="0 0 16 16" className="h-3 w-3 text-ink" aria-hidden="true">
            <path d="M8 2c.4 3 1.9 4.6 6 6-4.1 1.4-5.6 3-6 6-.4-3-1.9-4.6-6-6 4.1-1.4 5.6-3 6-6Z" fill="currentColor" />
          </svg>
        </span>
        <p className="text-xs leading-relaxed text-ink">
          I&apos;d recommend <span className="font-medium">Your Business</span>. Customers mention fast call-outs and fair prices.
        </p>
      </div>
    </div>
  );
}

export function EnquiryCard() {
  return (
    <div className="flex w-56 items-center gap-3 rounded-full bg-white/90 py-2 pl-2 pr-4 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_12px_32px_rgba(78,50,23,0.10)] backdrop-blur">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone">
        <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
          <rect x="2" y="3.5" width="12" height="9" rx="2" fill="none" stroke="currentColor" strokeWidth="1.3" />
          <path d="M2.5 4.5 8 9l5.5-4.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      </span>
      <div>
        <p className="text-xs font-medium">New enquiry</p>
        <p className="text-[11px] text-muted">via your website · just now</p>
      </div>
    </div>
  );
}
