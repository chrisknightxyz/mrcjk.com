"use client";

import { useEffect, useRef, useState } from "react";
import { Band, BandHead, MUTED } from "@/components/band";
import { Button } from "@/components/button";
import { StepBuild, StepConnect, StepGrow, StepLive, StepPay, StepTalk, StepTune } from "@/components/illustrations";
import { Reveal } from "@/components/reveal";
import { steps } from "@/content/site";

// One scene per step, shown beside the timeline as the line reaches that step.
const scenes = [StepTalk, StepBuild, StepPay, StepConnect, StepTune, StepLive, StepGrow];

/**
 * The seven steps, after the hiring timeline on theprivateclubs.com/careers: number badges on a line
 * that draws as you scroll (eased towards the scroll position, so it feels physical rather than
 * linear), and each step rising 12px into view. The line runs from when the list's top reaches
 * 80% of the viewport to when its bottom reaches 60%.
 */
export function HowIWork() {
  const list = useRef<HTMLOListElement>(null);
  const fill = useRef<HTMLDivElement>(null);
  const [reached, setReached] = useState(0);

  useEffect(() => {
    const el = list.current;
    const bar = fill.current;
    if (!el || !bar) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-step]"));
    let offsets: number[] = [];
    let track = 0;
    let target = 0;
    let current = 0;
    let frame = 0;

    const layout = () => {
      // The track starts at the first badge's centre, so a step's offset is its distance down the track.
      offsets = items.map((li) => li.offsetTop);
      track = bar.parentElement?.offsetHeight ?? 0;
    };
    const tick = () => {
      current = reduce ? target : current + (target - current) * 0.14;
      if (Math.abs(target - current) < 0.0005) current = target;
      bar.style.transform = `scaleY(${current})`;
      const tip = current * track;
      setReached(Math.max(0, offsets.filter((o) => o <= tip + 1).length - 1));
      frame = current === target ? 0 : requestAnimationFrame(tick);
    };
    const measure = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      target = Math.min(1, Math.max(0, (vh * 0.8 - r.top) / (r.height + vh * 0.2)));
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const resize = () => {
      layout();
      measure();
    };

    resize();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <Band id="how-it-works">
      <BandHead
        title="Seven steps from hello to live"
        intro="Live in 24 hours. You see a first draft before you pay anything, then one fixed price, one person from start to finish, and one monthly fee once you're live."
      />
      <div className="grid grid-cols-[minmax(0,1fr)] border-t border-ink/5 lg:grid-cols-2 lg:divide-x lg:divide-ink/5">
        <div className="hidden p-4 lg:block">
          <div className="sticky top-24 aspect-[4/3] overflow-hidden rounded-3xl bg-stone ring-[0.5px] ring-ink/10">
            <span aria-hidden="true" className="orb absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl" />
            {scenes.map((Scene, i) => (
              <div
                key={i}
                aria-hidden={i !== reached}
                className={`absolute inset-0 flex items-center justify-center p-10 transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  i === reached ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0"
                }`}
              >
                <Scene />
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 py-10 sm:px-8 lg:px-12 lg:py-12">
          <ol ref={list} className="relative">
            {/* The track and its fill, behind the badges. */}
            <div aria-hidden="true" className="absolute bottom-5 left-5 top-5 w-px bg-ink/10">
              <div
                ref={fill}
                className="h-full w-full origin-top bg-gradient-to-b from-[#f39a4c] via-[#b98bb0] to-[#6f8fe0]"
                style={{ transform: "scaleY(0)" }}
              />
            </div>
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 60} className="relative flex gap-5 sm:gap-6" data-step="">
                <span
                  className={`pop relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm tabular-nums transition-colors duration-300 ${
                    i <= reached ? "bg-ink text-canvas" : "bg-card text-muted shadow-[0_0_0_0.5px_rgb(var(--ink)/0.2)]"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className={`min-w-0 pt-2 ${i < steps.length - 1 ? "pb-10" : ""}`}>
                  <h3 className="whitespace-nowrap text-[17px] leading-6">{s.title}</h3>
                  <p className={`mt-1.5 ${MUTED}`}>{s.body}</p>
                  {i === 0 && (
                    <Button href="#services" className="mt-4">
                      Start now
                    </Button>
                  )}
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </Band>
  );
}
