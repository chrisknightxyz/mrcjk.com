"use client";

import { useState } from "react";
import { mailto, services } from "@/content/site";

const categories = ["All", ...Array.from(new Set(services.map((s) => s.category)))];

export function Catalogue() {
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<string[]>([]);

  const shown = category === "All" ? services : services.filter((s) => s.category === category);
  const toggle = (title: string) =>
    setSelected((cur) => (cur.includes(title) ? cur.filter((t) => t !== title) : [...cur, title]));

  const enquiry = mailto(
    "Services enquiry",
    `Hi Chris,\n\nI'm interested in:\n${selected.map((s) => `- ${s}`).join("\n")}\n\nBusiness name:\nWebsite (if any):\nLocation:\n`,
  );

  return (
    <>
      <div role="tablist" aria-label="Filter services" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {categories.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={category === c}
            onClick={() => setCategory(c)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
              category === c ? "bg-ink text-cream" : "bg-cream ring-1 ring-line hover:ring-ink/40"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((s) => {
          const on = selected.includes(s.title);
          return (
            <li key={s.title}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => toggle(s.title)}
                className={`flex h-full w-full flex-col rounded-3xl p-6 text-left transition ${
                  on ? "bg-ink text-cream" : "bg-cream ring-1 ring-line hover:ring-ink/40"
                }`}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className={`text-xs font-semibold uppercase tracking-[0.14em] ${on ? "text-lime" : "text-accent"}`}>
                    {s.category}
                  </span>
                  {s.core && (
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${on ? "bg-lime text-ink" : "bg-lime"}`}>
                      Fixed price
                    </span>
                  )}
                </span>
                <span className="mt-4 font-display text-2xl font-bold">{s.title}</span>
                <span className={`mt-2 flex-1 ${on ? "text-cream/75" : "text-muted"}`}>{s.body}</span>
                <span
                  className={`mt-5 inline-flex items-center gap-2 self-start rounded-full px-4 py-2 text-sm font-semibold ${
                    on ? "bg-lime text-ink" : "bg-paper ring-1 ring-ink/15"
                  }`}
                >
                  {on ? "✓ Added" : "+ Add"}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div
        className={`fixed inset-x-0 bottom-0 z-30 p-4 transition-transform duration-300 ${selected.length ? "translate-y-0" : "translate-y-full"}`}
        aria-hidden={!selected.length}
      >
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 rounded-full bg-ink py-2.5 pl-6 pr-2.5 text-cream shadow-2xl">
          <p className="flex items-baseline gap-3 whitespace-nowrap text-sm font-medium">
            <span>
              <span className="font-display text-lg font-bold">{selected.length}</span> selected
            </span>
            <button type="button" onClick={() => setSelected([])} className="text-cream/60 underline underline-offset-2 hover:text-cream" tabIndex={selected.length ? 0 : -1}>
              Clear
            </button>
          </p>
          <a href={enquiry} tabIndex={selected.length ? 0 : -1} className="whitespace-nowrap rounded-full bg-accent px-5 py-3 text-sm font-semibold text-ink hover:brightness-105">
            Send enquiry
          </a>
        </div>
      </div>
    </>
  );
}
