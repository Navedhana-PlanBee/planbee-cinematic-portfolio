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

      <div className="shell relative py-24 text-center">
        <p className="eyebrow text-muted-inverse">LET'S CREATE</p>
        <h2 className="display-md mx-auto mt-8 max-w-[22ch] text-ink-inverse/80">
          <MaskLine>Ideas are only the beginning.</MaskLine>
        </h2>
        <p className="display-xl mx-auto mt-6 max-w-[18ch] text-ink-inverse">
          <MaskLine delay={0.12}>Let's create something</MaskLine>
          <MaskLine delay={0.24}>people remember.</MaskLine>
        </p>
        <div className="mt-14">
          <a
            href="#contact"
            className="group inline-flex items-center gap-4 border border-champagne bg-champagne px-10 py-5 text-[0.68rem] uppercase tracking-[0.3em] text-background transition-colors duration-500 hover:bg-transparent hover:text-champagne"
          >
            START A CONVERSATION
            <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
