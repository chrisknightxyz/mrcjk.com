import type { Metadata } from "next";
import Image from "next/image";
import { clients, contact, faqs, plans, services, site, social, stripeLinks, type Plan } from "@/content/site";
import { Band, BandHead, Cells, H2, LEAD, MUTED } from "@/components/band";
import { Button } from "@/components/button";
import { Footer } from "@/components/footer";
import { type GradientVariant } from "@/components/gradient-art";
import { PlanCard } from "@/components/plan-card";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { WorkCards } from "@/components/work";

const [build, care] = plans;
const gbp = (n: number) => `£${n.toLocaleString("en-GB")}`;

export const metadata: Metadata = {
  title: "Websites for UK local businesses",
  description: `See your new website before you pay. Designed and built for your business, live in 24 hours. ${gbp(build.price!)}, then ${gbp(care.price!)} a month.`,
  alternates: { canonical: "/" },
  twitter: { card: "summary_large_image", title: "Websites that make you money", images: ["/og.jpg"] },
  openGraph: {
    siteName: site.name,
    locale: "en_GB",
    title: "Websites that make you money",
    description: `Your new website, live in 24 hours. Found on Google, recommended by AI. From ${gbp(build.price!)}, then ${gbp(care.price!)} a month.`,
    url: "/",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Chris Knight: websites that make you money" }],
  },
};

// A plan's Stripe Payment Link once it's set; until then, the start flow.
const planHref = (p: Plan) => p.href || stripeLinks[p.id] || `/start?need=${encodeURIComponent(p.need)}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#business`,
      name: site.name,
      url: `${site.url}/`,
      email: site.email,
      sameAs: social.filter((s) => s.url).map((s) => s.url),
      areaServed: { "@type": "Country", name: site.location },
      knowsAbout: ["Web design", "Search engine optimisation", "Answer engine optimisation"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: [
          ...plans
            .filter((p) => p.price !== null)
            .map((p) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: p.name, description: p.blurb },
              priceSpecification:
                p.period === "a month"
                  ? { "@type": "UnitPriceSpecification", price: p.price, priceCurrency: "GBP", unitText: "MONTH" }
                  : { "@type": "PriceSpecification", minPrice: p.price, priceCurrency: "GBP" },
            })),
          ...services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, description: s.body } })),
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

// Three steps, the whole offer in one line each.
const howItWorks = [
  { title: "Tell me about your business", body: "A few quick questions, about two minutes. No payment, no call needed." },
  { title: "See your draft within 24 hours", body: "Your homepage, designed and written for your business. You still haven't paid." },
  { title: "Pay when you're happy, then go live", body: `One fixed price, from ${gbp(build.price!)}. Then ${gbp(care.price!)} a month keeps it fast, safe and found.` },
];
const sellPlans = plans.filter((p) => p.id !== "ai");
const planArt: GradientVariant[] = ["dusk", "ocean"];

// The homepage sells one thing to a local business owner: a website they see before they pay.
// Everything else lives on /services, /ai and /work.
export default function HomePage() {
  const whatsapp = `https://wa.me/${contact.whatsapp}`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />

      <main>
        {/* Hero: the offer on the left, the person behind it on the right. */}
        <Band className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-2">
          <div className="flex flex-col justify-center px-5 pb-12 pt-14 sm:px-8 lg:px-12 lg:py-20">
            <h1 className="rise text-[14px] text-muted sm:text-[15px]">Websites for UK local businesses</h1>
            <p className="rise mt-3 font-display text-[36px] font-light leading-[42px] tracking-[-0.02em] sm:text-[48px] sm:leading-[52px]">
              See your new website before you pay
            </p>
            <p className={`rise mt-5 max-w-md [animation-delay:120ms] ${LEAD}`}>
              I&apos;m Chris. I design and build websites for local businesses, live in 24 hours. {gbp(build.price!)}, then{" "}
              {gbp(care.price!)} a month to keep it running.
            </p>
            <div className="rise mt-8 flex flex-wrap gap-3 [animation-delay:240ms]">
              <Button href="/start">Build my website</Button>
              <Button href={contact.calUrl} variant="secondary">
                Book a call
              </Button>
            </div>
            <ul className="rise mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[14px] text-muted [animation-delay:360ms]">
              {["No payment until you're happy", "Fixed price", "One person, start to finish"].map((t) => (
                <li key={t} className="flex items-center gap-2 whitespace-nowrap">
                  <span aria-hidden="true" className="text-ink">
                    ✓
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-3 sm:p-4">
            <div className="relative h-full overflow-hidden rounded-3xl bg-stone ring-[0.5px] ring-ink/10">
              <Image
                src="/chris-knight.jpg"
                alt="Chris Knight"
                width={1518}
                height={1012}
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="h-full min-h-[22rem] w-full object-cover object-[50%_20%]"
              />
              <div className="theme-light absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-2xl bg-white/90 px-4 py-3 text-[#000] shadow-[0_0_0_0.5px_rgba(0,0,0,0.1),0_8px_24px_rgba(30,20,10,0.12)] backdrop-blur sm:left-auto sm:max-w-xs">
                <span className="min-w-0">
                  <span className="block text-[15px]">Chris Knight</span>
                  <span className="block truncate text-[13px] text-[#777169]">Designer and developer</span>
                </span>
                <a href="/work" className="whitespace-nowrap text-[13px] underline underline-offset-4">
                  My work
                </a>
              </div>
            </div>
          </div>
        </Band>

        {/* Brands */}
        <Band>
          <p className="pt-8 text-center text-[15px] text-muted">Brands I&apos;ve worked with</p>
          <ul className="grid grid-cols-2 sm:grid-cols-4">
            {clients.map((c) => (
              <li key={c.name} className="flex justify-center pb-8 pt-6 opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0 sm:pb-10">
                <a href={c.url} target="_blank" rel="noopener noreferrer" aria-label={c.name}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.logo} alt={c.name} className={`h-10 w-16 object-contain ${c.mono ? "dark:invert" : ""}`} />
                </a>
              </li>
            ))}
          </ul>
        </Band>

        {/* Proof: three live websites. */}
        <Band id="work">
          <BandHead title="Recent websites" intro="Live sites, designed and built by me. Open any of them." />
          <WorkCards />
          <div className="flex justify-center border-t border-ink/5 px-5 py-8 sm:px-8">
            <Button href="/work" variant="secondary">
              See all my work
            </Button>
          </div>
        </Band>

        {/* How it works, in three steps. */}
        <Band id="how-it-works">
          <BandHead title="How it works" intro="You see your website before you pay a penny. If you don't like it, you don't pay." />
          <Cells>
            {howItWorks.map((s, i) => (
              <Reveal key={s.title} delay={i * 80} className="px-5 py-10 sm:px-8 lg:px-12">
                <p className="font-display text-[40px] font-light leading-none text-muted">{i + 1}</p>
                <h3 className="mt-6 text-[17px] leading-6">{s.title}</h3>
                <p className={`mt-1.5 ${MUTED}`}>{s.body}</p>
              </Reveal>
            ))}
          </Cells>
          <div className="flex justify-center border-t border-ink/5 px-5 py-8 sm:px-8">
            <Button href="/start">Build my website</Button>
          </div>
        </Band>

        {/* Pricing: the website and its upkeep. */}
        <Band id="pricing">
          <BandHead
            title={
              <>
                {gbp(build.price!)} to build,
                <br />
                {gbp(care.price!)} a month to run
              </>
            }
            intro="You pay for your website after approving the first draft, and hosting starts when you go live. No VAT to add."
          />
          <Cells cols={2}>
            {sellPlans.map((plan, i) => (
              <PlanCard key={plan.id} plan={plan} href={planHref(plan)} variant={planArt[i]} delay={i * 80} />
            ))}
          </Cells>
          <div className="flex flex-col items-center gap-3 border-t border-ink/5 px-5 py-8 text-center text-[15px] text-muted sm:flex-row sm:justify-center sm:gap-6 sm:px-8">
            <a href="/services" className="underline decoration-ink/20 underline-offset-4 hover:text-ink">
              Add SEO, ads, booking and more
            </a>
            <a href="/ai" className="underline decoration-ink/20 underline-offset-4 hover:text-ink">
              AI for your business, from £4,999
            </a>
          </div>
        </Band>

        {/* FAQ */}
        <Band id="faq" className="grid gap-8 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_2fr] lg:gap-12 lg:py-[120px]">
          <div>
            <h2 className={H2}>
              Frequently
              <br />
              asked questions
            </h2>
          </div>
          <div>
            {faqs.map((f) => (
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

        {/* Closing band */}
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

      {/* WhatsApp, after the floating voice-chat button on elevenlabs.io. */}
      <a
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-20 hidden items-center gap-3 rounded-full bg-card py-2 pl-2 pr-5 text-[15px] shadow-[0_0_0_0.5px_rgb(var(--ink)/0.15),0_12px_32px_rgba(30,20,10,0.14)] transition hover:-translate-y-0.5 sm:flex"
      >
        <span className="orb h-9 w-9 rounded-full" />
        Chat on WhatsApp
      </a>
    </>
  );
}
