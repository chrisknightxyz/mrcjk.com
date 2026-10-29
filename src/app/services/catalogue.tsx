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
      <div className="flex justify-center">
        <div role="tablist" aria-label="Filter services" className="flex max-w-full gap-1 overflow-x-auto rounded-full bg-surface p-1">
          {categories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={category === c}
              onClick={() => setCategory(c)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                category === c ? "bg-white text-ink shadow-pill" : "text-body hover:text-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((s) => {
          const on = selected.includes(s.title);
          return (
            <li key={s.title}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => toggle(s.title)}
                className={`flex h-full w-full flex-col rounded-[20px] bg-white p-6 text-left transition ${
                  on ? "shadow-[0_0_0_1.5px_#000]" : "shadow-card hover:shadow-[0_0_0_1px_rgba(0,0,0,0.14),0_4px_12px_rgba(0,0,0,0.05)]"
                }`}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{s.category}</span>
                  {s.core && <span className="rounded-full bg-stone px-2.5 py-0.5 text-xs font-medium">Fixed price</span>}
                </span>
                <span className="mt-6 font-display text-2xl font-light tracking-[-0.02em]">{s.title}</span>
                <span className="mt-2 flex-1 text-[15px] leading-relaxed text-body">{s.body}</span>
                <span
                  className={`mt-6 inline-flex h-8 items-center gap-1.5 self-start rounded-full px-3.5 text-[13px] font-medium transition ${
                    on ? "bg-ink text-white" : "bg-surface text-ink"
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
        className={`fixed inset-x-0 bottom-0 z-30 p-4 transition-transform duration-300 ${selected.length ? "translate-y-0" : "translate-y-[150%]"}`}
        aria-hidden={!selected.length}
      >
        <div className="mx-auto flex max-w-md items-center justify-between gap-4 rounded-full bg-white/90 py-2 pl-5 pr-2 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_12px_32px_rgba(78,50,23,0.12)] backdrop-blur-md">
          <p className="flex items-baseline gap-3 whitespace-nowrap text-sm text-body">
            <span>
              <span className="font-medium text-ink">{selected.length}</span> selected
            </span>
            <button type="button" onClick={() => setSelected([])} className="text-muted underline underline-offset-2 hover:text-ink" tabIndex={selected.length ? 0 : -1}>
              Clear
            </button>
          </p>
          <a href={enquiry} tabIndex={selected.length ? 0 : -1} className="inline-flex h-10 items-center whitespace-nowrap rounded-full bg-ink px-5 text-sm font-medium text-white hover:bg-ink/80">
            Send enquiry
          </a>
        </div>
      </div>
    </>
  );
}
