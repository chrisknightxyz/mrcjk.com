"use client";

import { useEffect, useRef } from "react";

// Fades its children up the first time they scroll into view.
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className,
  ...rest
}: {
  children: React.ReactNode;
  delay?: number;
  as?: "div" | "li" | "section";
  className?: string;
} & Record<`data-${string}`, string>) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Anything already on screen or scrolled past (a visitor who scrolled before the page finished
    // loading) shows at once, so content never stays hidden behind the animation.
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.setAttribute("data-shown", "");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-shown", "");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      {...rest}
      ref={ref as React.Ref<never>}
      data-reveal=""
      className={className}
      style={{ "--delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
