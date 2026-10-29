// Pill buttons, after elevenlabs.io: 44px tall, 16px regular. Primary is ink; secondary is white
// with a half-pixel ring. External links open in a new tab.
export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  pick,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  // A service to tick in the checklist when clicked (read by the Catalogue).
  pick?: string;
}) {
  const styles = {
    primary: "bg-ink text-canvas hover:bg-ink/80",
    secondary: "bg-card text-ink shadow-[0_0_0_0.5px_rgb(var(--ink)/0.2),0_1px_2px_rgb(var(--ink)/0.06)] hover:bg-surface",
  }[variant];
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(pick && { "data-pick": pick })}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className={`inline-flex h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-full px-5 text-[16px] transition ${styles} ${className}`}
    >
      {children}
    </a>
  );
}
