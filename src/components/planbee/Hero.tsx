import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import heroImage from "@/assets/hero-concert.jpg";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative h-[100svh] min-h-[600px] overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={heroImage}
          alt="Crowd at a live music event curated by PlanBee"
          width={1920}
          height={1200}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
        <div className="grain-overlay" />
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="shell relative flex h-full flex-col justify-end pb-16 sm:pb-20"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease }}
          className="eyebrow text-bone/70"
        >
          Events · Marketing · Talent Management
        </motion.p>

        <h1 className="display-xl mt-8 max-w-[16ch] text-bone">
          {["Transforming Events", "Into Unforgettable", "Experiences"].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.3, delay: 0.45 + i * 0.14, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.05, ease }}
          className="mt-10 flex flex-col gap-8 border-t border-border pt-8 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Planning memorable events with style and precision.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="group inline-flex items-center gap-3 bg-bone px-8 py-4 text-[0.68rem] uppercase tracking-[0.3em] text-background transition-colors duration-500 hover:bg-champagne"
            >
              Explore Our Work
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center border border-border px-8 py-4 text-[0.68rem] uppercase tracking-[0.3em] text-bone transition-colors duration-500 hover:border-champagne hover:text-champagne"
            >
              Let's Create
            </a>
          </div>
          <p className="text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground">
            Hyderabad · Pan-India
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
