import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { CalModal } from "@/components/cal-modal";
import { StartModal } from "@/components/start-modal";
import { contact, site } from "@/content/site";
import "./globals.css";

const display = Geist({ subsets: ["latin"], weight: ["300", "400", "700"], variable: "--font-display" });
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
        {/* Marks JavaScript as available (so scroll reveals only hide what they can show again), sets the theme, and closes the phone menu when one of its links is tapped. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "var d=document.documentElement;d.classList.add('js');document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('details[open] a');if(a)a.closest('details').removeAttribute('open')});try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))d.classList.add('dark')}catch(e){}",
          }}
        />
      </head>
      <body>
        {children}
        {/* The two dialogs every page can open: the Build my website flow and the booking calendar. */}
        <StartModal />
        <CalModal />
        {/* WhatsApp on every page, after the floating voice-chat button on elevenlabs.io. */}
        <a
          href={`https://wa.me/${contact.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-5 right-5 z-20 hidden items-center gap-3 rounded-full bg-card py-2 pl-2 pr-5 text-[15px] shadow-[0_0_0_0.5px_rgb(var(--ink)/0.15),0_12px_32px_rgba(30,20,10,0.14)] transition hover:-translate-y-0.5 sm:flex"
        >
          <span className="orb h-9 w-9 rounded-full" />
          Chat on WhatsApp
        </a>
      </body>
    </html>
  );
}
