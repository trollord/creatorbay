// Single source of truth for contact details and page content.

export const contact = {
  email: "hello@creatorbaymedia.net",
  // wa.me links need the country code; the number is a Mumbai (+91) mobile.
  whatsapp: "919967562434",
  whatsappDisplay: "+91 99675 62434",
  instagram: "creatorbay.media",
};

export const whatsappLink = (text?: string) =>
  `https://wa.me/${contact.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const instagramLink = `https://instagram.com/${contact.instagram}`;

export const navLinks = [
  { name: "About", href: "/about" },
  { name: "Work", href: "/work" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export const stats = [
  { value: 15, suffix: "K+", label: "creators in network" },
  { value: 30, suffix: "+", label: "campaigns delivered" },
  { value: 50, suffix: "M+", label: "organic impressions" },
  { value: 18, suffix: "%", label: "average engagement" },
];

export type ServiceScene =
  | "event"
  | "collab"
  | "reel"
  | "production"
  | "strategy"
  | "website";

export const services: {
  slug: ServiceScene;
  title: string;
  short: string;
  description: string;
  deliverables: string[];
  caption: string;
  likes: string;
}[] = [
  {
    slug: "collab",
    title: "Brand collaborations",
    short: "Creator partnerships that last longer than one post.",
    description:
      "Ambassador programmes, long-term partnerships and campaigns made with the creator. When followers see the same creator with your brand again and again, they start to trust it.",
    deliverables: ["Ambassador programmes", "Co-created campaigns", "Creator shortlisting", "Contracts & usage rights"],
    caption: "When the fit is right, it shows.",
    likes: "31.7K",
  },
  {
    slug: "event",
    title: "Event marketing",
    short: "Get your event into everyone's feed before, during and after the night.",
    description:
      "We find and manage creators who promote your event in the run-up, cover it live on the night and keep it in people's feeds afterwards. That means more tickets sold and more people through the door.",
    deliverables: ["Pre-launch creator hype", "On-ground creator coverage", "Live stories & recaps", "Ticketing pushes"],
    caption: "Sold out. Again. 🎟️",
    likes: "48.2K",
  },
  {
    slug: "reel",
    title: "Reel creation",
    short: "Short videos people actually watch to the end.",
    description:
      "We write the hook, then shoot and edit reels for your page. They grow your following, give your brand a recognisable voice and reach people who haven't found you yet.",
    deliverables: ["Concepts & hooks", "Shoot & direction", "Edit, captions & sound", "Monthly reel calendars"],
    caption: "Hook in 0.8 seconds. Watch to the end.",
    likes: "250K",
  },
  {
    slug: "production",
    title: "Creative production",
    short: "Campaign visuals made for the platform they run on.",
    description:
      "Photo shoots, key visuals and edits cut to size for each platform, all in your brand's look so every post feels like it came from the same place.",
    deliverables: ["Photo shoots", "Campaign key visuals", "Platform-ready cut-downs", "Brand-consistent templates"],
    caption: "Every frame on-brand.",
    likes: "17.3K",
  },
  {
    slug: "strategy",
    title: "Strategy & analytics",
    short: "We pick creators by who follows them, not how many.",
    description:
      "Before we book a creator we check their audience: location, age, interests and how engaged they are. Then we plan around your goal and report what the campaign delivered.",
    deliverables: ["Audience-fit analysis", "Campaign planning", "Live performance tracking", "Post-campaign reports"],
    caption: "Booked because the numbers said so.",
    likes: "12.6K",
  },
  {
    slug: "website",
    title: "Websites",
    short: "The page creators send people to, built to turn visits into enquiries.",
    description:
      "Every creator post ends with a link. We design and build the site it points to: quick to load on a phone, clear about what you sell, and set up so you can see which creator sent each visitor.",
    deliverables: ["Design & build", "Launch landing pages", "Fast on mobile", "Link tracking & analytics"],
    caption: "Link in bio. Loads before they scroll away.",
    likes: "9.8K",
  },
];

export const process = [
  {
    title: "Discovery call",
    desc: "We learn about your brand, your goals and your customers, and agree on what a good result looks like.",
  },
  {
    title: "Campaign build",
    desc: "We write the creative brief, plan the content and set the timeline, and handle contracts and logistics.",
  },
  {
    title: "Creator matching",
    desc: "We shortlist creators from our network of 15,000+ based on who their followers are and how they engage.",
  },
  {
    title: "Go live",
    desc: "Creators publish. We manage them day to day and check every post is on-brand and on time.",
  },
  {
    title: "Results & report",
    desc: "You get a report on reach, engagement and conversions, plus what we'd change next time.",
  },
];

export const caseStudies = [
  {
    category: "Event marketing",
    title: "The grand launch experience",
    metric: { value: 400, suffix: "K+", label: "organic impressions" },
    secondary: [
      { value: "12", label: "creator partners" },
      { value: "100%", label: "tickets sold" },
    ],
    quote: "Creator Bay understood the vibe of our event perfectly. The content felt native, not sponsored.",
    tone: "red" as const,
  },
  {
    category: "Brand + reel creation",
    title: "Viral reel content series",
    summary: "A six-reel series for the brand's page that reached 250K views with an 18% engagement rate.",
    metric: { value: 250, suffix: "K", label: "total views" },
    secondary: [
      { value: "18%", label: "engagement rate" },
      { value: "6", label: "reels produced" },
    ],
    quote: "The reels felt native, not sponsored. That's the magic of working with people who get the platform.",
    tone: "paper" as const,
  },
];

export const niches = [
  "Events",
  "Fashion",
  "Tech",
  "Fitness",
  "Travel",
  "Beauty",
  "Lifestyle",
  "Gaming",
];

/** Brands we've worked with. `ratio` is width/height of the artwork; `scale`
 *  evens out optical size (a thin script needs more height than a bold wordmark). */
export type Brand = { name: string; src: string; ratio: number; scale: number };

const brand = (name: string, file: string, ratio: number, scale: number): Brand => ({ name, src: `/brands/${file}`, ratio, scale });

// Two rows of equal length, mixed by sector so similar wordmarks never sit side by side.
export const brandRows: [Brand[], Brand[]] = [
  [
    brand("Toyota", "toyota.svg", 1, 1.45),
    brand("Blinkit", "blinkit.svg", 3.8, 0.95),
    brand("Dr.Althea", "dr-althea.png", 3.45, 1.35),
    brand("Sunburn", "sunburn.svg", 4.31, 1.1),
    brand("Tata Coffee", "tata-coffee.svg", 9.6, 0.7),
    brand("Medicube", "medicube.svg", 5.12, 0.95),
    brand("Maddock Films", "maddock-films.png", 2.4, 1.5),
    brand("Bepanthen", "bepanthen.png", 4.19, 1),
  ],
  [
    brand("BookMyShow", "bookmyshow.svg", 2.94, 1.1),
    brand("Truecaller", "truecaller.svg", 5.22, 0.95),
    brand("Beauty Matters", "beauty-matters.svg", 6.54, 1.1),
    brand("Parle", "parle.svg", 2.68, 1.35),
    brand("SKIN1004", "skin1004.svg", 12.25, 0.5),
    brand("Bharat Forge", "bharat-forge.svg", 5.02, 1.15),
    brand("d'Alba", "dalba.svg", 8, 0.8),
    brand("TIRTIR", "tirtir.svg", 5.44, 0.9),
  ],
];

export const values = [
  {
    title: "Precision over volume",
    desc: "We don't chase follower counts. We pick creators whose audiences care about what you sell.",
  },
  {
    title: "Creativity with purpose",
    desc: "Every post has a job, whether that's sign-ups, ticket sales or awareness. If it doesn't do that job, we change it.",
  },
  {
    title: "Transparency & trust",
    desc: "You always know what's running, why it's running and what it's delivering.",
  },
  {
    title: "Results that matter",
    desc: "We measure reach, engagement, brand recall and sales, because those are what move your business.",
  },
];
