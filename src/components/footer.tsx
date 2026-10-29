import Link from "next/link";
import { contact, mailto, projects, site, social } from "@/content/site";

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a href={href} {...(external && { target: "_blank", rel: "noopener noreferrer" })} className="text-body transition hover:text-ink">
      {children}
    </a>
  );
}

export function Footer() {
  const whatsapp = contact.whatsapp ? `https://wa.me/${contact.whatsapp}` : "";
  const columns = [
    {
      title: "Contact",
      links: [
        { label: site.email, href: mailto("Hello") },
        ...(whatsapp ? [{ label: "WhatsApp", href: whatsapp }] : []),
        ...(contact.calUrl ? [{ label: "Book a call", href: contact.calUrl }] : []),
      ],
    },
    { title: "Follow", links: social.filter((s) => s.url).map((s) => ({ label: s.name, href: s.url })) },
    { title: "Projects", links: projects.map((p) => ({ label: p.name, href: p.url })) },
    {
      title: "Site",
      links: [
        { label: "Services", href: "/services" },
        { label: "Pricing", href: "/services#pricing" },
        { label: "Start now", href: "/start" },
      ],
    },
  ].filter((c) => c.links.length);

  return (
    <footer className="border-t border-black/5">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div>
          <Link href="/services" className="whitespace-nowrap font-display text-[22px] tracking-[-0.03em]">
            {site.name}
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-body">
            Websites, SEO and AEO for local businesses across the UK.
          </p>
        </div>
        {columns.map((c) => (
          <div key={c.title}>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{c.title}</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {c.links.map((l) => (
                <li key={l.label}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-6xl border-t border-black/5 px-4 py-6 text-xs text-muted sm:px-6">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="mt-2">
          ChatGPT, Claude, Gemini, Perplexity, Copilot, Grok, Meta AI, Muse, Google and Meta are trademarks of their owners.
          Logos show where the work appears and don&apos;t imply any partnership.
        </p>
      </div>
    </footer>
  );
}
