import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { caseStudies, type CaseStudy } from "@/data/planbee";
import { MaskLine, useRevealed } from "./Reveal";

const ease = [0.16, 1, 0.3, 1] as const;

function Row({
  study,
  index,
  onOpen,
}: {
  study: CaseStudy;
  index: number;
  onOpen: (i: number) => void;
}) {
  const flipped = index % 2 === 1;
  const rowRef = useRef<HTMLElement>(null);
  const revealed = useRevealed(rowRef);

  return (
    <motion.article
      ref={rowRef}
      initial={{ opacity: 0, y: 40 }}
      animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 1.1, ease }}
      onClick={() => onOpen(index)}
      className="group grid cursor-pointer grid-cols-1 items-center gap-8 border-t border-border py-12 md:grid-cols-12 md:gap-12 lg:py-16"
    >
      <div
        className={`overflow-hidden md:col-span-7 ${flipped ? "md:order-2 md:col-start-6" : ""}`}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={study.image}
            alt={study.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.07]"
          />
          <div className="absolute inset-0 bg-background/30 transition-opacity duration-700 group-hover:opacity-0" />
          <div className="grain-overlay" />
        </div>
      </div>

      <div className={`md:col-span-4 ${flipped ? "md:order-1 md:col-start-1" : "md:col-start-9"}`}>
        <div className="flex items-baseline gap-4">
          <span className="font-display leading-none text-champagne/40 transition-all duration-700 group-hover:text-champagne/80 text-[clamp(2rem,4vw,3rem)] group-hover:text-[clamp(2.4rem,5vw,4rem)]">
            {study.num}
          </span>
          <span className="text-[0.68rem] lg:text-[0.6rem] tracking-[0.3em] text-muted-foreground">
            / {caseStudies.length}
          </span>
        </div>

        <h3 className="mt-6 font-display text-[clamp(1.5rem,2.8vw,2.4rem)] leading-tight text-bone transition-transform duration-700 group-hover:translate-x-1">
          {study.title}
        </h3>

        <dl className="mt-6 space-y-2 text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
          {study.partner && (
            <div className="flex gap-3">
              <dt className="w-20 flex-none text-muted-foreground/60">Partner</dt>
              <dd className="text-bone/80">{study.partner}</dd>
            </div>
          )}
          <div className="flex gap-3">
            <dt className="w-20 flex-none text-muted-foreground/60">Service</dt>
            <dd className="text-bone/80">{study.service}</dd>
          </div>
          <div className="flex gap-3">
            <dt className="w-20 flex-none text-muted-foreground/60">Date</dt>
            <dd className="text-bone/80">{study.date}</dd>
          </div>
          {study.location && (
            <div className="flex gap-3">
              <dt className="w-20 flex-none text-muted-foreground/60">Location</dt>
              <dd className="text-bone/80">{study.location}</dd>
            </div>
          )}
        </dl>

        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{study.description}</p>

        {/* Touch devices never fire hover, so the tap affordance stays visible there. */}
        <span className="mt-6 inline-flex items-center gap-3 text-[0.7rem] lg:text-[0.65rem] uppercase tracking-[0.3em] text-champagne transition-opacity duration-500 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100">
          View <span>→</span>
        </span>
      </div>
    </motion.article>
  );
}

function Modal({
  index,
  onClose,
  onStep,
}: {
  index: number;
  onClose: () => void;
  onStep: (dir: number) => void;
}) {
  const study = caseStudies[index]!;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onStep]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[70] overflow-y-auto bg-background/95 backdrop-blur-xl"
    >
      <div className="shell flex min-h-full flex-col py-8">
        <div className="flex items-center justify-between">
          <span className="eyebrow">Case Study {study.num}</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="-mr-2 flex h-11 w-11 items-center justify-center font-display text-3xl leading-none text-bone"
          >
            ×
          </button>
        </div>

        <motion.div
          key={study.num}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="mt-8 grid flex-1 gap-10 md:grid-cols-12"
        >
          <div className="md:col-span-7">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img src={study.image} alt={study.title} className="h-full w-full object-cover" />
              <div className="grain-overlay" />
            </div>
          </div>
          <div className="md:col-span-5">
            <h3 className="display-md text-bone">{study.title}</h3>
            <dl className="mt-8 divide-y divide-border border-y border-border text-[0.72rem] uppercase tracking-[0.2em]">
              {study.partner && (
                <div className="flex justify-between gap-4 py-4">
                  <dt className="text-muted-foreground">Client / Partner</dt>
                  <dd className="text-right text-bone">{study.partner}</dd>
                </div>
              )}
              <div className="flex justify-between gap-4 py-4">
                <dt className="text-muted-foreground">Service</dt>
                <dd className="text-right text-bone">{study.service}</dd>
              </div>
              <div className="flex justify-between gap-4 py-4">
                <dt className="text-muted-foreground">Date</dt>
                <dd className="text-right text-bone">{study.date}</dd>
              </div>
              {study.location && (
                <div className="flex justify-between gap-4 py-4">
                  <dt className="text-muted-foreground">Location</dt>
                  <dd className="text-right text-bone">{study.location}</dd>
                </div>
              )}
            </dl>
            <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
              {study.description}
            </p>
          </div>
        </motion.div>

        <div className="mt-12 flex items-center justify-between border-t border-border pt-6">
          <button
            type="button"
            onClick={() => onStep(-1)}
            className="-ml-1 px-1 py-3 text-[0.7rem] lg:text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-champagne"
          >
            ← Previous
          </button>
          <button
            type="button"
            onClick={() => onStep(1)}
            className="-mr-1 px-1 py-3 text-[0.7rem] lg:text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-champagne"
          >
            Next →
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function PastWork() {
  const [open, setOpen] = useState<number | null>(null);

  const step = useCallback((dir: number) => {
    setOpen((cur) =>
      cur === null ? cur : (cur + dir + caseStudies.length) % caseStudies.length,
    );
  }, []);

  return (
    <section id="work" className="section-pad border-t border-border bg-peach">
      <div className="shell">
        <p className="eyebrow">Case Studies</p>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <h2 className="display-lg text-bone">
            <MaskLine>Past Work</MaskLine>
          </h2>
          <div className="text-right">
            <p className="text-[0.7rem] lg:text-[0.65rem] uppercase tracking-[0.32em] text-champagne">Events</p>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Experiences we've helped bring to life.
            </p>
          </div>
        </div>

        <div className="mt-20">
          {caseStudies.map((s, i) => (
            <Row key={s.num} study={s} index={i} onOpen={setOpen} />
          ))}
          <div className="border-t border-border" />
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <Modal index={open} onClose={() => setOpen(null)} onStep={step} />
        )}
      </AnimatePresence>
    </section>
  );
}
