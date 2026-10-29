import { AskAi } from "@/components/ask-ai";
import { Wordmark } from "@/components/wordmark";
import { contact, mailto, projects, site, social } from "@/content/site";

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a href={href} {...(external && { target: "_blank", rel: "noopener noreferrer" })} className="whitespace-nowrap text-ink transition hover:text-muted">
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
        { label: "Services", href: "/#services" },
        { label: "Pricing", href: "/#pricing" },
        { label: "Start now", href: "/start" },
        { label: "Privacy", href: "/privacy" },
      ],
    },
  ].filter((c) => c.links.length);

  return (
    <footer className="border-t border-ink/5">
      <div className="mx-auto w-[calc(100%-2.5rem)] max-w-[1178px] border-x border-ink/5">
        <div className="grid grid-cols-2 gap-10 px-5 py-14 sm:px-8 md:grid-cols-4 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Wordmark />
            <p className="mt-3 max-w-xs text-[15px] text-muted">Websites that make you money.</p>
          </div>
          {columns.map((c) => (
            <div key={c.title}>
              <p className="text-[15px] text-muted">{c.title}</p>
              <ul className="mt-3 space-y-2 text-[14px]">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <FooterLink href={l.href}>{l.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-5 border-t border-ink/5 px-5 py-6 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:pb-24">
          <AskAi />
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
