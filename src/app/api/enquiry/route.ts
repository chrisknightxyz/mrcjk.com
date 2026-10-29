import { NextResponse } from "next/server";
import { site } from "@/content/site";

// Sends a service request to Chris by email through Resend.
// Needs RESEND_API_KEY, and RESEND_FROM set to a sender on a domain verified in Resend
// (for example "MRCJK <enquiries@mrcjk.com>"). Without them it answers 503 and the form
// offers WhatsApp or email instead, so no request is lost.

type Enquiry = { name?: string; email?: string; phone?: string; website?: string; services?: string[]; company?: string };

const clean = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const escape = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function POST(req: Request) {
  let body: Enquiry;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: people never see this field, bots fill it in.
  if (clean(body.company)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 100);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 40);
  const website = clean(body.website, 200);
  const services = Array.isArray(body.services) ? body.services.map((s) => clean(s, 80)).filter(Boolean).slice(0, 30) : [];
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Name and a valid email are required" }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!key || !from) return NextResponse.json({ error: "Email is not set up" }, { status: 503 });

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone || "-"],
    ["Website", website || "-"],
    ["Services", services.join(", ") || "-"],
  ];
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: site.email,
      reply_to: email,
      subject: `New request from ${name}`,
      text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
      html: `<table>${rows.map(([k, v]) => `<tr><td><b>${k}</b></td><td>${escape(v)}</td></tr>`).join("")}</table>`,
    }),
  });
  if (!res.ok) return NextResponse.json({ error: "Could not send" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
