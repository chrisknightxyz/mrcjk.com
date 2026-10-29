import { Reveal } from "@/components/reveal";

// The page system, after elevenlabs.io: every section is a band between full-width hairlines, inside one
// framed column (hairlines left and right, a tick at each top corner). Content sits in cells.

export const H2 = "font-display text-[32px] font-light leading-[38px] tracking-[-0.01em] sm:text-[36px] sm:leading-[42px]";
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
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: string;
  center?: boolean;
  // The page's main heading (the first head on /services and /work).
  h1?: boolean;
}) {
  const Heading = h1 ? "h1" : "h2";
  if (center) {
    return (
      <Reveal className="px-5 py-20 text-center sm:px-8 lg:py-[120px]">
        <h2 className={`mx-auto max-w-xl text-balance ${H2}`}>{title}</h2>
        {intro && <p className={`mx-auto mt-4 max-w-md ${LEAD}`}>{intro}</p>}
      </Reveal>
    );
  }
  return (
    <Reveal className="grid gap-5 px-5 pb-12 pt-20 sm:px-8 lg:grid-cols-2 lg:items-end lg:gap-12 lg:pb-14 lg:pt-[120px]">
      <div>
        {eyebrow && <p className="mb-3 text-[15px] text-muted">{eyebrow}</p>}
        <Heading className={`max-w-[34rem] text-balance ${H2}`}>{title}</Heading>
      </div>
      {intro && <p className={`max-w-lg ${LEAD}`}>{intro}</p>}
    </Reveal>
  );
}

// Equal cells split by hairlines: stacked on phones, side by side from md (or lg).
export function Cells({ children, cols = 3, from = "md" }: { children: React.ReactNode; cols?: 2 | 3; from?: "md" | "lg" }) {
  const layout = {
    md: cols === 3 ? "md:grid-cols-3 md:divide-x md:divide-y-0" : "md:grid-cols-2 md:divide-x md:divide-y-0",
    lg: cols === 3 ? "lg:grid-cols-3 lg:divide-x lg:divide-y-0" : "lg:grid-cols-2 lg:divide-x lg:divide-y-0",
  }[from];
  return (
    <div className={`grid grid-cols-[minmax(0,1fr)] divide-y divide-ink/5 border-t border-ink/5 ${layout}`}>
      {children}
    </div>
  );
}

export function IconTile({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-card text-ink shadow-[0_0_0_0.5px_rgb(var(--ink)/0.15),0_1px_2px_rgb(var(--ink)/0.06)]">
      {children}
    </span>
  );
}
