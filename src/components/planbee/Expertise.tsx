import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { expertise } from "@/data/planbee";
import { MaskLine } from "./Reveal";

export function Expertise() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="expertise" className="section-pad relative border-t border-border">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="display-lg text-bone">
            <MaskLine>What We Do</MaskLine>
          </h2>
          <p className="eyebrow">Our Expertise</p>
        </div>

        <div className="relative mt-16">
          {/* hover image */}
          <AnimatePresence>
            {active !== null && (
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-none absolute right-0 top-0 hidden h-full w-[38%] lg:block"
              >
                <img
                  src={expertise[active]!.image}
                  alt={expertise[active]!.title}
                  loading="lazy"
                  className="sticky top-32 h-[22rem] w-full object-cover opacity-60"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <ul className="relative">
            {expertise.map((e, i) => (
              <motion.li
                key={e.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.9, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className="group border-t border-border last:border-b"
              >
                <div className="flex items-start gap-6 py-8 transition-all duration-700 group-hover:pl-4 sm:gap-12 sm:py-10">
                  <span className="mt-2 text-[0.65rem] tracking-[0.3em] text-muted-foreground transition-colors duration-500 group-hover:text-champagne">
                    {e.num}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-[clamp(1.6rem,3.4vw,2.9rem)] leading-tight text-bone/80 transition-colors duration-500 group-hover:text-bone">
                      {e.title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground lg:max-w-sm">
                      {e.desc}
                    </p>
                  </div>
                  <span className="mt-3 translate-x-[-6px] text-champagne opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                    →
                  </span>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
