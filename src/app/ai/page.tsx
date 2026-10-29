import type { Metadata } from "next";
import { Band, BandHead, Cells, MUTED } from "@/components/band";
import { Button } from "@/components/button";
import { Footer } from "@/components/footer";
import { LogoRow } from "@/components/logos";
import { PlanCard } from "@/components/plan-card";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { aiAssistants, contact, plans } from "@/content/site";

const ai = plans.find((p) => p.id === "ai")!;
const gbp = (n: number) => `£${n.toLocaleString("en-GB")}`;

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

// AI for your business: a different buyer from the website, so its own page and its own pitch.
export default function AiPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Band className="grid grid-cols-[minmax(0,1fr)] gap-6 px-5 pb-12 pt-14 sm:px-8 lg:grid-cols-2 lg:items-end lg:gap-12 lg:pb-14 lg:pt-24">
          <div>
            <h1 className="rise text-[14px] text-muted sm:text-[15px]">AI for your business</h1>
            <p className="rise mt-3 font-display text-[36px] font-light leading-[42px] tracking-[-0.02em] sm:text-[48px] sm:leading-[52px]">
              Get more done with the team you have
            </p>
          </div>
          <div>
            <p className="rise max-w-md text-[16px] leading-6 [animation-delay:120ms]">
              I add AI to how your business runs: answering calls, booking, follow-ups and the admin that eats your week. From{" "}
              {gbp(ai.price!)}, scoped on a call.
            </p>
            <div className="rise mt-6 flex flex-wrap gap-3 [animation-delay:240ms]">
              <Button href={contact.calUrl}>Book a call</Button>
            </div>
          </div>
        </Band>

        <Band>
          <BandHead title="How it works" intro="Three steps, one fixed price agreed before any work starts." />
          <Cells>
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 80} className="px-5 py-10 sm:px-8 lg:px-12">
                <p className="font-display text-[40px] font-light leading-none text-muted">{i + 1}</p>
                <h3 className="mt-6 text-[17px] leading-6">{s.title}</h3>
                <p className={`mt-1.5 ${MUTED}`}>{s.body}</p>
              </Reveal>
            ))}
          </Cells>
        </Band>

        <Band>
          <BandHead title="Works with the AI you already know" />
          <div className="border-t border-ink/5 px-5 py-10 sm:px-8">
            <LogoRow ids={aiAssistants} />
          </div>
        </Band>

        <Band id="pricing">
          <BandHead title={`From ${gbp(ai.price!)}`} intro="Scoped on a call, then one fixed price. No VAT to add." />
          <div className="mx-auto grid max-w-xl border-t border-ink/5">
            <PlanCard plan={ai} href={contact.calUrl} variant="ember" delay={0} />
          </div>
        </Band>
      </main>
      <Footer />
    </>
  );
}
