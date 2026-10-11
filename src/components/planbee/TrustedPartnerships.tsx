import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { clientCategories, type Client, type ClientCategory } from "@/data/planbee";
import { MaskLine } from "./Reveal";

/* ─────────────────────────────────────────────────────────────
   Individual Partner Logo Card
───────────────────────────────────────────────────────────── */
function PartnerCard({ client, isModal = false }: { client: Client; isModal?: boolean }) {
  const [imgError, setImgError] = useState(false);

  if (isModal) {
    return (
      <div
        className="group relative flex h-32 sm:h-36 lg:h-40 w-full flex-col items-center justify-between rounded-2xl bg-white p-3 sm:p-4 shadow-sm border border-champagne/20 transition-all duration-300 hover:scale-[1.03] hover:border-champagne hover:shadow-md focus-within:ring-2 focus-within:ring-champagne overflow-hidden"
        title={client.name}
      >
        <div className="flex flex-1 w-full items-center justify-center min-h-0">
          {!imgError ? (
            <img
              src={client.logo}
              alt={`${client.name} logo`}
              loading="lazy"
              onError={() => setImgError(true)}
              className="max-h-14 sm:max-h-16 lg:max-h-20 max-w-[85%] object-contain filter-none transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <span className="font-sans text-xs font-semibold text-navy text-center line-clamp-2">
              {client.name}
            </span>
          )}
        </div>
        <span className="w-full shrink-0 truncate pt-1 text-center font-sans text-[11px] sm:text-xs font-medium text-navy/85 tracking-tight">
          {client.name}
        </span>
      </div>
    );
  }

  return (
    <div
      className="group relative flex h-24 w-44 sm:h-28 sm:w-56 lg:h-32 lg:w-64 flex-none items-center justify-center rounded-2xl bg-white p-4 sm:p-5 shadow-sm border border-white/20 transition-all duration-300 hover:scale-[1.04] hover:shadow-xl hover:ring-2 hover:ring-champagne/60 focus-within:ring-2 focus-within:ring-champagne/60"
      title={client.name}
    >
      {!imgError ? (
        <img
          src={client.logo}
          alt={`${client.name} logo`}
          loading="lazy"
          onError={() => setImgError(true)}
          className="max-h-16 sm:max-h-20 lg:max-h-24 max-w-full object-contain filter-none transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <span className="font-sans text-xs font-semibold text-navy text-center line-clamp-2">
          {client.name}
        </span>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Continuous Alternating Logo Marquee
───────────────────────────────────────────────────────────── */
function CategoryMarquee({ cat, direction }: { cat: ClientCategory; direction: "left" | "right" }) {
  // Collect all clients across all subgroups for the marquee preview
  const allClients = cat.groups.flatMap((g) => g.clients);

  // Ensure track has enough items to span wide screens seamlessly without empty gaps
  const MIN_ITEMS = 12;
  const multiplier = Math.max(1, Math.ceil(MIN_ITEMS / allClients.length));
  const baseTrack: Client[] = [];
  for (let i = 0; i < multiplier; i++) {
    baseTrack.push(...allClients);
  }

  // Speed calibrated to track length: consistent comfortable velocity across short and long categories
  const duration = Math.max(26, baseTrack.length * 3.2);

  return (
    <div
      className="relative w-full overflow-hidden py-2 select-none group/marquee touch-pan-y"
      aria-label={`${cat.title} logo marquee`}
    >
      {/* Subtle edge gradient masks for gentle fade into navy background */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-navy to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-navy to-transparent z-10" />

      {/* Marquee Track */}
      <div
        className={`flex w-max items-center gap-5 sm:gap-8 ${
          direction === "left" ? "partner-marquee-left" : "partner-marquee-right"
        } group-hover/marquee:[animation-play-state:paused] focus-within:[animation-play-state:paused]`}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {/* Primary sequence */}
        {baseTrack.map((client, idx) => (
          <PartnerCard key={`m-${cat.num}-${client.name}-${idx}`} client={client} />
        ))}

        {/* Seamless duplicate track (hidden from assistive technologies) */}
        <div aria-hidden="true" className="flex items-center gap-5 sm:gap-8">
          {baseTrack.map((client, idx) => (
            <PartnerCard key={`m-dup-${cat.num}-${client.name}-${idx}`} client={client} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Expandable Partner Gallery Modal
───────────────────────────────────────────────────────────── */
function PartnerGalleryModal({
  category,
  onClose,
}: {
  category: ClientCategory | null;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!category) return;

    // Lock background scrolling
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Auto focus close button on open
    closeButtonRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = origOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [category, onClose]);

  if (!category) return null;

  const totalPartners = category.groups.reduce((acc, g) => acc + g.clients.length, 0);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="partner-modal-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      data-lenis-prevent
      className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6 lg:p-10 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-5xl max-h-[90vh] flex flex-col rounded-2xl bg-[#0c1024] border border-champagne/25 shadow-2xl text-ink-inverse overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-champagne/15 p-6 sm:p-8 bg-[#0e122b]/95 backdrop-blur-sm">
          <div className="space-y-1.5 pr-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs uppercase tracking-[0.22em] text-champagne font-semibold">
                Sector {category.num}
              </span>
              <span className="border border-champagne/30 bg-champagne/10 px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-champagne font-semibold">
                {totalPartners} Curated Partners
              </span>
            </div>
            <h3
              id="partner-modal-title"
              className="font-display text-2xl sm:text-3xl lg:text-4xl text-ink-inverse font-normal leading-tight"
            >
              {category.title}
            </h3>
            {category.subtitle && (
              <p className="text-xs uppercase tracking-[0.18em] text-champagne/80 font-medium">
                {category.subtitle}
              </p>
            )}
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close partner gallery"
            className="flex h-9 w-9 flex-none items-center justify-center border border-ink-inverse/25 text-ink-inverse/80 transition-colors duration-300 hover:border-champagne hover:bg-champagne hover:text-navy text-lg leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
          >
            ✕
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1 scrollbar-thin">
          {category.groups.map((group, gIdx) => (
            <div key={group.title || `group-${gIdx}`}>
              {/* Subgroup Heading if category has multiple named groups */}
              {group.title && (
                <div className="flex items-center gap-3 pb-3 mb-4 border-b border-champagne/20">
                  <span className="h-1.5 w-1.5 bg-champagne" />
                  <h4 className="text-xs uppercase tracking-[0.2em] text-champagne font-semibold">
                    {group.title} ({group.clients.length})
                  </h4>
                </div>
              )}

              {/* Logo Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
                {group.clients.map((client) => (
                  <PartnerCard key={client.name} client={client} isModal />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-champagne/15 px-6 py-4 bg-[#0e122b]/90 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-muted-inverse text-xs uppercase tracking-[0.16em]">
            Showing all {totalPartners} brand partners in {category.title}
          </span>
          <a
            href="#contact"
            onClick={onClose}
            className="text-champagne hover:text-ink-inverse transition-colors font-semibold uppercase tracking-[0.18em] flex items-center gap-1.5"
          >
            <span>Partner with PlanBee</span>
            <span>→</span>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main Trusted Partnerships Section
───────────────────────────────────────────────────────────── */
export function TrustedPartnerships() {
  const [selectedCategory, setSelectedCategory] = useState<ClientCategory | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const handleOpenModal = useCallback((cat: ClientCategory, triggerEl: HTMLElement) => {
    triggerRef.current = triggerEl;
    setSelectedCategory(cat);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedCategory(null);
    triggerRef.current?.focus();
  }, []);

  return (
    <section
      id="clients"
      className="section-pad relative bg-navy border-t border-ink-inverse/12 text-ink-inverse overflow-hidden"
    >
      <div id="partnerships" className="absolute -top-24" />
      {/* Section Header (Unified Site Heading Design) */}
      <div className="shell mb-16 sm:mb-20">
        <p className="eyebrow text-muted-inverse">TRUSTED PARTNERSHIPS</p>

        <div className="mt-4 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <h2 className="display-lg text-ink-inverse max-w-[24ch]">
            <MaskLine>Brands & Partners</MaskLine>
            <MaskLine delay={0.12} className="text-muted-inverse">
              We've Worked With.
            </MaskLine>
          </h2>

          <p className="max-w-xl text-base sm:text-lg leading-relaxed text-muted-inverse">
            100+ brand partnerships across entertainment, real estate, media, government, education,
            healthcare, retail, hospitality, F&B and lifestyle.
          </p>
        </div>
      </div>

      {/* Full-Width Partner Categories with Alternating Marquees */}
      <div className="space-y-12 sm:space-y-16">
        {clientCategories.map((cat, idx) => {
          // Alternating Direction:
          // Section 1 (idx 0): right to left ("left")
          // Section 2 (idx 1): left to right ("right")
          // Section 3 (idx 2): right to left ("left")
          // Section 4 (idx 3): left to right ("right")
          // Section 5 (idx 4): right to left ("left")
          const direction: "left" | "right" = idx % 2 === 0 ? "left" : "right";
          const totalCategoryClients = cat.groups.reduce((acc, g) => acc + g.clients.length, 0);

          return (
            <div
              key={cat.num}
              className="border-t border-ink-inverse/10 pt-10 sm:pt-14 first:border-t-0"
            >
              {/* Category Header Row (Unified Editorial Typography) */}
              <div className="shell mb-6 sm:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="flex items-baseline gap-4 sm:gap-6 flex-wrap">
                  <span className="font-display text-[clamp(2.4rem,4.2vw,3.8rem)] font-light leading-none text-champagne/40">
                    {cat.num}
                  </span>
                  <div>
                    <h3 className="display-md text-ink-inverse">
                      <MaskLine>{cat.title}</MaskLine>
                    </h3>
                    {cat.subtitle && (
                      <p className="mt-2 text-xs sm:text-[0.82rem] font-medium uppercase tracking-[0.18em] text-champagne/90">
                        {cat.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                {/* Explore All Partners CTA */}
                <button
                  type="button"
                  onClick={(e) => handleOpenModal(cat, e.currentTarget)}
                  aria-label={`Explore all ${totalCategoryClients} partners in ${cat.title}`}
                  className="group inline-flex items-center gap-3 border border-champagne/40 bg-transparent px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-champagne transition-colors duration-500 hover:border-champagne hover:bg-champagne hover:text-navy self-start md:self-end focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
                >
                  <span>Explore All Partners ({totalCategoryClients})</span>
                  <span className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </button>
              </div>

              {/* Continuous Alternating Marquee Track */}
              <CategoryMarquee cat={cat} direction={direction} />
            </div>
          );
        })}
      </div>

      {/* Expandable Partner Gallery Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <PartnerGalleryModal category={selectedCategory} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </section>
  );
}
