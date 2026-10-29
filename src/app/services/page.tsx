import type { Metadata } from "next";
import { Band, BandHead } from "@/components/band";
import { Button } from "@/components/button";
import { Catalogue } from "@/components/catalogue";
import { Footer } from "@/components/footer";
import { HowIWork } from "@/components/how-i-work";
import { IntegrationTabs } from "@/components/integration-tabs";
import { PlatformTabs } from "@/components/platform-tabs";
import { SectorTabs } from "@/components/sector-tabs";
import { SiteHeader } from "@/components/site-header";
import { contact } from "@/content/site";

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
            title="Found on Google, Maps and AI assistants"
            intro="More customers ask ChatGPT or Google's AI before they call. I set your business up to be the answer."
          />
          <PlatformTabs />
        </Band>

        <Band>
          <BandHead
            title="A website for every kind of local business"
            intro="Calls for trades, bookings for salons, menus for cafés. Each site is built around how your customers choose."
          />
          <SectorTabs />
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
          <BandHead title="Choose your services" intro="Your website is ticked already. Add anything else, then send your request." />
          <div className="border-t border-ink/5 px-5 py-12 sm:px-8 lg:py-16">
            <Catalogue />
          </div>
        </Band>

        <Band className="flex flex-col gap-6 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
          <h2 className="font-display text-[28px] font-light leading-9 sm:text-[32px]">Websites that make you money</h2>
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
