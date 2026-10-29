import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { audiences, caseStudies, faqs, mailto, plans, services, site, steps, stripeLinks, type Plan } from "@/content/site";
import { Catalogue } from "./catalogue";

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

function Button({ href, children, variant = "dark" }: { href: string; children: React.ReactNode; variant?: "dark" | "light" | "accent" }) {
  const styles = {
    dark: "bg-ink text-cream hover:bg-ink/85",
    light: "bg-paper text-ink ring-1 ring-ink/15 hover:ring-ink/40",
    accent: "bg-accent text-ink hover:brightness-105",
  }[variant];
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-semibold transition ${styles}`}
    >
      {children}
    </a>
  );
}

function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={`mt-0.5 h-5 w-5 shrink-0 ${className}`}>
      <circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.15" />
      <path d="M6 10.5l2.5 2.5L14 7.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-accent">{children}</p>;
}

const planStyles = [
  { card: "bg-ink text-cream", soft: "text-cream/65", check: "text-lime", button: "accent" as const, badge: "Start here" },
  { card: "bg-paper ring-1 ring-line", soft: "text-muted", check: "text-accent", button: "dark" as const, badge: null },
  { card: "bg-lime", soft: "text-ink/65", check: "text-ink", button: "dark" as const, badge: "Add-on" },
];

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="sticky top-0 z-20 border-b border-line/70 bg-cream/85 backdrop-blur">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="font-display text-2xl font-bold tracking-tight">
            {site.name}
          </Link>
          <div className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#pricing" className="hover:text-accent">Pricing</a>
            <a href="#services" className="hover:text-accent">Services</a>
            <a href="#work" className="hover:text-accent">Work</a>
            <a href="#faq" className="hover:text-accent">FAQ</a>
          </div>
          <a href="#pricing" className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-cream hover:bg-ink/85">
            Get started
          </a>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
          <p className="inline-flex items-center gap-2 rounded-full bg-paper px-4 py-1.5 text-sm font-medium ring-1 ring-line">
            <span className="h-2 w-2 rounded-full bg-accent" />
            Websites, SEO & AEO for UK local businesses
          </p>
          <h1 className="mt-6 max-w-5xl font-display text-[2.75rem] font-bold leading-[1.02] tracking-tight sm:text-7xl lg:text-8xl">
            Websites that win you{" "}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10">local customers</span>
              <span className="absolute inset-x-0 bottom-1 z-0 h-3 bg-lime sm:bottom-2 sm:h-5" aria-hidden="true" />
            </span>
            .
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted sm:text-xl">
            A custom website from {gbp(build.price!)}, then {gbp(care.price!)} a month for hosting, updates and a monthly
            SEO & AEO report. Built to be found on Google and recommended by AI assistants.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#pricing">See pricing</Button>
            <Button href="#work" variant="light">See recent work</Button>
          </div>
          <dl className="mt-14 grid max-w-3xl grid-cols-1 gap-6 border-t border-line pt-8 sm:grid-cols-3">
            <div>
              <dt className="text-sm text-muted">Website build</dt>
              <dd className="font-display text-3xl font-bold">from {gbp(build.price!)}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Hosting & care</dt>
              <dd className="font-display text-3xl font-bold">{gbp(care.price!)}/mo</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Optimised for</dt>
              <dd className="font-display text-3xl font-bold">Google + AI</dd>
            </div>
          </dl>
        </section>

        {/* Who it's for */}
        <section aria-label="Who it's for" className="bg-ink py-5 text-cream">
          <ul className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-8 gap-y-2 px-4 text-sm font-medium sm:text-base">
            {audiences.map((a) => (
              <li key={a} className="flex items-center gap-2">
                <span className="text-lime">✦</span>
                {a}
              </li>
            ))}
          </ul>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
          <SectionLabel>How it works</SectionLabel>
          <h2 className="max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-6xl">
            From first call to live website, without the agency runaround.
          </h2>
          <ol className="mt-12 grid gap-5 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-3xl bg-paper p-7 ring-1 ring-line">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent font-display text-lg font-bold">
                  {i + 1}
                </span>
                <h3 className="mt-6 font-display text-2xl font-bold">{s.title}</h3>
                <p className="mt-3 text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Pricing */}
        <section id="pricing" className="scroll-mt-20 bg-paper py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionLabel>Pricing</SectionLabel>
            <h2 className="max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-6xl">
              Simple, fixed pricing. No surprises.
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-muted">
              One price to build your website, one monthly fee to keep it running. Agreed up front, before any work starts.
            </p>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {plans.map((plan, i) => {
                const s = planStyles[i];
                return (
                  <div key={plan.id} className={`flex flex-col rounded-[2rem] p-8 ${s.card}`}>
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-display text-2xl font-bold">{plan.name}</h3>
                      {s.badge && (
                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${i === 0 ? "bg-lime text-ink" : "bg-ink text-cream"}`}>
                          {s.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-6 flex flex-wrap items-baseline gap-x-2">
                      {plan.price === null ? (
                        <span className="font-display text-4xl font-bold tracking-tight">Ask for price</span>
                      ) : (
                        <>
                          {plan.prefix && <span className={s.soft}>{plan.prefix}</span>}
                          <span className="font-display text-6xl font-bold tracking-tight">{gbp(plan.price)}</span>
                          <span className={s.soft}>{plan.period}</span>
                        </>
                      )}
                    </p>
                    <p className={`mt-4 ${s.soft}`}>{plan.blurb}</p>
                    <ul className="mt-8 space-y-3">
                      {plan.features.map((f) => (
                        <li key={f} className="flex gap-3">
                          <Check className={s.check} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-10">
                      <Button href={planHref(plan)} variant={s.button}>
                        {plan.cta}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
          <SectionLabel>All services</SectionLabel>
          <h2 className="max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-6xl">
            Everything you need to get found and get busy.
          </h2>
          <p className="mb-10 mt-5 max-w-2xl text-lg text-muted">
            Add the services you&apos;re interested in and send one enquiry. Anything without a fixed price is quoted to your goals.
          </p>
          <Catalogue />
        </section>

        {/* Work */}
        <section id="work" className="scroll-mt-20 bg-paper py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionLabel>Recent work</SectionLabel>
            <h2 className="max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-6xl">Websites I&apos;ve built.</h2>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {caseStudies.map((c) => (
                <a key={c.url} href={c.url} target="_blank" rel="noopener noreferrer" className="group block">
                  <div className="overflow-hidden rounded-3xl bg-cream ring-1 ring-line">
                    <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
                      <span className="h-2.5 w-2.5 rounded-full bg-line" />
                      <span className="h-2.5 w-2.5 rounded-full bg-line" />
                      <span className="h-2.5 w-2.5 rounded-full bg-line" />
                      <span className="ml-3 truncate text-xs text-muted">{c.domain}</span>
                    </div>
                    <Image
                      src={c.image}
                      alt={`${c.name} website`}
                      width={1440}
                      height={810}
                      sizes="(min-width: 768px) 560px, 100vw"
                      className="aspect-video w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <p className="mt-5 text-sm font-semibold uppercase tracking-[0.14em] text-accent">{c.sector}</p>
                  <h3 className="mt-2 font-display text-3xl font-bold group-hover:underline group-hover:underline-offset-4">
                    {c.name} ↗
                  </h3>
                  <p className="mt-2 text-muted">{c.summary}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {c.built.map((b) => (
                      <li key={b} className="rounded-full bg-cream px-3 py-1 text-sm ring-1 ring-line">
                        {b}
                      </li>
                    ))}
                  </ul>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto grid max-w-6xl scroll-mt-20 gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-6xl">Questions, answered.</h2>
            <p className="mt-5 text-muted">
              Something else on your mind?{" "}
              <a href={mailto("Question")} className="font-semibold text-ink underline underline-offset-4">
                Email me
              </a>
              .
            </p>
          </div>
          <div className="divide-y divide-line border-y border-line">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-xl font-semibold">
                  {f.q}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-1 ring-ink/20 transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 pr-12 text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-4 pb-24 sm:px-6">
          <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-ink px-6 py-16 text-center text-cream sm:px-12 sm:py-24">
            <h2 className="mx-auto max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-6xl">
              Get a website that brings in work.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-cream/75">
              Start today, or tell me about your business and I&apos;ll come back with a fixed price.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href={planHref(build)} variant="accent">{build.cta}</Button>
              <a
                href={mailto("New website enquiry")}
                className="inline-flex items-center justify-center rounded-full px-6 py-3.5 font-semibold text-cream ring-1 ring-cream/30 hover:ring-cream"
              >
                Ask a question
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
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
