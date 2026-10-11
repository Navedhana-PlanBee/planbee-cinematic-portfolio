import { motion } from "motion/react";
import { useRef } from "react";
import { whyPlanbee } from "@/data/planbee";
import { MaskLine, useRevealed } from "./Reveal";

function WhyCard({ index, children }: { index: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const revealed = useRevealed(ref, 70);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 1.1, delay: index * 0.14, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col border-t border-border pt-8 lg:pt-10"
    >
      {children}
    </motion.div>
  );
}

export function WhyPlanbee() {
  return (
    <section className="section-pad border-t border-border bg-background relative">
      <div className="shell relative">
        <p className="eyebrow">WHY PLANBEE</p>
        <h2 className="display-lg mt-4 text-bone">
          <MaskLine>Why Brands Choose PlanBee</MaskLine>
        </h2>

        <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:mt-24 lg:gap-x-16 lg:gap-y-20">
          {whyPlanbee.map((w, i) => (
            <WhyCard key={w.num} index={i}>
              <span className="font-display text-[clamp(2.5rem,4.5vw,3.6rem)] font-light leading-none text-champagne/40">
                {w.num}
              </span>
              <h3 className="mt-6 font-display text-[clamp(1.5rem,2.2vw,2rem)] font-normal leading-snug text-bone">
                {w.title}
              </h3>
              <p className="mt-4 max-w-sm text-base leading-relaxed text-muted-foreground">{w.desc}</p>
            </WhyCard>
          ))}
        </div>
      </div>
    </section>
  );
}
