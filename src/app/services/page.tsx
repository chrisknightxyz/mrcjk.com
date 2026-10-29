import type { Metadata } from "next";
import { Band, BandHead, H2, MUTED } from "@/components/band";
import { Button } from "@/components/button";
import { Catalogue } from "@/components/catalogue";
import { Footer } from "@/components/footer";
import { HowIWork } from "@/components/how-i-work";
import { IntegrationTabs } from "@/components/integration-tabs";
import { PlatformTabs } from "@/components/platform-tabs";
import { SiteHeader } from "@/components/site-header";
import { contact, faqs, servicesFaq } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description: "Everything I can add to your website: local SEO, AEO, ads, booking, payments, Shopify, content and AI tools. Each one quoted for you.",
  alternates: { canonical: "/services" },
};

// Everything beyond the website itself, for visitors who want the detail before they ask.
export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Band id="platforms">
          <BandHead
            h1
            title="Found on Google, Maps and AI assistants"
            intro="More customers ask ChatGPT or Google's AI before they call. I set up your site and Google profile so they can tell people what you do and where."
          />
          <PlatformTabs />
        </Band>

        <Band id="integrations">
          <BandHead
            title="Works with the tools you already use"
            intro="Bookings, orders, storefronts and payments, connected to your new site. Pick your kind of business to see what I set up."
          />
          <IntegrationTabs />
        </Band>

        <HowIWork />

        <Band id="services">
          <BandHead title="Choose your services" intro="Your website is ticked already. Add anything else, then continue to your free draft." />
          <div className="border-t border-ink/5 px-5 py-12 sm:px-8 lg:py-16">
            <Catalogue />
          </div>
        </Band>

        <Band className="grid gap-8 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_2fr] lg:gap-12 lg:py-[120px]">
          <h2 className={H2}>Questions about services</h2>
          <div>
            {faqs.filter((f) => servicesFaq(f.q)).map((f) => (
              <details key={f.q} className="group border-b border-dashed border-ink/15">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-[18px]">
                  {f.q}
                  <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4 shrink-0 text-muted transition group-open:rotate-180">
                    <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <p className={`pb-5 pr-10 ${MUTED}`}>{f.a}</p>
              </details>
            ))}
          </div>
        </Band>

        <Band className="flex flex-col gap-6 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
          <h2 className="font-display text-[28px] font-light leading-9 sm:text-[32px]">Your free draft is two minutes away</h2>
          <div className="flex flex-wrap gap-3">
            <Button href={contact.calUrl} variant="secondary">
              Book a call
            </Button>
            <Button href="/start">Build my website</Button>
          </div>
        </Band>
      </main>
      <Footer />
    </>
  );
}
