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
import { services, expertise } from "@/data/planbee";
import { ServiceCarousel, type Service } from "@/components/ui/services-card";

const capabilityTags = [
  "#BrandPartnerships",
  "#ExperientialMarketing",
  "#BrandActivations",
  "#EntertainmentIPs",
  "#DigitalMarketing",
  "#TalentCollaborations",
];

const iconAndAccent: Record<string, { icon: Service["icon"]; accent: Service["accent"] }> = {
  Partnerships: { icon: Briefcase, accent: "champagne" },
  Experiences: { icon: Sparkles, accent: "charcoal" },
  Activations: { icon: Target, accent: "peach" },
  Entertainment: { icon: Clapperboard, accent: "ink" },
  Digital: { icon: Globe, accent: "champagne" },
  Talent: { icon: Star, accent: "charcoal" },
};

const cards: Service[] = services
  .flatMap((category) =>
    category.groups.map((group) => ({
      category: category.title,
      title: group.title,
      items: group.items,
    })),
  )
  .map((flatItem, index) => {
    const { icon, accent } = iconAndAccent[flatItem.title]!;
    const expert = expertise[index];
    return {
      ...flatItem,
      number: String(index + 1).padStart(2, "0"),
      desc: expert?.desc || "",
      tag: capabilityTags[index] || "#Capabilities",
      icon,
      accent,
    };
  });

const header = (
  <div className="px-5 sm:px-10 lg:px-20">
    <p className="eyebrow text-muted-inverse">OUR CAPABILITIES</p>
    <div className="mt-3 flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h2 className="display-lg text-ink-inverse">Our Capabilities</h2>
        <p className="mt-2 text-ink-inverse/80 text-sm sm:text-base max-w-xl">
          One ecosystem. Multiple ways to build brands, audiences, and experiences.
        </p>
      </div>
      <p className="eyebrow text-muted-inverse hidden sm:block pb-1">Keep scrolling →</p>
    </div>
  </div>
);

export function Services() {
  return (
    <section id="services" className="relative bg-espresso">
      <ServiceCarousel services={cards} header={header} />
    </section>
  );
}
