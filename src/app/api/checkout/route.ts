import { NextResponse } from "next/server";
import { slug } from "@/content/site";
import { basketLines, findBundle } from "@/lib/basket";

// Turns a basket into a Stripe Checkout page. Prices come from content/site.ts, never from the
// browser. One-off items are charged today; monthly items start a subscription that renews until
// cancelled. Needs STRIPE_SECRET_KEY; without it this answers 503 and the page offers a request instead.

export async function POST(req: Request) {
  let body: { items?: unknown; bundle?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const items = Array.isArray(body.items) ? body.items.filter((t): t is string => typeof t === "string").slice(0, 40) : [];
  const bundle = typeof body.bundle === "string" ? body.bundle : null;
  const lines = basketLines(items, bundle);
  if (!lines.length) return NextResponse.json({ error: "Nothing to pay for" }, { status: 400 });

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return NextResponse.json({ error: "Payments are not set up" }, { status: 503 });

  const origin = new URL(req.url).origin;
  const subscription = lines.some((l) => l.monthly);
  const back = new URLSearchParams();
  if (findBundle(bundle)) back.set("bundle", bundle!);
  if (items.length) back.set("add", items.map(slug).join(","));

  const form = new URLSearchParams({
    mode: subscription ? "subscription" : "payment",
    success_url: `${origin}/thanks?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/services?${back}#services`,
    allow_promotion_codes: "true",
    // Always charge in pounds, matching the basket, rather than converting for visitors abroad.
    "adaptive_pricing[enabled]": "false",
    "phone_number_collection[enabled]": "true",
    "custom_fields[0][key]": "business",
    "custom_fields[0][label][type]": "custom",
    "custom_fields[0][label][custom]": "Business name",
    "custom_fields[0][type]": "text",
    "metadata[basket]": [findBundle(bundle)?.name, ...items].filter(Boolean).join(", ").slice(0, 500),
  });
  if (!subscription) {
    form.set("customer_creation", "always");
    form.set("invoice_creation[enabled]", "true");
  }
  lines.forEach((l, i) => {
    form.set(`line_items[${i}][quantity]`, "1");
    form.set(`line_items[${i}][price_data][currency]`, "gbp");
    form.set(`line_items[${i}][price_data][unit_amount]`, String(l.amount * 100));
    form.set(`line_items[${i}][price_data][product_data][name]`, l.name);
    if (l.monthly) form.set(`line_items[${i}][price_data][recurring][interval]`, "month");
  });

  try {
    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/x-www-form-urlencoded" },
      body: form,
    });
    const session = await res.json().catch(() => null);
    if (res.ok && session?.url) return NextResponse.json({ url: session.url });
    console.error("Stripe checkout failed", res.status, session?.error?.message);
  } catch (e) {
    console.error("Stripe checkout failed", e);
  }
  return NextResponse.json({ error: "Could not start checkout" }, { status: 502 });
}
