import { motion } from "motion/react";
import { useRef } from "react";
import { whyPlanbee } from "@/data/planbee";
import { MaskLine, useRevealed } from "./Reveal";

function WhyRow({ index, children }: { index: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const revealed = useRevealed(ref, 70);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 1.1, delay: index * 0.14, ease: [0.16, 1, 0.3, 1] }}
      className="grid gap-6 border-t border-bone/15 py-10 md:grid-cols-12 md:py-14"
    >
      {children}
    </motion.div>
  );
}

export function WhyPlanbee() {
  return (
    <section className="section-pad grain relative border-t border-border bg-charcoal">
      <div className="grain-overlay" />
      <div className="shell relative">
        {/* Terracotta is a light-mid, warm-saturated color — unlike the navy bands, it reads
            best with dark ink text, not the light ink-inverse tokens used elsewhere. */}
        <p className="text-[0.7rem] uppercase tracking-[0.3em] text-bone/85 lg:tracking-[0.38em]">
          Why PlanBee
        </p>
        <h2 className="display-lg mt-6 text-bone">
          <MaskLine>Why PlanBee</MaskLine>
        </h2>

        <div className="mt-20">
          {whyPlanbee.map((w, i) => (
            <WhyRow key={w.num} index={i}>
              <span className="font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-none text-bone/40 md:col-span-2">
                {w.num}
              </span>
              <h3 className="font-display text-[clamp(1.7rem,3.4vw,2.8rem)] leading-tight text-bone md:col-span-5">
                {w.title}
              </h3>
              <p className="text-sm leading-relaxed text-bone/85 md:col-span-5">{w.desc}</p>
            </WhyRow>
          ))}
          <div className="border-t border-bone/15" />
        </div>
      </div>
    </section>
  );
}
