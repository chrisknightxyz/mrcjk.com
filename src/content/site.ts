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

// Stripe Payment Links, one per plan (Stripe Dashboard > Payment Links). While a link is empty,
// its Buy button opens the start flow instead.
// Test mode for now: swap in the live links (buy.stripe.com/...) before taking real payments.
export const stripeLinks = {
  build: "https://buy.stripe.com/test_5kQ28t4C8eRrbAyd3hfbq00",
  care: "https://buy.stripe.com/test_3cI6oJfgM38JcEC4wLfbq01",
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
  // One line beside the button, at the foot of the card.
  note: string;
  // Preselects the matching answer in the start flow.
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
      "Live in 24 hours",
      "Custom, not a template",
      "Built for every phone",
      "Loads fast",
      "Ready for Google and AI",
      "Click-to-call and forms",
      "Yours to keep",
    ],
    cta: "Buy now",
    note: "One-off payment",
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
      "SSL included",
      "Updates and fixes",
      "Monthly SEO and AEO report",
      "Cancel any time",
    ],
    cta: "Subscribe",
    note: "Cancel any time",
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
      "Google Business Profile",
      "On-page and local SEO",
      "Content AI can quote",
      "Rankings tracked monthly",
    ],
    cta: "Get a quote",
    note: "Cancel any time",
    need: "Get found on Google",
  },
];

// Platform logos (public/logos). Trademarks of their owners; shown to say where the work appears.
export const logos: Record<string, { name: string; src: string; mono?: boolean }> = {
  chatgpt: { name: "ChatGPT", src: "/logos/openai.svg", mono: true },
  claude: { name: "Claude", src: "/logos/claude.svg" },
  gemini: { name: "Gemini", src: "/logos/gemini.svg" },
  perplexity: { name: "Perplexity", src: "/logos/perplexity.svg", mono: true },
  copilot: { name: "Copilot", src: "/logos/copilot.svg" },
  grok: { name: "Grok", src: "/logos/grok.svg", mono: true },
  metaai: { name: "Meta AI", src: "/logos/meta.svg" },
  muse: { name: "Muse", src: "/logos/muse.webp" },
  google: { name: "Google", src: "/logos/google.svg" },
  meta: { name: "Meta", src: "/logos/meta.svg" },
};
export type LogoId = "chatgpt" | "claude" | "gemini" | "perplexity" | "copilot" | "grok" | "metaai" | "muse" | "google" | "meta";

// Where AEO gets you recommended.
export const aiAssistants: LogoId[] = ["chatgpt", "claude", "gemini", "perplexity", "copilot", "grok", "metaai", "muse"];

// The catalogue, grouped by category in this order. Website and hosting are sold as plans above.
export type Service = { title: string; body: string; category: string; logos?: LogoId[] };

export const services: Service[] = [
  { title: "Local SEO", body: "Top of Google and Maps, nearby", category: "Search", logos: ["google"] },
  { title: "Google Business Profile", body: "Right details, photos and hours", category: "Search", logos: ["google"] },
  { title: "Analytics and tracking", body: "Track calls, forms and sales", category: "Search", logos: ["google"] },
  { title: "AEO", body: "Recommended by AI assistants", category: "AI search", logos: aiAssistants },
  { title: "Google AI Overviews", body: "In Google AI answers and AI Mode", category: "AI search", logos: ["google", "gemini"] },
  { title: "AI visibility check", body: "What AI says about you", category: "AI search", logos: aiAssistants },
  { title: "Google Ads", body: "Ads for people ready to buy", category: "Marketing", logos: ["google"] },
  { title: "Meta Ads", body: "Facebook and Instagram ads", category: "Marketing", logos: ["meta"] },
  { title: "Reviews and reputation", body: "More reviews, better replies", category: "Marketing", logos: ["google"] },
  { title: "Branding and identity", body: "Logo, colours and tone of voice", category: "Marketing" },
  { title: "Social media management", body: "Posts and replies, handled", category: "Content", logos: ["meta"] },
  { title: "Photo and video", body: "Shot at your business", category: "Content" },
  { title: "Email newsletters", body: "Emails that bring customers back", category: "Content" },
  { title: "Shopify store", body: "Your storefront, products and checkout", category: "Integrations" },
  { title: "Online booking", body: "Fresha, Booksy, OpenTable and more", category: "Integrations" },
  { title: "Online payments", body: "Stripe, Square, SumUp and more", category: "Integrations" },
  { title: "Online ordering", body: "Deliveroo, Uber Eats and Just Eat", category: "Integrations" },
  { title: "AI receptionist", body: "Answers calls and books, 24/7", category: "AI tools" },
  { title: "AI website assistant", body: "Answers questions on your site", category: "AI tools", logos: ["chatgpt", "claude", "gemini"] },
  { title: "Custom AI assistants", body: "Trained on your business", category: "AI tools", logos: ["chatgpt", "claude", "gemini", "grok"] },
  { title: "AI automation", body: "Automated follow-ups", category: "AI tools" },
];

// Booking, ordering and payment tools that local businesses already use, by kind of business.
// Logos are each brand's own icon (public/integrations); they show what I can connect, not a partnership.
export type Tool = { name: string; url: string; logo: string };
const tool = (name: string, url: string, logo: string): Tool => ({ name, url, logo: `/integrations/${logo}` });

const t = {
  opentable: tool("OpenTable", "https://www.opentable.co.uk/", "opentable.png"),
  resdiary: tool("ResDiary", "https://www.resdiary.com/", "resdiary.png"),
  sevenrooms: tool("SevenRooms", "https://sevenrooms.com/", "sevenrooms.png"),
  designmynight: tool("DesignMyNight", "https://www.designmynight.com/", "designmynight.png"),
  thefork: tool("TheFork", "https://www.thefork.co.uk/", "thefork.png"),
  resy: tool("Resy", "https://resy.com/", "resy.png"),
  deliveroo: tool("Deliveroo", "https://deliveroo.co.uk/", "deliveroo.png"),
  ubereats: tool("Uber Eats", "https://www.ubereats.com/gb", "ubereats.png"),
  justeat: tool("Just Eat", "https://www.just-eat.co.uk/", "just-eat.png"),
  mindbody: tool("Mindbody", "https://www.mindbodyonline.com/", "mindbodyonline.png"),
  glofox: tool("Glofox", "https://www.glofox.com/", "glofox.png"),
  classpass: tool("ClassPass", "https://classpass.com/", "classpass.png"),
  teamup: tool("TeamUp", "https://goteamup.com/", "goteamup.png"),
  momence: tool("Momence", "https://momence.com/", "momence.png"),
  gymcatch: tool("Gymcatch", "https://gymcatch.com/", "gymcatch.png"),
  wodify: tool("Wodify", "https://www.wodify.com/", "wodify.png"),
  fresha: tool("Fresha", "https://www.fresha.com/", "fresha.png"),
  booksy: tool("Booksy", "https://booksy.com/", "booksy.png"),
  treatwell: tool("Treatwell", "https://www.treatwell.co.uk/", "treatwell.png"),
  phorest: tool("Phorest", "https://www.phorest.com/", "phorest.png"),
  timely: tool("Timely", "https://www.gettimely.com/", "gettimely.png"),
  vagaro: tool("Vagaro", "https://www.vagaro.com/", "vagaro.png"),
  squire: tool("Squire", "https://www.getsquire.com/", "getsquire.png"),
  squareAppointments: tool("Square Appointments", "https://squareup.com/gb/en/appointments", "square.svg"),
  setmore: tool("Setmore", "https://www.setmore.com/", "setmore.png"),
  cliniko: tool("Cliniko", "https://www.cliniko.com/", "cliniko.png"),
  jane: tool("Jane", "https://jane.app/", "jane.png"),
  semble: tool("Semble", "https://www.semble.io/", "semble.png"),
  calendly: tool("Calendly", "https://calendly.com/", "calendly.png"),
  cal: tool("Cal.com", "https://cal.com/", "cal.png"),
  jobber: tool("Jobber", "https://getjobber.com/", "getjobber.png"),
  tradify: tool("Tradify", "https://www.tradifyhq.com/", "tradifyhq.png"),
  servicem8: tool("ServiceM8", "https://www.servicem8.com/", "servicem8.png"),
  checkatrade: tool("Checkatrade", "https://www.checkatrade.com/", "checkatrade.png"),
  shopify: tool("Shopify", "https://www.shopify.com/uk", "shopify.png"),
  squareOnline: tool("Square Online", "https://squareup.com/gb/en/online-store", "square.svg"),
  wix: tool("Wix", "https://www.wix.com/", "wix.png"),
  woocommerce: tool("WooCommerce", "https://woocommerce.com/", "woocommerce.png"),
};

export const bookingTools: { sector: string; tools: Tool[] }[] = [
  { sector: "Restaurants and cafés", tools: [t.opentable, t.resdiary, t.sevenrooms, t.designmynight, t.thefork, t.resy, t.deliveroo, t.ubereats, t.justeat] },
  { sector: "Gyms and studios", tools: [t.mindbody, t.glofox, t.classpass, t.teamup, t.momence, t.gymcatch, t.wodify] },
  { sector: "Nails and beauty", tools: [t.fresha, t.booksy, t.treatwell, t.phorest, t.timely, t.vagaro] },
  { sector: "Barbers", tools: [t.booksy, t.squire, t.fresha, t.squareAppointments, t.setmore, t.timely] },
  { sector: "Clinics and health", tools: [t.cliniko, t.jane, t.semble, t.setmore, t.calendly, t.cal] },
  { sector: "Trades", tools: [t.jobber, t.tradify, t.servicem8, t.checkatrade, t.calendly] },
  { sector: "Shops", tools: [t.shopify, t.squareOnline, t.wix, t.woocommerce] },
];

export const paymentTools: Tool[] = [
  tool("Stripe", "https://stripe.com/gb", "stripe.png"),
  tool("Square", "https://squareup.com/gb", "square.svg"),
  tool("SumUp", "https://www.sumup.com/en-gb/", "sumup.png"),
  tool("PayPal", "https://www.paypal.com/uk", "paypal.png"),
  tool("Zettle by PayPal", "https://www.zettle.com/gb", "zettle.png"),
  tool("Dojo", "https://dojo.tech/", "dojo.png"),
  tool("GoCardless", "https://gocardless.com/", "gocardless.png"),
  tool("Klarna", "https://www.klarna.com/uk/", "klarna.png"),
  tool("Apple Pay", "https://www.apple.com/uk/apple-pay/", "applepay.svg"),
  tool("Google Pay", "https://pay.google.com/", "googlepay.svg"),
];

// Brands Chris has worked with. `mono` marks are single-colour and invert in dark mode.
// Logos: Simple Icons (simpleicons.org); the Manchester City crest is the club's current badge.
export const clients: { name: string; logo: string; mono?: boolean; url: string }[] = [
  {
    name: "Snapchat",
    logo: "/clients/snapchat.svg",
    mono: true,
    url: "https://www.thedrum.com/news/pepsi-max-among-first-uk-brands-embrace-snapchat-sponsored-lenses-chelfie-valentines",
  },
  { name: "Nike", logo: "/clients/nike.svg", mono: true, url: "https://www.nike.com/" },
  { name: "Google", logo: "/clients/google.svg", mono: true, url: "https://forever-beta.com/case-study/google/" },
  { name: "Manchester City", logo: "/clients/manchester-city.png", url: "https://www.theguardian.com/sport/2018/aug/19/manchester-city-fantom" },
];

// More work and press, listed under the case studies. Titles come from each link.
export const portfolio = [
  { title: "HackHouse", kind: "Venture", source: "hackhouse.xyz", url: "https://www.hackhouse.xyz/" },
  {
    title: "Creator economy startup Superjoi raises $2.5 million",
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
    image: "/work/theprivateclubs.jpg",
    variant: "forest",
    sector: "Membership directory",
    summary: "A directory of private membership clubs, with club profiles, maps, rankings and paid memberships.",
    built: ["Design and build", "Maps and rankings", "Stripe payments", "AI assistant"],
  },
  {
    name: "CreatorBrands",
    url: "https://creatorbrands.xyz",
    domain: "creatorbrands.xyz",
    image: "/work/creatorbrands.jpg",
    variant: "ember",
    sector: "Creator brand directory",
    summary: "A directory and community for creator-led brands, ranked by performance.",
    built: ["Design and build", "Brand rankings", "Community", "SEO and AEO"],
  },
] as const;

// How I work: seven steps, from first message to monthly care. Titles stay on one line.
export const steps = [
  {
    title: "Tell me what you need",
    body: "Five quick questions, about a minute. Then message me on WhatsApp or book a call.",
  },
  {
    title: "See a first draft",
    body: "I design your homepage, written for your business. You see it before you pay anything.",
  },
  {
    title: "Approve and pay",
    body: "Happy with the direction? You get one fixed price up front. Pay online and I build the rest.",
  },
  {
    title: "Connect your tools",
    body: "Bookings, payments, forms, reviews and WhatsApp, wired in so every enquiry reaches you.",
  },
  {
    title: "Tune for Google and AI",
    body: "Speed, SEO and AEO, checked page by page, so Google and AI assistants know what you do and where.",
  },
  {
    title: "Go live",
    body: "Your domain connected, SSL switched on and every page tested. Then your site goes live.",
  },
  {
    title: "Looked after, monthly",
    body: "Hosting, updates, fixes and changes, plus a monthly SEO and AEO report. Cancel any time.",
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
    q: "How fast is it?",
    a: "From your first message to a live website in 24 hours. Bigger sites, with extra pages, online booking or a shop, take longer, and you'll get the timeline with your fixed price.",
  },
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
