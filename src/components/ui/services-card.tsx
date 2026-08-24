"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Service {
  number: string;
  category: string;
  title: string;
  items: string[];
  icon: LucideIcon;
  accent: "champagne" | "charcoal" | "peach" | "ink";
}

const accentClasses: Record<Service["accent"], string> = {
  champagne: "from-champagne/30 via-champagne/10",
  charcoal: "from-charcoal/40 via-charcoal/15",
  peach: "from-peach/25 via-peach/10",
  ink: "from-ink-inverse/15 via-ink-inverse/5",
};

function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="relative flex h-[clamp(360px,56svh,520px)] w-[min(82vw,340px)] flex-none flex-col overflow-hidden rounded-3xl border border-ink-inverse/10 bg-ink-inverse/[0.03] p-7">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent",
          accentClasses[service.accent],
        )}
      />

      <div className="relative z-10 flex items-start justify-between">
        <span className="font-display text-sm tracking-[0.2em] text-muted-inverse">
          ( {service.number} )
        </span>
        <service.icon className="h-8 w-8 text-champagne" strokeWidth={1.5} />
      </div>

      <div className="relative z-10 mt-5">
        <p className="text-[0.62rem] uppercase tracking-[0.24em] text-muted-inverse">
          {service.category}
        </p>
        <h3 className="mt-2 font-display text-2xl leading-tight text-ink-inverse">
          {service.title}
        </h3>
      </div>

      <ul className="relative z-10 mt-5 flex-1 space-y-2.5 overflow-y-auto pr-1">
        {service.items.map((item) => (
          <li key={item} className="flex gap-2.5 text-sm leading-snug text-muted-inverse">
            <span className="mt-2 h-1 w-1 flex-none rounded-full bg-champagne" />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function ServiceCarousel({
  services,
  header,
}: {
  services: Service[];
  header?: React.ReactNode;
}) {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  // How far the track must travel horizontally: its full width minus one viewport.
  const [distance, setDistance] = React.useState(0);

  React.useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [services.length]);

  // Vertical progress across the tall spacer drives horizontal travel 1:1, so the
  // section stays pinned until every card has been seen, then releases the page.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={sectionRef} style={{ height: `calc(100svh + ${distance}px)` }} className="relative">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        {header}

        <motion.div ref={trackRef} style={{ x }} className="mt-10 flex gap-6 px-5 sm:px-10 lg:px-20">
          {services.map((service) => (
            <ServiceCard key={service.number} service={service} />
          ))}
        </motion.div>

        <div className="mt-10 px-5 sm:px-10 lg:px-20">
          <div className="h-px w-full max-w-xs bg-ink-inverse/15">
            <motion.div style={{ width: progress }} className="h-full bg-champagne" />
          </div>
        </div>
      </div>
    </div>
  );
}
