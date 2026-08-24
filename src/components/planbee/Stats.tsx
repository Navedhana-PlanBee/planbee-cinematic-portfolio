import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "2024", label: "Founded", numeric: 2024 },
  { value: "5", label: "Service Verticals", numeric: 5 },
  { value: "49+", label: "Brand Partnerships", numeric: 49, suffix: "+" },
  { value: "Hyderabad", label: "Home Base, Pan-India Reach" },
];

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
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

export function Stats() {
  return (
    <div className="grid grid-cols-2 border-t border-border lg:grid-cols-4">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="border-b border-border px-1 py-10 sm:px-2 lg:border-b-0 lg:border-r lg:last:border-r-0"
        >
          <p className="font-display text-[clamp(2rem,4.4vw,3.6rem)] leading-none text-bone">
            {s.numeric ? <Counter to={s.numeric} suffix={s.suffix ?? ""} /> : s.value}
          </p>
          <p className="mt-4 text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground">
            {s.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
