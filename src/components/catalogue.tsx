"use client";

import { useEffect, useRef, useState } from "react";
import { GradientArt, categoryVariant } from "@/components/gradient-art";
import { LogoStack } from "@/components/logos";
import { services } from "@/content/site";

const groups = Array.from(new Set(services.map((s) => s.category))).map((category) => ({
  category,
  items: services.filter((s) => s.category === category),
}));

// A checklist, one service per row on every screen: tick what you want, then continue into the
// same Build my website flow as the rest of the site, with these services already chosen.
export function Catalogue() {
  const [selected, setSelected] = useState<string[]>(["Website build"]);
  const [touched, setTouched] = useState(false);
  // On phones the groups fold away, except Website and hosting; on desktop they're always open.
  const [open, setOpen] = useState<string[]>([groups[0].category]);
  const fold = (category: string) => setOpen((cur) => (cur.includes(category) ? cur.filter((c) => c !== category) : [...cur, category]));
  const toggle = (title: string) => {
    setTouched(true);
    setSelected((cur) => (cur.includes(title) ? cur.filter((t) => t !== title) : [...cur, title]));
  };

  // "Choose website" and similar buttons tick their service, then their link scrolls to the form.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const pick = (e.target as Element | null)?.closest?.("[data-pick]")?.getAttribute("data-pick");
      if (pick) setSelected((cur) => (cur.includes(pick) ? cur : [...cur, pick]));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const next = `/start?services=${encodeURIComponent(selected.join("|"))}`;

  // The floating bar steps aside once the Continue button below the list is on screen.
  const request = useRef<HTMLDivElement>(null);
  const [atForm, setAtForm] = useState(false);
  useEffect(() => {
    const el = request.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setAtForm(e.isIntersecting), { rootMargin: "0px 0px -20% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const showBar = touched && selected.length > 0 && !atForm;

  return (
    <>
      <div>
        <div className="mx-auto max-w-3xl">
        {groups.map((g) => (
          <section key={g.category} aria-labelledby={`cat-${g.category}`} className="mb-6 break-inside-avoid lg:mb-10">
            <button
              type="button"
              onClick={() => fold(g.category)}
              aria-expanded={open.includes(g.category)}
              className="flex w-full items-center gap-3 px-1 text-left lg:pointer-events-none"
            >
              <GradientArt variant={categoryVariant[g.category]} className="h-6 w-6 shrink-0 rounded-lg" />
              <h3 id={`cat-${g.category}`} className="whitespace-nowrap text-[15px] font-medium">
                {g.category}
              </h3>
              <span className="whitespace-nowrap text-sm text-muted">
                {g.items.filter((s) => selected.includes(s.title)).length || g.items.length}
                {g.items.some((s) => selected.includes(s.title)) ? " ticked" : ""}
              </span>
              <svg viewBox="0 0 16 16" aria-hidden="true" className={`ml-auto h-4 w-4 text-muted transition lg:hidden ${open.includes(g.category) ? "rotate-180" : ""}`}>
                <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <ul className={`mt-3 divide-y divide-ink/[0.06] overflow-hidden rounded-3xl bg-card ring-1 ring-ink/[0.06] ${open.includes(g.category) ? "" : "max-lg:hidden"}`}>
              {g.items.map((s) => {
                const on = selected.includes(s.title);
                return (
                  <li key={s.title}>
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={on}
                      onClick={() => toggle(s.title)}
                      className={`flex w-full items-center gap-4 px-4 py-4 text-left transition sm:px-5 ${on ? "bg-stone/70" : "hover:bg-surface"}`}
                    >
                      <span
                        aria-hidden="true"
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[12px] transition ${
                          on ? "bg-ink text-canvas" : "ring-1 ring-inset ring-ink/20"
                        }`}
                      >
                        {on ? "✓" : ""}
                      </span>
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
                        {s.logos && (
                          <span className="mt-2 flex sm:hidden">
                            <LogoStack ids={s.logos} max={4} />
                          </span>
                        )}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`hidden h-8 shrink-0 items-center whitespace-nowrap rounded-full px-3.5 text-[13px] font-medium transition sm:inline-flex ${
                          on ? "bg-ink text-canvas" : "bg-surface text-ink"
                        }`}
                      >
                        {on ? "Added" : "+ Add"}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
        </div>
        <div id="request" ref={request} className="mx-auto flex max-w-3xl items-center justify-between gap-4 rounded-3xl bg-stone p-6 sm:p-8">
          <p className="text-[15px] text-body">
            <span className="text-ink">{selected.length}</span> selected. Next, a few quick questions and your free draft.
          </p>
          <a href={next} className="inline-flex h-11 shrink-0 items-center whitespace-nowrap rounded-full bg-ink px-5 text-[15px] text-canvas hover:bg-ink/80">
            Continue
          </a>
        </div>
      </div>

      <div
        className={`fixed inset-x-0 bottom-0 z-30 p-4 transition-[transform,visibility] duration-300 ${showBar ? "visible translate-y-0" : "invisible translate-y-[150%]"}`}
        aria-hidden={!showBar}
      >
        <div className="mx-auto flex max-w-md items-center justify-between gap-4 rounded-full bg-card/90 py-2 pl-5 pr-2 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_12px_32px_rgba(78,50,23,0.12)] backdrop-blur-md">
          <p className="flex items-baseline gap-3 whitespace-nowrap text-sm text-body">
            <span>
              <span className="font-medium text-ink">{selected.length}</span> selected
            </span>
            <button type="button" onClick={() => setSelected([])} className="text-muted underline underline-offset-2 hover:text-ink" tabIndex={showBar ? 0 : -1}>
              Clear
            </button>
          </p>
          <a href={next} tabIndex={showBar ? 0 : -1} className="inline-flex h-10 items-center whitespace-nowrap rounded-full bg-ink px-5 text-sm font-medium text-canvas hover:bg-ink/80">
            Continue
          </a>
        </div>
      </div>
    </>
  );
}
