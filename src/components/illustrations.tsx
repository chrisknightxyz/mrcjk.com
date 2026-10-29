import { aiAssistants, logos, plans } from "@/content/site";

// Small product scenes, drawn as real UI rather than clip-art. They sit on
// gradient art, so every surface is a white card with the site's soft shadow.

const card = "theme-light rounded-2xl bg-white/95 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_12px_32px_rgba(30,20,10,0.18)]";

/* How it works */

export function StepTalk() {
  return (
    <div className={`${card} w-full max-w-[17rem] p-4`}>
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Question 2 of 5</p>
      <p className="mt-2 text-sm font-medium">What kind of business do you run?</p>
      <div className="mt-3 grid gap-1.5 text-xs">
        <span className="flex items-center justify-between rounded-xl bg-ink px-3 py-2 text-white">
          Trades and home services <span>✓</span>
        </span>
        <span className="rounded-xl px-3 py-2 shadow-card">Restaurants and cafés</span>
        <span className="rounded-xl px-3 py-2 shadow-card">Salons and barbers</span>
      </div>
    </div>
  );
}

export function StepBuild() {
  return (
    <div className={`${card} w-full max-w-[17rem] overflow-hidden`}>
      <div className="flex items-center gap-1 border-b border-black/5 px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-line" />
        <span className="h-1.5 w-1.5 rounded-full bg-line" />
        <span className="h-1.5 w-1.5 rounded-full bg-line" />
        <span className="ml-2 font-mono text-[9px] text-muted">yourbusiness.co.uk</span>
      </div>
      <div className="px-4 pb-4 pt-3">
        <p className="text-[9px] text-muted">Plumbing · Manchester</p>
        <p className="mt-1 font-display text-lg font-light leading-tight tracking-[-0.02em]">Same-day plumbers, across Manchester</p>
        <div className="mt-3 flex gap-1.5">
          <span className="rounded-full bg-ink px-2.5 py-1 text-[9px] text-white">Call now</span>
          <span className="rounded-full px-2.5 py-1 text-[9px] shadow-card">Get a quote</span>
        </div>
      </div>
    </div>
  );
}

export function StepGrow() {
  const rows = [
    ["Google position", "#4", "#1"],
    ["AI mentions", "2", "7"],
    ["Enquiries", "14", "31"],
  ];
  return (
    <div className={`${card} w-full max-w-[17rem] p-4`}>
      <p className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        Monthly report <span className="rounded-full bg-surface px-2 py-0.5 normal-case tracking-normal">Example</span>
      </p>
      <ul className="mt-3 divide-y divide-black/5 text-xs">
        {rows.map(([label, from, to]) => (
          <li key={label} className="flex items-center justify-between py-1.5">
            <span className="text-body">{label}</span>
            <span className="tabular-nums">
              <span className="text-muted">{from}</span> <span className="text-muted">→</span> <span className="font-medium">{to}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function StepPay() {
  return (
    <div className={`${card} w-full max-w-[17rem] p-4`}>
      <p className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        Invoice <span className="rounded-full bg-surface px-2 py-0.5 normal-case tracking-normal">Example</span>
      </p>
      <p className="mt-3 flex items-center justify-between text-sm">
        <span className="text-body">Website build</span>
        <span className="font-medium tabular-nums">£{plans[0].price?.toLocaleString("en-GB")}</span>
      </p>
      <p className="mt-3 flex items-center justify-between border-t border-black/5 pt-3 text-xs">
        <span className="text-muted">Fixed price · paid online</span>
        <span className="rounded-full bg-[#e7f5ec] px-2 py-0.5 font-medium text-[#1d7a3e]">✓ Paid</span>
      </p>
    </div>
  );
}

export function StepConnect() {
  const tools = ["Online booking", "Card payments", "WhatsApp chat", "Google reviews"];
  return (
    <div className={`${card} w-full max-w-[17rem] p-4`}>
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Integrations</p>
      <ul className="mt-2 divide-y divide-black/5 text-xs">
        {tools.map((t) => (
          <li key={t} className="flex items-center justify-between py-2">
            {t}
            <span className="flex h-4 w-7 items-center justify-end rounded-full bg-ink p-0.5">
              <span className="h-3 w-3 rounded-full bg-white" />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function StepTune() {
  const scores = [
    ["Speed", 98],
    ["SEO", 100],
    ["AEO", 96],
  ] as const;
  return (
    <div className={`${card} w-full max-w-[17rem] p-4`}>
      <p className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        Site check <span className="rounded-full bg-surface px-2 py-0.5 normal-case tracking-normal">Example</span>
      </p>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        {scores.map(([label, score]) => (
          <div key={label}>
            <span className="relative mx-auto flex h-12 w-12 items-center justify-center text-xs font-medium tabular-nums">
              <svg viewBox="0 0 36 36" className="absolute inset-0 -rotate-90" aria-hidden="true">
                <circle cx="18" cy="18" r="15" fill="none" stroke="#e8f5ec" strokeWidth="3" />
                <circle cx="18" cy="18" r="15" fill="none" stroke="#1d9a4a" strokeWidth="3" strokeLinecap="round" strokeDasharray={`${(score / 100) * 94.2} 94.2`} />
              </svg>
              {score}
            </span>
            <p className="mt-1.5 text-[10px] text-muted">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StepLive() {
  return (
    <div className={`${card} w-full max-w-[17rem] p-4`}>
      <p className="flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 font-mono text-[10px] text-body">
        <svg viewBox="0 0 16 16" className="h-3 w-3" aria-hidden="true">
          <rect x="3" y="7" width="10" height="7" rx="1.5" fill="currentColor" />
          <path d="M5 7V5a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        yourbusiness.co.uk
      </p>
      <p className="mt-4 flex items-center gap-2 text-sm font-medium">
        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 rounded-full bg-[#1d9a4a] opacity-60 motion-safe:animate-ping" />
          <span className="relative h-2 w-2 rounded-full bg-[#1d9a4a]" />
        </span>
        Your site is live
      </p>
      <p className="mt-1 text-xs text-muted">SSL on · every page tested</p>
    </div>
  );
}

/* Platforms: a Google search with the business on top. */

export function GoogleResult() {
  return (
    <div className={`${card} mx-auto w-full max-w-xl p-5`}>
      <p className="flex items-center gap-2 rounded-full px-4 py-2 text-sm shadow-[0_0_0_1px_rgba(0,0,0,0.08)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/google.svg" alt="" className="h-4 w-4" />
        plumber near me
      </p>
      <div className="mt-5">
        <p className="text-xs text-muted">yourbusiness.co.uk</p>
        <p className="mt-0.5 text-[17px] text-[#1a0dab]">Same-day plumbers in Manchester | Your Business</p>
        <p className="mt-1 text-xs leading-relaxed text-body">Fixed prices, no call-out fee. Boilers, leaks and bathrooms across Manchester. Call now.</p>
        <p className="mt-2 text-xs text-muted">
          <span className="text-[#f2a600]">★★★★★</span> 4.9 · Example
        </p>
      </div>
    </div>
  );
}

export function MapsResults() {
  const rows = [
    ["Your Business", "4.9", "Open now · Plumber", true],
    ["Northern Plumbing", "4.4", "Closes 5pm · Plumber", false],
    ["City Boilers", "4.2", "Open now · Heating", false],
  ] as const;
  return (
    <div className={`${card} mx-auto w-full max-w-xl p-5`}>
      <p className="flex items-center gap-2 rounded-full px-4 py-2 text-sm shadow-[0_0_0_1px_rgba(0,0,0,0.08)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/googlemaps.svg" alt="" className="h-4 w-4" />
        plumbers near me
      </p>
      <ul className="mt-4 divide-y divide-black/5">
        {rows.map(([name, rating, meta, yours]) => (
          <li key={name} className="flex items-center gap-3 py-3">
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${yours ? "bg-ink text-white" : "bg-surface text-muted"}`}>
              <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
                <path d="M8 1.5a4.5 4.5 0 0 1 4.5 4.5c0 3.5-4.5 8.5-4.5 8.5S3.5 9.5 3.5 6A4.5 4.5 0 0 1 8 1.5Z" fill="currentColor" />
              </svg>
            </span>
            <span className="min-w-0 flex-1">
              <span className={`block text-sm ${yours ? "font-medium" : "text-body"}`}>{name}</span>
              <span className="block text-xs text-muted">
                <span className="text-[#f2a600]">★</span> {rating} · {meta}
              </span>
            </span>
            {yours && <span className="whitespace-nowrap rounded-full bg-[#e7f5ec] px-2 py-0.5 text-[11px] font-medium text-[#1d7a3e]">Top result</span>}
          </li>
        ))}
      </ul>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Example</p>
    </div>
  );
}

/* Hero: what the work does for a business. */

export function AiChip() {
  return (
    <div className={`${card} w-64 p-4`}>
      <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        <span className="orb h-4 w-4 rounded-full" aria-hidden="true" />
        Example AI answer
      </p>
      <p className="mt-2 text-sm leading-snug">
        &ldquo;For UK pension advice in Thailand, I&apos;d recommend <span className="font-medium">Richard Knight, ACSI</span>.&rdquo;
      </p>
    </div>
  );
}

export function MapsCard() {
  return (
    <div className={`${card} w-60 p-4`}>
      <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/google.svg" alt="" className="h-3 w-3" />
        Local search
      </p>
      <div className="mt-3 flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-white">
          <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
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

export function EnquiryCard() {
  return (
    <div className="theme-light flex w-56 items-center gap-3 rounded-full bg-white/95 py-2 pl-2 pr-4 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_12px_32px_rgba(30,20,10,0.18)]">
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

/* Platforms: an AI assistant recommending the business. */

export function AiAnswer() {
  return (
    <div className={`${card} mx-auto w-full max-w-xl p-5 sm:p-6`}>
      <p className="ml-auto w-fit rounded-2xl rounded-br-md bg-surface px-4 py-2.5 text-sm text-body">
        Who&apos;s the best plumber in Manchester?
      </p>
      <div className="mt-4 flex gap-3">
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#f39a4c] via-[#b98bb0] to-[#6f8fe0]">
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-white" aria-hidden="true">
            <path d="M8 2c.4 3 1.9 4.6 6 6-4.1 1.4-5.6 3-6 6-.4-3-1.9-4.6-6-6 4.1-1.4 5.6-3 6-6Z" fill="currentColor" />
          </svg>
        </span>
        <div className="text-sm leading-relaxed">
          <p>
            For fast, reliable call-outs, I&apos;d recommend <span className="font-medium">Your Business</span>. They cover
            all of Manchester, answer quickly and list clear prices on their website.
          </p>
          <p className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted">
            Sources
            <span className="rounded-full bg-surface px-2.5 py-1 text-ink">yourbusiness.co.uk</span>
            <span className="rounded-full bg-surface px-2.5 py-1 text-ink">Google reviews</span>
          </p>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-black/5 pt-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Example answer</span>
        <span className="flex items-center gap-1.5" aria-label={`Works across ${aiAssistants.map((id) => logos[id].name).join(", ")}`}>
          {aiAssistants.map((id) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={id} src={logos[id].src} alt="" title={logos[id].name} className="h-4 w-4 object-contain" />
          ))}
        </span>
      </div>
    </div>
  );
}
