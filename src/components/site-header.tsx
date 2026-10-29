import { Button } from "@/components/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Wordmark } from "@/components/wordmark";
import { contact } from "@/content/site";

const links = [
  ["Work", "/work"],
  ["Services", "/services"],
  ["AI", "/ai"],
  ["Pricing", "/#pricing"],
  ["FAQ", "/#faq"],
];

// The header on every page: the wordmark and section links, a menu on phones, the theme switch and Book a call.
export function SiteHeader() {
  const whatsapp = `https://wa.me/${contact.whatsapp}`;
  return (
    <header className="sticky top-0 z-20 border-b border-ink/5 bg-canvas/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 w-[calc(100%-2.5rem)] max-w-[1178px] items-center justify-between">
        <div className="flex items-center gap-6">
          <Wordmark />
          <div className="hidden items-center gap-1 text-[15px] lg:flex">
            {links.map(([label, href]) => (
              <a key={href} href={href} className="rounded-full px-3 py-1.5 transition-colors hover:bg-ink/5">
                {label}
              </a>
            ))}
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
            {/* A full-height sheet under the bar, with the two buttons at the foot (the elevenlabs.io phone menu).
                Sized with a height, not bottom-0: the header's blur makes it the sheet's containing block. */}
            <div className="fixed inset-x-0 top-16 z-30 flex h-[calc(100dvh-4rem)] flex-col overflow-y-auto bg-canvas px-5 pt-2 text-[17px]">
              {links.map(([label, href]) => (
                <a key={href} href={href} className="border-b border-ink/5 py-4">
                  {label}
                </a>
              ))}
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="border-b border-ink/5 py-4">
                WhatsApp
              </a>
              <span className="flex items-center justify-between border-b border-ink/5 py-3 sm:hidden">
                Theme <ThemeToggle />
              </span>
              <div className="mt-auto grid gap-3 pb-6 pt-6 min-[420px]:grid-cols-2">
                <Button href={contact.calUrl} variant="secondary">
                  Book a call
                </Button>
                <Button href="/start">Build my website</Button>
              </div>
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
