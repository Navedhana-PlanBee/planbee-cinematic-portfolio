"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Service {
  number: string;
  category: string;
  title: string;
  desc?: string;
  tag?: string;
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
    <article className="group relative flex h-[clamp(370px,46svh,430px)] w-[min(84vw,350px)] flex-none flex-col justify-between overflow-hidden rounded-2xl border border-ink-inverse/10 bg-ink-inverse/[0.04] p-6 sm:p-7 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-champagne/40 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.35)]">
      {/* Ambient gradient overlay */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100",
          accentClasses[service.accent],
        )}
      />

      {/* Top row: Counter & Icon */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="font-display text-base tracking-[0.22em] text-champagne font-medium">
          ( {service.number} )
        </span>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-champagne/10 border border-champagne/25 text-champagne shadow-sm">
          <service.icon className="h-5 w-5" strokeWidth={1.75} />
        </div>
      </div>

      {/* Title & Strategic Summary */}
      <div className="relative z-10 mt-3 sm:mt-4">
        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-muted-inverse/80 font-semibold line-clamp-1">
          {service.category}
        </p>
        <h3 className="mt-1 font-display text-2xl sm:text-[1.65rem] font-normal leading-tight text-ink-inverse">
          {service.title}
        </h3>
        {service.desc && (
          <p className="mt-2 text-xs sm:text-[0.82rem] leading-relaxed text-muted-inverse/85 line-clamp-2">
            {service.desc}
          </p>
        )}
      </div>

      {/* Deliverables / Capabilities List */}
      <div className="relative z-10 mt-3 sm:mt-4 flex-1">
        <p className="text-[0.62rem] uppercase tracking-[0.22em] text-champagne/90 font-semibold mb-2">
          Key Deliverables
        </p>
        <ul className="space-y-1.5 sm:space-y-2">
          {service.items.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-xs sm:text-[0.82rem] leading-snug text-muted-inverse/95"
            >
              <span className="h-1.5 w-1.5 flex-none rounded-full bg-champagne" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Footer: Tag & Deliverables Count */}
      <div className="relative z-10 mt-3 pt-3 border-t border-ink-inverse/10 flex items-center justify-between">
        <span className="font-mono text-[0.68rem] tracking-[0.14em] text-champagne/80">
          {service.tag || "#PlanBee"}
        </span>
        <span className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-inverse/70 flex items-center gap-1 font-medium group-hover:text-champagne transition-colors">
          {service.items.length} Capabilities ↗
        </span>
      </div>
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

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="mt-6 sm:mt-8 flex gap-5 sm:gap-6 px-5 sm:px-10 lg:px-20"
        >
          {services.map((service) => (
            <ServiceCard key={service.number} service={service} />
          ))}
        </motion.div>

        <div className="mt-6 sm:mt-8 px-5 sm:px-10 lg:px-20">
          <div className="h-px w-full max-w-xs bg-ink-inverse/15">
            <motion.div style={{ width: progress }} className="h-full bg-champagne" />
          </div>
        </div>
      </div>
    </div>
  );
}
