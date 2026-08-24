import { motion } from "motion/react";
import { whyPlanbee } from "@/data/planbee";
import { MaskLine } from "./Reveal";

export function WhyPlanbee() {
  return (
    <section className="section-pad grain relative border-t border-border bg-charcoal">
      <div className="grain-overlay" />
      <div className="shell relative">
        <p className="eyebrow">Why PlanBee</p>
        <h2 className="display-lg mt-6 text-bone">
          <MaskLine>Why PlanBee</MaskLine>
        </h2>

        <div className="mt-20">
          {whyPlanbee.map((w, i) => (
            <motion.div
              key={w.num}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 1.1, delay: i * 0.14, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-6 border-t border-border py-10 md:grid-cols-12 md:py-14"
            >
              <span className="font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-none text-champagne/40 md:col-span-2">
                {w.num}
              </span>
              <h3 className="font-display text-[clamp(1.7rem,3.4vw,2.8rem)] leading-tight text-bone md:col-span-5">
                {w.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground md:col-span-5">
                {w.desc}
              </p>
            </motion.div>
          ))}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
}
