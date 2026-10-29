"use client";

import { useState } from "react";
import { bookingTools, contact, mailto } from "@/content/site";

type Status = "idle" | "sending" | "sent" | "fallback";

const FIELD = "ring-1 ring-inset ring-ink/[0.08] outline-none transition placeholder:text-muted focus:ring-2 focus:ring-ink";

// One form, two uses. On the homepage ("draft") it asks for the business, its kind and town, for a free
// first draft. Under the services checklist it carries the ticked services. Either way it posts to
// /api/enquiry; if email isn't set up there, it offers WhatsApp or email instead.
export function RequestForm({
  services = [],
  onRemove,
  draft = false,
  notes = [],
  title,
  intro,
}: {
  services?: string[];
  onRemove?: (title: string) => void;
  draft?: boolean;
  // Answers gathered before the form (the qualifying flow), sent with the request.
  notes?: [string, string][];
  title?: string;
  intro?: string;
}) {
  const kindKnown = notes.some(([k]) => k === "Business");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({ business: "", kind: "", town: "", name: "", email: "", code: "GB +44", phone: "", website: "", company: "" });
  const phone = form.phone.trim() ? `${form.code.split(" ")[1]} ${form.phone.trim().replace(/^0/, "")}` : "";
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm({ ...form, [k]: e.target.value });

  const summary = [
    `Hi Chris, I'm ${form.name}.`,
    "",
    ...(draft ? [`Free draft for: ${form.business}`, ...(kindKnown ? [] : [`Kind of business: ${form.kind || "-"}`]), `Town: ${form.town}`] : []),
    `Services: ${services.join(", ") || (draft ? "Website build" : "Not sure yet")}`,
    ...notes.map(([k, v]) => `${k}: ${v}`),
    `Email: ${form.email}`,
    `Phone: ${phone || "-"}`,
    `Website: ${form.website || "-"}`,
  ].join("\n");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, phone, services: draft && !services.length ? ["Website build"] : services, draft, notes }),
      });
      if (res.ok) return setStatus("sent");
      if (res.status === 400) {
        setError(draft ? "Please add your business, town, name and a valid email." : "Please add your name and a valid email.");
        return setStatus("idle");
      }
      setStatus("fallback");
    } catch {
      setStatus("fallback");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-3xl bg-stone p-6 sm:p-8" role="status">
        <p className="font-display text-3xl font-light tracking-[-0.02em]">Thanks, {form.name.split(" ")[0]}.</p>
        <p className="mt-2 text-body">
          {draft
            ? `I'm on it. Your first draft for ${form.business} will be with you at ${form.email} within 24 hours.`
            : `Your request is with me. Next, I'll email ${form.email} with a fixed price, then your first draft.`}
        </p>
        <a href={contact.calUrl} className="mt-5 inline-flex h-11 items-center whitespace-nowrap rounded-full bg-ink px-5 text-[15px] text-canvas hover:bg-ink/80">
          Want to talk sooner? Book a call
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-3xl bg-stone p-6 sm:p-8">
      <h3 className="whitespace-nowrap font-display text-[26px] font-light tracking-[-0.02em] sm:text-3xl">
        {title ?? (draft ? "Build my website" : "Send your request")}
      </h3>
      <p className="mt-2 text-body">
        {intro ??
          (draft
            ? "Tell me about your business. I'll design your homepage and send it within 24 hours. You only pay if you're happy."
            : "I'll reply with a fixed price and your first draft. You pay once you're happy with it.")}
      </p>

      {draft && (
        <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-3 sm:grid-cols-2">
          <Field label="Business name" value={form.business} onChange={set("business")} autoComplete="organization" required />
          {!kindKnown && <select
            aria-label="Kind of business"
            value={form.kind}
            onChange={set("kind")}
            className={`h-12 w-full appearance-none rounded-2xl bg-card px-4 text-[16px] ${FIELD} ${form.kind ? "" : "text-muted"}`}
          >
            <option value="">Kind of business (optional)</option>
            {[...bookingTools.map((b) => b.sector), "Something else"].map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>}
          <Field label="Town or city" value={form.town} onChange={set("town")} autoComplete="address-level2" required />
        </div>
      )}

      <div className={draft ? "hidden" : "mt-6"}>
        {services.length ? (
          <ul className="flex flex-wrap gap-2" aria-label="Services">
            {services.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => onRemove?.(s)}
                  aria-label={`Remove ${s}`}
                  className="inline-flex h-8 items-center gap-2 whitespace-nowrap rounded-full bg-card px-3 text-[13px] font-medium shadow-pill hover:bg-surface"
                >
                  {s} <span aria-hidden="true" className="text-muted">✕</span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted">Nothing ticked yet. Tick services above, or send the form and tell me on the call.</p>
        )}
      </div>

      <div className={`${draft ? "mt-3" : "mt-6"} grid grid-cols-[minmax(0,1fr)] gap-3 sm:grid-cols-2`}>
        <Field label="Your name" value={form.name} onChange={set("name")} autoComplete="name" required />
        <Field label="Email" type="email" value={form.email} onChange={set("email")} autoComplete="email" required />
        <PhoneField code={form.code} onCode={(code) => setForm({ ...form, code })} value={form.phone} onChange={set("phone")} />
        <Field label="Website" type="url" value={form.website} onChange={set("website")} autoComplete="url" />
      </div>
      {/* Hidden from people; bots fill it in and are dropped. */}
      <input type="text" name="company" value={form.company} onChange={set("company")} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      {error && <p className="mt-4 text-sm text-[#b42318]">{error}</p>}

      {status === "fallback" ? (
        <div className="mt-6 rounded-2xl bg-card p-4 sm:p-5">
          <p className="text-sm text-body">Send your request straight to me instead. Your details are filled in.</p>
          <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <a
              href={mailto("New request", summary)}
              className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full bg-card px-5 text-[15px] font-medium shadow-pill hover:bg-surface"
            >
              Send by email
            </a>
            {contact.whatsapp && (
              <a
                href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(summary)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full bg-ink px-5 text-[15px] font-medium text-canvas hover:bg-ink/80"
              >
                Send on WhatsApp
              </a>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-8 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
          <p className="text-sm text-muted">
            No payment now. I only use these details to reply to you.{" "}
            <a href="/privacy" className="underline underline-offset-2 hover:text-ink">
              Privacy
            </a>
          </p>
          <button
            type="submit"
            disabled={status === "sending"}
            className="ml-auto inline-flex h-11 shrink-0 items-center whitespace-nowrap rounded-full bg-ink px-5 text-[15px] font-medium text-canvas transition hover:bg-ink/80 disabled:opacity-50"
          >
            {status === "sending" ? "Sending…" : draft ? "Build my website" : "Send request"}
          </button>
        </div>
      )}
    </form>
  );
}

function Field({ label, required, ...props }: { label: string; required?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      aria-label={label}
      placeholder={required ? label : `${label} (optional)`}
      required={required}
      className={`h-12 w-full rounded-2xl bg-card px-4 text-[16px] ${FIELD}`}
    />
  );
}

// Calling codes, the UK first. The visitor picks one; it's sent with the number.
const codes = [
  ["GB", "+44"],
  ["IE", "+353"],
  ["US", "+1"],
  ["CA", "+1"],
  ["AU", "+61"],
  ["FR", "+33"],
  ["DE", "+49"],
  ["ES", "+34"],
  ["IT", "+39"],
  ["NL", "+31"],
  ["AE", "+971"],
  ["ZA", "+27"],
  ["IN", "+91"],
  ["TH", "+66"],
] as const;
const flag = (cc: string) => String.fromCodePoint(...[...cc].map((c) => 127397 + c.charCodeAt(0)));

function PhoneField({ code, onCode, ...props }: { code: string; onCode: (v: string) => void } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={`flex h-12 items-center rounded-2xl bg-card ${FIELD} focus-within:ring-2 focus-within:ring-ink`}>
      <select
        aria-label="Country code"
        value={code}
        onChange={(e) => onCode(e.target.value)}
        className="h-full shrink-0 cursor-pointer appearance-none rounded-l-2xl bg-transparent pl-4 pr-2 text-[16px] outline-none"
      >
        {codes.map(([cc, dial]) => (
          <option key={cc} value={`${cc} ${dial}`}>
            {flag(cc)} {dial}
          </option>
        ))}
      </select>
      <span aria-hidden="true" className="h-6 w-px bg-ink/10" />
      <input
        {...props}
        type="tel"
        aria-label="Phone"
        placeholder="Phone (optional)"
        autoComplete="tel-national"
        className="h-full min-w-0 flex-1 rounded-r-2xl bg-transparent px-3 text-[16px] outline-none placeholder:text-muted"
      />
    </div>
  );
}
