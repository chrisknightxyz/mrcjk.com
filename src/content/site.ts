// All copy, prices and contact details for the site live here.
// Edit this file to change what the pages say; the layout reads from it.

export const site = {
  name: "Chris Knight",
  url: "https://www.mrcjk.com",
  email: "chris@mrcjk.com",
  location: "United Kingdom",
};

// Where qualified leads go. Until these are set, /start offers email instead.
export const contact = {
  // WhatsApp number in international format, digits only, e.g. "447700900123".
  whatsapp: "14244662230",
  // Cal.com booking link, e.g. "https://cal.com/mrcjk/intro".
  calUrl: "https://cal.com/chrisknightxyz/meeting",
};

// Footer links. A link with an empty url is hidden until it's filled in.
export const social = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/chrisknightxyz" },
  { name: "X", url: "https://x.com/chrisknightxyz" },
  { name: "Instagram", url: "https://www.instagram.com/chrisknightxyz" },
  { name: "GitHub", url: "https://github.com/chrisknightxyz" },
];

export const projects = [
  { name: "HackHouse", url: "https://www.hackhouse.xyz" },
  { name: "CreatorBrands", url: "https://creatorbrands.xyz" },
  { name: "The Private Clubs", url: "https://www.theprivateclubs.com" },
];

export const mailto = (subject: string, body = "") =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;

// Stripe Payment Links for taking payment after the call (Stripe Dashboard > Payment Links).
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
  // Preselects the matching answer on /start.
  need: string;
};

export const plans: Plan[] = [
  {
    id: "build",
    name: "Website",
    price: 999,
    prefix: "from",
    period: "one-off",
    blurb: "A custom website that turns visitors into calls, bookings and enquiries.",
    features: [
      "Designed for your business, not a template",
      "Looks great on every phone",
      "Loads fast",
      "Set up for Google and AI answers",
      "Click-to-call, contact forms and maps",
      "Yours to keep",
    ],
    cta: "Start your website",
    need: "New website",
  },
  {
    id: "care",
    name: "Hosting and care",
    price: 99,
    prefix: "",
    period: "a month",
    blurb: "Everything that keeps your site online, safe and working. Handled for you.",
    features: [
      "Fast, secure hosting",
      "SSL certificate included",
      "Security updates and fixes",
      "A monthly SEO and AEO report",
      "Cancel any time",
    ],
    cta: "",
    need: "Hosting and care",
  },
  {
    id: "growth",
    name: "SEO and AEO",
    // Set the monthly price here; until then the card shows "Price on request".
    price: null,
    prefix: "",
    period: "a month",
    blurb: "Ongoing work to move you up Google, Google Maps and AI answers.",
    features: [
      "Google Business Profile, fully optimised",
      "Local SEO, on the page and behind the scenes",
      "Content that answers your customers' questions",
      "Rankings and AI visibility, tracked monthly",
    ],
    cta: "Get a quote",
    need: "Get found on Google",
  },
];

// Platform logos (public/logos). Trademarks of their owners; shown to say where the work appears.
export const logos = {
  chatgpt: { name: "ChatGPT", src: "/logos/openai.svg" },
  claude: { name: "Claude", src: "/logos/claude.svg" },
  gemini: { name: "Gemini", src: "/logos/gemini.svg" },
  perplexity: { name: "Perplexity", src: "/logos/perplexity.svg" },
  copilot: { name: "Copilot", src: "/logos/copilot.svg" },
  grok: { name: "Grok", src: "/logos/grok.svg" },
  metaai: { name: "Meta AI", src: "/logos/meta.svg" },
  muse: { name: "Muse", src: "/logos/muse.webp" },
  google: { name: "Google", src: "/logos/google.svg" },
  meta: { name: "Meta", src: "/logos/meta.svg" },
};
export type LogoId = keyof typeof logos;

// Where AEO gets you recommended.
export const aiAssistants: LogoId[] = ["chatgpt", "claude", "gemini", "perplexity", "copilot", "grok", "metaai", "muse"];

// The catalogue, grouped by category in this order. Website and hosting are sold as plans above.
export type Service = { title: string; body: string; category: string; logos?: LogoId[] };

export const services: Service[] = [
  { title: "Local SEO", body: "Show up on Google and Google Maps when people nearby search for what you do.", category: "Search", logos: ["google"] },
  { title: "Google Business Profile", body: "The right details, photos and categories, so you stand out on Maps.", category: "Search", logos: ["google"] },
  { title: "Analytics and tracking", body: "See which calls, forms and sales your marketing brings in.", category: "Search", logos: ["google"] },
  { title: "AEO", body: "Get recommended when people ask an AI assistant for a business like yours.", category: "AI search", logos: aiAssistants },
  { title: "Google AI Overviews", body: "Appear in the AI answers at the top of Google, and in AI Mode.", category: "AI search", logos: ["google", "gemini"] },
  { title: "AI visibility check", body: "See what each AI assistant says about your business, and what to fix.", category: "AI search", logos: aiAssistants },
  { title: "Google Ads", body: "Search ads that reach people who are ready to buy.", category: "Marketing", logos: ["google"] },
  { title: "Meta Ads", body: "Facebook and Instagram ads, aimed at your local area.", category: "Marketing", logos: ["meta"] },
  { title: "Reviews and reputation", body: "More Google reviews, better replies and an eye on what people say.", category: "Marketing", logos: ["google"] },
  { title: "Branding and identity", body: "A logo, colours and tone of voice that feel like you.", category: "Marketing" },
  { title: "Social media management", body: "Planning, posting and replies on Facebook and Instagram.", category: "Content", logos: ["meta"] },
  { title: "Photo and video", body: "Photos and short videos of your business, shot on location.", category: "Content" },
  { title: "Email newsletters", body: "Regular emails that bring customers back.", category: "Content" },
  { title: "AI receptionist", body: "Answers your calls, takes messages and books appointments, day and night.", category: "AI tools" },
  { title: "AI website assistant", body: "A chat assistant on your site that answers customer questions instantly.", category: "AI tools", logos: ["chatgpt", "claude", "gemini"] },
  { title: "Custom AI assistants", body: "An assistant set up with your business knowledge, for you and your team.", category: "AI tools", logos: ["chatgpt", "claude", "gemini", "grok"] },
  { title: "AI automation", body: "Takes repetitive admin off your hands, like follow-ups and booking reminders.", category: "AI tools" },
];

// Brands Chris has worked with. Without a `logo`, the name shows as a wordmark.
// Logos: Simple Icons (simpleicons.org). Add a Manchester City crest to public/clients to replace the wordmark.
export const clients: { name: string; logo?: string; url?: string }[] = [
  {
    name: "Snapchat",
    logo: "/clients/snapchat.svg",
    url: "https://www.thedrum.com/news/pepsi-max-among-first-uk-brands-embrace-snapchat-sponsored-lenses-chelfie-valentines",
  },
  { name: "Nike", logo: "/clients/nike.svg", url: "https://www.nike.com/" },
  { name: "Google", logo: "/clients/google.svg", url: "https://forever-beta.com/case-study/google/" },
  { name: "Manchester City", url: "https://www.theguardian.com/sport/2018/aug/19/manchester-city-fantom" },
];

// More work and press, listed under the case studies. Titles come from each link.
export const portfolio = [
  { title: "HackHouse", kind: "Venture", source: "hackhouse.xyz", url: "https://www.hackhouse.xyz/" },
  {
    title: "Creator economy startup Superjoi raises $25 million",
    kind: "Press",
    source: "Business Insider · 2022",
    url: "https://www.businessinsider.com/exclusive-creator-economy-startup-superjoi-raises-25-million-2022-4",
  },
  {
    title: "Manchester City and Fantom",
    kind: "Press",
    source: "The Guardian · 2018",
    url: "https://www.theguardian.com/sport/2018/aug/19/manchester-city-fantom",
  },
  {
    title: "Pepsi Max among first UK brands to use Snapchat Sponsored Lenses",
    kind: "Press",
    source: "The Drum",
    url: "https://www.thedrum.com/news/pepsi-max-among-first-uk-brands-embrace-snapchat-sponsored-lenses-chelfie-valentines",
  },
  { title: "Google", kind: "Case study", source: "Forever Beta", url: "https://forever-beta.com/case-study/google/" },
  { title: "Nike", kind: "Brand", source: "nike.com", url: "https://www.nike.com/" },
  { title: "Rafahia", kind: "Website", source: "Built in Framer", url: "https://rafahia.framer.ai/" },
  {
    title: "Clokka",
    kind: "Product design",
    source: "Figma prototype",
    url: "https://www.figma.com/proto/rtYaAoxFtYONCArs3OPVf1/Clokka?node-id=7114-547&t=1zVbBk0EcFZ4t2SN-1",
  },
];

export const caseStudies = [
  {
    name: "Richard Knight, ACSI",
    url: "https://www.richardknightuk.com",
    domain: "richardknightuk.com",
    image: "/work/richardknightuk.jpg",
    variant: "dusk",
    sector: "Private wealth advice",
    summary: "A website for a British wealth advisor who works with expats in Thailand.",
    built: ["Design and build", "100+ pages", "Online booking", "SEO and AEO"],
  },
  {
    name: "The Private Clubs",
    url: "https://www.theprivateclubs.com",
    domain: "theprivateclubs.com",
    variant: "forest",
    sector: "Membership directory",
    summary: "A directory of private membership clubs, with club profiles, maps, rankings and paid memberships.",
    built: ["Design and build", "Maps and rankings", "Stripe payments", "AI assistant"],
  },
  {
    name: "CreatorBrands",
    url: "https://creatorbrands.xyz",
    domain: "creatorbrands.xyz",
    variant: "ember",
    sector: "Creator brand directory",
    summary: "A directory and community for creator-led brands, ranked by performance.",
    built: ["Design and build", "Brand rankings", "Community", "SEO and AEO"],
  },
] as const;

export const steps = [
  {
    title: "Tell me about your business",
    body: "Answer a few quick questions, then message me on WhatsApp or book a call. It takes about a minute.",
  },
  {
    title: "I design and build it",
    body: "You get a fixed price before I start. I design, write and build your site, and refine it with you.",
  },
  {
    title: "You go live and grow",
    body: "Your site launches on fast, secure hosting. Each month, you get a report on how you're doing.",
  },
];

export const audiences = [
  "Trades and home services",
  "Restaurants and cafés",
  "Salons and barbers",
  "Clinics and health",
  "Gyms and studios",
  "Shops",
  "Professional services",
  "Hotels and B&Bs",
];

export const faqs = [
  {
    q: "Why does it say “from £999”?",
    a: "£999 covers a focused website for most local businesses. If you need more, like extra pages, online booking or a shop, you'll get a fixed price before any work starts.",
  },
  {
    q: "What do I get for £99 a month?",
    a: "Hosting, an SSL certificate, security updates and fixes, and a monthly report on how you're doing on Google and in AI answers.",
  },
  {
    q: "Can I cancel Hosting and care?",
    a: "Yes. Cancel any time.",
  },
  {
    q: "What's AEO?",
    a: "Answer engine optimisation. More people now ask AI assistants like ChatGPT, Claude, Gemini, Perplexity, Copilot, Grok, Meta AI and Muse for recommendations. AEO helps those assistants understand your business, so they suggest you.",
  },
  {
    q: "How is that different from SEO?",
    a: "SEO, or search engine optimisation, helps you rank on Google and Google Maps. AEO helps you appear in AI answers. They work together, and every website I build is set up for both.",
  },
  {
    q: "How are the other services priced?",
    a: "Ads, social media, photo and video, branding, reviews and AI services are quoted for your business. Add the ones you want, then continue.",
  },
  {
    q: "Will I own my website?",
    a: "Yes. Your website and everything on it belongs to you.",
  },
  {
    q: "I already have a website. Can you help?",
    a: "Yes. I can redesign it, move it to faster hosting, or work on its SEO and AEO.",
  },
];

// The /start questions. Each answer is added to the WhatsApp message and the call notes.
export type Question = {
  id: string;
  // Short label used in the WhatsApp message and call notes.
  label: string;
  title: string;
  hint?: string;
  options: string[];
  multi?: boolean;
};

export const questions: Question[] = [
  {
    id: "needs",
    label: "Looking for",
    title: "What can I help with?",
    hint: "Choose all that apply.",
    multi: true,
    options: ["New website", "Redesign my website", "Get found on Google", "Get recommended by AI", "Hosting and care", "Something else"],
  },
  {
    id: "business",
    label: "Business",
    title: "What kind of business do you run?",
    options: [...audiences, "Something else"],
  },
  {
    id: "website",
    label: "Has a website",
    title: "Do you have a website now?",
    options: ["Yes", "No"],
  },
  {
    id: "timing",
    label: "Start",
    title: "When would you like to start?",
    options: ["As soon as possible", "In the next month", "In the next few months", "Just exploring"],
  },
  {
    id: "budget",
    label: "Budget",
    title: "Websites start at £999, then £99 a month. Does that work for you?",
    options: ["Yes, that works", "I'd like to talk it through"],
  },
];

// Maps a service picked in the basket to the matching /start answer.
export const serviceNeeds: Record<string, string> = {
  "Local SEO": "Get found on Google",
  "Google Business Profile": "Get found on Google",
  AEO: "Get recommended by AI",
  "Google AI Overviews": "Get recommended by AI",
  "AI visibility check": "Get recommended by AI",
};
