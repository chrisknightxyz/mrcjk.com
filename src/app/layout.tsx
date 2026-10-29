import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const display = Geist({ subsets: ["latin"], weight: ["300", "400"], variable: "--font-display" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = Geist_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${display.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JavaScript as available, so scroll reveals only hide content when they can show it again. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))d.classList.add('dark')}catch(e){}",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
