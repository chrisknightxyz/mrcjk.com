"use client";

import { useState } from "react";
import { GradientArt, categoryVariant } from "@/components/gradient-art";
import { LogoStack } from "@/components/logos";
import { services } from "@/content/site";

const groups = Array.from(new Set(services.map((s) => s.category))).map((category) => ({
  category,
  items: services.filter((s) => s.category === category),
}));

export function Catalogue() {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (title: string) =>
    setSelected((cur) => (cur.includes(title) ? cur.filter((t) => t !== title) : [...cur, title]));
  const enquiry = `/start?services=${encodeURIComponent(selected.join("|"))}`;

  return (
    <>
      <div className="divide-y divide-ink/[0.06] border-y border-ink/[0.06]">
        {groups.map((g) => (
          <section key={g.category} className="grid gap-6 py-10 lg:grid-cols-[16rem_1fr] lg:gap-12">
            <div className="flex items-center gap-4 lg:block">
              <GradientArt variant={categoryVariant[g.category]} className="h-14 w-14 shrink-0 rounded-2xl lg:h-24 lg:w-24 lg:rounded-3xl" />
              <h3 className="font-display text-2xl font-light tracking-[-0.02em] lg:mt-5">{g.category}</h3>
            </div>
            <ul className="grid gap-x-8 sm:grid-cols-2">
              {g.items.map((s) => {
                const on = selected.includes(s.title);
                return (
                  <li key={s.title} className="border-b border-ink/[0.06] last:border-0 sm:[&:nth-last-child(-n+2)]:border-0">
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(s.title)}
                      className="group flex w-full items-start gap-4 py-4 text-left"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2 text-[17px] font-medium">
                          {s.title}
                          {s.logos && <LogoStack ids={s.logos} max={3} />}
                        </span>
                        <span className="mt-1 block text-[15px] leading-relaxed text-body">{s.body}</span>
                      </span>
                      <span
                        className={`mt-0.5 inline-flex h-8 shrink-0 items-center rounded-full px-3.5 text-[13px] font-medium transition ${
                          on ? "bg-ink text-canvas" : "bg-surface text-ink group-hover:bg-stone"
                        }`}
                      >
                        {on ? "✓ Added" : "+ Add"}
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
