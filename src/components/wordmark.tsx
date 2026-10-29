import Link from "next/link";
import { site } from "@/content/site";

// The MRCJK mark, top left on every page and in the footer.
export function Wordmark() {
  return (
    <Link href="/" aria-label={`${site.name}, home`} className="whitespace-nowrap font-display text-[22px] font-bold tracking-[-0.02em]">
      MRCJK
    </Link>
  );
}
