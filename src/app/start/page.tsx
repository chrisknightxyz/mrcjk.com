import type { Metadata } from "next";
import { Suspense } from "react";
import { StartFlow } from "./start-flow";

export const metadata: Metadata = {
  title: "Start now",
  description: "Answer a few quick questions, then message me on WhatsApp or book a call.",
  robots: { index: false, follow: true },
};

export default function StartPage() {
  return (
    <Suspense>
      <StartFlow />
    </Suspense>
  );
}
