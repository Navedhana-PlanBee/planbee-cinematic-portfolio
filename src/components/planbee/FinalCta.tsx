import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import ctaImage from "@/assets/work-1.jpg";
import { MaskLine } from "./Reveal";

export function FinalCta() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative flex min-h-[85svh] items-center overflow-hidden">
      <motion.img
        style={{ y }}
        src={ctaImage}
        alt="Festival stage lighting over a crowd"
        loading="lazy"
        className="absolute inset-0 h-[118%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-navy/80" />
      <div className="grain-overlay" />

      <div className="shell relative py-24 sm:py-32 text-center">
        <p className="mx-auto max-w-md font-display text-xl sm:text-2xl italic text-champagne/90">
          Ideas are only the beginning.
        </p>
        <h2 className="display-lg mx-auto mt-4 max-w-[20ch] text-ink-inverse">
          <MaskLine>Let's create something</MaskLine>
          <MaskLine delay={0.12}>people remember.</MaskLine>
        </h2>
        <div className="mt-14">
          <a
            href="#contact"
            className="group inline-flex items-center gap-4 border border-champagne bg-champagne px-10 py-5 text-xs font-semibold uppercase tracking-[0.22em] text-background transition-colors duration-500 hover:bg-transparent hover:text-champagne"
          >
            START A CONVERSATION
            <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
