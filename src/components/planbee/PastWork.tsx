import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { caseStudies, type CaseStudy } from "@/data/planbee";
import { MaskLine } from "./Reveal";

// Prototype filter categories
type FilterCategory = "all" | "events" | "brands" | "community";

interface ProjectMeta {
  categoryKey: FilterCategory;
  pillLabel: string;
  visualBottom: string;
  tags: string[];
}

const PROJECT_CONFIGS: Record<string, ProjectMeta> = {
  "01": {
    categoryKey: "events",
    pillLabel: "Live experience",
    visualBottom: "Entertainment · Gachibowli Stadium",
    tags: ["Concert IP", "F&B curation", "35,000+ Attendees", "Brand Avatar"],
  },
  "02": {
    categoryKey: "brands",
    pillLabel: "Brand partnership",
    visualBottom: "Wellness · Hitech-City, Hyderabad",
    tags: ["Sponsorship", "2,000+ Runners", "Tridasa Rise", "Lead Generation"],
  },
  "03": {
    categoryKey: "brands",
    pillLabel: "Brand activation",
    visualBottom: "Retail · Nexus Mall, Hyderabad",
    tags: ["Mall Activation", "15-Day Campaign", "500+ Leads", "Casagrand"],
  },
  "04": {
    categoryKey: "community",
    pillLabel: "Community",
    visualBottom: "Families · Gymkhana Grounds",
    tags: ["Family Fitness", "1,000+ Children", "4 Brand Activations", "Global Pinnacle"],
  },
  "05": {
    categoryKey: "community",
    pillLabel: "Community outreach",
    visualBottom: "Residential · Hyderabad & Chennai",
    tags: ["RWA Activations", "9,500+ Families", "Casagrand", "Experiential"],
  },
  "06": {
    categoryKey: "events",
    pillLabel: "Live experience",
    visualBottom: "Education & Culture · Miyapur",
    tags: ["School Carnival", "2,000+ Idols", "Pavani Infra", "Brand Partnerships"],
  },
};

const DEFAULT_PROJECT_CONFIG: ProjectMeta = {
  categoryKey: "events",
  pillLabel: "Live experience",
  visualBottom: "Entertainment · Hyderabad",
  tags: ["Live Experience", "PlanBee"],
};

function getProjectConfig(num: string): ProjectMeta {
  return PROJECT_CONFIGS[num] ?? DEFAULT_PROJECT_CONFIG;
}

/* ─────────────────────────────────────────────────────────────
   Individual Work Card Component (Prototype v2 Layout)
───────────────────────────────────────────────────────────── */
interface CardProps {
  study: CaseStudy;
  index: number;
  config: ProjectMeta;
  onOpenModal: (caseIdx: number) => void;
  onVisualEnter: () => void;
  onVisualLeave: () => void;
}

function WorkCard({ study, index, config, onOpenModal, onVisualEnter, onVisualLeave }: CardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article className={`work-card ${isExpanded ? "expanded" : ""}`}>
      {/* ── Single Primary Visual with Custom Geometric Frame ── */}
      <div
        className="work-visual"
        onClick={() => onOpenModal(index)}
        onPointerEnter={onVisualEnter}
        onPointerLeave={onVisualLeave}
      >
        <img
          className="work-photo"
          src={study.image}
          alt={study.title}
          loading="lazy"
        />

        {/* Top-left Category Pill */}
        <span className="work-pill">{config.pillLabel}</span>

        {/* Top-right Counter */}
        <span className="work-number">
          {study.num} / {String(caseStudies.length).padStart(2, "0")}
        </span>

        {/* Bottom-left Location & Theme */}
        <span className="work-visual-bottom">{config.visualBottom}</span>

        {/* Bottom-right Rotating Arrow Button */}
        <button
          type="button"
          className="work-project-open"
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal(index);
          }}
          aria-label={`View ${study.title} details`}
        >
          ↗
        </button>
      </div>

      {/* ── Editorial Meta & Content ── */}
      <div className="work-meta">
        <div>
          <h3 className="work-title">{study.title}</h3>

          <p className="work-description">{study.description}</p>

          {/* Expandable Project Details (100% real content preserved) */}
          <div className="work-details">
            <p>
              {study.partner && (
                <>
                  <strong className="text-bone">Partner:</strong> {study.partner}
                  <br />
                </>
              )}
              <strong className="text-bone">Service:</strong> {study.service}
              <br />
              <strong className="text-bone">Date:</strong> {study.date}
              {study.location && (
                <>
                  <br />
                  <strong className="text-bone">Location:</strong> {study.location}
                </>
              )}
              {study.highlights && (
                <>
                  <br />
                  <strong className="text-bone">Highlights:</strong>{" "}
                  {study.highlights.replace(/\|\|/g, "·")}
                </>
              )}
            </p>
          </div>

          {/* Read more toggle with orange underline */}
          <button
            type="button"
            className="work-readmore"
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-expanded={isExpanded}
          >
            {isExpanded ? "Close details −" : "Read project details +"}
          </button>

          {/* Tag Pills */}
          <div className="work-tags">
            {config.tags.map((tag) => (
              <span key={tag} className="work-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Side Circle Arrow (Turns orange on hover, clicks to open modal) */}
        <button
          type="button"
          className="work-side-arrow"
          onClick={() => onOpenModal(index)}
          aria-label={`Open gallery for ${study.title}`}
        >
          ↗
        </button>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────
   Interactive Case Study Modal & Lightbox
───────────────────────────────────────────────────────────── */
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
  const [activePhotoIdx, setActivePhotoIdx] = useState(initialPhotoIndex);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

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

  // Autoplay slideshow: automatically advances photographs every 3.5 seconds
  useEffect(() => {
    if (totalPhotos <= 1 || isPaused) return;
    const timer = setInterval(() => {
      nextPhoto();
    }, 3500);
    return () => clearInterval(timer);
  }, [totalPhotos, isPaused, nextPhoto]);

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
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6 lg:p-8 overflow-y-auto bg-black/75 backdrop-blur-md"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {/* Floating Paper Card */}
        <motion.div
          key={study.num}
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-6xl rounded-2xl bg-[#f7f0e6] p-6 sm:p-8 lg:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.5)] border border-[#191a16]/10 text-[#191a16] my-auto"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-[#191a16]/10">
            <div className="flex items-center gap-3.5 flex-wrap">
              <span className="text-xs uppercase tracking-[0.22em] text-[#191a16]/80 font-semibold">
                Case Study {study.num}
              </span>
              <span className="border border-champagne/50 bg-champagne/15 px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-[#191a16] font-semibold">
                {totalPhotos} Curated Photographs
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close case study dialog"
              className="-mr-1 flex h-9 w-9 items-center justify-center border border-[#191a16]/20 text-[#191a16]/80 transition-all hover:border-[#191a16] hover:bg-[#191a16] hover:text-[#f7f0e6] text-lg leading-none"
            >
              ✕
            </button>
          </div>

          {/* Visual Showcase & Editorial Content Grid */}
          <div className="mt-7 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left: Photograph Showcase & Carousel */}
            <div className="lg:col-span-7 flex flex-col gap-3.5">
              <div
                className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#191a16] shadow-lg select-none"
                onPointerEnter={() => setIsPaused(true)}
                onPointerLeave={() => setIsPaused(false)}
              >
                {/* Top Badge: Photo Counter */}
                <div className="absolute left-3.5 top-3.5 z-20 border border-white/20 bg-black/60 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                  Photo {String(activePhotoIdx + 1).padStart(2, "0")} /{" "}
                  {String(totalPhotos).padStart(2, "0")}
                </div>

                {/* Top Button: Fullscreen */}
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  aria-label="View photo in fullscreen"
                  className="absolute right-3.5 top-3.5 z-20 flex items-center gap-2 border border-white/20 bg-black/60 px-3.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md transition-all hover:bg-black/85 hover:border-champagne hover:text-champagne"
                >
                  <span>Fullscreen</span>
                  <span className="text-xs">↗</span>
                </button>

                {/* Left & Right Navigation Arrows */}
                {totalPhotos > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prevPhoto}
                      aria-label="Previous photograph"
                      className="absolute left-3.5 top-1/2 z-20 -translate-y-1/2 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center border border-white/30 bg-black/60 text-white shadow-md transition-all hover:bg-black/90 hover:border-champagne hover:text-champagne font-display text-2xl leading-none"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={nextPhoto}
                      aria-label="Next photograph"
                      className="absolute right-3.5 top-1/2 z-20 -translate-y-1/2 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center border border-white/30 bg-black/60 text-white shadow-md transition-all hover:bg-black/90 hover:border-champagne hover:text-champagne font-display text-2xl leading-none"
                    >
                      ›
                    </button>
                  </>
                )}

                {/* Animated Image with Smooth Crossfade & Scale */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`${study.num}-${activePhotoIdx}`}
                    src={activeImage}
                    alt={`${study.title} curated photograph ${activePhotoIdx + 1}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full w-full object-cover select-none"
                    loading="eager"
                  />
                </AnimatePresence>
              </div>

              {/* Thumbnails Strip */}
              {totalPhotos > 1 && (
                <div
                  className="grid grid-cols-5 gap-2.5 sm:gap-3"
                  onPointerEnter={() => setIsPaused(true)}
                  onPointerLeave={() => setIsPaused(false)}
                >
                  {gallery.map((imgSrc, gIdx) => (
                    <button
                      key={gIdx}
                      type="button"
                      onClick={() => setActivePhotoIdx(gIdx)}
                      aria-label={`Show photo ${gIdx + 1}`}
                      className={`relative aspect-[16/10] overflow-hidden rounded-lg transition-all duration-200 ${
                        activePhotoIdx === gIdx
                          ? "border-2 border-champagne shadow-sm ring-2 ring-champagne/30 scale-[1.02]"
                          : "border border-[#191a16]/20 opacity-70 hover:opacity-100 hover:border-[#191a16]/50"
                      }`}
                    >
                      <img src={imgSrc} alt="" className="h-full w-full object-cover" />
                      <span className="absolute bottom-1 right-1 rounded bg-black/75 px-1.5 py-0.5 font-sans text-[0.6rem] font-semibold text-white/90 leading-none">
                        {gIdx + 1}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Case Study Metadata & Event Overview */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-normal leading-[1.12] text-[#191a16] tracking-tight">
                  {study.title}
                </h2>

                {/* Metadata Table */}
                <dl className="mt-6 border-y border-[#191a16]/15 divide-y divide-[#191a16]/15 text-[0.75rem] font-sans uppercase tracking-[0.18em]">
                  <div className="flex items-center justify-between py-2.5">
                    <dt className="text-[#191a16]/60">Partner</dt>
                    <dd className="font-semibold text-[#191a16] text-right">
                      {study.partner || "Event Partners"}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between py-2.5">
                    <dt className="text-[#191a16]/60">Service</dt>
                    <dd className="font-semibold text-[#191a16] text-right">{study.service}</dd>
                  </div>
                  <div className="flex items-center justify-between py-2.5">
                    <dt className="text-[#191a16]/60">Date</dt>
                    <dd className="font-semibold text-[#191a16] text-right">{study.date}</dd>
                  </div>
                  <div className="flex items-center justify-between py-2.5">
                    <dt className="text-[#191a16]/60">Location</dt>
                    <dd className="font-semibold text-[#191a16] text-right">
                      {study.location || "Hyderabad"}
                    </dd>
                  </div>
                </dl>

                {/* Event Overview */}
                <div className="mt-6">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-[#191a16] font-semibold">
                    Event Overview
                  </h3>
                  <p className="mt-2 text-[0.88rem] sm:text-[0.92rem] leading-relaxed text-[#191a16]/80 font-sans">
                    {study.description}
                  </p>
                </div>

                {/* Key Metrics */}
                {study.highlights && (
                  <div className="mt-6">
                    <h3 className="text-xs uppercase tracking-[0.2em] text-[#191a16] font-semibold">
                      Key Metrics
                    </h3>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {study.highlights
                        .split("||")
                        .map((h) => h.trim())
                        .filter(Boolean)
                        .map((h, hIdx) => (
                          <span
                            key={hIdx}
                            className="inline-flex items-center border border-[#191a16]/20 bg-black/5 px-3 py-1 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#191a16]"
                          >
                            {h}
                          </span>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Bar: Case Study Step Navigation */}
          <div className="mt-8 pt-5 border-t border-[#191a16]/15 flex items-center justify-between">
            <button
              type="button"
              onClick={() => onStep(-1)}
              aria-label="Previous case study"
              className="font-sans text-xs uppercase tracking-[0.2em] text-[#191a16]/75 hover:text-[#191a16] transition-colors font-semibold flex items-center gap-2"
            >
              <span>←</span>
              <span>Previous Case Study</span>
            </button>
            <button
              type="button"
              onClick={() => onStep(1)}
              aria-label="Next case study"
              className="font-sans text-xs uppercase tracking-[0.2em] text-[#191a16]/75 hover:text-[#191a16] transition-colors font-semibold flex items-center gap-2"
            >
              <span>Next Case Study</span>
              <span>→</span>
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Lightbox Mode */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-black/95 p-4 md:p-8"
          >
            <div className="absolute left-6 right-6 top-6 flex items-center justify-between text-bone z-30">
              <div className="flex items-center gap-3">
                <span className="font-display text-xl text-champagne">{study.title}</span>
                <span className="font-sans text-xs uppercase tracking-wider text-white/70">
                  ({String(activePhotoIdx + 1).padStart(2, "0")} /{" "}
                  {String(totalPhotos).padStart(2, "0")})
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                aria-label="Exit fullscreen"
                className="flex h-11 w-11 items-center justify-center font-sans text-2xl text-white transition-transform hover:scale-110"
              >
                ✕
              </button>
            </div>

            <div className="relative flex max-h-[85vh] max-w-[90vw] items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={`lightbox-${study.num}-${activePhotoIdx}`}
                  src={activeImage}
                  alt={`${study.title} fullscreen ${activePhotoIdx + 1}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
                />
              </AnimatePresence>

              {totalPhotos > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevPhoto}
                    aria-label="Previous fullscreen photograph"
                    className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 font-display text-3xl text-black shadow-lg backdrop-blur-md transition-all hover:bg-white hover:scale-105"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={nextPhoto}
                    aria-label="Next fullscreen photograph"
                    className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 font-display text-3xl text-black shadow-lg backdrop-blur-md transition-all hover:bg-white hover:scale-105"
                  >
                    ›
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main Work Section — PlanBee Redesign v2
───────────────────────────────────────────────────────────── */
export function PastWork() {
  const [openModalIdx, setOpenModalIdx] = useState<number | null>(null);

  // Floating Cursor Position Tracker
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isCursorOn, setIsCursorOn] = useState(false);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleVisualEnter = useCallback(() => {
    setIsCursorOn(true);
  }, []);

  const handleVisualLeave = useCallback(() => {
    setIsCursorOn(false);
  }, []);

  // All Projects
  const allProjects = useMemo(() => {
    return caseStudies.map((study, originalIndex) => ({
      study,
      originalIndex,
      config: getProjectConfig(study.num),
    }));
  }, []);

  const stepModal = useCallback((dir: number) => {
    setOpenModalIdx((prev) => {
      if (prev === null) return null;
      return (prev + dir + caseStudies.length) % caseStudies.length;
    });
  }, []);

  return (
    <section
      id="work"
      className="section-pad border-t border-border bg-background relative"
      onPointerMove={handlePointerMove}
    >
      {/* ── Floating Cursor on Visual Hover ── */}
      <div
        className={`work-floating-cursor ${isCursorOn ? "on" : ""}`}
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      >
        EXPLORE
        <br />
        PROJECT ↗
      </div>

      <div className="shell">
        {/* ── Section Header ── */}
        <header className="mb-14 sm:mb-20">
          <p className="eyebrow">OUR WORK</p>

          <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="display-lg text-bone">
              <MaskLine>Selected Work</MaskLine>
            </h2>

            <p className="max-w-md text-sm sm:text-base leading-relaxed text-muted-foreground">
              A curated showcase of brand partnerships, live experiences and campaigns brought to life by PlanBee.
            </p>
          </div>
        </header>

        {/* ── 2-Column Asymmetric Editorial Grid ── */}
        <div className="work-gallery-grid">
          {allProjects.map(({ study, originalIndex, config }) => (
            <WorkCard
              key={study.num}
              study={study}
              index={originalIndex}
              config={config}
              onOpenModal={setOpenModalIdx}
              onVisualEnter={handleVisualEnter}
              onVisualLeave={handleVisualLeave}
            />
          ))}
        </div>
      </div>

      {/* ── Case Study Detail Modal with Full Lightbox Gallery ── */}
      <AnimatePresence>
        {openModalIdx !== null && (
          <Modal index={openModalIdx} onClose={() => setOpenModalIdx(null)} onStep={stepModal} />
        )}
      </AnimatePresence>
    </section>
  );
}
