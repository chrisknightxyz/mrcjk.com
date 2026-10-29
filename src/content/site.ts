// All copy, prices and contact details for the site live here.
// Edit this file to change what the pages say; the layout reads from it.

export const site = {
  name: "mrcjk",
  url: "https://www.mrcjk.com",
  email: "chris@mrcjk.com",
  location: "United Kingdom",
};

export const mailto = (subject: string, body = "") =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;

// Stripe Payment Links (Stripe Dashboard > Payment Links). Paste each URL in;
// until a link is set, its button opens an email instead.
export const stripeLinks = {
  build: "",
  care: "",
  growth: "",
};

export type Plan = {
  id: keyof typeof stripeLinks;
  name: string;
  price: number | null;
  prefix: string;
  period: string;
  blurb: string;
  features: string[];
  cta: string;
};

export const plans: Plan[] = [
  {
    id: "build",
    name: "Website build",
    price: 999,
    prefix: "from",
    period: "one-off",
    blurb: "A fast, custom website designed to turn local searches into enquiries.",
    features: [
      "Custom design for your business, no off-the-shelf templates",
      "Mobile-first and built for speed",
      "Technical SEO set up from day one",
      "Schema markup so Google and AI assistants understand you",
      "Contact forms, click-to-call and maps",
      "You own your website",
    ],
    cta: "Start your website",
  },
  {
    id: "care",
    name: "Hosting & care",
    price: 99,
    prefix: "",
    period: "per month",
    blurb: "Your site kept online, secure and up to date, with a monthly report on how it's performing.",
    features: [
      "Fast global hosting",
      "SSL certificate",
      "Security and software updates",
      "Monthly SEO & AEO report",
      "Cancel anytime",
    ],
    cta: "Start hosting & care",
  },
  {
    id: "growth",
    name: "SEO & AEO growth",
    // Set the monthly price here; until then the card shows "Ask for price".
    price: null,
    prefix: "",
    period: "per month",
    blurb: "Ongoing work to climb Google and Google Maps, and get recommended by ChatGPT, Gemini and Perplexity.",
    features: [
      "Local SEO and Google Business Profile optimisation",
      "On-page and technical SEO",
      "Answer-ready content and structured data",
      "Rankings and AI visibility tracking",
    ],
    cta: "Add SEO & AEO",
  },
];

// The full catalogue. Core services are priced above; the rest are quoted.
export type Service = { title: string; body: string; category: string; core?: boolean };

export const services: Service[] = [
  { title: "Website Design & Build", body: "A custom website that looks the part on every screen and makes it easy to call, book or enquire.", category: "Website", core: true },
  { title: "Hosting & Maintenance", body: "Fast, secure hosting with updates and a monthly performance report.", category: "Website", core: true },
  { title: "Local SEO", body: "Rank on Google and Google Maps when people nearby search for what you do.", category: "Search", core: true },
  { title: "AEO", body: "Answer Engine Optimisation: get recommended by ChatGPT, Gemini, Perplexity and Google's AI answers.", category: "Search", core: true },
  { title: "Google Business Profile", body: "Set up and optimised so you show in the map pack with the right details, photos and categories.", category: "Search" },
  { title: "Google & Bing Ads", body: "Search ads that put you in front of people ready to buy.", category: "Marketing" },
  { title: "Social Ads", body: "Paid campaigns on Facebook and Instagram, targeted at your local area.", category: "Marketing" },
  { title: "Social Media Management", body: "Strategy, posting and community management.", category: "Content" },
  { title: "Photo & Video", body: "On-location photos and video for your website and socials.", category: "Content" },
  { title: "Email Newsletters", body: "Newsletters that keep customers coming back.", category: "Content" },
  { title: "Branding & Identity", body: "Logo, colours, tone of voice and templates.", category: "Marketing" },
  { title: "Reviews & Reputation", body: "Review requests, response support and review monitoring.", category: "Marketing" },
  { title: "AI Receptionist", body: "Answers your calls with an AI voice, takes messages and books appointments.", category: "AI" },
  { title: "AI Website Assistant", body: "A chat assistant on your site that answers customer questions around the clock.", category: "AI" },
  { title: "AI Automation", body: "Automate admin like enquiries, follow-ups and bookings.", category: "AI" },
  { title: "Analytics & Conversion Tracking", body: "Tracking set up so you know which calls, forms and sales your marketing brings in.", category: "Search" },
];

export const caseStudies = [
  {
    name: "Richard Knight, ACSI",
    url: "https://www.richardknightuk.com",
    domain: "richardknightuk.com",
    image: "/work/richardknightuk.jpg",
    sector: "Private wealth advice",
    summary: "Website for a British wealth advisor serving expats in Thailand.",
    built: ["Website design & build", "100+ service, location and guide pages", "Online booking", "Financial calculators", "SEO & AEO"],
  },
  {
    name: "The Private Clubs",
    url: "https://www.theprivateclubs.com",
    domain: "theprivateclubs.com",
    image: "/work/theprivateclubs.jpg",
    sector: "Membership directory",
    summary: "A directory of private membership clubs, with club profiles, maps, rankings and paid memberships.",
    built: ["Website design & build", "Club profiles, maps and rankings", "Stripe memberships", "AI assistant", "SEO & AEO"],
  },
];

export const steps = [
  {
    title: "Tell me about your business",
    body: "Book a quick call or drop me an email. I'll learn what you do, who your customers are and what the website needs to achieve.",
  },
  {
    title: "I design and build it",
    body: "You get a fixed price up front. I design, write and build your site, then refine it with your feedback.",
  },
  {
    title: "Launch and grow",
    body: "Your site goes live on fast hosting. Each month you get a report on how it's ranking on Google and in AI search.",
  },
];

export const audiences = [
  "Trades & home services",
  "Restaurants & cafés",
  "Salons & barbers",
  "Clinics & health",
  "Gyms & studios",
  "Shops & retail",
  "Professional services",
  "Hotels & hospitality",
];

export const faqs = [
  {
    q: "Why “from” £999?",
    a: "£999 covers a focused website for most local businesses. If you need extra pages, online booking, e-commerce or other features, I'll give you a fixed quote before any work starts, so there are no surprises.",
  },
  {
    q: "What does the £99 a month cover?",
    a: "Hosting, your SSL certificate, security and software updates, plus a monthly report on how your site is ranking in Google and AI search.",
  },
  {
    q: "Can I cancel the monthly plan?",
    a: "Yes, you can cancel anytime.",
  },
  {
    q: "What is AEO?",
    a: "Answer Engine Optimisation. More customers now ask AI assistants like ChatGPT, Gemini and Perplexity for recommendations instead of searching. AEO structures your website and online presence so those assistants understand your business and recommend it.",
  },
  {
    q: "What's the difference between SEO and AEO?",
    a: "SEO helps you rank in traditional search results like Google and Google Maps. AEO helps you get cited in AI-generated answers. They overlap a lot, and every website I build is set up for both.",
  },
  {
    q: "How are the other services priced?",
    a: "Ads, social, photo and video, branding, reviews and AI services are quoted to your goals. Select the ones you're interested in and send one enquiry.",
  },
  {
    q: "Do I own my website?",
    a: "Yes. The website and its content are yours.",
  },
  {
    q: "I already have a website. Can you help?",
    a: "Yes. I can redesign it, move it onto faster hosting, or just work on its SEO and AEO.",
  },
];
