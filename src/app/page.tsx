import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  aiAssistants,
  caseStudies,
  clients,
  contact,
  faqs,
  mailto,
  plans,
  portfolio,
  services,
  site,
  social,
  steps,
  type LogoId,
  type Plan,
} from "@/content/site";
import { Footer } from "@/components/footer";
import { GradientArt, type GradientVariant } from "@/components/gradient-art";
import { AiAnswer, EnquiryCard, MapsCard, StepBuild, StepGrow, StepTalk } from "@/components/illustrations";
import { LogoRow } from "@/components/logos";
import { Reveal } from "@/components/reveal";
import { StartModal } from "@/components/start-modal";
import { ThemeToggle } from "@/components/theme-toggle";
import { Wordmark } from "@/components/wordmark";
import { Catalogue } from "./catalogue";

const stepArt = [
  { Art: StepTalk, variant: "dusk" },
  { Art: StepBuild, variant: "ember" },
  { Art: StepGrow, variant: "forest" },
] as const;
const planVariant: GradientVariant[] = ["dusk", "ocean", "ember"];
const kindVariant: Record<string, GradientVariant> = {
  Venture: "dusk",
  Press: "ocean",
  "Case study": "forest",
  Brand: "ember",
  Website: "rose",
  "Product design": "dusk",
};

const [build, care] = plans;
const gbp = (n: number) => `£${n.toLocaleString("en-GB")}`;

export const metadata: Metadata = {
  title: "Websites, SEO and AEO for local businesses",
  description: `Custom websites for UK local businesses, from ${gbp(build.price!)}. Then ${gbp(care.price!)} a month for hosting and care. Built to be found on Google and recommended by AI.`,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Websites that make you money",
    description: `Custom websites for local businesses, from ${gbp(build.price!)}. Hosting and care, ${gbp(care.price!)} a month.`,
    url: "/",
    type: "website",
  },
};

const planHref = (p: Plan) => `/start?need=${encodeURIComponent(p.need)}`;

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

function Button({ href, children, variant = "black" }: { href: string; children: React.ReactNode; variant?: "black" | "white" | "stone" }) {
  const styles = {
    black: "bg-ink text-canvas hover:bg-ink/80",
    white: "bg-card text-ink shadow-pill hover:bg-surface",
    stone: "bg-stone/80 text-ink shadow-warm ring-1 ring-ink/[0.04] hover:bg-stone",
  }[variant];
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className={`inline-flex h-11 items-center justify-center rounded-full px-5 text-[15px] font-medium tracking-normal transition ${styles}`}
    >
      {children}
    </a>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="mt-[3px] h-4 w-4 shrink-0 text-ink">
      <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SectionHead({ title, intro, align = "center" }: { title: string; intro?: string; align?: "center" | "left" }) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      <h2 className="text-balance font-display text-4xl font-light leading-[1.1] tracking-[-0.025em] sm:text-5xl">{title}</h2>
      {intro && <p className="mt-5 text-lg leading-relaxed text-body">{intro}</p>}
    </Reveal>
  );
}

export default function ServicesPage() {
  const [featured] = caseStudies;
  const whatsapp = `https://wa.me/${contact.whatsapp}`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hairline frame at the content edges, as on the benchmark. */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-y-0 left-1/2 z-0 hidden w-[calc(72rem+3rem)] -translate-x-1/2 border-x border-ink/[0.05] xl:block" />

      <header className="sticky top-0 z-20 border-b border-ink/5 bg-canvas/85 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Wordmark />
          <div className="hidden items-center gap-8 text-[15px] font-medium text-body lg:flex">
            <a href="#pricing" className="hover:text-ink">Pricing</a>
            <a href="#services" className="hover:text-ink">Services</a>
            <a href="#work" className="hover:text-ink">Work</a>
            <a href="#faq" className="hover:text-ink">FAQ</a>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a href={contact.calUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 items-center rounded-full bg-ink px-4 text-sm font-medium text-canvas">
              Book a call
            </a>
          </div>
        </nav>
      </header>

      <main className="relative">
        {/* Hero */}
        <section className="px-4 pt-16 sm:px-6 sm:pt-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="rise inline-flex items-center gap-2 rounded-full bg-card px-3.5 py-1.5 text-[13px] font-medium text-body shadow-pill">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#f39a4c] to-[#6f8fe0]" />
              Websites, SEO and AEO for UK local businesses
            </p>
            <h1 className="rise mt-7 text-balance font-display text-[2.75rem] font-light leading-[1.05] tracking-[-0.035em] [animation-delay:120ms] sm:text-7xl">
              Websites that make you money
            </h1>
            <p className="rise mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-body [animation-delay:240ms]">
              I design, build and look after websites for local businesses, so more people find you on Google and in AI
              answers. From {gbp(build.price!)}, then {gbp(care.price!)} a month.
            </p>
            <div className="rise mt-9 flex flex-col justify-center gap-3 [animation-delay:360ms] sm:flex-row">
              <Button href="/start">Start now</Button>
              <Button href="#pricing" variant="stone">See pricing</Button>
            </div>
          </div>

          <GradientArt variant="dusk" lines className="rise mx-auto mt-16 max-w-6xl rounded-3xl px-4 pt-10 [animation-delay:480ms] sm:px-16 sm:pt-16">
            <div className="absolute -left-2 bottom-24 z-10 hidden lg:block">
              <MapsCard />
            </div>
            <div className="absolute bottom-10 right-10 z-10 hidden md:block">
              <div className="float">
                <EnquiryCard />
              </div>
            </div>
            <a href={featured.url} target="_blank" rel="noopener noreferrer" className="theme-light block overflow-hidden rounded-t-2xl bg-white shadow-[0_24px_60px_rgba(40,20,10,0.25)]">
              <div className="flex items-center gap-1.5 border-b border-ink/5 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="ml-3 truncate font-mono text-xs text-muted">{featured.domain}</span>
              </div>
              <Image
                src={featured.image}
                alt={`${featured.name} website`}
                width={1440}
                height={810}
                priority
                sizes="(min-width: 1152px) 1024px, 100vw"
                className="w-full"
              />
            </a>
          </GradientArt>
          <div className="mt-4 flex justify-center md:hidden">
            <EnquiryCard />
          </div>

          <Reveal className="mx-auto mt-16 max-w-4xl">
            <p className="text-center text-sm text-muted">Brands I&apos;ve worked with</p>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 sm:gap-x-16">
              {clients.map((c) => (
                <li key={c.name} className="opacity-50 grayscale transition hover:opacity-100 hover:grayscale-0">
                  <a href={c.url} target="_blank" rel="noopener noreferrer" aria-label={c.name} className="block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.logo} alt={c.name} className={`h-10 w-16 object-contain ${c.mono ? "dark:invert" : ""}`} />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* Platforms */}
        <section id="platforms" className="mx-auto max-w-6xl scroll-mt-16 px-4 pt-28 sm:px-6 sm:pt-36">
          <SectionHead
            title="Found on Google, Maps and AI assistants"
            intro="More customers now ask ChatGPT or Google's AI before they call. I set your business up to be the answer."
          />
          <Reveal className="mt-14">
            <GradientArt variant="ocean" lines className="rounded-3xl px-4 py-14 sm:px-10 sm:py-20">
              <AiAnswer />
            </GradientArt>
          </Reveal>
          <Reveal className="mt-10">
            <LogoRow ids={[...aiAssistants, "google", "meta"] as LogoId[]} />
          </Reveal>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-28 sm:px-6 sm:py-36">
          <SectionHead title="One minute to start. I do the rest." />
          <ol className="mt-14 grid gap-5 md:grid-cols-3">
            {steps.map((s, i) => {
              const { Art, variant } = stepArt[i];
              return (
                <Reveal as="li" key={s.title} delay={i * 120}>
                  <GradientArt variant={variant} className="flex aspect-[4/3] items-center justify-center rounded-3xl p-6">
                    <Art />
                  </GradientArt>
                  <div className="px-1 pt-6">
                    <span className="font-mono text-xs text-muted">0{i + 1}</span>
                    <h3 className="mt-2 text-xl font-medium">{s.title}</h3>
                    <p className="mt-2 leading-relaxed text-body">{s.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </section>

        {/* Pricing */}
        <section id="pricing" className="scroll-mt-16 bg-surface px-4 py-28 sm:px-6 sm:py-36">
          <div className="mx-auto max-w-6xl">
            <SectionHead
              title={`${gbp(build.price!)} to build. ${gbp(care.price!)} a month to run.`}
              intro="Your price is agreed before any work starts. Cancel hosting any time."
            />
            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {plans.map((plan, i) => (
                <Reveal key={plan.id} delay={i * 120} className="flex flex-col overflow-hidden rounded-3xl bg-card shadow-card">
                  <GradientArt variant={planVariant[i]} lines={i === 0} className="flex h-36 items-center justify-center">
                    <h3 className="font-display text-3xl font-light tracking-[-0.02em] text-white">{plan.name}</h3>
                  </GradientArt>
                  <div className="flex flex-1 flex-col p-8">
                    <p className="flex flex-wrap items-baseline gap-x-2">
                      {plan.price === null ? (
                        <span className="font-display text-4xl font-light tracking-[-0.03em]">Quoted for you</span>
                      ) : (
                        <>
                          {plan.prefix && <span className="text-sm text-muted">{plan.prefix}</span>}
                          <span className="font-display text-6xl font-light tracking-[-0.04em]">{gbp(plan.price)}</span>
                          <span className="text-sm text-muted">{plan.period}</span>
                        </>
                      )}
                    </p>
                    <p className="mt-4 leading-relaxed text-body">{plan.blurb}</p>
                    <ul className="mt-8 space-y-3 border-t border-ink/5 pt-8 text-[15px]">
                      {plan.features.map((f) => (
                        <li key={f} className="flex gap-3">
                          <Check />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-10">
                      {plan.cta ? (
                        <Button href={planHref(plan)} variant={i === 0 ? "black" : "white"}>
                          {plan.cta}
                        </Button>
                      ) : (
                        <p className="text-sm text-muted">Starts when your site goes live.</p>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-28 sm:px-6 sm:py-36">
          <SectionHead title="Add what you need" intro="Choose the services you want, then continue. Each one is quoted for your business." />
          <div className="mt-14">
            <Catalogue />
          </div>
        </section>

        {/* Work */}
        <section id="work" className="scroll-mt-16 bg-surface px-4 py-28 sm:px-6 sm:py-36">
          <div className="mx-auto max-w-6xl">
            <SectionHead title="Recent websites" />
            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {caseStudies.map((c, i) => (
                <Reveal key={c.url} delay={i * 120}>
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="group block">
                    <GradientArt
                      variant={c.variant}
                      lines={i === 1}
                      className="flex aspect-square items-center justify-center rounded-3xl p-8 transition duration-500 group-hover:scale-[0.99]"
                    >
                      <p className="text-balance text-center font-display text-4xl font-light leading-tight tracking-[-0.02em] text-white">{c.name}</p>
                    </GradientArt>
                    <div className="px-1 pt-5">
                      <h3 className="text-xl font-medium leading-snug group-hover:underline group-hover:underline-offset-4">{c.summary}</h3>
                      <p className="mt-2 flex gap-3 text-sm">
                        <span>{c.sector}</span>
                        <span className="text-muted">{c.domain}</span>
                      </p>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-20">
              <h3 className="text-2xl font-medium">More work and press</h3>
              <ul className="mt-6 divide-y divide-ink/[0.06] border-y border-ink/[0.06]">
                {portfolio.map((w) => (
                  <li key={w.url}>
                    <a href={w.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-5 py-4">
                      <GradientArt variant={kindVariant[w.kind] ?? "dusk"} className="h-12 w-12 shrink-0 rounded-xl" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-[17px] font-medium leading-snug group-hover:underline group-hover:underline-offset-4">{w.title}</span>
                        <span className="mt-0.5 block text-sm text-muted">
                          {w.kind} · {w.source}
                        </span>
                      </span>
                      <span aria-hidden="true" className="text-xl text-muted transition group-hover:translate-x-0.5 group-hover:text-ink">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto grid max-w-6xl scroll-mt-16 gap-12 px-4 py-28 sm:px-6 sm:py-36 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHead title="Before you start" align="left" />
            <p className="mt-5 text-body">
              Still have a question?{" "}
              <a href={mailto("Question")} className="text-ink underline decoration-muted underline-offset-4">
                Email me
              </a>
            </p>
          </div>
          <div className="divide-y divide-ink/[0.06] border-y border-ink/[0.06]">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[17px] font-medium">
                  {f.q}
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-card text-muted shadow-pill transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 pr-12 leading-relaxed text-body">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-4 pb-28 sm:px-6">
          <GradientArt variant="ember" lines className="mx-auto max-w-6xl rounded-3xl px-6 py-24 text-center sm:py-32">
            <h2 className="mx-auto max-w-3xl text-balance font-display text-4xl font-light leading-[1.1] tracking-[-0.03em] text-white sm:text-6xl">
              Your new website starts here
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/80">
              A few quick questions, about a minute. Then message me on WhatsApp or book a call.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/start" variant="white">Start now</Button>
            </div>
          </GradientArt>
        </section>
      </main>

      <Footer />
      <StartModal />

      {/* WhatsApp orb, after the benchmark's floating voice-chat button. */}
      <a
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-20 hidden items-center gap-3 rounded-full bg-card py-2 pl-2 pr-5 text-[15px] font-medium shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_12px_32px_rgba(30,20,10,0.16)] transition hover:-translate-y-0.5 sm:flex"
      >
        <span className="orb h-9 w-9 rounded-full" />
        Chat on WhatsApp
      </a>
    </>
  );
}
