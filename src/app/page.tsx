import type { Metadata } from "next";
import Image from "next/image";
import { contact, faqs, plans, services, servicesFaq, site, social, stripeLinks, type Plan } from "@/content/site";
import { Band, BandHead, Cells, CtaBand, H2, LEAD, MUTED } from "@/components/band";
import { Button } from "@/components/button";
import { Footer } from "@/components/footer";
import { type GradientVariant } from "@/components/gradient-art";
import { StepAsk, StepBuild, StepPay } from "@/components/illustrations";
import { PlanCard } from "@/components/plan-card";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { SectorTabs } from "@/components/sector-tabs";
import { LogoStrip, WorkCards } from "@/components/work";

const [build, care] = plans;
const gbp = (n: number) => `£${n.toLocaleString("en-GB")}`;

export const metadata: Metadata = {
  title: "Websites for UK local businesses",
  description: `Websites that make you money. Your homepage draft within 24 hours, then from ${gbp(build.price!)} to finish and launch and ${gbp(care.price!)} a month. You pay once you've approved the draft.`,
  alternates: { canonical: "/" },
  twitter: { card: "summary_large_image", title: "Websites that make you money", images: ["/og.jpg"] },
  openGraph: {
    siteName: site.name,
    locale: "en_GB",
    title: "Websites that make you money",
    description: `Your homepage draft within 24 hours. From ${gbp(build.price!)}, then ${gbp(care.price!)} a month.`,
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
  { title: "Tell me about your business", body: "A few quick questions, about two minutes. No call needed." },
  { title: "See your draft within 24 hours", body: "Your homepage, designed and written for your business, ready to look over." },
  { title: "Approve it, pay, then go live", body: `One fixed price, from ${gbp(build.price!)}. Then ${gbp(care.price!)} a month keeps it fast, safe and found.` },
];
const sellPlans = plans.filter((p) => p.id === "build" || p.id === "care");
const planArt: GradientVariant[] = ["dusk", "paper"];
const stepScenes = [StepAsk, StepBuild, StepPay];

// The homepage sells one thing to a local business owner: a website they see before they pay.
// Everything else lives on /services, /ai and /work.
export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />

      <main>
        {/* Hero: the offer on the left, the person behind it on the right. */}
        <Band className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-2">
          <div className="flex flex-col justify-center px-5 pb-12 pt-14 sm:px-8 lg:px-12 lg:py-20">
            <h1 className="rise text-[14px] text-muted sm:text-[15px]">Websites for UK trades, salons, cafés and shops</h1>
            <p className="rise mt-3 font-display text-[36px] font-light leading-[42px] tracking-[-0.02em] sm:text-[48px] sm:leading-[52px]">
              Websites that make you money
            </p>
            <p className={`rise mt-5 max-w-md [animation-delay:120ms] ${LEAD}`}>
              I&apos;m Chris. Tell me about your business and I&apos;ll send your homepage draft within 24 hours. Your website is
              from {gbp(build.price!)} to finish and launch, then {gbp(care.price!)} a month. You pay once you&apos;ve approved the draft.
            </p>
            <div className="rise mt-8 flex flex-wrap gap-3 [animation-delay:240ms]">
              <Button href="/start">Build my website</Button>
              <Button href={contact.calUrl} variant="secondary">
                Book a call
              </Button>
            </div>
            <ul className="rise mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[14px] text-muted [animation-delay:360ms] max-sm:[&>li:nth-child(3)]:hidden">
              {["Draft in 24 hours", "Fixed price", "One person, start to finish"].map((t) => (
                <li key={t} className="flex items-center gap-2 whitespace-nowrap">
                  <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4 shrink-0 text-ink">
                    <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-3 sm:p-4">
            <div className="relative h-full overflow-hidden rounded-[20px] bg-stone ring-[0.5px] ring-ink/10">
              <Image
                src="/chris-knight.jpg"
                alt="Chris Knight"
                width={1518}
                height={1012}
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="h-full min-h-[22rem] w-full object-cover object-[50%_20%] mix-blend-multiply dark:mix-blend-normal dark:brightness-[.82] dark:contrast-[1.05]"
              />
              <div className="theme-light absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-2xl bg-white/90 px-4 py-3 text-[#000] shadow-[0_0_0_0.5px_rgba(0,0,0,0.1),0_8px_24px_rgba(30,20,10,0.12)] backdrop-blur sm:left-auto sm:max-w-xs">
                <span className="min-w-0">
                  <span className="block text-[15px]">Chris Knight</span>
                  <span className="block truncate text-[13px] text-[#777169]">Designer and developer</span>
                </span>
                <a href="/work" className="inline-flex h-8 items-center whitespace-nowrap rounded-full bg-[#000] px-3 text-[13px] text-white hover:bg-[#000]/80">
                  My work
                </a>
              </div>
            </div>
          </div>
        </Band>

        {/* The brands, straight under the hero as on elevenlabs.io. */}
        <LogoStrip />

        {/* How it works, in three steps, each with its screen. */}
        <Band id="how-it-works">
          <BandHead
            title="How it works"
            intro={`Your homepage draft within 24 hours, then one fixed price, from ${gbp(build.price!)}, to finish and launch.`}
            action={<Button href="/start">Build my website</Button>}
          />
          <Cells>
            {howItWorks.map((s, i) => {
              const Scene = stepScenes[i];
              return (
                <Reveal key={s.title} delay={i * 80} className="flex flex-col p-3 sm:p-4">
                  <div className="grid aspect-[4/3] place-items-center rounded-2xl bg-stone px-6 ring-[0.5px] ring-ink/10">
                    <Scene />
                  </div>
                  <div className="px-2 pb-6 pt-5 sm:px-4">
                    <p className="text-[14px] tabular-nums text-muted">0{i + 1}</p>
                    <h3 className="mt-1 text-[16px] leading-6">{s.title}</h3>
                    <p className={`mt-1 ${MUTED}`}>{s.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </Cells>
        </Band>

        {/* What your draft looks like: an example homepage for each kind of business. */}
        <Band>
          <BandHead
            title="What your draft looks like"
            intro="A homepage written for your trade, your town and your customers. These are examples; yours is written for your business."
          />
          <SectorTabs />
        </Band>

        {/* Proof: three live websites. */}
        <Band id="work">
          <BandHead
            title="Recent websites"
            intro="Live sites, designed and built by me. Open any of them."
            action={
              <Button href="/work" variant="secondary">
                See all my work
              </Button>
            }
          />
          <WorkCards />
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
            intro="You pay for your website after approving the first draft, and hosting starts when you go live."
          />
          <Cells cols={2}>
            {sellPlans.map((plan, i) => (
              <PlanCard key={plan.id} plan={plan} href={planHref(plan)} variant={planArt[i]} delay={i * 80} />
            ))}
          </Cells>
          <p className="border-t border-ink/5 px-5 py-6 text-center text-[14px] leading-6 text-muted sm:px-8">
            No VAT to add. Need more?{" "}
            <a href="/services" className="whitespace-nowrap text-ink hover:underline hover:underline-offset-4 max-sm:block">
              Add SEO, ads and booking →
            </a>
            <span className="px-2 max-sm:hidden">·</span>
            <a href="/services?bundle=get-found#services" className="whitespace-nowrap text-ink hover:underline hover:underline-offset-4 max-sm:block">
              Bundles from £449 a month →
            </a>
            <span className="px-2 max-sm:hidden">·</span>
            <a href="/ai" className="whitespace-nowrap text-ink hover:underline hover:underline-offset-4 max-sm:block">
              AI for your business, from £4,999 →
            </a>
          </p>
        </Band>

        {/* FAQ */}
        <Band id="faq" className="grid gap-8 px-5 pb-20 pt-24 sm:px-8 lg:grid-cols-[1fr_2fr] lg:gap-12 lg:pb-[120px] lg:pt-[160px]">
          <div>
            <h2 className={H2}>
              Frequently
              <br />
              asked questions
            </h2>
          </div>
          <div>
            {faqs.filter((f) => !servicesFaq(f.q)).map((f) => (
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
