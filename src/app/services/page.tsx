import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { audiences, caseStudies, faqs, mailto, plans, services, site, steps, stripeLinks, type Plan } from "@/content/site";
import { GradientField } from "@/components/gradient-field";
import { AiCard, EnquiryCard, MapsCard, StepBuild, StepGrow, StepTalk } from "@/components/illustrations";
import { Reveal } from "@/components/reveal";
import { Catalogue } from "./catalogue";

const stepArt = [StepTalk, StepBuild, StepGrow];

const [build, care] = plans;
const gbp = (n: number) => `£${n.toLocaleString("en-GB")}`;

export const metadata: Metadata = {
  title: "Website design, SEO & AEO for local businesses",
  description: `Custom websites for UK local businesses from ${gbp(build.price!)}, plus ${gbp(care.price!)}/month hosting & care. SEO and AEO so customers find you on Google and AI assistants.`,
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Website design, SEO & AEO for local businesses",
    description: `Custom websites from ${gbp(build.price!)}. Hosting & care ${gbp(care.price!)}/month.`,
    url: "/services",
    type: "website",
  },
};

const planHref = (p: Plan) => stripeLinks[p.id] || mailto(`${p.name} enquiry`);

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#business`,
      name: site.name,
      url: `${site.url}/services`,
      email: site.email,
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
                p.period === "per month"
                  ? { "@type": "UnitPriceSpecification", price: p.price, priceCurrency: "GBP", unitText: "MONTH" }
                  : { "@type": "PriceSpecification", minPrice: p.price, priceCurrency: "GBP" },
            })),
          ...services
            .filter((s) => !s.core)
            .map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, description: s.body } })),
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
    black: "bg-ink text-white hover:bg-ink/80",
    white: "bg-white text-ink shadow-pill hover:bg-surface",
    stone: "bg-stone/80 text-ink shadow-warm ring-1 ring-black/[0.04] hover:bg-stone",
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

function SectionHead({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{eyebrow}</p>
      <h2 className="mt-4 text-balance font-display text-4xl font-light leading-[1.12] tracking-[-0.02em] sm:text-5xl">{title}</h2>
      {intro && <p className="mt-5 text-lg leading-relaxed text-body">{intro}</p>}
    </Reveal>
  );
}

export default function ServicesPage() {
  const [featured] = caseStudies;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="sticky top-0 z-20 border-b border-black/5 bg-white/85 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="font-display text-2xl tracking-[-0.03em]">
            {site.name}
          </Link>
          <div className="hidden items-center gap-8 text-[15px] font-medium text-body lg:flex">
            <a href="#pricing" className="hover:text-ink">Pricing</a>
            <a href="#services" className="hover:text-ink">Services</a>
            <a href="#work" className="hover:text-ink">Work</a>
            <a href="#faq" className="hover:text-ink">FAQ</a>
          </div>
          <div className="flex items-center gap-2">
            <a href={mailto("Hello")} className="hidden h-9 items-center rounded-full bg-white px-4 text-sm font-medium shadow-pill sm:inline-flex">
              Contact
            </a>
            <a href="#pricing" className="inline-flex h-9 items-center rounded-full bg-ink px-4 text-sm font-medium text-white">
              Get started
            </a>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="px-4 pt-16 sm:px-6 sm:pt-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="rise inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-medium text-body shadow-pill">
              <span className="relative flex h-1.5 w-1.5">
                <span className="pulse-ring absolute inset-0 rounded-full bg-ink" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-ink" />
              </span>
              Websites, SEO & AEO for UK local businesses
            </p>
            <h1 className="rise mt-7 text-balance font-display text-[2.75rem] font-light leading-[1.05] tracking-[-0.035em] [animation-delay:120ms] sm:text-7xl">
              Websites that win you local customers
            </h1>
            <p className="rise mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-body [animation-delay:240ms]">
              A custom website from {gbp(build.price!)}, then {gbp(care.price!)} a month for hosting, updates and a monthly
              SEO & AEO report. Built to be found on Google and recommended by AI assistants.
            </p>
            <div className="rise mt-9 flex flex-col justify-center gap-3 [animation-delay:360ms] sm:flex-row">
              <Button href="#pricing">See pricing</Button>
              <Button href="#work" variant="stone">See recent work</Button>
            </div>
          </div>

          <GradientField className="rise relative mx-auto mt-16 max-w-6xl rounded-3xl px-4 pt-10 [animation-delay:480ms] sm:px-16 sm:pt-16">
            <div className="absolute left-6 top-24 z-10 hidden md:block">
              <div className="float"><MapsCard /></div>
            </div>
            <div className="absolute right-6 top-48 z-10 hidden md:block">
              <div className="float [animation-delay:-2s]"><AiCard /></div>
            </div>
            <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 md:bottom-10 md:left-auto md:right-24 md:translate-x-0">
              <div className="float [animation-delay:-4s]"><EnquiryCard /></div>
            </div>
            <a href={featured.url} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-t-2xl bg-white shadow-card">
              <div className="flex items-center gap-1.5 border-b border-black/5 px-4 py-3">
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
          </GradientField>

          <div className="relative mx-auto mt-10 max-w-6xl overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
            <ul className="marquee flex w-max gap-10 text-sm text-muted">
              {[...audiences, ...audiences].map((a, i) => (
                <li key={i} aria-hidden={i >= audiences.length} className="flex items-center gap-10 whitespace-nowrap">
                  {a}
                  <span className="h-1 w-1 rounded-full bg-line" />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6 sm:py-32">
          <SectionHead eyebrow="How it works" title="From first call to live website" />
          <ol className="mt-14 grid gap-4 md:grid-cols-3">
            {steps.map((s, i) => {
              const Art = stepArt[i];
              return (
                <Reveal as="li" key={s.title} delay={i * 120} className="overflow-hidden rounded-[20px] bg-white shadow-card">
                  <div className="h-40 bg-stone/60 px-8 py-6">
                    <Art />
                  </div>
                  <div className="p-7">
                    <span className="font-mono text-xs text-muted">0{i + 1}</span>
                    <h3 className="mt-3 font-display text-2xl font-light tracking-[-0.02em]">{s.title}</h3>
                    <p className="mt-3 leading-relaxed text-body">{s.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </section>

        {/* Pricing */}
        <section id="pricing" className="scroll-mt-16 bg-surface px-4 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto max-w-6xl">
            <SectionHead
              eyebrow="Pricing"
              title="Simple, fixed pricing"
              intro="One price to build your website, one monthly fee to keep it running. Agreed up front, before any work starts."
            />
            <div className="mt-14 grid gap-4 lg:grid-cols-3">
              {plans.map((plan, i) => (
                <Reveal
                  key={plan.id}
                  delay={i * 120}
                  className={`flex flex-col rounded-3xl p-8 shadow-card transition-shadow hover:shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_16px_40px_rgba(78,50,23,0.08)] ${i === 0 ? "bg-stone" : "bg-white"}`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-[15px] font-medium">{plan.name}</h3>
                    {i === 0 && <span className="rounded-full bg-white px-3 py-1 text-xs font-medium shadow-pill">Start here</span>}
                    {plan.id === "growth" && <span className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-body">Add-on</span>}
                  </div>
                  <p className="mt-8 flex flex-wrap items-baseline gap-x-2">
                    {plan.price === null ? (
                      <span className="font-display text-4xl font-light tracking-[-0.03em]">Ask for price</span>
                    ) : (
                      <>
                        {plan.prefix && <span className="text-sm text-muted">{plan.prefix}</span>}
                        <span className="font-display text-6xl font-light tracking-[-0.04em]">{gbp(plan.price)}</span>
                        <span className="text-sm text-muted">{plan.period}</span>
                      </>
                    )}
                  </p>
                  <p className="mt-4 leading-relaxed text-body">{plan.blurb}</p>
                  <ul className="mt-8 space-y-3 border-t border-black/5 pt-8 text-[15px]">
                    {plan.features.map((f) => (
                      <li key={f} className="flex gap-3">
                        <Check />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-10">
                    <Button href={planHref(plan)} variant={i === 0 ? "black" : "white"}>
                      {plan.cta}
                    </Button>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24 sm:px-6 sm:py-32">
          <SectionHead
            eyebrow="All services"
            title="Everything you need to get found"
            intro="Add the services you're interested in and send one enquiry. Anything without a fixed price is quoted to your goals."
          />
          <div className="mt-12">
            <Catalogue />
          </div>
        </section>

        {/* Work */}
        <section id="work" className="scroll-mt-16 bg-surface px-4 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto max-w-6xl">
            <SectionHead eyebrow="Recent work" title="Websites I've built" />
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {caseStudies.map((c, i) => (
                <Reveal key={c.url} delay={i * 150}>
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col rounded-3xl bg-white p-3 shadow-card transition-shadow hover:shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_16px_40px_rgba(78,50,23,0.08)]">
                  <div className="overflow-hidden rounded-[20px] shadow-edge">
                    <Image
                      src={c.image}
                      alt={`${c.name} website`}
                      width={1440}
                      height={810}
                      sizes="(min-width: 768px) 560px, 100vw"
                      className="aspect-video w-full object-cover object-top transition duration-500 group-hover:scale-[1.015]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{c.sector}</p>
                    <h3 className="mt-3 flex items-center justify-between gap-4 font-display text-3xl font-light tracking-[-0.02em]">
                      {c.name}
                      <span className="text-xl text-muted transition group-hover:translate-x-0.5 group-hover:text-ink" aria-hidden="true">↗</span>
                    </h3>
                    <p className="mt-2 leading-relaxed text-body">{c.summary}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {c.built.map((b) => (
                        <li key={b} className="rounded-full bg-surface px-3 py-1 text-[13px] text-body">
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-3xl scroll-mt-16 px-4 py-24 sm:px-6 sm:py-32">
          <SectionHead eyebrow="FAQ" title="Questions, answered" />
          <div className="mt-12 divide-y divide-black/[0.06] border-y border-black/[0.06]">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[17px] font-medium">
                  {f.q}
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-muted shadow-pill transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 pr-12 leading-relaxed text-body">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-center text-body">
            Something else?{" "}
            <a href={mailto("Question")} className="text-ink underline decoration-muted underline-offset-4">
              Email me
            </a>
          </p>
        </section>

        {/* Final CTA */}
        <section className="px-4 pb-24 sm:px-6">
          <GradientField className="mx-auto max-w-6xl rounded-3xl px-6 py-20 text-center sm:py-28">
            <h2 className="mx-auto max-w-3xl text-balance font-display text-4xl font-light leading-[1.1] tracking-[-0.03em] sm:text-6xl">
              Get a website that brings in work
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-body">
              Start today, or tell me about your business and I&apos;ll come back with a fixed price.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href={planHref(build)}>{build.cta}</Button>
              <Button href={mailto("New website enquiry")} variant="white">Ask a question</Button>
            </div>
          </GradientField>
        </section>
      </main>

      <footer className="border-t border-black/5">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <a href={`mailto:${site.email}`} className="hover:text-ink">{site.email}</a>
        </div>
      </footer>
    </>
  );
}
