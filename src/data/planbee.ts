import eventBranding from "@/assets/event-branding.jpg";
import activation from "@/assets/activation.jpg";
import digital from "@/assets/digital.jpg";
import talent from "@/assets/talent.jpg";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";

export const expertise = [
  {
    num: "01",
    title: "Brand Partnerships & Sponsorships",
    desc: "Strategic brand partnerships, sponsorship acquisition, and IP monetization.",
    image: eventBranding,
  },
  {
    num: "02",
    title: "Experiential & Event Marketing",
    desc: "From concept to on-ground execution, we curate experiences that connect brands with audiences.",
    image: work1,
  },
  {
    num: "03",
    title: "ATL, BTL & Brand Activations",
    desc: "From mass-reach campaigns to hyper-local activations that drive visibility and engagement.",
    image: activation,
  },
  {
    num: "04",
    title: "Digital, Social & Influencer Marketing",
    desc: "Content, creators, and digital campaigns designed to amplify brands and experiences.",
    image: digital,
  },
  {
    num: "05",
    title: "Entertainment & IP Partnerships",
    desc: "Brand collaborations across films, concerts, sports, cultural properties, and entertainment IPs.",
    image: work2,
  },
  {
    num: "06",
    title: "Artist & Talent Collaborations",
    desc: "Artist bookings, celebrity associations, appearances, and brand-led talent collaborations.",
    image: talent,
  },
];

export const services = [
  {
    id: "01",
    title: "Brand Partnerships & Sponsorships",
    image: eventBranding,
    groups: [
      {
        title: "Partnerships",
        items: [
          "Sponsorship Acquisition",
          "Brand Partnerships",
          "IP Monetization",
          "Partnership Management",
        ],
      },
    ],
  },
  {
    id: "02",
    title: "Experiential & Event Marketing",
    image: work1,
    groups: [
      {
        title: "Experiences",
        items: [
          "Brand Experiences",
          "Corporate Experiences",
          "Event Curation",
          "Large-Scale Events",
        ],
      },
    ],
  },
  {
    id: "03",
    title: "ATL, BTL & Brand Activations",
    image: activation,
    groups: [
      {
        title: "Activations",
        items: [
          "ATL & OOH",
          "BTL Activations",
          "Mall & Retail",
          "Community & Consumer",
        ],
      },
    ],
  },
  {
    id: "04",
    title: "Entertainment & IP Partnerships",
    image: digital,
    groups: [
      {
        title: "Entertainment",
        items: [
          "Movie Partnerships",
          "Concert & Music",
          "Sports & Lifestyle",
          "Entertainment Promotions",
        ],
      },
    ],
  },
  {
    id: "05",
    title: "Digital, Social & Influencer Marketing",
    image: work2,
    groups: [
      {
        title: "Digital",
        items: [
          "Social & Content",
          "Influencer Marketing",
          "Digital Campaigns",
          "Web & Performance Marketing",
        ],
      },
    ],
  },
  {
    id: "06",
    title: "Artist & Talent Collaborations",
    image: talent,
    groups: [
      {
        title: "Talent",
        items: [
          "Artist Bookings",
          "Celebrity Associations",
          "Brand Collaborations",
          "Talent Sourcing",
        ],
      },
    ],
  },
];

export type Client = { name: string; logo: string };

export type ClientCategory = {
  num: string;
  title: string;
  subtitle?: string;
  layout: "marquee" | "two-column" | "editorial" | "final";
  groups: { title?: string; clients: Client[] }[];
};

const logo = (name: string, file: string): Client => ({ name, logo: `/clients/${file}` });

export const clientCategories: ClientCategory[] = [
  {
    num: "01",
    title: "Entertainment, Media & Culture",
    subtitle: "Concerts · Music · Movies · Media · Entertainment IPs",
    layout: "marquee",
    groups: [
      {
        clients: [
          logo("ACTC Events", "actc-events.jpeg"),
          logo("EVA Live", "eva-live.jpeg"),
          logo("Raasta", "raasta.jpeg"),
          logo("Fever Live", "fever-live.jpeg"),
          logo("TribeVibe Entertainments", "tribevibe-entertainments.jpeg"),
          logo("Sunburn Festival", "sunburn-festival.jpeg"),
          logo("BookMyShow Live", "bookmyshow-live.jpeg"),
          logo("Skyhylive", "skyhylive.png"),
          logo("Serrano Entertainments", "serrano-entertainments.jpeg"),
          logo("Prism Outdoors", "prism-outdoors.jpeg"),
          logo("Band Raag", "band-raag.png"),
          logo("Trendsetters.Live", "trendsetters-live.jpeg"),
          logo("Freshathon", "freshathon.png"),
          logo("SAREGAMA", "saregama.jpeg"),
          logo("Hyderabad Talkies", "hyderabad-talkies.jpeg"),
          logo("Rudraksha Communications", "rudraksha-communications.jpeg"),
          logo("Hyperlink Brand Sol.", "hyperlink-brand-sol.jpeg"),
          logo("Cardex Group", "cardex-group.jpeg"),
          logo("Brand Avatar", "brand-avatar.jpeg"),
        ],
      },
    ],
  },
  {
    num: "02",
    title: "Real Estate & Infrastructure",
    subtitle: "Real Estate · Property · Infrastructure",
    layout: "two-column",
    groups: [
      {
        clients: [
          logo("Aaditri Group", "aaditri-group.jpeg"),
          logo("Jupiter Properties", "jupiter-properties.jpeg"),
          logo("Rangu Realty", "rangu-realty.jpeg"),
          logo("Speed Housing LLP", "speed-housing-llp.jpeg"),
          logo("Casagrand", "casagrand.png"),
          logo("Tridasa", "tridasa.png"),
        ],
      },
    ],
  },
  {
    num: "03",
    title: "Government, Education & Healthcare",
    subtitle: "Government & Tourism · Educational Institutions · Healthcare",
    layout: "editorial",
    groups: [
      {
        title: "Government & Tourism",
        clients: [
          logo("Telangana Tourism", "telangana-tourism.jpeg"),
          logo("Rashtrapati Nilayam", "rashtrapati-nilayam.jpeg"),
        ],
      },
      {
        title: "Education",
        clients: [
          logo("IIT Hyderabad", "iit-hyderabad.jpeg"),
          logo("BITS Hyderabad", "bits-hyderabad.jpeg"),
        ],
      },
      {
        title: "Healthcare",
        clients: [
          logo("Medicover Hospitals", "medicover-hospitals.png"),
          logo("Yashoda Hospitals", "yashoda-hospitals.png"),
          logo("Sindhu Hospitals", "sindhu-hospitals.png"),
        ],
      },
    ],
  },
  {
    num: "04",
    title: "Retail, Malls & Lifestyle",
    subtitle: "Malls · Retail · Wellness · Beauty · Lifestyle",
    layout: "two-column",
    groups: [
      {
        clients: [
          logo("Nexus", "nexus.jpeg"),
          logo("Krisara Clinics", "krisara-clinics.jpeg"),
          logo("Daisy Dale Farm Park", "daisy-dale-farm-park.jpeg"),
        ],
      },
    ],
  },
  {
    num: "05",
    title: "Food, Beverage & Hospitality",
    subtitle: "Restaurants · QSR · Cloud Kitchens · Cafés & Bakeries · Beverages · Hospitality",
    layout: "final",
    groups: [
      {
        title: "Restaurants & Cloud Kitchens",
        clients: [
          logo("Shoyu", "shoyu.png"),
          logo("Scuzi", "scuzi.jpeg"),
          logo("Rebel Foods", "rebel-foods.png"),
          logo("A19 Club and Kitchen", "a19-club-and-kitchen.jpeg"),
          logo("Sera Eats", "sera-eats.jpeg"),
        ],
      },
      {
        title: "QSR, Beverages & Cafés",
        clients: [
          logo("Popeyes", "popeyes.jpeg"),
          logo("Domino's", "domino-s.jpeg"),
          logo("Taco Bell", "taco-bell.jpeg"),
          logo("Wendy's", "wendy-s.jpeg"),
          logo("Brown Bear Bakers", "brown-bear-bakers.jpeg"),
          logo("Boba Bhai", "boba-bhai.png"),
          logo("Coca-Cola", "coca-cola.jpeg"),
          logo("Coffee Katha", "coffee-katha.jpeg"),
          logo("Gettodelivers", "gettodelivers.jpeg"),
        ],
      },
    ],
  },
];

export type CaseStudy = {
  num: string;
  title: string;
  partner?: string;
  service: string;
  date: string;
  location?: string;
  description: string;
  image: string;
};

const images = [work1, work2, work3, work4];
const img = (i: number) => images[i % images.length] as string;

export const caseStudies: CaseStudy[] = [];

export const whyPlanbee = [
  {
    num: "01",
    title: "Partnerships That Deliver",
    desc: "Strong Relationships across Brands, Venues, Artists, Media, Vendors, and Event Ecosystems.",
  },
  {
    num: "02",
    title: "One Partner. Multiple Capabilities.",
    desc: "From sponsorships and activations to events, marketing, F&B, and Talent - all under one roof.",
  },
  {
    num: "03",
    title: "Commercial + Creative thinking ideas",
    desc: "Built around brand objectives, audience engagement, and measurable business value.",
  },
  {
    num: "04",
    title: "End-to-End Ownership",
    desc: "From concept and partnerships to production and on-ground execution - we take ownership from start to finish.",
  },
];

export const contact = {
  phone: "8688075841",
  email: "hello@planbee.co",
  address: "Hyderabad, Telangana",
};
