"use client";

import { useState } from "react";
import { bookingTools, paymentTools, type Tool } from "@/content/site";

function ToolTile({ tool }: { tool: Tool }) {
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-2xl bg-card px-3 py-3 shadow-[0_0_0_0.5px_rgb(var(--ink)/0.12),0_1px_2px_rgb(var(--ink)/0.04)] transition hover:shadow-[0_0_0_0.5px_rgb(var(--ink)/0.25),0_4px_12px_rgb(var(--ink)/0.06)]"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white ring-[0.5px] ring-black/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={tool.logo} alt="" className="h-full w-full object-contain" loading="lazy" />
      </span>
      <span className="min-w-0 flex-1 truncate text-[15px]">{tool.name}</span>
      <span aria-hidden="true" className="text-muted opacity-0 transition group-hover:opacity-100">
        ↗
      </span>
    </a>
  );
}

// The booking and ordering tools each kind of business already uses, then the payment providers.
export function IntegrationTabs() {
  const [active, setActive] = useState(0);
  const [all, setAll] = useState(false);
  const [allPay, setAllPay] = useState(false);
  const group = bookingTools[active];

  return (
    <div className="border-t border-ink/5">
      <div className="px-5 pt-8 sm:px-8">
      <div role="tablist" aria-label="Kinds of business" className="flex w-fit max-w-full gap-1 overflow-x-auto rounded-full bg-stone p-1">
        {bookingTools.map((g, i) => (
          <button
            key={g.sector}
            role="tab"
            aria-selected={i === active}
            onClick={() => {
              setActive(i);
              setAll(false);
            }}
            className={`h-9 shrink-0 whitespace-nowrap rounded-full px-4 text-[15px] transition ${
              i === active ? "bg-card text-ink shadow-[0_0_0_0.5px_rgb(var(--ink)/0.15),0_1px_2px_rgb(var(--ink)/0.06)]" : "text-muted hover:text-ink"
            }`}
          >
            {g.sector}
          </button>
        ))}
      </div>
      </div>
      <ul key={active} className={`rise grid grid-cols-1 gap-2 px-5 pb-10 pt-6 sm:grid-cols-2 sm:px-8 ${group.tools.length % 4 === 1 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
        {group.tools.map((tool, i) => (
          <li key={tool.name} className={!all && i >= 6 ? "max-sm:hidden" : ""}>
            <ToolTile tool={tool} />
          </li>
        ))}
        {!all && group.tools.length > 6 && (
          <li className="sm:hidden">
            <button type="button" onClick={() => setAll(true)} className="h-11 w-full rounded-2xl bg-stone text-[15px] text-body">
              Show all {group.tools.length}
            </button>
          </li>
        )}
      </ul>

      <div className="border-t border-ink/5 px-5 pb-10 pt-8 sm:px-8">
        <h3 className="text-[17px]">Payments</h3>
        <p className="mt-1.5 text-[15px] text-muted">Take cards, wallets and direct debits on your site, in person and by link.</p>
        <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {paymentTools.map((tool, i) => (
            <li key={tool.name} className={!allPay && i >= 6 ? "max-sm:hidden" : ""}>
              <ToolTile tool={tool} />
            </li>
          ))}
          {!allPay && (
            <li className="sm:hidden">
              <button type="button" onClick={() => setAllPay(true)} className="h-11 w-full rounded-2xl bg-stone text-[15px] text-body">
                Show all {paymentTools.length}
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
