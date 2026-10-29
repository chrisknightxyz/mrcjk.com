import { Reveal } from "@/components/reveal";

// The page system, after elevenlabs.io: every section is a band between full-width hairlines, inside one
// framed column (hairlines left and right, a tick at each top corner). Content sits in cells.

export const H2 = "font-display text-[30px] font-light leading-9 tracking-[-0.01em] sm:text-[36px] sm:leading-[42px]";
export const LEAD = "text-[16px] leading-6 tracking-[0.01em]";
export const MUTED = "text-[15px] leading-[22px] tracking-[0.01em] text-muted";

export function Band({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className="scroll-mt-16 border-t border-ink/5">
      <div className={`relative mx-auto w-[calc(100%-2.5rem)] max-w-[1178px] border-x border-ink/5 ${className}`}>
        <span aria-hidden="true" className="absolute -left-[2px] -top-[2px] h-[3px] w-[3px] bg-ink/40" />
        <span aria-hidden="true" className="absolute -right-[2px] -top-[2px] h-[3px] w-[3px] bg-ink/40" />
        {children}
      </div>
    </section>
  );
}

// A section head: the title on the left, its line on the right, both on the column's grid.
export function BandHead({
  eyebrow,
  title,
  intro,
  center,
  h1,
  action,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: string;
  center?: boolean;
  // The page's main heading (the first head on /services and /work).
  h1?: boolean;
  // A button for the section, kept in the head (ElevenLabs never puts a centred button row under the cells).
  action?: React.ReactNode;
}) {
  const Heading = h1 ? "h1" : "h2";
  if (center) {
    return (
      <Reveal className="px-5 pb-10 pt-24 text-center sm:px-8 lg:pt-[160px]">
        <h2 className={`mx-auto max-w-xl text-balance ${H2}`}>{title}</h2>
        {intro && <p className={`mx-auto mt-4 max-w-md ${LEAD}`}>{intro}</p>}
        {action && <div className="mt-6 flex justify-center">{action}</div>}
      </Reveal>
    );
  }
  return (
    <Reveal className="grid gap-5 px-5 pb-10 pt-24 sm:px-8 lg:grid-cols-2 lg:items-end lg:gap-12 lg:pt-[160px]">
      <div>
        {eyebrow && <p className="mb-3 text-[15px] text-muted">{eyebrow}</p>}
        <Heading className={`max-w-[34rem] text-balance ${H2}`}>{title}</Heading>
      </div>
      {intro ? (
        <div>
          <p className={`max-w-lg ${LEAD}`}>{intro}</p>
          {action && <div className="mt-6">{action}</div>}
        </div>
      ) : (
        action && <div className="lg:justify-self-end">{action}</div>
      )}
    </Reveal>
  );
}

// Equal cells split by hairlines: stacked on phones, side by side from md (or lg).
export function Cells({ children, cols = 3, from = "md" }: { children: React.ReactNode; cols?: 2 | 3; from?: "md" | "lg" }) {
  const layout = {
    md: cols === 3 ? "md:grid-cols-3 md:divide-x md:divide-y-0" : "md:grid-cols-2 md:divide-x md:divide-y-0",
    lg: cols === 3 ? "lg:grid-cols-3 lg:divide-x lg:divide-y-0" : "lg:grid-cols-2 lg:divide-x lg:divide-y-0",
  }[from];
  const dot = from === "md" ? "md:block" : "lg:block";
  return (
    <div className={`relative grid grid-cols-[minmax(0,1fr)] divide-y divide-ink/5 border-t border-ink/5 ${layout}`}>
      {children}
      {/* A tick where each column line meets the band line above it. */}
      {Array.from({ length: cols - 1 }, (_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`absolute -top-[2px] hidden h-[3px] w-[3px] -translate-x-1/2 bg-ink/40 ${dot}`}
          style={{ left: `${((i + 1) / cols) * 100}%` }}
        />
      ))}
    </div>
  );
}

// A page's opening: the small grey <h1>, the big display line, a short intro and the buttons.
// Split (text left, intro right) on /services; centred on index pages such as /work.
export function PageHero({
  eyebrow,
  title,
  intro,
  actions,
  center,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  actions?: React.ReactNode;
  center?: boolean;
}) {
  const display = "mt-3 text-balance font-display text-[36px] font-light leading-[42px] tracking-[-0.02em] sm:text-[48px] sm:leading-[52px]";
  if (center) {
    return (
      <div className="px-5 pb-16 pt-20 text-center sm:px-8 lg:pb-20 lg:pt-24">
        <h1 className="rise text-[15px] text-muted">{eyebrow}</h1>
        <p className={`rise mx-auto max-w-2xl ${display}`}>{title}</p>
        {intro && <p className={`rise mx-auto mt-4 max-w-md [animation-delay:120ms] ${LEAD}`}>{intro}</p>}
        {actions && <div className="rise mt-8 flex flex-wrap justify-center gap-3 [animation-delay:240ms]">{actions}</div>}
      </div>
    );
  }
  return (
    <div className="grid gap-6 px-5 pb-14 pt-16 sm:px-8 lg:grid-cols-2 lg:items-end lg:gap-12 lg:pb-16 lg:pt-24">
      <div>
        <h1 className="rise text-[15px] text-muted">{eyebrow}</h1>
        <p className={`rise max-w-[34rem] ${display}`}>{title}</p>
      </div>
      <div>
        {intro && <p className={`rise max-w-lg [animation-delay:120ms] ${LEAD}`}>{intro}</p>}
        {actions && <div className="rise mt-6 flex flex-wrap gap-3 [animation-delay:240ms]">{actions}</div>}
      </div>
    </div>
  );
}

// The closing band on every page: one line and two buttons (secondary first; on phones the primary sits on top).
export function CtaBand({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
  return (
    <Band className="flex flex-col items-center gap-6 px-5 py-16 text-center sm:px-8 md:flex-row md:justify-between md:py-[72px] md:text-left">
      <h2 className={`text-balance ${H2}`}>{title}</h2>
      <div className="flex w-full max-w-xs flex-col-reverse gap-3 md:w-auto md:max-w-none md:flex-row [&>a]:w-full md:[&>a]:w-auto">{children}</div>
    </Band>
  );
}

export function IconTile({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-card text-ink shadow-[0_0_0_0.5px_rgb(var(--ink)/0.15),0_1px_2px_rgb(var(--ink)/0.06)]">
      {children}
    </span>
  );
}
