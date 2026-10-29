import Link from "next/link";
import { site } from "@/content/site";

// Placeholder until the existing Framer homepage is rebuilt here.
export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6">
      <p className="font-display text-5xl font-bold tracking-tight">{site.name}</p>
      <Link href="/services" className="mt-6 text-lg underline underline-offset-4">
        Services →
      </Link>
    </main>
  );
}
