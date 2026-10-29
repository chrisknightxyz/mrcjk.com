import Image from "next/image";
import { Band, BandHead, Cells, LEAD, MUTED } from "@/components/band";
import { Button } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { caseStudies, clients, contact, portfolio, projects, social } from "@/content/site";

// The proof, shared by the homepage (the three websites) and /work (everything).

export function WorkCards() {
  return (
    <Cells>
      {caseStudies.map((c, i) => (
        <Reveal key={c.url} delay={i * 80}>
          <a href={c.url} target="_blank" rel="noopener noreferrer" className="group block p-3 sm:p-4">
            <span className="block overflow-hidden rounded-3xl bg-stone p-4 pb-0 ring-[0.5px] ring-ink/10 sm:p-6 sm:pb-0">
              <span className="theme-light block overflow-hidden rounded-t-xl bg-white shadow-[0_0_0_0.5px_rgba(0,0,0,0.12),0_12px_32px_rgba(30,20,10,0.12)] transition duration-500 group-hover:-translate-y-1">
                <span className="flex items-center gap-1.5 border-b border-black/5 px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-[#e5e5e5]" />
                  <span className="h-2 w-2 rounded-full bg-[#e5e5e5]" />
                  <span className="h-2 w-2 rounded-full bg-[#e5e5e5]" />
                  <span className="ml-2 truncate font-mono text-[10px] text-[#777169]">{c.domain}</span>
                </span>
                <Image src={c.image} alt={`${c.name} homepage`} width={1440} height={900} sizes="(min-width: 768px) 360px, 100vw" className="w-full" />
              </span>
            </span>
            <span className="block px-2 pb-4 pt-5">
              <span className="flex h-6 items-center gap-2 overflow-hidden text-[13px] text-muted">
                <span className="whitespace-nowrap">{c.sector}</span>
                {"own" in c && c.own && <span className="whitespace-nowrap rounded-full bg-stone px-2 py-0.5 text-ink">My product</span>}
              </span>
              <span className="mt-1.5 block whitespace-nowrap text-[17px] group-hover:underline group-hover:underline-offset-4">{c.name}</span>
              <span className={`mt-1.5 block ${MUTED}`}>{c.summary}</span>
            </span>
          </a>
        </Reveal>
      ))}
    </Cells>
  );
}

export function PressList() {
  return (
    <ul className="border-t border-ink/5">
      {portfolio.map((w) => (
        <li key={w.url} className="border-b border-ink/5 last:border-0">
          <a href={w.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 px-5 py-4 transition hover:bg-stone/60 sm:px-8">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white ring-[0.5px] ring-black/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={w.logo} alt="" loading="lazy" className={`h-full w-full object-contain ${w.pad ? "p-2" : ""}`} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[16px]">{w.title}</span>
              <span className="block truncate text-[14px] text-muted">
                {w.kind} · {w.source}
              </span>
            </span>
            <span aria-hidden="true" className="text-muted transition group-hover:translate-x-0.5 group-hover:text-ink">
              ↗
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

// The bio's proof rows: each name links to the work or the press about it.
const about: [string, [string, string][]][] = [
  ["Brands", clients.map((c) => [c.name, c.url])],
  ["Press", portfolio.filter((w) => w.kind === "Press").map((w) => [w.source.split(" · ")[0], w.url])],
  ["Products", projects.map((p) => [p.name, p.url])],
];
const linkedin = social.find((s) => s.name === "LinkedIn")?.url;

export function About() {
  return (
    <Band id="about">
      <BandHead title="Who you'll work with" intro="One person, start to finish. No account managers, no handovers, no outsourcing." />
      <Cells cols={2} from="lg">
        <div className="p-3 sm:p-4">
          <Image
            src="/chris-knight.jpg"
            alt="Chris Knight"
            width={1518}
            height={1012}
            sizes="(min-width: 1024px) 560px, 100vw"
            className="aspect-[3/2] w-full rounded-3xl object-cover object-top ring-[0.5px] ring-ink/10"
          />
        </div>
        <div className="flex flex-col px-5 py-10 sm:px-8 lg:px-12">
          <p className={LEAD}>
            Hi, I&apos;m Chris. I design, build and look after every site myself. I&apos;ve made digital work for Nike,
            Google, Snapchat and Manchester City, and I build my own products too, like Private Clubs and
            CreatorBrands. Now I bring that same standard to local businesses, at a fixed price and live in 24 hours.
          </p>
          <dl className="mt-8 divide-y divide-ink/5 border-y border-ink/5 text-[15px]">
            {about.map(([label, items]) => (
              <div key={label} className="flex gap-4 py-3">
                <dt className="w-24 shrink-0 text-muted">{label}</dt>
                <dd className="flex min-w-0 flex-wrap gap-x-3 gap-y-1">
                  {items.map(([name, url]) => (
                    <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap hover:text-muted">
                      {name}
                    </a>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={contact.calUrl}>Book a call</Button>
            {linkedin && (
              <Button href={linkedin} variant="secondary">
                LinkedIn
              </Button>
            )}
          </div>
        </div>
      </Cells>
    </Band>
  );
}
