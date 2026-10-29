import type { Metadata } from "next";
import { Band, BandHead, CtaBand, PageHero } from "@/components/band";
import { Button } from "@/components/button";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { About, LogoStrip, PressList, WorkCards } from "@/components/work";
import { contact } from "@/content/site";

export const metadata: Metadata = {
  title: "Work",
  description: "Websites designed and built by Chris Knight, past work for Nike, Google, Snapchat and Manchester City, and press.",
  alternates: { canonical: "/work" },
};

// Everything behind the homepage's proof: the websites, past work and press, and who you'll work with.
export default function WorkPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Band>
          <PageHero
            center
            eyebrow="Work"
            title="Websites I've designed, built and look after"
            intro="Live sites, past work for global brands, and the press about it."
            actions={<Button href="/start">Build my website</Button>}
          />
        </Band>

        <LogoStrip link={false} />

        <Band>
          <BandHead title="Recent websites" intro="Live sites, designed and built by me. Open any of them." />
          <WorkCards />
        </Band>

        <Band>
          <BandHead title="More work and press" />
          <PressList />
        </Band>

        <About />

        <CtaBand title="Websites that make you money">
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
