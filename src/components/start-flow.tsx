"use client";

import { useState } from "react";
import { RequestForm } from "@/components/request-form";
import { questions, serviceNeeds } from "@/content/site";

type Answers = Record<string, string[]>;

const DETAILS = questions.length;

// Preselect what the visitor clicked: a plan's need, or services from the catalogue.
function preselect(need: string | null, services: string[]): Answers {
  const picked = [need, ...services.map((s) => serviceNeeds[s] ?? "Something else")];
  const needs = Array.from(new Set(picked.filter((n): n is string => !!n && questions[0].options.includes(n))));
  return { needs: needs.length ? needs : ["New website"] };
}

export function StartFlow({ need, services, onClose }: { need: string | null; services: string[]; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(() => preselect(need, services));

  const total = questions.length + 1;
  const progress = (Math.min(step, total) + 1) / (total + 1);

  function choose(q: (typeof questions)[number], option: string) {
    const current = answers[q.id] ?? [];
    if (q.multi) {
      setAnswers({ ...answers, [q.id]: current.includes(option) ? current.filter((o) => o !== option) : [...current, option] });
      return;
    }
    setAnswers({ ...answers, [q.id]: [option] });
    setTimeout(() => setStep((s) => s + 1), 220);
  }

  // What the answers mean for the request: the needs become services, the rest go along as notes.
  const notes = questions.filter((q) => q.id !== "needs" && answers[q.id]?.length).map((q) => [q.label, answers[q.id].join(", ")] as [string, string]);
  const picked = [...(answers.needs ?? []), ...services];

  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-10 flex items-center gap-4 bg-card px-5 pb-4 pt-5 sm:px-8 sm:pt-6">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-surface" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)} aria-label="Progress">
          <div className="h-full rounded-full bg-ink transition-[width] duration-500 ease-out" style={{ width: `${progress * 100}%` }} />
        </div>
        <button type="button" onClick={onClose} aria-label="Close" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface text-muted hover:text-ink">
          ✕
        </button>
      </header>

      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col px-5 pb-10 pt-6 sm:px-8 sm:pb-12 sm:pt-8">
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
          <div key="details" className="rise">
            <RequestForm
              draft
              services={picked}
              notes={notes}
              title="Last step: your details"
              intro="I'll design your homepage and send it within 24 hours. You pay once you've approved it."
            />
            <div className="mt-6">
              <BackButton onClick={() => setStep(step - 1)} />
            </div>
          </div>
        )}
      </div>
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
      <p className="text-[14px] text-muted">
        Question {index + 1} of {questions.length}
      </p>
      <legend className="sr-only">{question.title}</legend>
      <h2 className="mt-3 text-balance font-display text-3xl font-light leading-[1.1] tracking-[-0.03em] sm:text-4xl">{question.title}</h2>
      {question.hint && <p className="mt-3 text-body">{question.hint}</p>}
      {services.length > 0 && (
        <p className="mt-4 rounded-2xl bg-stone px-4 py-3 text-sm text-body">
          You picked: <span className="text-ink">{services.join(", ")}</span>
        </p>
      )}

      <div className={`mt-8 grid gap-2.5 ${question.options.length > 4 && question.options.every((o) => o.length <= 20) ? "sm:grid-cols-2" : ""}`}>
        {question.options.map((o) => {
          const on = selected.includes(o);
          return (
            <button
              key={o}
              type="button"
              aria-pressed={on}
              onClick={() => onChoose(o)}
              className={`flex min-h-14 items-center justify-between gap-3 whitespace-nowrap rounded-2xl px-5 py-3 text-left text-[16px] transition ${
                on ? "bg-ink text-canvas" : "bg-stone ring-1 ring-inset ring-ink/[0.06] hover:ring-ink/25"
              }`}
            >
              {o}
              <span
                aria-hidden="true"
                className={`flex h-5 w-5 shrink-0 items-center justify-center text-[11px] ${question.multi ? "rounded-md" : "rounded-full"} ${on ? "bg-canvas text-ink" : "ring-1 ring-ink/15"}`}
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
            className="inline-flex h-12 items-center rounded-full bg-ink px-7 text-[15px] font-medium text-canvas transition hover:bg-ink/80 disabled:cursor-not-allowed disabled:opacity-30"
          >
            Continue
          </button>
        )}
      </div>
    </fieldset>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex h-12 items-center gap-2 rounded-full px-4 text-[15px] font-medium text-body hover:text-ink">
      ← Back
    </button>
  );
}
