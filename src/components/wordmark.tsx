import Link from "next/link";

// The MRCJK mark, top left on every page and in the footer.
export function Wordmark() {
  return (
    <Link href="/" aria-label="MRCJK, home" className="whitespace-nowrap font-display text-[18px] font-bold tracking-[-0.02em] sm:text-[22px]">
      MRCJK
    </Link>
  );
}
