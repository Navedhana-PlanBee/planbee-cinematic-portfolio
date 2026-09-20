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

const iconAndAccent: Record<string, { icon: Service["icon"]; accent: Service["accent"] }> = {
  "Partnerships": { icon: Briefcase, accent: "champagne" },
  "Experiences": { icon: Sparkles, accent: "charcoal" },
  "Activations": { icon: Target, accent: "peach" },
  "Entertainment": { icon: Clapperboard, accent: "ink" },
  "Digital": { icon: Globe, accent: "champagne" },
  "Talent": { icon: Star, accent: "charcoal" },
};

const cards: Service[] = services
  .flatMap((category) =>
    category.groups.map((group) => ({
      category: category.title,
      title: group.title,
      items: group.items,
    }))
  )
  .map((flatItem, index) => {
    const { icon, accent } = iconAndAccent[flatItem.title]!;
    return {
      ...flatItem,
      number: String(index + 1).padStart(2, "0"),
      icon,
      accent,
    };
  });

const header = (
  <div className="px-5 sm:px-10 lg:px-20">
    <div className="flex flex-wrap items-end justify-between gap-4">
      <h2 className="display-lg text-ink-inverse">Our Capabilities</h2>
      <p className="eyebrow text-muted-inverse">Keep scrolling →</p>
    </div>
    <p className="mt-6 text-ink-inverse/80 text-lg sm:text-xl max-w-xl">
      One ecosystem. Multiple ways to build brands, audiences, and experiences.
    </p>
  </div>
);

export function Services() {
  return (
    <section id="services" className="relative bg-espresso">
      <ServiceCarousel services={cards} header={header} />
    </section>
  );
}
