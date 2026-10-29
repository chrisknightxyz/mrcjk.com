"use client";

import { useEffect, useRef, useState } from "react";
import { GradientArt } from "@/components/gradient-art";
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
    <section id="how-it-works" className="scroll-mt-16 px-4 py-28 sm:px-6 sm:py-36">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <h2 className="font-display text-[clamp(1.75rem,9vw,3rem)] font-light leading-[1.1] tracking-[-0.025em]">
              <span className="block whitespace-nowrap">Seven steps</span>
              <span className="block whitespace-nowrap text-muted">from hello to live</span>
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-body">
              You see a first draft before you pay anything. One fixed price, one person from start to finish, then one
              monthly fee once you&apos;re live.
            </p>
          </Reveal>
          <Reveal delay={120} className="mt-10 hidden lg:block">
            <GradientArt variant="dusk" lines animate className="aspect-[4/3] rounded-3xl">
              <div className="relative aspect-[4/3]">
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
            </GradientArt>
          </Reveal>
        </div>

        <div className="rounded-[28px] bg-surface p-5 sm:p-10">
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
                  className={`pop relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-medium tabular-nums transition-colors duration-300 ${
                    i <= reached ? "bg-ink text-canvas" : "bg-card text-muted ring-1 ring-inset ring-ink/10"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className={`min-w-0 pt-2 ${i < steps.length - 1 ? "pb-10 sm:pb-12" : ""}`}>
                  <h3 className="whitespace-nowrap text-base font-medium sm:text-xl">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-body">{s.body}</p>
                  {i === 0 && (
                    <a
                      href="/start"
                      className="mt-4 inline-flex h-10 items-center whitespace-nowrap rounded-full bg-ink px-4 text-sm font-medium text-canvas hover:bg-ink/80"
                    >
                      Start now
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
