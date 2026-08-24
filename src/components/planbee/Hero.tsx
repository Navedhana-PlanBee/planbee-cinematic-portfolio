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
    <section id="top" ref={ref} className="relative h-[100svh] min-h-[560px] overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={heroImage}
          alt="Crowd at a live music event curated by PlanBee"
          width={1920}
          height={1200}
          className="h-full w-full object-cover"
        />
        {/* Original all-dark hero treatment: a true neutral near-black overlay, kept
            independent of the site's navy band color so this section stays distinct. */}
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.14_0.004_60)]/85 via-[oklch(0.14_0.004_60)]/50 to-[oklch(0.14_0.004_60)]" />
        <div className="grain-overlay" />
      </motion.div>

      {/* Centred stack. pt clears the fixed navbar; min-h-0 + overflow-y-auto means a very
          short viewport scrolls the content instead of letting it collide with the navbar. */}
      <motion.div
        style={{ opacity: fade }}
        className="shell relative flex h-full min-h-0 flex-col items-center justify-center gap-6 overflow-y-auto pb-14 pt-24 text-center sm:gap-7 sm:pt-28"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease }}
          className="eyebrow text-muted-inverse"
        >
          Events · Marketing · Talent Management
        </motion.p>

        <h1 className="font-display font-light leading-[0.98] tracking-[-0.02em] text-[clamp(2rem,7vw,8.5rem)] text-ink-inverse">
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
          className="flex flex-col items-center gap-6"
        >
          <p className="max-w-sm text-sm leading-relaxed text-muted-inverse">
            Planning memorable events with style and precision.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="#work"
              className="group inline-flex items-center gap-3 bg-ink-inverse px-7 py-4 text-[0.68rem] uppercase tracking-[0.3em] text-bone transition-colors duration-500 hover:bg-champagne hover:text-ink-inverse sm:px-8"
            >
              Explore Our Work
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center border border-ink-inverse/25 px-7 py-4 text-[0.68rem] uppercase tracking-[0.3em] text-ink-inverse transition-colors duration-500 hover:border-champagne hover:text-champagne sm:px-8"
            >
              Let's Create
            </a>
          </div>

          <p className="text-[0.7rem] uppercase tracking-[0.35em] text-muted-inverse lg:text-[0.65rem]">
            Hyderabad · Pan-India
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
