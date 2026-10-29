"use client";

import { useState } from "react";
import { GradientArt, categoryVariant } from "@/components/gradient-art";
import { LogoStack } from "@/components/logos";
import { services } from "@/content/site";

const groups = Array.from(new Set(services.map((s) => s.category))).map((category) => ({
  category,
  items: services.filter((s) => s.category === category),
}));

// A checklist, one service per row on every screen: tick what you want, then continue.
export function Catalogue() {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (title: string) =>
    setSelected((cur) => (cur.includes(title) ? cur.filter((t) => t !== title) : [...cur, title]));
  const enquiry = `/start?services=${encodeURIComponent(selected.join("|"))}`;

  return (
    <>
      <div className="mx-auto max-w-3xl space-y-10">
        {groups.map((g) => (
          <section key={g.category} aria-labelledby={`cat-${g.category}`}>
            <div className="flex items-center gap-3 px-1">
              <GradientArt variant={categoryVariant[g.category]} className="h-6 w-6 shrink-0 rounded-lg" />
              <h3 id={`cat-${g.category}`} className="whitespace-nowrap text-[15px] font-medium">
                {g.category}
              </h3>
              <span className="whitespace-nowrap text-sm text-muted">{g.items.length}</span>
            </div>
            <ul className="mt-3 divide-y divide-ink/[0.06] overflow-hidden rounded-3xl bg-card ring-1 ring-ink/[0.06]">
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

      <div
        className={`fixed inset-x-0 bottom-0 z-30 p-4 transition-[transform,visibility] duration-300 ${selected.length ? "visible translate-y-0" : "invisible translate-y-[150%]"}`}
        aria-hidden={!selected.length}
      >
        <div className="mx-auto flex max-w-md items-center justify-between gap-4 rounded-full bg-card/90 py-2 pl-5 pr-2 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_12px_32px_rgba(78,50,23,0.12)] backdrop-blur-md">
          <p className="flex items-baseline gap-3 whitespace-nowrap text-sm text-body">
            <span>
              <span className="font-medium text-ink">{selected.length}</span> selected
            </span>
            <button type="button" onClick={() => setSelected([])} className="text-muted underline underline-offset-2 hover:text-ink" tabIndex={selected.length ? 0 : -1}>
              Clear
            </button>
          </p>
          <a href={enquiry} tabIndex={selected.length ? 0 : -1} className="inline-flex h-10 items-center whitespace-nowrap rounded-full bg-ink px-5 text-sm font-medium text-canvas hover:bg-ink/80">
            Continue
          </a>
        </div>
      </div>
    </>
  );
}
