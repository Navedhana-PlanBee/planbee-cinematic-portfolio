import eventBranding from "@/assets/event-branding.jpg";
import activation from "@/assets/activation.jpg";
import digital from "@/assets/digital.jpg";
import talent from "@/assets/talent.jpg";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";

// Selected Work authentic photography
const anirudhImages = Object.values(
  import.meta.glob<string>("/src/assets/work/anirudh/*.{jpg,jpeg,png,JPG,PNG}", {
    eager: true,
    import: "default",
  }),
);

const freshathonImages = Object.values(
  import.meta.glob<string>("/src/assets/work/freshathon/*.{jpg,jpeg,png,JPG,PNG}", {
    eager: true,
    import: "default",
  }),
);

const casagrandMallImages = Object.values(
  import.meta.glob<string>("/src/assets/work/casagrand-mall/*.{jpg,jpeg,png,JPG,PNG}", {
    eager: true,
    import: "default",
  }),
);

const kidzzathonImages = Object.values(
  import.meta.glob<string>("/src/assets/work/kidzzathon/*.{jpg,jpeg,png,JPG,PNG}", {
    eager: true,
    import: "default",
  }),
);

const casagrandCommunityImages = Object.values(
  import.meta.glob<string>("/src/assets/work/casagrand-community/*.{jpg,jpeg,png,JPG,PNG}", {
    eager: true,
    import: "default",
  }),
);

const meruImages = Object.values(
  import.meta.glob<string>("/src/assets/work/meru/*.{jpg,jpeg,png,JPG,PNG}", {
    eager: true,
    import: "default",
  }),
);

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
        items: ["ATL & OOH", "BTL Activations", "Mall & Retail", "Community & Consumer"],
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
  highlights?: string;
  image: string;
  gallery: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    num: "01",
    title: "ANIRUDH XV TOUR - HYDERABAD",
    partner: "A19 Outdoors & Brand Avatar",
    service: "F&B Curation & On-Ground Execution",
    date: "March, 2026",
    location: "Gachibowli Stadium, Hyderabad",
    description:
      "Curated and managed the food and beverage ecosystem for a large-scale live concert, coordinating brand partnerships, vendor operations and seamless on-ground execution.",
    highlights: "35,000+ Attendees || 65+ F&B Counters || 25+ Brands",
    image: anirudhImages[3] || anirudhImages[0] || "",
    gallery: anirudhImages,
  },
  {
    num: "02",
    title: "Freshathon - Presented by Tridasa Rise",
    partner: "Tridasa Rise",
    service: "Brand Sponsorship",
    date: "March, 2026",
    location: "Yashoda Hospital, Hitech-City",
    description:
      "Developed a strategic sponsorship collaboration positioning Tridasa Rise as the presenting partner of Freshathon, integrating brand visibility, audience engagement and real estate lead-generation opportunities.",
    highlights: "2000+ Runners || 10+ Site Visits",
    image: freshathonImages[4] || freshathonImages[0] || "",
    gallery: freshathonImages,
  },
  {
    num: "03",
    title: "Casagrand - Nexus Mall Activation",
    partner: "Casagrand",
    service: "Campaign Curation & Mall Activation",
    date: "May - June 2026",
    location: "Nexus Mall, Hyderabad",
    description:
      "Curated a 15-day experiential mall activation for Casagrand, creating opportunities for direct consumer engagement, brand visibility and qualified lead generation.",
    highlights: "15-Day Activation || 500+ Leads Generated",
    image: casagrandMallImages[0] || "",
    gallery: casagrandMallImages,
  },
  {
    num: "04",
    title: "Kidzzathon - Hyderabad",
    partner: "Global Pinnacle Foundation",
    service: "Event Curation, Brand Partnerships & On-Ground Execution",
    date: "September 2026",
    location: "Gymkhana Grounds, Secunderabad",
    description:
      "Curated a family-focused fitness experience in collaboration with Global Pinnacle Foundation, securing and executing experiential activations for Casagrand, Orchids International School, Aretto and Akshayakalpa, connecting brands with over 1,000 children and family attendees.",
    highlights:
      "1,000+ Children & Family Attendees || 4 Brand Activations || 1 Family-Focused Fitness Experience",
    image: kidzzathonImages[11] || kidzzathonImages[0] || "",
    gallery: kidzzathonImages,
  },
  {
    num: "05",
    title: "Casagrand - Community & RWA Activations",
    partner: "Gems Kids Fest & Casagrand",
    service: "Brand Activation & Partnership Curation",
    date: "December 2025 & February 2026",
    location: "Hyderabad & Chennai",
    description:
      "Curated Casagrand's brand presence across family-focused community events in Hyderabad and Chennai, creating direct engagement opportunities with residential audiences through experiential activations.",
    highlights: "6,000+ Families - Hyderabad || 3,500+ Families - Chennai",
    image: casagrandCommunityImages[6] || casagrandCommunityImages[0] || "",
    gallery: casagrandCommunityImages,
  },
  {
    num: "06",
    title: "Meru International School - Carnival Activation",
    partner: "Meru International School · Pavani Infra & Aretto",
    service: "Experiential Brand Partnerships & Activation Curation",
    date: "September 2026",
    location: "Miyapur, Hyderabad",
    description:
      "Curated experiential brand activations at the Meru International School Carnival, bringing together Pavani Infra, Aretto and other participating brands for meaningful family engagement. A key highlight was Pavani Infra's eco-friendly Seed Ganesha initiative, distributing over 2,000 idols to participating families and combining festive celebrations with environmental awareness and brand visibility.",
    highlights: "2,000+ Seed Ganesha Idols Distributed || 10+ Brand Activation Partners",
    image: meruImages[4] || meruImages[0] || "",
    gallery: meruImages,
  },
];

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
  formattedPhone: "+91 86880 75841",
  email: "hello@planbee.co",
  address: "Hyderabad, India",
  instagram: "https://www.instagram.com/planbee_curations",
  linkedin: "https://www.linkedin.com/company/planbee-events",
};
