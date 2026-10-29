import Link from "next/link";
import { site } from "@/content/site";

// The Chris Knight mark, top left on every page and in the footer.
export function Wordmark() {
  return (
    <Link href="/" aria-label={`${site.name}, home`} className="whitespace-nowrap font-display text-[20px] font-bold sm:text-[22px] tracking-[-0.02em]">
      Chris Knight
    </Link>
  );
}
