import { MaskLine, Reveal } from "./Reveal";
import { Stats } from "./Stats";

export function About() {
  return (
    <section id="about" className="section-pad grain relative">
      <div className="shell">
        <h2 className="display-lg max-w-[24ch] text-bone">
          <MaskLine>Ideas become experiences.</MaskLine>
          <MaskLine delay={0.12} className="text-muted-foreground">
            Experiences become memories.
          </MaskLine>
        </h2>

        <div className="mt-20 grid gap-12 border-t border-border pt-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Reveal>
              <p className="eyebrow">Who We Are</p>
              <p className="display-md mt-6 text-bone">About PlanBee</p>
            </Reveal>
          </div>
          <div className="space-y-7 md:col-span-7 md:col-start-6">
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-bone/90 sm:text-xl">
                PlanBee is a premier event curation and marketing agency, dedicated to turning ideas
                into extraordinary experiences.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                Founded in 2024, our passionate team of curators and marketers delivers bespoke
                branding events and impactful marketing campaigns tailored to every client's unique
                needs.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                From social gatherings, PR events and product launches to nightlife events, music
                concerts and large-scale festivals — we execute every detail with precision,
                creativity and measurable results.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-24">
          <Stats />
        </div>
      </div>
    </section>
  );
}
