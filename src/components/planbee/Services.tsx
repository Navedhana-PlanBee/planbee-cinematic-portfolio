import {
  Sparkles,
  ClipboardList,
  Briefcase,
  Clapperboard,
  Share2,
  Target,
  Store,
  Globe,
  Smartphone,
  Star,
} from "lucide-react";
import { services } from "@/data/planbee";
import { ServiceCarousel, type Service } from "@/components/ui/services-card";

// One card per service group (10 total) so every group and every item from
// the source data shows up — nothing gets summarized away.
const iconAndAccent: Record<string, { icon: Service["icon"]; accent: Service["accent"] }> = {
  "Branding Events": { icon: Sparkles, accent: "champagne" },
  "Event Support & Execution": { icon: ClipboardList, accent: "charcoal" },
  "Corporate Events": { icon: Briefcase, accent: "peach" },
  "Movie Promotions": { icon: Clapperboard, accent: "ink" },
  "Influencer & Digital Marketing": { icon: Share2, accent: "champagne" },
  "ATL & BTL": { icon: Target, accent: "charcoal" },
  "Mall Activations": { icon: Store, accent: "peach" },
  "Websites & Performance Marketing": { icon: Globe, accent: "ink" },
  "Social Media & Content": { icon: Smartphone, accent: "champagne" },
  "Talent Services": { icon: Star, accent: "charcoal" },
};

const cards: Service[] = services.flatMap((category, ci) =>
  category.groups.map((group, gi) => {
    const { icon, accent } = iconAndAccent[group.title]!;
    return {
      number: String(ci * 10 + gi + 1).padStart(2, "0"),
      category: category.title,
      title: group.title,
      items: group.items,
      icon,
      accent,
    };
  }),
);

const header = (
  <div className="px-5 sm:px-10 lg:px-20">
    <div className="flex flex-wrap items-end justify-between gap-4">
      <h2 className="display-lg text-ink-inverse">Our Services</h2>
      <p className="eyebrow text-muted-inverse">Keep scrolling →</p>
    </div>
  </div>
);

export function Services() {
  return (
    <section id="services" className="relative bg-navy">
      <ServiceCarousel services={cards} header={header} />
    </section>
  );
}
