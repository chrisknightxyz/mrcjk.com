import { ThemeToggle } from "@/components/theme-toggle";
import { Wordmark } from "@/components/wordmark";
import { contact } from "@/content/site";

// The header on every page: the wordmark and section links, a menu on phones, the theme switch and Book a call.
export function SiteHeader() {
  const whatsapp = `https://wa.me/${contact.whatsapp}`;
  return (
    <header className="sticky top-0 z-20 border-b border-ink/5 bg-canvas/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 w-[calc(100%-2.5rem)] max-w-[1178px] items-center justify-between">
        <div className="flex items-center gap-10">
          <Wordmark />
          <div className="hidden items-center gap-7 text-[15px] lg:flex">
            <a href="/work" className="hover:text-muted">Work</a>
            <a href="/services" className="hover:text-muted">Services</a>
            <a href="/ai" className="hover:text-muted">AI</a>
            <a href="/#pricing" className="hover:text-muted">Pricing</a>
            <a href="/#faq" className="hover:text-muted">FAQ</a>
          </div>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Phones: the section links and WhatsApp in a small menu. */}
          <details className="group relative lg:hidden">
            <summary
              aria-label="Menu"
              className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-full bg-card text-[15px] shadow-[0_0_0_0.5px_rgb(var(--ink)/0.2),0_1px_2px_rgb(var(--ink)/0.06)] sm:w-auto sm:px-4"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4 sm:hidden" aria-hidden="true">
                <path d="M2 4.5h12M2 8h12M2 11.5h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              <span className="hidden sm:inline">Menu</span>
            </summary>
            <div className="absolute right-0 top-11 z-30 grid w-48 gap-1 rounded-2xl bg-card p-2 text-[15px] shadow-[0_0_0_0.5px_rgb(var(--ink)/0.15),0_12px_32px_rgba(30,20,10,0.14)]">
              {[
                ["Work", "/work"],
                ["Services", "/services"],
                ["AI", "/ai"],
                ["Pricing", "/#pricing"],
                ["FAQ", "/#faq"],
              ].map(([label, href]) => (
                <a key={href} href={href} className="rounded-xl px-3 py-2 hover:bg-surface">
                  {label}
                </a>
              ))}
              <a href={contact.calUrl} target="_blank" rel="noopener noreferrer" className="rounded-xl px-3 py-2 hover:bg-surface md:hidden">
                Book a call
              </a>
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
            className="hidden h-9 items-center whitespace-nowrap rounded-full bg-card px-4 text-[15px] shadow-[0_0_0_0.5px_rgb(var(--ink)/0.2),0_1px_2px_rgb(var(--ink)/0.06)] hover:bg-surface md:inline-flex"
          >
            Book a call
          </a>
          <a href="/start" className="inline-flex h-9 items-center whitespace-nowrap rounded-full bg-ink px-3 text-[15px] text-canvas hover:bg-ink/80 sm:px-4">
            Build my website
          </a>
        </div>
      </nav>
    </header>
  );
}
