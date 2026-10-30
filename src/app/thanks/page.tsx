import type { Metadata } from "next";
import { Band, PageHero } from "@/components/band";
import { Button } from "@/components/button";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { contact, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
};

// Where Stripe sends people after paying. Stripe emails the receipt; Chris sees the order in Stripe.
export default function ThanksPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Band>
          <PageHero
            center
            eyebrow="Payment received"
            title="Thank you. I'm on it."
            intro={
              <>
                Your receipt is on its way from Stripe. I&apos;ll email you within 24 hours to get started. Want to talk it through first? Book a
                call, or email {site.email}.
              </>
            }
            actions={
              <>
                <Button href={contact.calUrl}>Book a call</Button>
                <Button href="/" variant="secondary">
                  Back to the homepage
                </Button>
              </>
            }
          />
        </Band>
      </main>
      <Footer />
    </>
  );
}
