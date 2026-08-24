import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useRevealed } from "./Reveal";

const stats = [
  { value: "2024", label: "Founded", numeric: 2024 },
  { value: "5", label: "Service Verticals", numeric: 5 },
  { value: "49+", label: "Brand Partnerships", numeric: 49, suffix: "+" },
  { value: "Hyderabad", label: "Home Base, Pan-India Reach" },
];

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useRevealed(ref);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1600;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

function StatCell({ stat, index }: { stat: (typeof stats)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const revealed = useRevealed(ref, 60);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 1, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="border-b border-border px-1 py-10 sm:px-2 lg:border-b-0 lg:border-r lg:last:border-r-0"
    >
      <p className="font-display text-[clamp(2rem,4.4vw,3.6rem)] leading-none text-bone">
        {stat.numeric ? <Counter to={stat.numeric} suffix={stat.suffix ?? ""} /> : stat.value}
      </p>
      <p className="mt-4 text-[0.68rem] lg:text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground">
        {stat.label}
      </p>
    </motion.div>
  );
}

export function Stats() {
  return (
    <div className="grid grid-cols-2 border-t border-border lg:grid-cols-4">
      {stats.map((s, i) => (
        <StatCell key={s.label} stat={s} index={i} />
      ))}
    </div>
  );
}
