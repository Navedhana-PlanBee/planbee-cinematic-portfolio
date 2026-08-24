import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { services } from "@/data/planbee";
import { MaskLine, Reveal } from "./Reveal";

function ServiceBlock({ s, index }: { s: (typeof services)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div ref={ref} className="border-t border-border">
      <div className="shell grid gap-10 py-20 md:grid-cols-12 md:gap-14 lg:py-28">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <p className="eyebrow">Our Services ({s.id} / 04)</p>
            <h3 className="display-md mt-6 max-w-[18ch] text-bone">
              <MaskLine>{s.title}</MaskLine>
            </h3>
            <div className="relative mt-10 h-64 overflow-hidden sm:h-80">
              <motion.img
                style={{ y }}
                src={s.image}
                alt={s.title}
                loading="lazy"
                className="h-[115%] w-full object-cover"
              />
              <div className="absolute inset-0 bg-background/25" />
              <div className="grain-overlay" />
            </div>
          </div>
        </div>

        <div className="grid gap-10 md:col-span-6 md:col-start-7 sm:grid-cols-2">
          {s.groups.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 0.08}>
              <div className="border-t border-border pt-6">
                <h4 className="text-[0.68rem] uppercase tracking-[0.28em] text-champagne">
                  {g.title}
                </h4>
                <ul className="mt-5 space-y-3">
                  {g.items.map((it) => (
                    <li
                      key={it}
                      className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-[0.55rem] h-px w-3 flex-none bg-border" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <span className="sr-only">Service {index + 1}</span>
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="relative">
      {services.map((s, i) => (
        <ServiceBlock key={s.id} s={s} index={i} />
      ))}
    </section>
  );
}
