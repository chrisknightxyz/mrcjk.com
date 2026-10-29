"use client";

import { useState } from "react";
import { MUTED } from "@/components/band";
import { Button } from "@/components/button";
import { GradientArt, type GradientVariant } from "@/components/gradient-art";
import { Reveal } from "@/components/reveal";
import type { Plan } from "@/content/site";

const gbp = (n: number) => `£${n.toLocaleString("en-GB")}`;

function Check() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="mt-[4px] h-4 w-4 shrink-0 text-ink">
      <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// One pricing column. A plan with billing options (hosting and care) gets a Monthly / Quarterly /
// Yearly switch, after the billing toggle on elevenlabs.io/pricing; the price and the Stripe link follow it.
export function PlanCard({ plan, href, variant, delay }: { plan: Plan; href: string; variant: GradientVariant; delay: number }) {
  const [choice, setChoice] = useState(0);
  const option = plan.billing?.[choice];
  const price = option?.price ?? plan.price;
  const period = option?.period ?? plan.period;

  return (
    <Reveal delay={delay} className="flex flex-col px-5 py-10 sm:px-8 lg:px-10">
      <div className="flex items-center gap-3">
        <GradientArt variant={variant} className="h-9 w-9 shrink-0 rounded-lg" />
        <h3 className="whitespace-nowrap text-[17px]">{plan.name}</h3>
      </div>
      <p className="mt-8 flex items-baseline gap-x-2 whitespace-nowrap">
        {price === null ? (
          <span className="font-display text-[36px] font-light leading-[48px]">Quoted for you</span>
        ) : (
          <>
            {plan.prefix && <span className="text-[15px] text-muted">{plan.prefix}</span>}
            <span className="font-display text-[48px] font-light leading-[48px] tracking-[-0.02em]">{gbp(price)}</span>
            <span className="text-[15px] text-muted">{period}</span>
          </>
        )}
      </p>
      {plan.billing && (
        <div role="radiogroup" aria-label="Billing" className="mt-4 inline-flex w-fit gap-1 rounded-full bg-stone p-1">
          {plan.billing.map((b, i) => (
            <button
              key={b.label}
              type="button"
              role="radio"
              aria-checked={i === choice}
              onClick={() => setChoice(i)}
              className={`h-8 whitespace-nowrap rounded-full px-3 text-[14px] transition ${
                i === choice ? "bg-card text-ink shadow-[0_0_0_0.5px_rgb(var(--ink)/0.15),0_1px_2px_rgb(var(--ink)/0.06)]" : "text-muted hover:text-ink"
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      )}
      <p className={`mt-3 ${MUTED}`}>{plan.blurb}</p>
      <ul className="mt-8 space-y-2.5 border-t border-ink/5 pt-8 text-[15px]">
        {plan.features.map((f) => (
          <li key={f} className="flex gap-3 whitespace-nowrap">
            <Check />
            {f}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-3 pt-10">
        <p className="whitespace-nowrap text-[15px] text-muted">{plan.note}</p>
        <Button href={option?.link || href} variant={price === null ? "secondary" : "primary"} className="ml-auto">
          {plan.cta}
        </Button>
      </div>
    </Reveal>
  );
}
