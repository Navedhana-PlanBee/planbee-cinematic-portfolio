import { expertise } from "@/data/planbee";
import { CoverFlowCarousel, type CarouselItem } from "@/components/ui/coverflow-carousel";

const tags = [
  "#BrandPartnerships",
  "#ExperientialMarketing",
  "#BrandActivations",
  "#EntertainmentIPs",
  "#DigitalMarketing",
  "#TalentCollaborations",
];

const titleLines: [string, string?][] = [
  ["BRAND PARTNERSHIPS", "& SPONSORSHIPS"],
  ["EXPERIENTIAL &", "EVENT MARKETING"],
  ["ATL, BTL &", "BRAND ACTIVATIONS"],
  ["ENTERTAINMENT &", "IP PARTNERSHIPS"],
  ["DIGITAL, SOCIAL &", "INFLUENCER MARKETING"],
  ["ARTIST & TALENT", "COLLABORATIONS"],
];

const items: CarouselItem[] = expertise.map((e, i) => {
  const [titleLine1, titleLine2] = titleLines[i]!;
  const item: CarouselItem = {
    tag: tags[i]!,
    titleLine1,
    desc: e.desc,
    img: e.image,
    ctaText: "Learn More",
    ctaUrl: "#services",
  };
  return titleLine2 ? { ...item, titleLine2 } : item;
});

export function Expertise() {
  return (
    <div id="expertise">
      <CoverFlowCarousel items={items} sectionLabel="What We Do" autoplay autoplayDelay={2800} />
    </div>
  );
}
