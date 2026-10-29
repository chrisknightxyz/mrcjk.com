"use client";

import { useState } from "react";
import Image from "next/image";
import { AiAnswer, MapsCard } from "@/components/illustrations";
import { caseStudies, contact } from "@/content/site";

const [featured] = caseStudies;
const tabs = ["Your website", "Google", "AI answers"] as const;

// The hero's right-hand panel, after the agent demo on elevenlabs.io: a toggle across what the work
// does (a live site, a Google result, an AI answer), with the two ways to reach Chris underneath.
export function HeroDemo() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Your website");

  return (
    <div className="flex h-full flex-col items-center bg-stone px-5 pb-10 pt-8 sm:px-10">
      <div role="tablist" aria-label="What you get" className="flex gap-1">
        {tabs.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`h-9 whitespace-nowrap rounded-full px-3 text-[14px] transition sm:px-4 sm:text-[15px] ${
              tab === t ? "bg-card text-ink shadow-[0_0_0_0.5px_rgb(var(--ink)/0.15),0_1px_2px_rgb(var(--ink)/0.06)]" : "text-muted hover:text-ink"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="relative mt-8 grid w-full flex-1 place-items-center">
        {tab === "Your website" && (
          <a
            href={featured.url}
            target="_blank"
            rel="noopener noreferrer"
            className="theme-light rise block w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-[0_0_0_0.5px_rgba(0,0,0,0.12),0_16px_40px_rgba(30,20,10,0.14)]"
          >
            <span className="flex items-center gap-1.5 border-b border-black/5 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-[#e5e5e5]" />
              <span className="h-2 w-2 rounded-full bg-[#e5e5e5]" />
              <span className="h-2 w-2 rounded-full bg-[#e5e5e5]" />
              <span className="ml-2 truncate font-mono text-[10px] text-[#777169]">{featured.domain}</span>
            </span>
            <Image src={featured.image} alt={`${featured.name} website`} width={1440} height={900} priority sizes="448px" className="w-full" />
          </a>
        )}
        {tab === "Google" && (
          <div className="rise">
            <MapsCard />
          </div>
        )}
        {tab === "AI answers" && (
          <div className="rise w-full">
            <AiAnswer />
          </div>
        )}
      </div>

      <div className="mt-8 flex gap-8">
        {contact.whatsapp && (
          <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-canvas transition group-hover:bg-ink/80">
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm4.5 12.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z"
                />
              </svg>
            </span>
            <span className="whitespace-nowrap text-[13px] text-muted">WhatsApp</span>
          </a>
        )}
        {contact.calUrl && (
          <a href={contact.calUrl} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-card text-ink shadow-[0_0_0_0.5px_rgb(var(--ink)/0.15),0_1px_2px_rgb(var(--ink)/0.06)] transition group-hover:bg-surface">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                <rect x="3.5" y="5" width="17" height="15" rx="3" />
                <path d="M3.5 10h17M8 3v4M16 3v4" />
              </svg>
            </span>
            <span className="whitespace-nowrap text-[13px] text-muted">Book a call</span>
          </a>
        )}
      </div>
    </div>
  );
}
