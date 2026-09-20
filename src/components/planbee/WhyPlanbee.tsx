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
      className="flex flex-col border-t border-peach/20 pt-8 lg:pt-10"
    >
      {children}
    </motion.div>
  );
}

export function WhyPlanbee() {
  return (
    <section className="section-pad grain relative bg-navy">
      <div className="grain-overlay" />
      <div className="shell relative">
        <p className="text-[0.7rem] uppercase tracking-[0.3em] text-peach/90 lg:tracking-[0.38em]">
          WHY PLANBEE
        </p>
        <h2 className="display-lg mt-6 text-background">
          <MaskLine>Why Brands Choose PlanBee</MaskLine>
        </h2>

        <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:mt-24 lg:gap-x-16 lg:gap-y-20">
          {whyPlanbee.map((w, i) => (
            <WhyCard key={w.num} index={i}>
              <span className="font-display text-[clamp(2.5rem,5vw,3.5rem)] leading-none text-peach/40">
                {w.num}
              </span>
              <h3 className="mt-6 font-display text-[clamp(1.5rem,2.5vw,2rem)] leading-tight text-peach">
                {w.title}
              </h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-background/90 sm:text-base">
                {w.desc}
              </p>
            </WhyCard>
          ))}
        </div>
      </div>
    </section>
  );
}
