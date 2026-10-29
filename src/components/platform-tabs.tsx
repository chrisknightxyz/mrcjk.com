"use client";

import { useEffect, useState } from "react";
import { MUTED } from "@/components/band";
import { AiAnswer, GoogleResult, MapsResults } from "@/components/illustrations";
import { LogoStack } from "@/components/logos";
import { aiAssistants, type LogoId } from "@/content/site";

const items: { title: string; body: string; Scene: () => React.JSX.Element; logos: LogoId[] }[] = [
  { title: "Google search", body: "Pages built to rank for what your customers type.", Scene: GoogleResult, logos: ["google"] },
  { title: "Google Maps", body: "A complete Business Profile, so you show up nearby.", Scene: MapsResults, logos: ["googlemaps", "google"] },
  { title: "AI assistants", body: "Clear answers every AI assistant can quote.", Scene: AiAnswer, logos: aiAssistants },
];
const STEP_MS = 6000;

// One example at a time, after the auto-advancing feature tabs on elevenlabs.io: a progress line
// fills above the active caption, then the next one takes over. Clicking a caption stops the cycle.
export function PlatformTabs() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) setPaused(true);
  }, []);
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % items.length), STEP_MS);
    return () => clearTimeout(t);
  }, [active, paused]);

  const { Scene } = items[active];
  return (
    <div className="border-t border-ink/5">
      <div className="p-3 sm:p-4">
        <div className="grid min-h-[20rem] place-items-center rounded-3xl bg-stone px-4 py-10 ring-[0.5px] ring-ink/10 sm:min-h-[26rem] sm:px-10">
          <div key={active} className="rise flex w-full justify-center">
            <Scene />
          </div>
        </div>
      </div>
      <div role="tablist" aria-label="Where you show up" className="grid md:grid-cols-3">
        {items.map((it, i) => (
          <button
            key={it.title}
            role="tab"
            aria-selected={i === active}
            onClick={() => {
              setActive(i);
              setPaused(true);
            }}
            className="flex flex-col justify-start px-5 pb-8 pt-4 text-left sm:px-8"
          >
            <span className="block h-0.5 overflow-hidden rounded-full bg-ink/10">
              <span
                key={`${active}-${paused}`}
                className={`block h-full bg-ink ${i !== active ? "w-0" : paused ? "w-full" : "progress"}`}
                style={{ animationDuration: `${STEP_MS}ms` }}
              />
            </span>
            <span className={`mt-5 block whitespace-nowrap text-[17px] ${i === active ? "text-ink" : "text-muted"}`}>{it.title}</span>
            <span className={`mt-1 block ${MUTED}`}>{it.body}</span>
            <span className="mt-4 flex">
              <LogoStack ids={it.logos} max={8} />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
