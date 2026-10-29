"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { contact, mailto, questions, serviceNeeds, site } from "@/content/site";

type Answers = Record<string, string[]>;
type Details = { name: string; company: string; town: string };

const DETAILS = questions.length;
const DONE = questions.length + 1;

export function StartFlow() {
  const params = useSearchParams();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [details, setDetails] = useState<Details>({ name: "", company: "", town: "" });
  const services = useMemo(() => params.get("services")?.split("|").filter(Boolean) ?? [], [params]);

  // Preselect what the visitor clicked on the services page.
  useEffect(() => {
    const picked = [params.get("need"), ...services.map((s) => serviceNeeds[s] ?? "Something else")];
    const needs = Array.from(new Set(picked.filter((n): n is string => !!n && questions[0].options.includes(n))));
    if (needs.length) setAnswers((a) => ({ ...a, needs }));
  }, [params, services]);

  const total = questions.length + 1;
  const progress = Math.min(step, total) / total;

  function choose(q: (typeof questions)[number], option: string) {
    const current = answers[q.id] ?? [];
    if (q.multi) {
      setAnswers({ ...answers, [q.id]: current.includes(option) ? current.filter((o) => o !== option) : [...current, option] });
      return;
    }
    setAnswers({ ...answers, [q.id]: [option] });
    setTimeout(() => setStep((s) => s + 1), 220);
  }

  const summary = [
    `Hi Chris, I'm ${details.name}${details.company ? ` from ${details.company}` : ""}${details.town ? ` in ${details.town}` : ""}.`,
    "",
    ...questions.map((q) => `${q.label}: ${(answers[q.id] ?? []).join(", ") || "-"}`),
    ...(services.length ? [`Services: ${services.join(", ")}`] : []),
  ].join("\n");

  const whatsappHref = contact.whatsapp ? `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(summary)}` : "";
  const calHref = contact.calUrl
    ? `${contact.calUrl}?${new URLSearchParams({ name: details.name, notes: summary }).toString()}`
    : "";

  return (
    <div className="flex min-h-[100dvh] flex-col bg-white">
      <header className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between px-4 sm:px-6">
        <Link href="/services" className="font-display text-2xl tracking-[-0.03em]">
          {site.name}
        </Link>
        <Link href="/services" aria-label="Close and go back to services" className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-muted shadow-pill hover:text-ink">
          ✕
        </Link>
      </header>

      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <div className="h-1 overflow-hidden rounded-full bg-surface" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)} aria-label="Progress">
          <div className="h-full rounded-full bg-ink transition-[width] duration-500 ease-out" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>

      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col px-4 pb-16 pt-10 sm:px-6 sm:pt-16">
        {step < DETAILS && (
          <Question
            key={step}
            index={step}
            question={questions[step]}
            selected={answers[questions[step].id] ?? []}
            onChoose={(o) => choose(questions[step], o)}
            onNext={() => setStep(step + 1)}
            onBack={step > 0 ? () => setStep(step - 1) : undefined}
            services={step === 0 ? services : []}
          />
        )}

        {step === DETAILS && (
          <form
            key="details"
            className="rise"
            onSubmit={(e) => {
              e.preventDefault();
              setStep(DONE);
            }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">Last step</p>
            <h1 className="mt-3 text-balance font-display text-4xl font-light leading-[1.1] tracking-[-0.03em] sm:text-5xl">Who should I talk to?</h1>
            <div className="mt-10 space-y-4">
              <Field label="Your name" value={details.name} onChange={(name) => setDetails({ ...details, name })} required autoComplete="name" />
              <Field label="Business name" value={details.company} onChange={(company) => setDetails({ ...details, company })} autoComplete="organization" />
              <Field label="Town or city" value={details.town} onChange={(town) => setDetails({ ...details, town })} autoComplete="address-level2" />
            </div>
            <div className="mt-10 flex items-center justify-between">
              <BackButton onClick={() => setStep(step - 1)} />
              <button type="submit" className="inline-flex h-12 items-center rounded-full bg-ink px-7 text-[15px] font-medium text-white hover:bg-ink/80">
                Continue
              </button>
            </div>
          </form>
        )}

        {step === DONE && (
          <div key="done" className="rise">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">Almost done</p>
            <h1 className="mt-3 text-balance font-display text-4xl font-light leading-[1.1] tracking-[-0.03em] sm:text-5xl">
              Thanks, {details.name.split(" ")[0]}. How would you like to talk?
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-body">Nothing&apos;s sent yet. Pick an option and your answers go with it.</p>

            <div className="mt-10 grid gap-3">
              {whatsappHref && (
                <ContactOption
                  href={whatsappHref}
                  title="Message me on WhatsApp"
                  body="Send your answers in one tap and chat when it suits you."
                  icon={<WhatsAppIcon />}
                  primary
                />
              )}
              {calHref && (
                <ContactOption
                  href={calHref}
                  title="Book a call"
                  body="Choose a time in my calendar. Your answers are added to the booking."
                  icon={<CalendarIcon />}
                  primary={!whatsappHref}
                />
              )}
              {(!whatsappHref || !calHref) && (
                <ContactOption
                  href={mailto("New website enquiry", summary)}
                  title="Email me"
                  body="Your answers are ready to send. I'll reply with next steps."
                  icon={<MailIcon />}
                  primary={!whatsappHref && !calHref}
                />
              )}
            </div>

            <details className="mt-8 rounded-2xl bg-surface p-5 text-sm text-body">
              <summary className="cursor-pointer list-none font-medium text-ink">Your answers</summary>
              <pre className="mt-3 whitespace-pre-wrap font-sans leading-relaxed">{summary}</pre>
            </details>

            <div className="mt-8">
              <BackButton onClick={() => setStep(DETAILS)} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function Question({
  index,
  question,
  selected,
  onChoose,
  onNext,
  onBack,
  services,
}: {
  index: number;
  question: (typeof questions)[number];
  selected: string[];
  onChoose: (option: string) => void;
  onNext: () => void;
  onBack?: () => void;
  services: string[];
}) {
  return (
    <fieldset className="rise">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
        Question {index + 1} of {questions.length}
      </p>
      <legend className="sr-only">{question.title}</legend>
      <h1 className="mt-3 text-balance font-display text-4xl font-light leading-[1.1] tracking-[-0.03em] sm:text-5xl">{question.title}</h1>
      {question.hint && <p className="mt-3 text-body">{question.hint}</p>}
      {services.length > 0 && (
        <p className="mt-4 rounded-2xl bg-stone px-4 py-3 text-sm text-body">
          You picked: <span className="text-ink">{services.join(", ")}</span>
        </p>
      )}

      <div className={`mt-8 grid gap-2.5 ${question.options.length > 4 ? "sm:grid-cols-2" : ""}`}>
        {question.options.map((o) => {
          const on = selected.includes(o);
          return (
            <button
              key={o}
              type="button"
              aria-pressed={on}
              onClick={() => onChoose(o)}
              className={`flex min-h-14 items-center justify-between gap-3 rounded-2xl px-5 py-3 text-left text-[16px] transition ${
                on ? "bg-ink text-white" : "bg-white shadow-card hover:shadow-[0_0_0_1px_rgba(0,0,0,0.16)]"
              }`}
            >
              {o}
              <span
                aria-hidden="true"
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] ${on ? "bg-white text-ink" : "ring-1 ring-black/15"}`}
              >
                {on ? "✓" : ""}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-10 flex items-center justify-between">
        {onBack ? <BackButton onClick={onBack} /> : <span />}
        {question.multi && (
          <button
            type="button"
            onClick={onNext}
            disabled={!selected.length}
            className="inline-flex h-12 items-center rounded-full bg-ink px-7 text-[15px] font-medium text-white transition hover:bg-ink/80 disabled:cursor-not-allowed disabled:opacity-30"
          >
            Continue
          </button>
        )}
      </div>
    </fieldset>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">
        {label}
        {!required && <span className="font-normal text-muted"> (optional)</span>}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        autoComplete={autoComplete}
        className="mt-2 h-12 w-full rounded-2xl bg-white px-4 text-[16px] shadow-card outline-none transition focus:shadow-[0_0_0_1.5px_#000]"
      />
    </label>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex h-12 items-center gap-2 rounded-full px-4 text-[15px] font-medium text-body hover:text-ink">
      ← Back
    </button>
  );
}

function ContactOption({ href, title, body, icon, primary }: { href: string; title: string; body: string; icon: React.ReactNode; primary?: boolean }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className={`group flex items-center gap-4 rounded-3xl p-5 transition ${
        primary ? "bg-ink text-white hover:bg-ink/85" : "bg-white shadow-card hover:shadow-[0_0_0_1px_rgba(0,0,0,0.16)]"
      }`}
    >
      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${primary ? "bg-white/10" : "bg-stone"}`}>{icon}</span>
      <span className="flex-1">
        <span className="block text-[17px] font-medium">{title}</span>
        <span className={`mt-0.5 block text-sm ${primary ? "text-white/70" : "text-body"}`}>{body}</span>
      </span>
      <span aria-hidden="true" className="text-xl transition group-hover:translate-x-1">→</span>
    </a>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15" rx="3" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
      <circle cx="12" cy="15" r="1.2" fill="currentColor" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="5.5" width="18" height="13" rx="3" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}
