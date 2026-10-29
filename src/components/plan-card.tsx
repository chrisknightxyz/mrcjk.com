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

// One pricing column, after elevenlabs.io/pricing: a gradient header card with the name and price,
// the button straight under it, then what's included. Light art (paper) takes black text.
export function PlanCard({ plan, href, variant, delay }: { plan: Plan; href: string; variant: GradientVariant; delay: number }) {
  const light = variant === "paper";
  return (
    <Reveal delay={delay} className="flex flex-col p-3 sm:p-4">
      <GradientArt variant={variant} className={`h-[200px] rounded-2xl ${light ? "text-[#000]" : "text-white"}`}>
        <div className="flex h-[200px] flex-col justify-between p-5 sm:p-6">
          <h3 className="whitespace-nowrap text-[22px] leading-8 tracking-[-0.01em] sm:text-[24px]">{plan.name}</h3>
          <p className="flex items-baseline gap-x-2 whitespace-nowrap">
            {plan.price === null ? (
              <span className="font-display text-[36px] font-light leading-none">Quoted for you</span>
            ) : (
              <>
                {plan.prefix && <span className="text-[15px] opacity-80">{plan.prefix}</span>}
                <span className="font-display text-[48px] font-light leading-none tracking-[-0.02em]">{gbp(plan.price)}</span>
                <span className="text-[15px] opacity-80">{plan.period}</span>
              </>
            )}
          </p>
        </div>
      </GradientArt>
      <Button href={href} pick={plan.pick} className="mt-3 w-full">
        {plan.cta}
      </Button>
      <p className="mt-2 text-center text-[14px] text-muted">{plan.note}</p>
      <div className="px-2 pb-4 sm:px-4">
        <p className={`mt-8 ${MUTED}`}>{plan.blurb}</p>
        <ul className="mt-4 text-[15px] [&>li]:border-b [&>li]:border-dotted [&>li]:border-ink/15 [&>li]:py-2.5">
          {plan.features.map((f) => (
            <li key={f} className="flex gap-3 whitespace-nowrap">
              <Check />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
