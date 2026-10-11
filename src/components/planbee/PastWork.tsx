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
  onOpen: (caseIdx: number, photoIdx?: number) => void;
}) {
  const flipped = index % 2 === 1;
  const rowRef = useRef<HTMLElement>(null);
  const revealed = useRevealed(rowRef);
  const [activeThumb, setActiveThumb] = useState(0);

  const displayImage = study.gallery[activeThumb] || study.image;

  return (
    <motion.article
      ref={rowRef}
      initial={{ opacity: 0, y: 40 }}
      animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 1.1, ease }}
      onClick={() => onOpen(index, activeThumb)}
      className="group grid cursor-pointer grid-cols-1 items-center gap-8 border-t border-border py-12 md:grid-cols-12 md:gap-12 lg:py-16"
    >
      <div
        className={`overflow-hidden md:col-span-7 ${flipped ? "md:order-2 md:col-start-6" : ""}`}
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-sm shadow-md">
          {/* Photos Count Badge */}
          <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full border border-champagne/40 bg-background/85 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-champagne backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-champagne animate-pulse" />
            <span>{study.gallery.length} Event Photos</span>
          </div>

          <img
            src={displayImage}
            alt={study.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]"
          />
        </div>

        {/* Thumbnail preview strip in row */}
        {study.gallery.length > 1 && (
          <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1">
            {study.gallery.slice(0, 5).map((imgSrc, tIdx) => (
              <button
                key={tIdx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen(index, tIdx);
                }}
                onMouseEnter={() => setActiveThumb(tIdx)}
                aria-label={`Preview photo ${tIdx + 1} of ${study.title}`}
                className={`relative h-12 w-16 flex-none overflow-hidden rounded border transition-all ${
                  activeThumb === tIdx
                    ? "border-champagne ring-1 ring-champagne/50 opacity-100 scale-105"
                    : "border-border/50 opacity-60 hover:opacity-100"
                }`}
              >
                <img src={imgSrc} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
            {study.gallery.length > 5 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen(index, 5);
                }}
                className="flex h-12 flex-none items-center justify-center rounded border border-border/60 bg-surface/60 px-3 text-xs font-semibold uppercase tracking-[0.14em] text-champagne transition-colors hover:border-champagne/60 hover:bg-surface"
              >
                +{study.gallery.length - 5} More
              </button>
            )}
          </div>
        )}
      </div>

      <div className={`md:col-span-4 ${flipped ? "md:order-1 md:col-start-1" : "md:col-start-9"}`}>
        <div className="flex items-baseline gap-4">
          <span className="font-display font-light leading-none text-champagne/40 transition-all duration-700 group-hover:text-champagne/80 text-[clamp(2.2rem,4vw,3.2rem)]">
            {study.num}
          </span>
          <span className="text-xs uppercase tracking-[0.24em] text-muted-foreground font-medium">
            / {caseStudies.length}
          </span>
        </div>

        <h3 className="mt-6 font-display font-normal text-[clamp(1.5rem,2.5vw,2.2rem)] leading-snug text-bone transition-transform duration-700 group-hover:translate-x-1">
          {study.title}
        </h3>

        <dl className="mt-6 space-y-2.5 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
          {study.partner && (
            <div className="flex gap-3">
              <dt className="w-20 flex-none text-muted-foreground/60">Partner</dt>
              <dd className="text-bone/85">{study.partner}</dd>
            </div>
          )}
          <div className="flex gap-3">
            <dt className="w-20 flex-none text-muted-foreground/60">Service</dt>
            <dd className="text-bone/85">{study.service}</dd>
          </div>
          <div className="flex gap-3">
            <dt className="w-20 flex-none text-muted-foreground/60">Date</dt>
            <dd className="text-bone/85">{study.date}</dd>
          </div>
          {study.location && (
            <div className="flex gap-3">
              <dt className="w-20 flex-none text-muted-foreground/60">Location</dt>
              <dd className="text-bone/85">{study.location}</dd>
            </div>
          )}
        </dl>

        <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
          {study.description}
        </p>

        {study.highlights && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-champagne/30 bg-champagne/10 px-3.5 py-1.5 text-xs font-semibold tracking-[0.08em] text-champagne">
            <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
            {study.highlights}
          </div>
        )}

        {/* View gallery affordance */}
        <div className="mt-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-champagne">
          <span>Explore Event Gallery ({study.gallery.length} Photos)</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </div>
      </div>
    </motion.article>
  );
}

function Modal({
  index,
  initialPhotoIndex = 0,
  onClose,
  onStep,
}: {
  index: number;
  initialPhotoIndex?: number;
  onClose: () => void;
  onStep: (dir: number) => void;
}) {
  const study = caseStudies[index];
  const theaterRef = useRef<HTMLDivElement>(null);
  const [activePhotoIdx, setActivePhotoIdx] = useState(initialPhotoIndex);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    setActivePhotoIdx(initialPhotoIndex);
  }, [index, initialPhotoIndex]);

  const gallery = study?.gallery || [];
  const totalPhotos = gallery.length;

  const nextPhoto = useCallback(() => {
    if (totalPhotos === 0) return;
    setActivePhotoIdx((prev) => (prev + 1) % totalPhotos);
  }, [totalPhotos]);

  const prevPhoto = useCallback(() => {
    if (totalPhotos === 0) return;
    setActivePhotoIdx((prev) => (prev - 1 + totalPhotos) % totalPhotos);
  }, [totalPhotos]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
        } else {
          onClose();
        }
      }
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen, onClose, nextPhoto, prevPhoto]);

  if (!study) return null;

  const activeImage = gallery[activePhotoIdx] || study.image;

  return (
    <>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`Case study: ${study.title}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[70] overflow-y-auto bg-background/95 backdrop-blur-xl"
      >
        <div className="shell flex min-h-full flex-col py-8">
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-border/80 pb-6">
            <div className="flex items-center gap-3">
              <span className="eyebrow">Case Study {study.num}</span>
              <span className="rounded-full border border-champagne/30 bg-champagne/10 px-3 py-1 text-[0.62rem] uppercase tracking-[0.15em] text-champagne">
                {study.gallery.length} Curated Photographs
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close case study dialog"
              className="-mr-2 flex h-11 w-11 items-center justify-center font-display text-3xl leading-none text-bone transition-transform hover:scale-110"
            >
              ×
            </button>
          </div>

          {/* Main Visual & Info Section */}
          <motion.div
            key={study.num}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="mt-8 grid flex-1 gap-10 md:grid-cols-12"
          >
            {/* Left: Cinematic Image Theater */}
            <div ref={theaterRef} className="md:col-span-7">
              <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-surface shadow-2xl">
                {/* Image counter & Fullscreen trigger */}
                <div className="absolute left-3 top-3 z-20 rounded-full border border-border/70 bg-background/80 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-champagne backdrop-blur-md">
                  Photo {String(activePhotoIdx + 1).padStart(2, "0")} /{" "}
                  {String(totalPhotos).padStart(2, "0")}
                </div>

                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  aria-label="View photo in fullscreen"
                  className="absolute right-3 top-3 z-20 flex items-center gap-1.5 rounded-full border border-border/70 bg-background/80 px-3 py-1 text-[0.62rem] uppercase tracking-[0.15em] text-bone backdrop-blur-md transition-colors hover:border-champagne hover:text-champagne"
                >
                  <span>⛶ Fullscreen</span>
                </button>

                {/* Theater Navigation Arrows */}
                {totalPhotos > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prevPhoto}
                      aria-label="Previous photograph"
                      className="absolute left-3 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-background/70 font-display text-2xl text-bone backdrop-blur-md transition-all hover:border-champagne hover:bg-champagne hover:text-background"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={nextPhoto}
                      aria-label="Next photograph"
                      className="absolute right-3 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-background/70 font-display text-2xl text-bone backdrop-blur-md transition-all hover:border-champagne hover:bg-champagne hover:text-background"
                    >
                      ›
                    </button>
                  </>
                )}

                {/* Active Photograph */}
                <img
                  key={activeImage}
                  src={activeImage}
                  alt={`${study.title} moment ${activePhotoIdx + 1}`}
                  className="h-full w-full object-cover transition-opacity duration-300"
                />
              </div>

              {/* Thumbnails Filmstrip under Theater */}
              {totalPhotos > 1 && (
                <div className="mt-4 flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
                  {gallery.map((imgSrc, gIdx) => (
                    <button
                      key={gIdx}
                      type="button"
                      onClick={() => setActivePhotoIdx(gIdx)}
                      aria-label={`Show photo ${gIdx + 1}`}
                      className={`relative h-16 w-24 flex-none overflow-hidden rounded border transition-all ${
                        activePhotoIdx === gIdx
                          ? "border-champagne ring-2 ring-champagne/50 opacity-100 scale-[1.02]"
                          : "border-border/60 opacity-85 hover:opacity-100"
                      }`}
                    >
                      <img src={imgSrc} alt="" className="h-full w-full object-cover" />
                      <span className="absolute bottom-1 right-1 rounded bg-background/80 px-1 font-mono text-[0.55rem] text-muted-foreground">
                        {gIdx + 1}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Event Briefing & Details */}
            <div className="md:col-span-5 flex flex-col justify-between">
              <div>
                <h3 className="display-md text-bone">{study.title}</h3>

                <dl className="mt-8 divide-y divide-border border-y border-border text-[0.72rem] uppercase tracking-[0.2em]">
                  {study.partner && (
                    <div className="flex justify-between gap-4 py-3.5">
                      <dt className="text-muted-foreground">Client / Partner</dt>
                      <dd className="text-right text-bone">{study.partner}</dd>
                    </div>
                  )}
                  <div className="flex justify-between gap-4 py-3.5">
                    <dt className="text-muted-foreground">Service</dt>
                    <dd className="text-right text-bone">{study.service}</dd>
                  </div>
                  <div className="flex justify-between gap-4 py-3.5">
                    <dt className="text-muted-foreground">Date</dt>
                    <dd className="text-right text-bone">{study.date}</dd>
                  </div>
                  {study.location && (
                    <div className="flex justify-between gap-4 py-3.5">
                      <dt className="text-muted-foreground">Location</dt>
                      <dd className="text-right text-bone">{study.location}</dd>
                    </div>
                  )}
                </dl>

                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                  {study.description}
                </p>

                {study.highlights && (
                  <div className="mt-6 rounded border border-champagne/30 bg-champagne/10 p-4">
                    <p className="text-[0.65rem] uppercase tracking-[0.25em] text-champagne font-semibold">
                      Project Highlights
                    </p>
                    <p className="mt-2 text-sm font-medium text-bone/90">{study.highlights}</p>
                  </div>
                )}
              </div>

              {/* Action: Plan an Event */}
              <div className="mt-8 pt-6 border-t border-border">
                <a
                  href="#contact"
                  onClick={onClose}
                  className="group inline-flex items-center gap-3 border border-champagne bg-champagne px-6 py-3.5 text-[0.68rem] uppercase tracking-[0.25em] text-background transition-colors hover:bg-transparent hover:text-champagne"
                >
                  Inquire for Your Brand / Event <span>→</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Full Visual Gallery Archive (Masonry/Grid of ALL event photographs) */}
          {totalPhotos > 0 && (
            <div className="mt-14 border-t border-border pt-10">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <span className="eyebrow">Visual Archive</span>
                  <h4 className="mt-2 font-display text-2xl text-bone">
                    All {totalPhotos} Event Photographs
                  </h4>
                </div>
                <p className="text-xs text-muted-foreground">
                  Click any moment below to preview in theater or expand fullscreen
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {gallery.map((imgSrc, gIdx) => (
                  <button
                    key={gIdx}
                    type="button"
                    onClick={() => {
                      setActivePhotoIdx(gIdx);
                      theaterRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
                    }}
                    className={`group relative aspect-[4/3] overflow-hidden rounded-sm border transition-all ${
                      activePhotoIdx === gIdx
                        ? "border-champagne ring-2 ring-champagne/50 shadow-lg scale-[1.02]"
                        : "border-border/60 opacity-90 hover:opacity-100 hover:border-champagne/40"
                    }`}
                  >
                    <img
                      src={imgSrc}
                      alt={`${study.title} shot ${gIdx + 1}`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute bottom-1 right-1.5 rounded bg-background/80 px-1.5 py-0.5 font-mono text-[0.55rem] text-muted-foreground group-hover:text-champagne">
                      #{gIdx + 1}
                    </div>
                    {activePhotoIdx === gIdx && (
                      <div className="absolute left-1.5 top-1.5 rounded bg-champagne px-1.5 py-0.5 text-[0.55rem] font-bold uppercase tracking-[0.1em] text-background">
                        Viewing
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Modal Footer Controls (Previous / Next Case Study) */}
          <div className="mt-12 flex items-center justify-between border-t border-border pt-6">
            <button
              type="button"
              onClick={() => onStep(-1)}
              aria-label="Previous case study"
              className="-ml-1 px-1 py-3 text-[0.7rem] lg:text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-champagne"
            >
              ← Previous Case Study
            </button>
            <button
              type="button"
              onClick={() => onStep(1)}
              aria-label="Next case study"
              className="-mr-1 px-1 py-3 text-[0.7rem] lg:text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-champagne"
            >
              Next Case Study →
            </button>
          </div>
        </div>
      </motion.div>

      {/* Dedicated Immersive Fullscreen Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-black/95 p-4 md:p-8"
          >
            {/* Top Toolbar */}
            <div className="absolute left-6 right-6 top-6 flex items-center justify-between text-bone z-30">
              <div className="flex items-center gap-3">
                <span className="font-display text-lg text-champagne">{study.title}</span>
                <span className="font-mono text-xs text-muted-foreground">
                  ({activePhotoIdx + 1} / {totalPhotos})
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                aria-label="Exit fullscreen"
                className="flex h-11 w-11 items-center justify-center font-display text-3xl text-bone transition-transform hover:scale-110"
              >
                ×
              </button>
            </div>

            {/* Lightbox Main Image */}
            <div className="relative flex max-h-[85vh] max-w-[90vw] items-center justify-center">
              <img
                src={activeImage}
                alt={`${study.title} fullscreen ${activePhotoIdx + 1}`}
                className="max-h-[85vh] max-w-[90vw] object-contain rounded shadow-2xl"
              />

              {totalPhotos > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevPhoto}
                    aria-label="Previous photograph"
                    className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-background/80 font-display text-3xl text-bone backdrop-blur-md transition-all hover:bg-champagne hover:text-background"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={nextPhoto}
                    aria-label="Next photograph"
                    className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-background/80 font-display text-3xl text-bone backdrop-blur-md transition-all hover:bg-champagne hover:text-background"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            <div className="absolute bottom-6 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
              Press Esc to close · Arrow keys to navigate
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function PastWork() {
  const [openState, setOpenState] = useState<{ caseIdx: number; photoIdx: number } | null>(null);

  const handleOpen = useCallback((caseIdx: number, photoIdx: number = 0) => {
    setOpenState({ caseIdx, photoIdx });
  }, []);

  const handleClose = useCallback(() => {
    setOpenState(null);
  }, []);

  const step = useCallback((dir: number) => {
    setOpenState((cur) => {
      if (!cur || caseStudies.length === 0) return cur;
      const nextCase = (cur.caseIdx + dir + caseStudies.length) % caseStudies.length;
      return { caseIdx: nextCase, photoIdx: 0 };
    });
  }, []);

  return (
    <section id="work" className="section-pad border-t border-border bg-peach">
      <div className="shell">
        <p className="eyebrow">OUR WORK</p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <h2 className="display-lg text-bone">
            <MaskLine>Selected Work</MaskLine>
          </h2>
          <div className="text-right">
            <p className="text-[0.7rem] lg:text-[0.65rem] uppercase tracking-[0.32em] text-champagne">
              Events & Activations
            </p>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Authentic live experiences and activations curated by PlanBee.
            </p>
          </div>
        </div>

        <div className="mt-20">
          {caseStudies.length > 0 ? (
            caseStudies.map((s, i) => <Row key={s.num} study={s} index={i} onOpen={handleOpen} />)
          ) : (
            <p className="py-12 text-center text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Curated case studies coming soon.
            </p>
          )}
          <div className="border-t border-border" />
        </div>
      </div>

      <AnimatePresence>
        {openState !== null && (
          <Modal
            index={openState.caseIdx}
            initialPhotoIndex={openState.photoIdx}
            onClose={handleClose}
            onStep={step}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
