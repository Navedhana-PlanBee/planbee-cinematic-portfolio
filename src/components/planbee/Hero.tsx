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
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden flex flex-col justify-center"
    >
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
      </motion.div>

      {/* Centred stack. pt clears the fixed navbar */}
      <motion.div
        style={{ opacity: fade }}
        className="shell relative flex min-h-[100svh] flex-col items-center justify-center gap-4 sm:gap-5 py-24 sm:py-28 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease }}
          className="font-display text-champagne text-lg sm:text-xl lg:text-2xl italic tracking-wide"
        >
          Brand Partnerships · Experiences · Entertainment
        </motion.p>

        <h1 className="font-display font-normal leading-[1.06] tracking-[-0.015em] text-[clamp(2.1rem,5vw,4.8rem)] text-ink-inverse sm:leading-[1]">
          {["Connecting Brands.", "Curating Experiences.", "Driving Impact."].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.04em]">
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
          className="flex flex-col items-center gap-5 sm:gap-6 mt-1"
        >
          <p className="max-w-xl text-sm sm:text-base leading-relaxed text-muted-inverse">
            We connect brands with audiences through strategic partnerships, experiential campaigns
            and entertainment-led opportunities.
          </p>

          <div className="flex w-full max-w-sm flex-col items-center justify-center gap-3.5 sm:max-w-none sm:flex-row sm:gap-5">
            <a
              href="#work"
              className="group inline-flex w-full items-center justify-center gap-3 border border-champagne bg-champagne px-7 py-3.5 sm:px-8 sm:py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-background transition-colors duration-500 hover:bg-transparent hover:text-champagne sm:w-auto"
            >
              Explore Our Work
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#contact"
              className="inline-flex w-full items-center justify-center border border-ink-inverse/30 px-7 py-3.5 sm:px-8 sm:py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-ink-inverse transition-colors duration-500 hover:border-champagne hover:text-champagne sm:w-auto"
            >
              Partner with us
            </a>
          </div>

          <p className="text-[0.7rem] uppercase tracking-[0.28em] text-muted-inverse/90 font-medium">
            Hyderabad · Pan-India
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
