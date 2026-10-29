"use client";

import { Fragment, useState } from "react";
import { GradientArt, type GradientVariant } from "@/components/gradient-art";

const tileArt: GradientVariant[] = ["dusk", "ocean", "ember"];

// A homepage drawn for each kind of business, after the tabbed workflow demo on elevenlabs.io:
// the sectors as a list on the left, the matching site in a panel on the right.
// The same seven kinds of business, in the same order, as the integrations below.
const sectors = [
  { name: "Restaurants and cafés", line: "Menus, table bookings and delivery, so people book before they arrive.", tag: "Café · Bristol", title: "Breakfast, brunch and proper coffee", ctas: ["Book a table", "See the menu"], tiles: ["Breakfast", "Lunch", "Coffee"] },
  { name: "Gyms and studios", line: "Timetables and class booking, so new members sign up online.", tag: "Gym · Manchester", title: "Classes that fit your week", ctas: ["Book a class", "Timetable"], tiles: ["Strength", "Yoga", "Spin"] },
  { name: "Nails and beauty", line: "Treatments, prices and online booking, so your diary fills itself.", tag: "Nail salon · London", title: "Nails, brows and lashes, done right", ctas: ["Book online", "Prices"], tiles: ["Gel nails", "Brows", "Lashes"] },
  { name: "Barbers", line: "Prices, walk-in times and booking, so chairs stay full.", tag: "Barber · Liverpool", title: "Sharp cuts, walk-ins welcome", ctas: ["Book online", "Prices"], tiles: ["Cuts", "Beards", "Kids"] },
  { name: "Clinics and health", line: "Treatments and appointments, so patients book without calling.", tag: "Physio · Brighton", title: "Back on your feet, faster", ctas: ["Book now", "Treatments"], tiles: ["Sports", "Back pain", "Rehab"] },
  { name: "Trades", line: "Click-to-call and quote requests, so jobs come straight to your phone.", tag: "Plumbing · Manchester", title: "Same-day plumbers, across Manchester", ctas: ["Call now", "Get a quote"], tiles: ["Boilers", "Leaks", "Bathrooms"] },
  { name: "Shops", line: "Products, opening hours and delivery, so people buy or visit.", tag: "Florist · York", title: "Fresh flowers, delivered today", ctas: ["Shop now", "Visit us"], tiles: ["Bouquets", "Weddings", "Plants"] },
];

export function SectorTabs() {
  const [active, setActive] = useState(0);
  const s = sectors[active];

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] border-t border-ink/5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      <div className="flex flex-col px-5 py-6 sm:px-8 lg:py-16">
      <div role="tablist" aria-label="Kinds of business" className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-4 lg:overflow-visible">
        {sectors.map((x, i) => (
          <Fragment key={x.name}>
          <button
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`shrink-0 whitespace-nowrap text-left transition max-lg:h-9 max-lg:rounded-full max-lg:px-4 max-lg:text-[15px] lg:text-[20px] lg:leading-7 ${
              i === active ? "text-ink max-lg:bg-card max-lg:shadow-[0_0_0_0.5px_rgb(var(--ink)/0.15)]" : "text-muted hover:text-ink"
            }`}
          >
            {x.name}
          </button>
          {i === active && <p className="-mt-2 hidden max-w-sm text-[15px] leading-[22px] text-muted lg:block">{x.line}</p>}
          </Fragment>
        ))}
      </div>
        <p className="mt-4 text-[15px] leading-[22px] text-muted lg:hidden">{s.line}</p>
      </div>
      <div className="p-3 sm:p-4">
        <div className="grid min-h-[22rem] place-items-center rounded-3xl bg-stone px-4 py-10 ring-[0.5px] ring-ink/10 sm:px-10">
          <div key={active} className="theme-light rise w-full max-w-md overflow-hidden rounded-2xl bg-white text-[#000] shadow-[0_0_0_0.5px_rgba(0,0,0,0.12),0_16px_40px_rgba(30,20,10,0.12)]">
            <div className="flex items-center gap-1.5 border-b border-black/5 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-[#e5e5e5]" />
              <span className="h-2 w-2 rounded-full bg-[#e5e5e5]" />
              <span className="h-2 w-2 rounded-full bg-[#e5e5e5]" />
              <span className="ml-2 font-mono text-[10px] text-[#777169]">yourbusiness.co.uk</span>
            </div>
            <div className="p-5 sm:p-6">
              <p className="text-[11px] text-[#777169]">{s.tag}</p>
              <p className="mt-2 font-display text-2xl font-light leading-tight sm:text-[28px]">{s.title}</p>
              <div className="mt-4 flex gap-2">
                <span className="whitespace-nowrap rounded-full bg-black px-3 py-1.5 text-[11px] text-white">{s.ctas[0]}</span>
                <span className="whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] shadow-[0_0_0_0.5px_rgba(0,0,0,0.2)]">{s.ctas[1]}</span>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-2">
                {s.tiles.map((t, i) => (
                  <span key={t} className="overflow-hidden rounded-xl bg-[#f5f3f1] text-[10px] text-[#4e4e4e]">
                    <GradientArt variant={tileArt[i]} className="h-10" />
                    <span className="block px-2 py-1.5">{t}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <p className="mt-3 px-2 text-center text-[11px] text-muted">Example homepage</p>
      </div>
    </div>
  );
}
