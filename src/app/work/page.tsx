import type { Metadata } from "next";
import { Band, BandHead } from "@/components/band";
import { Button } from "@/components/button";
import { CalModal } from "@/components/cal-modal";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { About, PressList, WorkCards } from "@/components/work";
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
          <BandHead title="Work" intro="Live websites I've designed and built, past work for global brands, and the press about it." />
          <WorkCards />
        </Band>

        <Band>
          <BandHead title="More work and press" />
          <PressList />
        </Band>

        <About />

        <Band className="flex flex-col gap-6 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
          <h2 className="font-display text-[28px] font-light leading-9 sm:text-[32px]">Websites that make you money</h2>
          <div className="flex flex-wrap gap-3">
            <Button href={contact.calUrl} variant="secondary">
              Book a call
            </Button>
            <Button href="/#services">Choose your services</Button>
          </div>
        </Band>
      </main>
      <Footer />
      <CalModal />
    </>
  );
}
