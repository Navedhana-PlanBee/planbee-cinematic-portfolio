import { expertise } from "@/data/planbee";
import { CoverFlowCarousel, type CarouselItem } from "@/components/ui/coverflow-carousel";

const tags = [
  "#EventCuration",
  "#Marketing",
  "#Activation",
  "#DigitalMarketing",
  "#SocialMedia",
  "#TalentManagement",
];

const titleLines: [string, string?][] = [
  ["EVENT CURATION", "& BRANDING"],
  ["MARKETING", "& PROMOTIONS"],
  ["ATL, BTL &", "MALL ACTIVATION"],
  ["DIGITAL MARKETING"],
  ["SOCIAL MEDIA", "& CONTENT"],
  ["ARTIST &", "TALENT MANAGEMENT"],
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
      <h2 className="sr-only">What We Do</h2>
      <CoverFlowCarousel items={items} sectionLabel="What We Do" autoplay autoplayDelay={2800} />
    </div>
  );
}
