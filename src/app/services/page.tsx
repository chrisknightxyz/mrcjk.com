import type { Metadata } from "next";
import { Band, BandHead, CtaBand, H2, MUTED, PageHero } from "@/components/band";
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
  description: "Websites, local SEO, AEO, Google, Meta and ChatGPT Ads, booking, payments, Shopify and AI, with every price shown. Pick a bundle or build your own, then pay online.",
  alternates: { canonical: "/services" },
};

// Everything beyond the website itself, for visitors who want the detail before they ask.
export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Band id="platforms">
          <PageHero
            eyebrow="Services"
            title="Found on Google, Maps and AI assistants"
            intro="More customers ask ChatGPT or Google's AI before they call. I set up your site and Google profile so they can tell people what you do and where."
            actions={
              <>
                <Button href="/start">Build my website</Button>
                <Button href={contact.calUrl} variant="secondary">
                  Book a call
                </Button>
              </>
            }
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
          <BandHead
            title="Choose your services"
            intro="Pick a bundle, or tick what you want. Every price is here and your total adds up as you go. Monthly services have no contract."
          />
          <div className="border-t border-ink/5 px-5 py-12 sm:px-8 lg:py-16">
            {/* Checkout shows once Stripe is connected (STRIPE_SECRET_KEY); until then the basket continues to a request. */}
            <Catalogue checkout={!!process.env.STRIPE_SECRET_KEY} />
          </div>
        </Band>

        <Band className="grid gap-8 px-5 pb-20 pt-24 sm:px-8 lg:grid-cols-[1fr_2fr] lg:gap-12 lg:pb-[120px] lg:pt-[160px]">
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

        <CtaBand title="Start your website in two minutes">
          <Button href={contact.calUrl} variant="secondary">
            Book a call
          </Button>
          <Button href="/start">Build my website</Button>
        </CtaBand>
      </main>
      <Footer />
    </>
  );
}
