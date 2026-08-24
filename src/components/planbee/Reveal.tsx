import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Scroll reveal that does not depend solely on IntersectionObserver.
 *
 * Some mobile browsers fail to deliver IntersectionObserver callbacks on very
 * tall pages, which previously left whole sections stuck at opacity:0. This
 * ORs the observer with a cheap scroll-position check so content always
 * appears once it is on screen, whichever mechanism fires first.
 */
export function useRevealed(ref: RefObject<Element | null>, offset = 80) {
  const observed = useInView(ref, { once: true, margin: "-80px" });
  const [scrolledIntoView, setScrolledIntoView] = useState(false);

  useEffect(() => {
    if (scrolledIntoView) return;
    let last = 0;

    const check = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - offset && rect.bottom > 0) {
        setScrolledIntoView(true);
      }
    };
    // Time-throttled rather than rAF-driven: rAF is suspended on backgrounded or
    // throttled pages, which is one of the ways the reveal could stall.
    const schedule = () => {
      const now = Date.now();
      if (now - last < 100) return;
      last = now;
      check();
    };

    check();
    // Late re-check covers first paint / font & image layout shifts.
    const settleTimer = setTimeout(check, 400);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      clearTimeout(settleTimer);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ref, offset, scrolledIntoView]);

  return observed || scrolledIntoView;
}

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const revealed = useRevealed(ref);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function MaskLine({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const revealed = useRevealed(ref, 40);

  return (
    <span ref={ref} className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className={`block ${className ?? ""}`}
        initial={{ y: "110%" }}
        animate={revealed ? { y: "0%" } : { y: "110%" }}
        transition={{ duration: 1.2, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Rule({
  className,
  tone = "default",
}: {
  className?: string;
  /** "inverse" for use on the site's dark bands (navy/terracotta), where bg-border is invisible. */
  tone?: "default" | "inverse";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const revealed = useRevealed(ref, 0);

  return (
    <motion.div
      ref={ref}
      className={`h-px w-full origin-left ${tone === "inverse" ? "bg-ink-inverse/15" : "bg-border"} ${className ?? ""}`}
      initial={{ scaleX: 0 }}
      animate={revealed ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: 1.4, ease: EASE }}
    />
  );
}
