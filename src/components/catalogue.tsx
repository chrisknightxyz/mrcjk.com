"use client";

import { useEffect, useRef, useState } from "react";
import { GradientArt, categoryVariant } from "@/components/gradient-art";
import { LogoStack } from "@/components/logos";
import { bundles, contact, services, slug } from "@/content/site";
import { basketLines, basketTotals, findBundle, gbp, priceLabel } from "@/lib/basket";

const groups = Array.from(new Set(services.map((s) => s.category))).map((category) => ({
  category,
  items: services.filter((s) => s.category === category),
}));

function Tick({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition ${on ? "bg-ink text-canvas" : "ring-1 ring-inset ring-ink/20"}`}
    >
      {on && (
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5">
          <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  );
}

// The basket, one service per row on every screen: tick what you want (or pick a bundle) and the
// total adds up beside the list. Then pay online through Stripe, or send a request and pay after
// approving your draft. Links can fill the basket: /services?bundle=get-leads or ?add=local-seo,aeo.
export function Catalogue({ checkout }: { checkout: boolean }) {
  const [selected, setSelected] = useState<string[]>(["Website build"]);
  const [bundleId, setBundleId] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  // On phones the groups fold away, except the first; on desktop they're always open.
  const [open, setOpen] = useState<string[]>([groups[0].category]);
  const fold = (category: string) => setOpen((cur) => (cur.includes(category) ? cur.filter((c) => c !== category) : [...cur, category]));

  const bundle = findBundle(bundleId);
  const inBundle = (title: string) => !!bundle && bundle.includes.includes(title);
  const toggle = (title: string) => {
    setTouched(true);
    setSelected((cur) => (cur.includes(title) ? cur.filter((t) => t !== title) : [...cur, title]));
  };
  const pickBundle = (id: string) => {
    setTouched(true);
    setBundleId((cur) => (cur === id ? null : id));
  };

  // Fill the basket from the link, and let "Add" buttons elsewhere on the page tick their service.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const add = (q.get("add") ?? "").split(",").filter(Boolean);
    const picked = services.filter((s) => add.includes(slug(s.title)) && !s.call).map((s) => s.title);
    const linked = findBundle(q.get("bundle"));
    if (picked.length) setSelected(picked);
    else if (linked) setSelected([]);
    if (linked && !linked.call) setBundleId(linked.id);
    if (picked.length || linked) setTouched(true);
    const onClick = (e: MouseEvent) => {
      const pick = (e.target as Element | null)?.closest?.("[data-pick]")?.getAttribute("data-pick");
      if (pick) setSelected((cur) => (cur.includes(pick) ? cur : [...cur, pick]));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const lines = basketLines(selected, bundleId);
  const { today, monthly } = basketTotals(lines);
  const chosen = Array.from(new Set([...(bundle?.includes ?? []), ...selected]));
  const hasWebsite = chosen.includes("Website build");
  const request = `/start?services=${encodeURIComponent(chosen.join("|"))}`;

  async function pay() {
    setStatus("sending");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: selected, bundle: bundleId }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
    } catch {}
    setStatus("error");
  }

  // The floating bar on phones steps aside once the basket card is on screen.
  const card = useRef<HTMLElement>(null);
  const [atCard, setAtCard] = useState(false);
  useEffect(() => {
    const el = card.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setAtCard(e.isIntersecting), { rootMargin: "0px 0px -20% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const showBar = touched && lines.length > 0 && !atCard;

  return (
    <>
      {/* Bundles: the three offers most businesses start with. */}
      <div className="mb-10 grid grid-cols-[minmax(0,1fr)] gap-3 lg:mb-14 lg:grid-cols-3">
        {bundles.map((b) => {
          const on = b.id === bundleId;
          return (
            <div key={b.id} className={`flex flex-col rounded-2xl p-5 transition sm:p-6 ${on ? "bg-ink text-canvas" : "bg-stone ring-[0.5px] ring-ink/10"}`}>
              <p className="flex items-center justify-between gap-3 whitespace-nowrap text-[17px]">
                {b.name}
                {b.id === "get-leads" && <span className={`rounded-full px-2.5 py-0.5 text-[13px] ${on ? "bg-canvas/15" : "bg-card"}`}>Most chosen</span>}
              </p>
              <p className="mt-4 whitespace-nowrap">
                <span className="font-display text-[32px] font-light leading-none tracking-[-0.02em]">
                  {b.call ? "From " : ""}
                  {gbp(b.monthly)}
                </span>
                <span className={`ml-1 text-[15px] ${on ? "text-canvas/70" : "text-muted"}`}>a month</span>
              </p>
              <p className={`mt-1 whitespace-nowrap text-[15px] ${on ? "text-canvas/70" : "text-muted"}`}>
                {b.call ? "From " : "+ "}
                {gbp(b.once)} setup
              </p>
              <p className={`mt-3 text-[15px] leading-[22px] ${on ? "text-canvas/80" : "text-body"}`}>{b.blurb}</p>
              <div className="mt-auto pt-6">
                {b.call ? (
                  <a
                    href={contact.calUrl}
                    className="inline-flex h-11 w-full items-center justify-center whitespace-nowrap rounded-full bg-card px-5 text-[16px] text-ink shadow-[0_0_0_0.5px_rgb(var(--ink)/0.2)] hover:bg-surface"
                  >
                    Book a call
                  </a>
                ) : (
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => pickBundle(b.id)}
                    className={`inline-flex h-11 w-full items-center justify-center whitespace-nowrap rounded-full px-5 text-[16px] transition ${
                      on ? "bg-canvas text-ink hover:bg-canvas/90" : "bg-ink text-canvas hover:bg-ink/80"
                    }`}
                  >
                    {on ? "✓ In your basket" : `Choose ${b.name}`}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
        <div>
          {groups.map((g) => (
            <section key={g.category} aria-labelledby={`cat-${slug(g.category)}`} className="mb-6 lg:mb-10">
              <button
                type="button"
                onClick={() => fold(g.category)}
                aria-expanded={open.includes(g.category)}
                className="flex w-full items-center gap-3 px-1 text-left lg:pointer-events-none"
              >
                <GradientArt variant={categoryVariant[g.category] ?? "dusk"} className="h-6 w-6 shrink-0 rounded-lg" />
                <h3 id={`cat-${slug(g.category)}`} className="whitespace-nowrap text-[15px] font-medium">
                  {g.category}
                </h3>
                <span className="whitespace-nowrap text-sm text-muted max-sm:hidden">
                  {g.items.filter((s) => chosen.includes(s.title)).length || g.items.length}
                  {g.items.some((s) => chosen.includes(s.title)) ? " ticked" : ""}
                </span>
                <svg viewBox="0 0 16 16" aria-hidden="true" className={`ml-auto h-4 w-4 text-muted transition lg:hidden ${open.includes(g.category) ? "rotate-180" : ""}`}>
                  <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <ul className={`mt-3 divide-y divide-ink/[0.06] overflow-hidden rounded-2xl bg-card ring-[0.5px] ring-ink/10 ${open.includes(g.category) ? "" : "max-lg:hidden"}`}>
                {g.items.map((s) => {
                  const covered = inBundle(s.title);
                  const on = covered || selected.includes(s.title);
                  const price = covered ? "In your bundle" : priceLabel(s);
                  const text = (
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="truncate text-[16px] font-medium">{s.title}</span>
                        {s.logos && (
                          <span className="hidden shrink-0 sm:inline-flex">
                            <LogoStack ids={s.logos} max={3} />
                          </span>
                        )}
                      </span>
                      <span className="mt-0.5 block truncate text-[13px] text-body sm:text-[14px]">{s.body}</span>
                      <span className="mt-2 flex items-center gap-3 sm:hidden">
                        <span className="truncate text-[14px] tabular-nums">{price}</span>
                        {s.logos && (
                          <span className="shrink-0">
                            <LogoStack ids={s.logos} max={3} />
                          </span>
                        )}
                      </span>
                    </span>
                  );
                  // In a bundle, the usual price is struck through to show what the bundle saves.
                  const side = (
                    <span className={`hidden shrink-0 whitespace-nowrap text-[14px] tabular-nums sm:inline ${covered ? "text-muted line-through decoration-ink/30" : ""}`}>
                      {priceLabel(s)}
                    </span>
                  );
                  if (s.call) {
                    return (
                      <li key={s.title}>
                        <a href={contact.calUrl} className="flex w-full items-center gap-4 px-4 py-4 text-left transition hover:bg-surface sm:px-5">
                          <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-muted ring-1 ring-inset ring-ink/10">
                            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5">
                              <path d="M5.5 2.5 4 2.5C3 2.5 2.4 3.4 2.6 4.4c.8 4.4 4.6 8.2 9 9 1 .2 1.9-.4 1.9-1.4v-1.5l-2.6-1-1.3 1.3c-1.6-.8-2.9-2.1-3.7-3.7L7.2 5.8 5.5 2.5Z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                            </svg>
                          </span>
                          {text}
                          {side}
                          <span className="hidden h-8 shrink-0 items-center whitespace-nowrap rounded-full bg-surface px-3.5 text-[13px] sm:inline-flex">Book a call</span>
                        </a>
                      </li>
                    );
                  }
                  return (
                    <li key={s.title}>
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={on}
                        aria-disabled={covered}
                        onClick={() => !covered && toggle(s.title)}
                        className={`flex w-full items-center gap-4 px-4 py-4 text-left transition sm:px-5 ${on ? "bg-stone/70" : "hover:bg-surface"} ${covered ? "cursor-default" : ""}`}
                      >
                        <Tick on={on} />
                        {text}
                        {side}
                        <span
                          aria-hidden="true"
                          className={`hidden h-8 shrink-0 items-center whitespace-nowrap rounded-full px-3.5 text-[13px] transition sm:inline-flex ${
                            on ? "bg-ink text-canvas" : "bg-surface text-ink"
                          }`}
                        >
                          {covered ? "In bundle" : on ? "Added" : "+ Add"}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>

        {/* The basket: under the list on phones, a sticky card beside it on desktop. */}
        <aside id="basket" ref={card} className="rounded-2xl bg-stone p-6 lg:sticky lg:top-24 lg:self-start">
          <p className="text-[14px] text-muted">Your basket</p>
          {lines.length ? (
            <ul className="mt-3 text-[15px] [&>li]:border-b [&>li]:border-dotted [&>li]:border-ink/15 [&>li]:py-2">
              {lines.map((l) => (
                <li key={`${l.name}-${l.monthly}`} className="flex justify-between gap-3">
                  <span className="min-w-0 truncate">{l.name}</span>
                  <span className="whitespace-nowrap tabular-nums text-body">
                    {gbp(l.amount)}
                    {l.monthly ? "/mo" : ""}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-[15px] text-body">Nothing yet. Pick a bundle, or tick the services you want.</p>
          )}
          <p className="mt-5 flex items-baseline justify-between gap-3 whitespace-nowrap">
            <span className="text-[15px] text-muted">Due today</span>
            <span className="font-display text-[30px] font-light leading-none tracking-[-0.02em] tabular-nums sm:text-[36px]">{gbp(today)}</span>
          </p>
          {monthly > 0 && (
            <p className="mt-2 flex items-baseline justify-between gap-3 whitespace-nowrap">
              <span className="text-[15px] text-muted">Then monthly</span>
              <span className="text-[20px] tabular-nums">{gbp(monthly)}</span>
            </p>
          )}

          {checkout ? (
            <>
              <button
                type="button"
                onClick={pay}
                disabled={!lines.length || status === "sending"}
                className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-ink px-5 text-[16px] text-canvas transition hover:bg-ink/80 disabled:cursor-not-allowed disabled:opacity-30"
              >
                {status === "sending" ? "Opening checkout…" : "Checkout"}
              </button>
              {status === "error" && <p className="mt-3 text-[14px] text-[#b42318]">Checkout didn&apos;t open. Try again, or send a request below.</p>}
              <p className="mt-3 text-center text-[13px] leading-5 text-muted">Today covers one-off items and your first month. Monthly services renew until you cancel. Secure payment by Stripe. No VAT to add.</p>
              <a
                href={request}
                className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-full bg-card px-5 text-[16px] shadow-[0_0_0_0.5px_rgb(var(--ink)/0.2)] hover:bg-surface"
              >
                Send a request instead
              </a>
              {hasWebsite && <p className="mt-3 text-center text-[13px] leading-5 text-muted">A request gets you your homepage draft first; you pay after you approve it.</p>}
            </>
          ) : (
            <>
              <a href={request} className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-ink px-5 text-[16px] text-canvas hover:bg-ink/80">
                Continue
              </a>
              <p className="mt-3 text-center text-[14px] text-muted">Next, a few quick questions about your business</p>
            </>
          )}
        </aside>
      </div>

      {/* Phones: the totals and the next step stay in reach while you scroll. */}
      <div
        className={`fixed inset-x-0 bottom-0 z-30 p-4 transition-[transform,visibility] duration-300 lg:hidden ${showBar ? "visible translate-y-0" : "invisible translate-y-[150%]"}`}
        aria-hidden={!showBar}
      >
        <div className="mx-auto flex max-w-md items-center justify-between gap-3 rounded-full bg-card/90 py-2 pl-5 pr-2 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_12px_32px_rgba(78,50,23,0.12)] backdrop-blur-md">
          <p className="min-w-0 whitespace-nowrap text-[13px] leading-4 text-body">
            <span className="block text-[15px] tabular-nums text-ink">{gbp(today)} today</span>
            {monthly > 0 && <span className="block tabular-nums">then {gbp(monthly)}/mo</span>}
          </p>
          {checkout ? (
            <button
              type="button"
              onClick={pay}
              tabIndex={showBar ? 0 : -1}
              disabled={status === "sending"}
              className="inline-flex h-10 shrink-0 items-center whitespace-nowrap rounded-full bg-ink px-5 text-[15px] text-canvas hover:bg-ink/80 disabled:opacity-50"
            >
              {status === "sending" ? "Opening…" : "Checkout"}
            </button>
          ) : (
            <a href={request} tabIndex={showBar ? 0 : -1} className="inline-flex h-10 shrink-0 items-center whitespace-nowrap rounded-full bg-ink px-5 text-[15px] text-canvas hover:bg-ink/80">
              Continue
            </a>
          )}
        </div>
      </div>
    </>
  );
}
