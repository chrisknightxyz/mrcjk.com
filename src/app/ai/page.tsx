import type { Metadata } from "next";
import Image from "next/image";
import { Band, BandHead, Cells, CtaBand, MUTED, PageHero } from "@/components/band";
import { Button } from "@/components/button";
import { Footer } from "@/components/footer";
import { AiReceptionist, EnquiryCard } from "@/components/illustrations";
import { PlanCard } from "@/components/plan-card";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { LogoStack } from "@/components/logos";
import { contact, plans, projects, services, slug } from "@/content/site";
import { priceLabel } from "@/lib/basket";

const ai = plans.find((p) => p.id === "ai")!;
const aiPlan = plans.find((p) => p.id === "aiplan")!;
const receptionist = plans.find((p) => p.id === "receptionist")!;
const privateClubs = projects.find((p) => p.name === "Private Clubs")?.url ?? "https://www.theprivateclubs.com";
const gbp = (n: number) => `£${n.toLocaleString("en-GB")}`;
// The single AI services, beyond the three plans above.
const addOns = services.filter((s) => s.category === "AI" && !["AI plan", "AI receptionist", "AI for your business"].includes(s.title));

export const metadata: Metadata = {
  title: "AI for your business",
  description: `I add AI to how your business runs, so you and your team get more done and save money. From ${gbp(ai.price!)}, scoped on a call.`,
  alternates: { canonical: "/ai" },
};

const steps = [
  { title: "A review of how you work", body: "We go through your week: calls, bookings, admin, follow-ups. I find where AI saves the most time." },
  { title: "AI set up where it pays", body: "Assistants for your team, an AI receptionist and chat, and the admin that should run itself." },
  { title: "Your team trained", body: "Everyone knows how to use it on day one, and I stay on hand while it beds in." },
];

// One line drawing per step, after the three benefit columns on elevenlabs.io. They draw in on scroll.
const line = { fill: "none", stroke: "currentColor", strokeWidth: 1, pathLength: 1 } as const;
function WeekGrid() {
  return (
    <svg viewBox="0 0 160 90" aria-hidden="true" className="draw mx-auto h-[150px] w-full text-ink">
      {Array.from({ length: 21 }, (_, i) => {
        const x = 10 + (i % 7) * 20;
        const y = 12 + Math.floor(i / 7) * 24;
        const on = [3, 9, 16].includes(i);
        return <rect key={i} x={x} y={y} width="14" height="14" rx="3" {...line} fill={on ? "currentColor" : "none"} fillOpacity={on ? 0.85 : 0} />;
      })}
    </svg>
  );
}
function Branches() {
  return (
    <svg viewBox="0 0 160 90" aria-hidden="true" className="draw mx-auto h-[150px] w-full text-ink">
      <circle cx="40" cy="45" r="9" {...line} />
      <path d="M49 45 C 80 45, 85 18, 116 18" {...line} />
      <path d="M49 45 H 116" {...line} />
      <path d="M49 45 C 80 45, 85 72, 116 72" {...line} />
      <circle cx="122" cy="18" r="6" {...line} />
      <circle cx="122" cy="45" r="6" {...line} />
      <circle cx="122" cy="72" r="6" {...line} />
    </svg>
  );
}
function Rings() {
  return (
    <svg viewBox="0 0 160 90" aria-hidden="true" className="draw mx-auto h-[150px] w-full text-ink">
      <circle cx="80" cy="45" r="12" {...line} />
      <circle cx="80" cy="45" r="25" {...line} />
      <circle cx="80" cy="45" r="38" {...line} />
      <circle cx="107" cy="18" r="3.5" fill="currentColor" />
    </svg>
  );
}
const drawings = [WeekGrid, Branches, Rings];

// AI for your business: a different buyer from the website, so its own page and its own pitch.
export default function AiPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Split hero, then a full-width panel showing the work, as on the elevenlabs.io agents page. */}
        <Band>
          <PageHero
            eyebrow="AI for your business"
            title={<>Stop missing calls and chasing follow&#8209;ups</>}
            intro={
              <>
                I add AI to how your business runs: answering calls, booking, follow-ups and the admin that eats your week. From{" "}
                {gbp(ai.price!)}, scoped on a call.
              </>
            }
            actions={<Button href={contact.calUrl}>Book a call</Button>}
          />
          <div className="border-t border-ink/5 p-3 sm:p-4">
            <div className="relative grid min-h-[22rem] place-items-center overflow-hidden rounded-[20px] bg-stone px-4 py-10 ring-[0.5px] ring-ink/10 sm:min-h-[30rem]">
              <AiReceptionist />
              <div className="absolute right-6 top-6 hidden sm:block">
                <EnquiryCard />
              </div>
            </div>
          </div>
        </Band>

        <Band>
          <BandHead title="How it works" intro="Three steps, one fixed price agreed before any work starts." />
          <Cells>
            {steps.map((s, i) => {
              const Drawing = drawings[i];
              return (
                <Reveal key={s.title} delay={i * 80} className="flex flex-col px-5 pb-10 pt-8 sm:px-8 lg:px-10">
                  <Drawing />
                  <p className="mt-6 text-[14px] tabular-nums text-muted">0{i + 1}</p>
                  <h3 className="mt-1 text-[16px] leading-6">{s.title}</h3>
                  <p className={`mt-1 ${MUTED}`}>{s.body}</p>
                </Reveal>
              );
            })}
          </Cells>
        </Band>

        {/* Proof: an AI assistant already live on one of my own products. */}
        <Band>
          <BandHead
            title="See it working"
            intro="The AI assistant I built for Private Clubs answers members' questions and recommends clubs."
            action={
              <Button href={privateClubs} variant="secondary">
                Try it on Private Clubs ↗
              </Button>
            }
          />
          <div className="border-t border-ink/5 p-3 sm:p-4">
            <div className="relative overflow-hidden rounded-[20px] bg-stone p-4 pb-0 ring-[0.5px] ring-ink/10 sm:p-8 sm:pb-0">
              <div className="theme-light overflow-hidden rounded-t-xl bg-white shadow-[0_0_0_0.5px_rgba(0,0,0,0.12),0_12px_32px_rgba(30,20,10,0.12)]">
                <div className="flex items-center gap-1.5 border-b border-black/5 px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-[#e5e5e5]" />
                  <span className="h-2 w-2 rounded-full bg-[#e5e5e5]" />
                  <span className="h-2 w-2 rounded-full bg-[#e5e5e5]" />
                  <span className="ml-2 truncate font-mono text-[10px] text-[#777169]">theprivateclubs.com</span>
                </div>
                <Image src="/work/theprivateclubs.jpg" alt="Private Clubs homepage" width={1440} height={900} sizes="(min-width: 1200px) 1100px, 100vw" className="w-full" />
              </div>
            </div>
          </div>
        </Band>

        {/* Pricing: the AI work, with the website beside it for anyone who needs that first. */}
        <Band id="pricing">
          <BandHead
            title="Start small, or go all in"
            intro="Buy the plan or the receptionist online today. The full build is scoped on a call, then one fixed price. No VAT to add."
          />
          <Cells from="lg">
            <PlanCard plan={aiPlan} href={aiPlan.href!} variant="paper" delay={0} />
            <PlanCard plan={receptionist} href={receptionist.href!} variant="dusk" delay={80} />
            <PlanCard plan={ai} href={contact.calUrl} variant="ember" delay={160} />
          </Cells>
        </Band>

        {/* One piece at a time: each goes into the basket on /services, or to a call if it needs scoping. */}
        <Band>
          <BandHead title="Or add one piece" intro="Each of these works on its own. You own what's set up, with no contract on the monthly part." />
          <ul className="border-t border-ink/5">
            {addOns.map((s) => (
              <li key={s.title} className="border-b border-ink/5 last:border-0">
                <a
                  href={s.call ? contact.calUrl : `/services?add=${slug(s.title)}#services`}
                  className="group flex items-center gap-4 px-5 py-5 transition hover:bg-stone/60 sm:px-8"
                >
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-3">
                      <span className="truncate text-[17px]">{s.title}</span>
                      {s.logos && (
                        <span className="hidden shrink-0 sm:inline-flex">
                          <LogoStack ids={s.logos} max={3} />
                        </span>
                      )}
                    </span>
                    <span className="mt-0.5 block truncate text-[14px] text-muted">{s.body}</span>
                    <span className="mt-1 block whitespace-nowrap text-[14px] tabular-nums sm:hidden">{priceLabel(s)}</span>
                  </span>
                  <span className="hidden shrink-0 whitespace-nowrap text-[15px] tabular-nums sm:inline">{priceLabel(s)}</span>
                  <span className="inline-flex h-9 shrink-0 items-center whitespace-nowrap rounded-full bg-card px-4 text-[15px] shadow-[0_0_0_0.5px_rgb(var(--ink)/0.2)] group-hover:bg-surface">
                    {s.call ? "Book a call" : "Add"}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Band>

        <CtaBand title="Find out where AI saves you time">
          <Button href="/start" variant="secondary">
            Build my website
          </Button>
          <Button href={contact.calUrl}>Book a call</Button>
        </CtaBand>
      </main>
      <Footer />
    </>
  );
}
