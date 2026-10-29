import type { Metadata } from "next";
import Image from "next/image";
import { caseStudies, clients, contact, faqs, mailto, plans, portfolio, projects, services, site, social, stripeLinks, type Plan } from "@/content/site";
import { Band, BandHead, Cells, H2, IconTile, LEAD, MUTED } from "@/components/band";
import { Button } from "@/components/button";
import { CalModal } from "@/components/cal-modal";
import { CountUp } from "@/components/count-up";
import { Footer } from "@/components/footer";
import { GradientArt, type GradientVariant } from "@/components/gradient-art";
import { AiChip } from "@/components/illustrations";
import { HowIWork } from "@/components/how-i-work";
import { IntegrationTabs } from "@/components/integration-tabs";
import { PlanCard } from "@/components/plan-card";
import { PlatformTabs } from "@/components/platform-tabs";
import { Reveal } from "@/components/reveal";
import { SectorTabs } from "@/components/sector-tabs";
import { StartModal } from "@/components/start-modal";
import { ThemeToggle } from "@/components/theme-toggle";
import { Wordmark } from "@/components/wordmark";
import { Catalogue } from "./catalogue";

const planVariant: GradientVariant[] = ["dusk", "ocean", "ember"];

const [build, care] = plans;
const gbp = (n: number) => `£${n.toLocaleString("en-GB")}`;

export const metadata: Metadata = {
  title: "Websites, SEO and AEO for local businesses",
  description: `Custom websites for UK local businesses, from ${gbp(build.price!)}. Then ${gbp(care.price!)} a month for hosting and care. Built to be found on Google and recommended by AI.`,
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

const icon = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const benefits = [
  {
    title: "Turn visitors into enquiries",
    body: "Clear pages, click-to-call and simple forms, built so a visit becomes a call, a booking or a quote request.",
    svg: <path {...icon} d="M5 3h3l1.5 4-2 1.2a9 9 0 0 0 4.3 4.3L13 10.5l4 1.5v3a2 2 0 0 1-2 2A13 13 0 0 1 3 5a2 2 0 0 1 2-2Z" />,
  },
  {
    title: "Get found on Google and Maps",
    body: "Local SEO and a complete Google Business Profile, so people nearby find you before anyone else.",
    svg: (
      <>
        <path {...icon} d="M10 17s-5.5-5-5.5-9a5.5 5.5 0 0 1 11 0c0 4-5.5 9-5.5 9Z" />
        <circle {...icon} cx="10" cy="8" r="2" />
      </>
    ),
  },
  {
    title: "Recommended by AI assistants",
    body: "AEO for ChatGPT, Gemini and Google's AI answers, so they name your business when customers ask.",
    svg: <path {...icon} d="M10 3c.5 3.6 2.4 5.5 7 7-4.6 1.5-6.5 3.4-7 7-.5-3.6-2.4-5.5-7-7 4.6-1.5 6.5-3.4 7-7Z" />,
  },
];

// The proof under the bio: each name links to the work or the press about it.
const about: [string, [string, string][]][] = [
  ["Brands", clients.map((c) => [c.name, c.url])],
  ["Press", portfolio.filter((w) => w.kind === "Press").map((w) => [w.source.split(" · ")[0], w.url])],
  ["Products", projects.map((p) => [p.name, p.url])],
];
const linkedin = social.find((s) => s.name === "LinkedIn")?.url;

export default function HomePage() {
  const [featured] = caseStudies;
  const whatsapp = `https://wa.me/${contact.whatsapp}`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="sticky top-0 z-20 border-b border-ink/5 bg-canvas/85 backdrop-blur-md">
        <nav className="mx-auto flex h-16 w-[calc(100%-2.5rem)] max-w-[1178px] items-center justify-between">
          <div className="flex items-center gap-10">
            <Wordmark />
            <div className="hidden items-center gap-7 text-[15px] lg:flex">
              <a href="#work" className="hover:text-muted">Work</a>
              <a href="#services" className="hover:text-muted">Services</a>
              <a href="#pricing" className="hover:text-muted">Pricing</a>
              <a href="#faq" className="hover:text-muted">FAQ</a>
            </div>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Phones: the section links and WhatsApp in a small menu. */}
            <details className="group relative lg:hidden">
              <summary className="flex h-9 cursor-pointer list-none items-center rounded-full bg-card px-3 text-[15px] shadow-[0_0_0_0.5px_rgb(var(--ink)/0.2),0_1px_2px_rgb(var(--ink)/0.06)] sm:px-4">Menu</summary>
              <div className="absolute right-0 top-11 z-30 grid w-48 gap-1 rounded-2xl bg-card p-2 text-[15px] shadow-[0_0_0_0.5px_rgb(var(--ink)/0.15),0_12px_32px_rgba(30,20,10,0.14)]">
                {[
                  ["Work", "#work"],
                  ["Services", "#services"],
                  ["Pricing", "#pricing"],
                  ["FAQ", "#faq"],
                ].map(([label, href]) => (
                  <a key={href} href={href} className="rounded-xl px-3 py-2 hover:bg-surface">
                    {label}
                  </a>
                ))}
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="rounded-xl px-3 py-2 hover:bg-surface">
                  WhatsApp
                </a>
                <span className="flex items-center justify-between rounded-xl px-3 py-1 sm:hidden">
                  Theme <ThemeToggle />
                </span>
              </div>
            </details>
            <span className="hidden sm:inline-flex">
              <ThemeToggle />
            </span>
            <a
              href={contact.calUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center whitespace-nowrap rounded-full bg-ink px-3 text-[15px] text-canvas hover:bg-ink/80 sm:px-4"
            >
              Book a call
            </a>
          </div>
        </nav>
      </header>

      <main>
        {/* The page tells one story: the promise, proof, the person, how it works for them,
            then choose services, send the request, and pay. */}
        {/* Hero, after the elevenlabs.io homepage: the headline left, its line right, then one big stage. */}
        <Band>
          <div className="grid gap-6 px-5 pb-10 pt-14 sm:px-8 lg:grid-cols-2 lg:items-start lg:gap-12 lg:pb-12 lg:pt-24">
            <div>
              <h1 className="rise text-[15px] text-muted">Websites, SEO and AEO for UK local businesses</h1>
              <p className="rise mt-3 font-display text-[36px] font-light leading-[42px] tracking-[-0.02em] sm:text-[48px] sm:leading-[52px]">
                Websites that
                <br />
                make you money
              </p>
              <div className="rise mt-8 flex flex-wrap gap-3 [animation-delay:240ms] max-lg:hidden">
                <Button href="#services">Start now</Button>
                <Button href="#pricing" variant="secondary">
                  See pricing
                </Button>
              </div>
            </div>
            <div>
              <p className={`rise max-w-md [animation-delay:120ms] lg:mt-9 ${LEAD}`}>
                Your new website, live in 24 hours. Designed for your business, found on Google and recommended by AI. From{" "}
                {gbp(build.price!)}, then {gbp(care.price!)} a month.
              </p>
              <div className="rise mt-6 flex flex-wrap gap-3 [animation-delay:240ms] lg:hidden">
                <Button href="#services">Start now</Button>
                <Button href="#pricing" variant="secondary">
                  See pricing
                </Button>
              </div>
            </div>
          </div>
          <div className="px-3 pb-3 sm:px-4 sm:pb-4">
            <GradientArt variant="dusk" lines animate className="rise rounded-3xl px-4 pt-10 [animation-delay:360ms] sm:px-16 sm:pt-16 lg:px-24">
              <div className="absolute bottom-12 right-6 z-10 hidden lg:block">
                <div className="float">
                  <AiChip />
                </div>
              </div>
              <a
                href={featured.url}
                target="_blank"
                rel="noopener noreferrer"
                className="theme-light mx-auto block max-w-4xl overflow-hidden rounded-t-2xl bg-white shadow-[0_0_0_0.5px_rgba(0,0,0,0.12),0_24px_60px_rgba(40,20,10,0.25)]"
              >
                <span className="flex items-center gap-1.5 border-b border-black/5 px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#e5e5e5]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#e5e5e5]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#e5e5e5]" />
                  <span className="ml-3 truncate font-mono text-xs text-[#777169]">{featured.domain}</span>
                </span>
                <Image src={featured.image} alt={`${featured.name} website`} width={1440} height={900} priority sizes="(min-width: 1024px) 896px, 100vw" className="w-full" />
              </a>
            </GradientArt>
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

        {/* What the work does */}
        <Band>
          <BandHead
            title="More calls and bookings, from one website"
            intro="A site designed for your business, found on Google and recommended by AI. Then looked after every month, so it keeps working."
          />
          <Cells>
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 80} className="px-5 py-10 sm:px-8 lg:px-12">
                <IconTile>
                  <svg viewBox="0 0 20 20" className="h-[18px] w-[18px]" aria-hidden="true">
                    {b.svg}
                  </svg>
                </IconTile>
                <h3 className="mt-8 whitespace-nowrap text-[17px] leading-6">{b.title}</h3>
                <p className={`mt-1.5 ${MUTED}`}>{b.body}</p>
              </Reveal>
            ))}
          </Cells>
        </Band>

        {/* Work */}
        <Band id="work">
          <BandHead title="Recent websites" intro="Live sites, designed and built by me. Open any of them." />
          <Cells>
            {caseStudies.map((c, i) => (
              <Reveal key={c.url} delay={i * 80}>
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="group block p-3 sm:p-4">
                  <span className="block overflow-hidden rounded-3xl bg-stone p-4 pb-0 ring-[0.5px] ring-ink/10 sm:p-6 sm:pb-0">
                    <span className="theme-light block overflow-hidden rounded-t-xl bg-white shadow-[0_0_0_0.5px_rgba(0,0,0,0.12),0_12px_32px_rgba(30,20,10,0.12)] transition duration-500 group-hover:-translate-y-1">
                      <span className="flex items-center gap-1.5 border-b border-black/5 px-3 py-2">
                        <span className="h-2 w-2 rounded-full bg-[#e5e5e5]" />
                        <span className="h-2 w-2 rounded-full bg-[#e5e5e5]" />
                        <span className="h-2 w-2 rounded-full bg-[#e5e5e5]" />
                        <span className="ml-2 truncate font-mono text-[10px] text-[#777169]">{c.domain}</span>
                      </span>
                      <Image src={c.image} alt={`${c.name} homepage`} width={1440} height={900} sizes="(min-width: 768px) 360px, 100vw" className="w-full" />
                    </span>
                  </span>
                  <span className="block px-2 pb-4 pt-5">
                    <span className="flex h-6 items-center gap-2 overflow-hidden text-[13px] text-muted">
                      <span className="whitespace-nowrap">{c.sector}</span>
                      {"own" in c && c.own && <span className="whitespace-nowrap rounded-full bg-stone px-2 py-0.5 text-ink">My product</span>}
                    </span>
                    <span className="mt-1.5 block whitespace-nowrap text-[17px] group-hover:underline group-hover:underline-offset-4">{c.name}</span>
                    <span className={`mt-1.5 block ${MUTED}`}>{c.summary}</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </Cells>
          <div className="border-t border-ink/5 px-5 pb-6 pt-14 sm:px-8">
            <h3 className="text-[17px]">More work and press</h3>
          </div>
          <ul className="border-t border-ink/5">
            {portfolio.map((w) => (
              <li key={w.url} className="border-b border-ink/5 last:border-0">
                <a href={w.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 px-5 py-4 transition hover:bg-stone/60 sm:px-8">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white ring-[0.5px] ring-black/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={w.logo} alt="" loading="lazy" className={`h-full w-full object-contain ${w.pad ? "p-2" : ""}`} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[16px]">{w.title}</span>
                    <span className="block truncate text-[14px] text-muted">
                      {w.kind} · {w.source}
                    </span>
                  </span>
                  <span aria-hidden="true" className="text-muted transition group-hover:translate-x-0.5 group-hover:text-ink">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Band>

        {/* Who you'll work with, after the founder note on designjoy.co */}
        <Band id="about">
          <BandHead title="Who you'll work with" intro="One person, start to finish. No account managers, no handovers, no outsourcing." />
          <Cells cols={2} from="lg">
            <div className="p-3 sm:p-4">
              <Image
                src="/chris-knight.jpg"
                alt="Chris Knight"
                width={1518}
                height={1012}
                sizes="(min-width: 1024px) 560px, 100vw"
                className="aspect-[3/2] w-full rounded-3xl object-cover object-top ring-[0.5px] ring-ink/10"
              />
            </div>
            <div className="flex flex-col px-5 py-10 sm:px-8 lg:px-12">
              <p className={LEAD}>
                Hi, I&apos;m Chris. I design, build and look after every site myself. I&apos;ve made digital work for Nike,
                Google, Snapchat and Manchester City, and I build my own products too, like Private Clubs and
                CreatorBrands. Now I bring that same standard to local businesses, at a fixed price and live in 24 hours.
              </p>
              <dl className="mt-8 divide-y divide-ink/5 border-y border-ink/5 text-[15px]">
                {about.map(([label, items]) => (
                  <div key={label} className="flex gap-4 py-3">
                    <dt className="w-24 shrink-0 text-muted">{label}</dt>
                    <dd className="flex min-w-0 flex-wrap gap-x-3 gap-y-1">
                      {items.map(([name, url]) => (
                        <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap hover:text-muted">
                          {name}
                        </a>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={contact.calUrl}>Book a call</Button>
                {linkedin && (
                  <Button href={linkedin} variant="secondary">
                    LinkedIn
                  </Button>
                )}
              </div>
            </div>
          </Cells>
        </Band>

        {/* The price, as a figure */}
        <Band>
          <Reveal className="relative flex flex-col items-center px-5 py-20 text-center sm:py-28">
            <p
              aria-hidden="true"
              className="select-none bg-gradient-to-b from-ink/[0.16] to-ink/[0.03] bg-clip-text font-display text-[120px] font-light leading-none tracking-[-0.04em] text-transparent sm:text-[220px]"
            >
              <CountUp to={24} duration={900} />
            </p>
            <p className={`-mt-10 text-balance sm:-mt-20 ${H2}`}>
              Hours from first message <br className="hidden sm:block" />
              to a live website
            </p>
            <p className={`mt-3 ${LEAD} text-muted`}>
              From {gbp(build.price!)}, then {gbp(care.price!)} a month.
            </p>
          </Reveal>
        </Band>

        {/* Platforms */}
        <Band id="platforms">
          <BandHead
            title="Found on Google, Maps and AI assistants"
            intro="More customers ask ChatGPT or Google's AI before they call. I set your business up to be the answer."
          />
          <PlatformTabs />
        </Band>

        {/* Sectors */}
        <Band>
          <BandHead
            title="A website for every kind of local business"
            intro="Calls for trades, bookings for salons, menus for cafés. Each site is built around how your customers choose."
          />
          <SectorTabs />
        </Band>

        {/* Integrations */}
        <Band id="integrations">
          <BandHead
            title="Works with the tools you already use"
            intro="Bookings, orders, storefronts and payments, connected to your new site. Pick your kind of business to see what I set up."
          />
          <IntegrationTabs />
        </Band>

        <HowIWork />

        {/* Services */}
        <Band id="services">
          <BandHead title="Choose your services" intro="Your website is ticked already. Add anything else, then send your request." />
          <div className="border-t border-ink/5 px-5 py-12 sm:px-8 lg:py-16">
            <Catalogue />
          </div>
        </Band>

        {/* Pricing */}
        <Band id="pricing">
          <BandHead
            title={
              <>
                {gbp(build.price!)} to build,
                <br />
                {gbp(care.price!)} a month to run
              </>
            }
            intro="You pay for your website after approving the first draft, and hosting starts when you go live. AI for your business is scoped on a call. No VAT to add."
          />
          <Cells from="lg">
            {plans.map((plan, i) => (
              <PlanCard key={plan.id} plan={plan} href={planHref(plan)} variant={planVariant[i]} delay={i * 80} />
            ))}
          </Cells>
        </Band>

        {/* FAQ */}
        <Band id="faq" className="grid gap-8 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_2fr] lg:gap-12 lg:py-[120px]">
          <div>
            <h2 className={H2}>
              Frequently
              <br />
              asked questions
            </h2>
            <p className={`mt-4 ${MUTED}`}>
              Something else?{" "}
              <a href={mailto("Question")} className="text-ink underline decoration-ink/30 underline-offset-4">
                Email me
              </a>
            </p>
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

        {/* Getting started */}
        <Band>
          <BandHead
            center
            title={
              <>
                Start your website today
                <span className="block text-muted">or talk it through first</span>
              </>
            }
          />
          <Cells cols={2}>
            <div className="p-3 sm:p-4">
              <div className="flex h-full flex-col rounded-3xl bg-stone p-6 ring-[0.5px] ring-ink/10 sm:p-8">
                <div className="flex items-center gap-4">
                  <GradientArt variant="ocean" className="h-12 w-12 shrink-0 rounded-full" />
                  <div className="min-w-0">
                    <h3 className="truncate text-[17px]">Not sure what you need?</h3>
                    <p className="truncate text-[14px] text-muted">Five quick questions</p>
                  </div>
                </div>
                <p className={`mt-6 max-w-sm ${MUTED}`}>Tell me about your business and I&apos;ll point you to the right website and services.</p>
                <div className="mt-6">
                  <Button href="/start" variant="secondary">
                    Answer 5 questions
                  </Button>
                </div>
              </div>
            </div>
            <div className="p-3 sm:p-4">
              <div className="flex h-full flex-col rounded-3xl bg-stone p-6 ring-[0.5px] ring-ink/10 sm:p-8">
                <div className="flex items-center gap-4">
                  <span className="orb h-12 w-12 shrink-0 rounded-full" aria-hidden="true" />
                  <div className="min-w-0">
                    <h3 className="truncate text-[17px]">Book an intro call</h3>
                    <p className="truncate text-[14px] text-muted">A video call on Google Meet</p>
                  </div>
                </div>
                <p className={`mt-6 max-w-sm ${MUTED}`}>See if we&apos;re a fit, talk through your business and get a price. Pick a time that suits you.</p>
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <Button href={contact.calUrl}>Book a call</Button>
                  <a href={mailto("Hello")} className="whitespace-nowrap text-[15px] text-muted underline decoration-ink/20 underline-offset-4 hover:text-ink">
                    Prefer to email? {site.email}
                  </a>
                </div>
              </div>
            </div>
          </Cells>
        </Band>

      </main>

      <Footer />
      <StartModal />
      <CalModal />

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
