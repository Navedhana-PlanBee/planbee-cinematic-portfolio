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
    title: "Event Curation & Branding",
    desc: "End-to-end design, décor and on-ground execution for branding events.",
    image: eventBranding,
  },
  {
    num: "02",
    title: "Marketing & Promotions",
    desc: "Movie promotions, influencer collaborations and social campaigns.",
    image: work1,
  },
  {
    num: "03",
    title: "ATL, BTL & Mall Activation",
    desc: "Mass-reach campaigns to hyper-local, on-ground brand engagement.",
    image: activation,
  },
  {
    num: "04",
    title: "Digital Marketing",
    desc: "Websites, SEO, and paid ads that drive performance and growth.",
    image: digital,
  },
  {
    num: "05",
    title: "Social Media & Content",
    desc: "Content strategy, reels, video production and influencer marketing.",
    image: work2,
  },
  {
    num: "06",
    title: "Artist & Talent Management",
    desc: "Networking, appearances and career management for talent.",
    image: talent,
  },
];

export const services = [
  {
    id: "01",
    title: "Event Curation, Branding & Corporate Events",
    image: eventBranding,
    groups: [
      {
        title: "Branding Events",
        items: [
          "Product launches & promotional campaigns",
          "Themed event branding for brand positioning",
          "Custom-designed signage & décor",
          "Pre- and post-event marketing support",
        ],
      },
      {
        title: "Event Support & Execution",
        items: [
          "Event curation",
          "Lead generation & experiential marketing",
          "Food court curation",
          "Seamless on-ground execution",
          "Skilled staffing support",
          "Production, sound & lighting solutions",
        ],
      },
      {
        title: "Corporate Events",
        items: [
          "Team outings",
          "Lunches",
          "Meetings",
          "Conferences",
          "Exclusive venue partnerships",
          "Curated gourmet catering",
          "Custom gift hampers on request",
        ],
      },
    ],
  },
  {
    id: "02",
    title: "Marketing, Promotions & Activation",
    image: activation,
    groups: [
      {
        title: "Movie Promotions",
        items: [
          "Custom promotional event concepts",
          "Audience engagement activities",
          "Influencer collaborations",
          "Tailored social media campaigns",
        ],
      },
      {
        title: "Influencer & Digital Marketing",
        items: [
          "Strategic influencer partnerships",
          "Targeted social media campaigns & SMM",
          "Digital & outdoor media placements",
          "Complete branding, concept to delivery",
        ],
      },
      {
        title: "ATL & BTL",
        items: [
          "Outdoor hoardings & OOH",
          "Cinema ads & sponsorships",
          "In-store sampling drives",
          "Direct engagement campaigns",
        ],
      },
      {
        title: "Mall Activations",
        items: [
          "Branded mall kiosks",
          "Live product demos",
          "Weekend activation carnivals",
          "Retail partnership tie-ups",
        ],
      },
    ],
  },
  {
    id: "03",
    title: "Digital Marketing & Social Media",
    image: digital,
    groups: [
      {
        title: "Websites & Performance Marketing",
        items: [
          "Custom single-page sites",
          "Interactive restaurant menu websites",
          "Fully functional e-commerce stores",
          "SEO optimization",
          "Google & Meta Ads campaign management",
        ],
      },
      {
        title: "Social Media & Content",
        items: [
          "Social media management",
          "10 reels + 10 posts/month",
          "WhatsApp marketing campaigns",
          "Video production, script to post",
          "Influencer marketing",
        ],
      },
    ],
  },
  {
    id: "04",
    title: "Artist & Talent Management",
    image: talent,
    groups: [
      {
        title: "Talent Services",
        items: [
          "Talent networking & opportunity creation",
          "Event & appearance coordination",
          "Social media management for talent",
          "Financial advisory & management",
          "Legal support & advisory services",
        ],
      },
    ],
  },
];

export type ClientCategory = {
  num: string;
  title: string;
  layout: "marquee" | "two-column" | "editorial" | "final";
  groups: { title?: string; names: string[] }[];
};

export const clientCategories: ClientCategory[] = [
  {
    num: "01",
    title: "Live Events, Concerts & Entertainment",
    layout: "marquee",
    groups: [
      {
        names: [
          "ACTC Events",
          "EVA Live",
          "Raasta",
          "Fever Live",
          "TribeVibe Entertainments",
          "Sunburn Festival",
          "BookMyShow Live",
          "Skyhylive",
          "Serrano Entertainments",
          "Prism Outdoors",
          "Band Raag",
          "Trendsetters.Live",
          "Freshathon",
        ],
      },
    ],
  },
  {
    num: "02",
    title: "Real Estate & Property · Media, Music & Communications",
    layout: "two-column",
    groups: [
      {
        title: "Real Estate & Property",
        names: [
          "Aaditri Group",
          "Jupiter Properties",
          "Rangu Realty",
          "Speed Housing LLP",
          "Casagrand",
          "Tridasa",
        ],
      },
      {
        title: "Media, Music & Communications",
        names: [
          "SAREGAMA",
          "Hyderabad Talkies",
          "Rudraksha Communications",
          "Hyperlink Brand Sol.",
          "Cardex Group",
          "Brand Avatar",
        ],
      },
    ],
  },
  {
    num: "03",
    title: "Government & Tourism · Education · Malls · Healthcare · F&B, Wellness & Lifestyle",
    layout: "editorial",
    groups: [
      { title: "Government & Tourism", names: ["Telangana Tourism", "Rashtrapati Nilayam"] },
      { title: "Education & Institutions", names: ["IIT Hyderabad", "BITS Hyderabad"] },
      { title: "Mall", names: ["Nexus"] },
      {
        title: "Healthcare",
        names: ["Medicover Hospitals", "Yashoda Hospitals", "Sindhu Hospitals"],
      },
      {
        title: "F&B, Wellness & Lifestyle",
        names: ["Coffee Katha", "Krisara Clinics", "Daisy Dale Farm Park", "Gettodelivers"],
      },
    ],
  },
  {
    num: "04",
    title: "Restaurants, Cloud Kitchens & Nightlife · Quick Service & Bakery",
    layout: "final",
    groups: [
      {
        title: "Restaurants, Cloud Kitchens & Nightlife",
        names: ["Shoyu", "Scuzi", "Rebel Foods", "A19 Club and Kitchen", "Sera Eats", "Boba Bhai"],
      },
      {
        title: "Quick Service & Bakery",
        names: ["Coca-Cola", "Popeyes", "Domino's", "Taco Bell", "Wendy's", "Brown Bear Bakers"],
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
const img = (i: number) => images[i % images.length];

export const caseStudies: CaseStudy[] = [
  {
    num: "01",
    title: "Karthik Live",
    partner: "Prism Outdoors",
    service: "Food curation",
    date: "November 9 & December 31, 2024",
    description: "Food curation for Karthik Live by Prism Outdoors.",
    image: img(1),
  },
  {
    num: "02",
    title: "Sid Sriram Live in Hyderabad",
    partner: "Move 78",
    service: "F&B curation",
    date: "February 15, 2025",
    location: "Hyderabad",
    description: "F&B curation for Sid Sriram Live in Hyderabad by Move 78.",
    image: img(0),
  },
  {
    num: "03",
    title: "DSP Live in Hyderabad",
    partner: "ACTC",
    service: "F&B and Supporting Partner",
    date: "October 18, 2024",
    location: "Hyderabad",
    description: "F&B and Supporting Partner for DSP Live in Hyderabad by ACTC.",
    image: img(2),
  },
  {
    num: "04",
    title: "Chitramrutam 2.0",
    partner: "M3 Entertainments",
    service: "F&B curation",
    date: "June 14, 2025",
    description: "F&B curation for Chitramrutam 2.0 by M3 Entertainments.",
    image: img(3),
  },
  {
    num: "05",
    title: "Sonu Nigam Live in Hyderabad",
    partner: "Fever Live",
    service: "F&B + Liquor curation",
    date: "February 8, 2025",
    location: "Hyderabad",
    description: "F&B + Liquor curation for Sonu Nigam Live in Hyderabad by Fever Live.",
    image: img(2),
  },
  {
    num: "06",
    title: "Armaan Malik Live",
    partner: "Serrano Entertainment",
    service: "F&B curation",
    date: "May 24, 2024",
    description: "F&B curation for Armaan Malik Live by Serrano Entertainment.",
    image: img(1),
  },
  {
    num: "07",
    title: "Adnan Sami Show",
    service: "Collaboration Partner",
    date: "September 27, 2025",
    description: "Collaboration Partner for the Adnan Sami Show.",
    image: img(0),
  },
  {
    num: "08",
    title: "Udyan Utsav",
    partner: "TG Tourism & Rashtrapati Bhavan",
    service: "F&B curation",
    date: "January 2–13, 2025",
    description: "F&B curation for Udyan Utsav, conducted by TG Tourism & Rashtrapati Bhavan.",
    image: img(3),
  },
  {
    num: "09",
    title: "DSP Live in Vizag",
    service: "F&B curation",
    date: "April 19, 2025",
    location: "Vizag",
    description: "F&B curation for DSP Live in Vizag.",
    image: img(0),
  },
  {
    num: "10",
    title: "Satinder Sartaj Live in Bengaluru",
    service: "F&B + Liquor curator",
    date: "September 20, 2025",
    location: "Bengaluru",
    description: "F&B + Liquor curator for Satinder Sartaj Live in Bengaluru.",
    image: img(2),
  },
  {
    num: "11",
    title: "A.R. Rahman Live in Hyderabad",
    service: "F&B curator",
    date: "November 8, 2025",
    location: "Hyderabad",
    description: "F&B curator for A.R. Rahman Live in Hyderabad.",
    image: img(1),
  },
  {
    num: "12",
    title: "Arijit Singh Live in Hyderabad",
    service: "F&B curation",
    date: "December 7, 2024",
    location: "Hyderabad",
    description: "F&B curation for Arijit Singh Live in Hyderabad.",
    image: img(0),
  },
  {
    num: "13",
    title: "Dil-Luminati Tour 2024",
    partner: "Saregama",
    service: "F&B curation",
    date: "2024",
    location: "Hyderabad, Pune & Mumbai",
    description:
      "Worked with the Saregama team on F&B curation for the Hyderabad, Pune & Mumbai shows.",
    image: img(1),
  },
  {
    num: "14",
    title: "Ed Sheeran · Anuv Jain · Pratik Kuhad Shows",
    partner: "BookMyShow Live",
    service: "F&B curation",
    date: "2024",
    location: "Hyderabad",
    description: "Worked with BMS Live teams for the Hyderabad shows.",
    image: img(0),
  },
  {
    num: "15",
    title: "Bryan Adams Live in Hyderabad",
    service: "F&B curation",
    date: "December 16, 2025",
    location: "Hyderabad",
    description: "F&B curation for the Bryan Adams show in Hyderabad.",
    image: img(2),
  },
  {
    num: "16",
    title: "Karthik South Tour",
    partner: "TribeVibe",
    service: "F&B curation",
    date: "November 30 & December 7, 2025",
    location: "11 cities · Warangal & Vizag completed",
    description:
      "Worked with the TV team across 11 cities. Warangal & Vizag completed on November 30 & December 7, 2025.",
    image: img(3),
  },
  {
    num: "17",
    title: "Alan Walker Live in Hyderabad",
    service: "F&B curation",
    date: "April 19, 2025",
    location: "Hyderabad",
    description: "F&B curation for the Alan Walker Hyderabad show.",
    image: img(0),
  },
  {
    num: "18",
    title: "Armaan Malik Live",
    partner: "Cardex",
    service: "F&B curation",
    date: "October 11, 2025",
    description: "Worked with the Cardex team on F&B curation for the Armaan Malik show.",
    image: img(1),
  },
];

export const whyPlanbee = [
  {
    num: "01",
    title: "Proven Track Record",
    desc: "Proven track record across real estate, lifestyle and entertainment brands.",
  },
  { num: "02", title: "Strong Network", desc: "Strong influencer and media network." },
  { num: "03", title: "Creative + Data Driven", desc: "Creative, data-driven marketing strategies." },
  {
    num: "04",
    title: "End-to-End Execution",
    desc: "Complete event and campaign execution — from concept to delivery.",
  },
];

export const contact = {
  phone: "8688075841",
  email: "planbee.ragroup@gmail.com",
  address: "Narsingi, Hyderabad",
};
