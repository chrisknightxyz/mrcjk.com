import { bundles, services, type Bundle, type Service } from "@/content/site";

// What a basket costs, worked out the same way on the page and in /api/checkout, from the prices in
// content/site.ts. A bundle covers the services it includes; anything else is charged on its own.

export type Line = { name: string; amount: number; monthly: boolean };

export const findService = (title: string): Service | undefined => services.find((s) => s.title === title);
export const findBundle = (id: string | null | undefined): Bundle | undefined => bundles.find((b) => b.id === id);

// The services that can be bought online (everything with a price and no call).
export const buyable = (title: string) => {
  const s = findService(title);
  return !!s && !s.call && (s.once !== undefined || s.monthly !== undefined);
};

export function basketLines(titles: string[], bundleId?: string | null): Line[] {
  const bundle = findBundle(bundleId);
  const lines: Line[] = [];
  if (bundle && !bundle.call) {
    lines.push({ name: `${bundle.name} bundle`, amount: bundle.once, monthly: false });
    lines.push({ name: `${bundle.name} bundle`, amount: bundle.monthly, monthly: true });
  }
  const covered = new Set(bundle && !bundle.call ? bundle.includes : []);
  for (const title of Array.from(new Set(titles))) {
    if (covered.has(title) || !buyable(title)) continue;
    const s = findService(title)!;
    // A service with both prices has a setup fee and a monthly fee.
    if (s.once !== undefined) lines.push({ name: s.monthly !== undefined ? `${s.title} setup` : s.title, amount: s.once, monthly: false });
    if (s.monthly !== undefined) lines.push({ name: s.title, amount: s.monthly, monthly: true });
  }
  return lines;
}

// Stripe charges the first month of every monthly service at checkout, so "today" is the one-off
// items plus one month; after that, the monthly total each month until cancelled.
export function basketTotals(lines: Line[]) {
  const monthly = lines.filter((l) => l.monthly).reduce((n, l) => n + l.amount, 0);
  return { today: lines.filter((l) => !l.monthly).reduce((n, l) => n + l.amount, 0) + monthly, monthly };
}

export const gbp = (n: number) => `£${n.toLocaleString("en-GB")}`;

// A service's price as one short label, e.g. "£299/mo + £249 setup" or "From £999".
export function priceLabel(s: Service) {
  if (s.call) return s.call;
  const monthly = s.monthly !== undefined ? `${gbp(s.monthly)}/mo` : "";
  if (s.once !== undefined && monthly) return `${monthly} + ${gbp(s.once)} setup`;
  if (s.once !== undefined) return `${s.from ? "From " : ""}${gbp(s.once)}`;
  return monthly;
}
