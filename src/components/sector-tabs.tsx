"use client";

import { Fragment, useState } from "react";
import { GradientArt, type GradientVariant } from "@/components/gradient-art";

const tileArt: GradientVariant[] = ["dusk", "ocean", "ember"];

// A homepage drawn for each kind of business, after the tabbed workflow demo on elevenlabs.io:
// the sectors as a list on the left, the matching site in a panel on the right.
// The same seven kinds of business, in the same order, as the integrations below.
const sectors = [
  { name: "Restaurants and cafés", biz: "Morning Room", line: "Menus, table bookings and delivery, so people book before they arrive.", tag: "Café · Bristol", title: "Breakfast, brunch and proper coffee", ctas: ["Book a table", "See the menu"], tiles: ["Breakfast", "Lunch", "Coffee"] },
  { name: "Gyms and studios", biz: "Northside Gym", line: "Timetables and class booking, so new members sign up online.", tag: "Gym · Manchester", title: "Classes that fit your week", ctas: ["Book a class", "Timetable"], tiles: ["Strength", "Yoga", "Spin"] },
  { name: "Nails and beauty", biz: "Polished", line: "Treatments, prices and online booking, so your diary fills itself.", tag: "Nail salon · London", title: "Nails, brows and lashes, done right", ctas: ["Book online", "Prices"], tiles: ["Gel nails", "Brows", "Lashes"] },
  { name: "Barbers", biz: "Sharp Cuts", line: "Prices, walk-in times and booking, so chairs stay full.", tag: "Barber · Liverpool", title: "Sharp cuts, walk-ins welcome", ctas: ["Book online", "Prices"], tiles: ["Cuts", "Beards", "Kids"] },
  { name: "Clinics and health", biz: "Move Physio", line: "Treatments and appointments, so patients book without calling.", tag: "Physio · Brighton", title: "Back on your feet, faster", ctas: ["Book now", "Treatments"], tiles: ["Sports", "Back pain", "Rehab"] },
  { name: "Trades", biz: "Dale Plumbing", line: "Click-to-call and quote requests, so jobs come straight to your phone.", tag: "Plumbing · Manchester", title: "Same-day plumbers, across Manchester", ctas: ["Call now", "Get a quote"], tiles: ["Boilers", "Leaks", "Bathrooms"] },
  { name: "Shops", biz: "Bloom & Co", line: "Products, opening hours and delivery, so people buy or visit.", tag: "Florist · York", title: "Fresh flowers, delivered today", ctas: ["Shop now", "Visit us"], tiles: ["Bouquets", "Weddings", "Plants"] },
];

export function SectorTabs() {
  const [active, setActive] = useState(0);
  const s = sectors[active];

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] border-t border-ink/5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      <div className="flex flex-col px-5 py-6 sm:px-8 lg:py-16">
      <div role="tablist" aria-label="Kinds of business" className="flex gap-1 overflow-x-auto max-lg:w-fit max-lg:max-w-full max-lg:rounded-full max-lg:bg-stone max-lg:p-1 max-lg:[mask-image:linear-gradient(90deg,#000_85%,transparent)] lg:flex-col lg:gap-4 lg:overflow-visible">
        {sectors.map((x, i) => (
          <Fragment key={x.name}>
          <button
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`shrink-0 whitespace-nowrap text-left transition max-lg:h-9 max-lg:rounded-full max-lg:px-4 max-lg:text-[15px] lg:text-[20px] lg:leading-7 ${
              i === active ? "text-ink max-lg:bg-card max-lg:shadow-[0_0_0_0.5px_rgb(var(--ink)/0.15),0_1px_2px_rgb(var(--ink)/0.06)]" : "text-muted hover:text-ink"
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
        <div className="relative grid min-h-[22rem] place-items-center overflow-hidden rounded-[20px] bg-stone px-4 pb-10 pt-14 ring-[0.5px] ring-ink/10 sm:px-10 lg:pb-14">
          <span className="absolute left-4 top-4 rounded-full bg-card px-2.5 py-1 text-[13px] text-muted">Example homepage</span>
          <div key={active} className="theme-light rise w-full max-w-[30rem] overflow-hidden rounded-2xl bg-white text-[#000] shadow-[0_0_0_0.5px_rgba(0,0,0,0.12),0_16px_40px_rgba(30,20,10,0.12)]">
            <div className="flex items-center gap-1.5 border-b border-black/5 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-[#e5e5e5]" />
              <span className="h-2 w-2 rounded-full bg-[#e5e5e5]" />
              <span className="h-2 w-2 rounded-full bg-[#e5e5e5]" />
              <span className="ml-2 font-mono text-[10px] text-[#777169]">yourbusiness.co.uk</span>
            </div>
            <div className="flex items-center justify-between gap-3 px-5 py-3 text-[12px]">
              <span className="whitespace-nowrap font-medium">{s.biz}</span>
              <span className="hidden gap-3 text-[#777169] sm:flex">
                {s.tiles.map((t) => (
                  <span key={t} className="whitespace-nowrap">
                    {t}
                  </span>
                ))}
              </span>
              <span className="whitespace-nowrap rounded-full bg-black px-2.5 py-1 text-white">{s.ctas[0]}</span>
            </div>
            <GradientArt variant={tileArt[active % 3]} lines className="mx-3 rounded-xl sm:mx-5">
              <div className="flex h-36 flex-col justify-end p-4 text-white">
                <p className="text-[12px] opacity-90">{s.tag}</p>
                <p className="mt-1 font-display text-[22px] font-light leading-tight sm:text-[24px]">{s.title}</p>
              </div>
            </GradientArt>
            <div className="flex gap-2 px-5 pb-5 pt-4">
              <span className="whitespace-nowrap rounded-full bg-black px-3 py-1.5 text-[12px] text-white">{s.ctas[0]}</span>
              <span className="whitespace-nowrap rounded-full px-3 py-1.5 text-[12px] shadow-[0_0_0_0.5px_rgba(0,0,0,0.2)]">{s.ctas[1]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
