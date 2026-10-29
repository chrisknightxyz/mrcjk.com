import type { Metadata } from "next";
import { Band } from "@/components/band";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What mrcjk.com collects, why, and your rights.",
  alternates: { canonical: "/privacy" },
};

const sections: [string, string[]][] = [
  ["Who I am", [`${site.name}, who runs ${site.url.replace("https://", "")}. Questions about your data go to ${site.email}.`]],
  [
    "What I collect",
    [
      "When you send a request: your name, email, and, if you add them, your phone number, website and the services you ticked.",
      "When you answer the few quick questions, your answers go to me only if you send them, by WhatsApp, email or a booking.",
      "Bookings are handled by Cal.com, and payments by Stripe. I never see your card details. Request emails are delivered by Resend.",
    ],
  ],
  ["Why", ["To reply to you, quote, build and look after your website, and invoice you. Under UK GDPR, that is taking steps before a contract, the contract itself, or my legitimate interest in answering you."]],
  ["How long I keep it", ["For as long as we work together, and invoices for six years, as UK tax law requires. Requests that go nowhere are deleted within 12 months."]],
  ["Your rights", [`You can ask to see, correct or delete your data, or object to how I use it, by emailing ${site.email}. You can also complain to the Information Commissioner's Office (ico.org.uk).`]],
  ["Cookies", ["This site sets no tracking or advertising cookies. It remembers your light or dark choice in your own browser, and nothing else."]],
];

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Band className="px-5 pb-24 pt-16 sm:px-8 lg:pb-[120px] lg:pt-24">
          <div className="max-w-[720px]">
            <h1 className="font-display text-[36px] font-light leading-[42px] tracking-[-0.02em] sm:text-[48px] sm:leading-[52px]">Privacy</h1>
            <p className="mt-3 text-[15px] text-muted">Last updated 29 October 2026</p>
            {sections.map(([title, lines]) => (
              <section key={title} className="mt-14">
                <h2 className="font-display text-[24px] font-light leading-8">{title}</h2>
                {lines.map((l) => (
                  <p key={l} className="mt-3 text-[17px] leading-[30px] text-ink">
                    {l}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </Band>
      </main>
      <Footer />
    </>
  );
}
