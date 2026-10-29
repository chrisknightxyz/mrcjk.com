"use client";

import { useEffect, useRef, useState } from "react";
import { contact } from "@/content/site";

// Every link to the Cal.com booking page opens the calendar in a dialog over the page instead of
// a new tab. Any query on the link (name, notes from the start flow) carries over to the booking.
export function CalModal() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [link, setLink] = useState(contact.calUrl);

  useEffect(() => {
    if (!contact.calUrl) return;
    const base = new URL(contact.calUrl);
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const url = new URL(a.href);
      if (url.origin !== base.origin || url.pathname !== base.pathname) return;
      e.preventDefault();
      setLink(url.toString());
      url.searchParams.set("embed", "true");
      url.searchParams.set("embedType", "inline");
      url.searchParams.set("theme", document.documentElement.classList.contains("dark") ? "dark" : "light");
      setSrc(url.toString());
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    const d = dialog.current;
    if (src && d && !d.open) d.showModal();
    if (src) document.documentElement.style.overflow = "hidden";
  }, [src]);

  const close = () => dialog.current?.close();

  return (
    <dialog
      ref={dialog}
      aria-label="Book a call"
      onClose={() => {
        setSrc(null);
        if (!document.querySelector("dialog[open]")) document.documentElement.style.overflow = "";
      }}
      onClick={(e) => e.target === e.currentTarget && close()}
      className="m-0 h-full max-h-full w-full max-w-full overflow-hidden border-0 bg-card p-0 text-ink backdrop:bg-black/40 backdrop:backdrop-blur-sm sm:m-auto sm:h-[min(90dvh,760px)] sm:w-[calc(100%-3rem)] sm:max-w-4xl sm:rounded-[28px] sm:shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_24px_64px_rgba(30,20,10,0.25)]"
    >
      <div className="flex h-full flex-col">
        <header className="flex items-center justify-between gap-4 border-b border-ink/5 px-5 py-3 sm:px-6">
          <p className="whitespace-nowrap text-[17px]">Book a call</p>
          <div className="flex items-center gap-2">
            <a href={link} target="_blank" rel="noopener noreferrer" className="hidden whitespace-nowrap text-[14px] text-muted underline underline-offset-4 hover:text-ink sm:inline">
              Open in a new tab
            </a>
            <button type="button" onClick={close} aria-label="Close" className="flex h-9 w-9 items-center justify-center rounded-full bg-surface text-muted hover:text-ink">
              ✕
            </button>
          </div>
        </header>
        <div className="relative flex-1 bg-card">
          <p className="absolute inset-0 grid place-items-center text-[15px] text-muted">Loading the calendar…</p>
          {src && <iframe src={src} title="Book a call with Chris Knight" className="relative h-full w-full border-0" allow="payment" />}
        </div>
      </div>
    </dialog>
  );
}
