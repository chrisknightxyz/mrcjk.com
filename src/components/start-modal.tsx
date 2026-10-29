"use client";

import { useEffect, useRef, useState } from "react";
import { StartFlow } from "@/components/start-flow";

type Opened = { need: string | null; services: string[]; n: number };

// Every "/start" link opens the qualification flow in a dialog over the page.
// /start itself redirects to "/?start=1" (next.config), which opens it on load.
export function StartModal() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [opened, setOpened] = useState<Opened | null>(null);

  useEffect(() => {
    const open = (params: URLSearchParams) =>
      setOpened((o) => ({
        need: params.get("need"),
        services: params.get("services")?.split("|").filter(Boolean) ?? [],
        n: (o?.n ?? 0) + 1,
      }));

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;
      const url = new URL(link.href);
      if (url.origin !== location.origin || url.pathname !== "/start") return;
      e.preventDefault();
      open(url.searchParams);
    };
    document.addEventListener("click", onClick);

    const params = new URLSearchParams(location.search);
    if (params.has("start")) {
      open(params);
      history.replaceState(null, "", location.pathname + location.hash);
    }
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    const d = dialog.current;
    if (opened && d && !d.open) d.showModal();
    document.documentElement.style.overflow = opened ? "hidden" : "";
  }, [opened]);

  return (
    <dialog
      ref={dialog}
      aria-label="Start your project"
      onClose={() => setOpened(null)}
      onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
      className="m-0 h-full max-h-full w-full max-w-full overflow-y-auto border-0 bg-card p-0 text-ink backdrop:bg-black/40 backdrop:backdrop-blur-sm sm:m-auto sm:h-[min(90dvh,780px)] sm:w-[calc(100%-3rem)] sm:max-w-2xl sm:rounded-[28px] sm:shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_24px_64px_rgba(30,20,10,0.25)]"
    >
      {opened && <StartFlow key={opened.n} need={opened.need} services={opened.services} onClose={() => dialog.current?.close()} />}
    </dialog>
  );
}
