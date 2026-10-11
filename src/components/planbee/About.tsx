import { MaskLine, Reveal } from "./Reveal";
import { Stats } from "./Stats";

export function About() {
  return (
    <section id="about" className="section-pad grain relative">
      <div className="shell">
        <p className="eyebrow">ABOUT PLANBEE</p>
        <h2 className="display-lg mt-4 max-w-[24ch] text-bone">
          <MaskLine>Ideas become experiences.</MaskLine>
          <MaskLine delay={0.12} className="text-muted-foreground">
            Experiences create impact.
          </MaskLine>
        </h2>

        <div className="mt-12 md:mt-16 border-t border-border pt-10 md:pt-16">
          <Reveal>
            <p className="eyebrow">WHO WE ARE</p>
            <h3 className="font-display text-2xl sm:text-3xl font-normal mt-2 text-bone">
              The Partnership & Experience Collective
            </h3>
          </Reveal>

          <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-12 lg:mt-12 lg:gap-16">
            <div className="md:col-span-2">
              <Reveal delay={0.1}>
                <p className="text-xl leading-relaxed text-bone/90 sm:text-2xl lg:w-5/6 lg:text-[1.75rem] lg:leading-[1.4]">
                  PlanBee is a brand partnerships and experiential marketing company that connects
                  brands with audiences through meaningful experiences, strategic collaborations,
                  and entertainment-led opportunities.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.18}>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                Founded in 2024, we work across brand partnerships, experiential marketing, events,
                ATL & BTL activations, entertainment collaborations, and digital campaigns -
                bringing strategy, creativity and execution together under one roof.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                From connecting brands with the right IP’s and audiences to curating campaigns and
                executing them on the ground, we build partnerships and experiences designed to
                create visibility, engagement and measurable impact.
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
