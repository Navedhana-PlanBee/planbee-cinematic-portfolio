"use client";

import { useState, useEffect, useCallback, useRef, type TouchEvent } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export interface CarouselItem {
  tag?: string;
  titleLine1: string;
  titleLine2?: string;
  desc?: string;
  img: string;
  ctaText?: string;
  ctaUrl?: string;
}

export interface CoverFlowCarouselProps {
  items: CarouselItem[];
  sectionLabel?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
  className?: string;
  onCtaClick?: (item: CarouselItem) => void;
}

export function CoverFlowCarousel({
  items,
  sectionLabel = "BEST SELLERS",
  autoplay = true,
  autoplayDelay = 5000,
  className = "",
  onCtaClick,
}: CoverFlowCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(0);
  const total = items.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx % total);
  };

  useEffect(() => {
    if (!autoplay || isHovered || total <= 1) return;
    const interval = setInterval(nextSlide, autoplayDelay);
    return () => clearInterval(interval);
  }, [autoplay, autoplayDelay, isHovered, nextSlide, total]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0]!.clientX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const diff = e.changedTouches[0]!.clientX - touchStartX.current;
    if (Math.abs(diff) > 45) {
      if (diff < 0) nextSlide();
      else prevSlide();
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <section
      className={`relative w-full min-h-[760px] flex items-center justify-center overflow-hidden py-12 select-none ${className}`}
      style={{
        backgroundColor: "#0c0a09",
        color: "#ffffff",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Subtle Background Lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, rgba(179,81,42,0.12) 0%, rgba(18,24,58,0.95) 100%)",
          }}
        />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-4 z-10 flex flex-col items-center">
        {/* Standard Section Heading */}
        <div className="text-center mb-8 sm:mb-12">
          {sectionLabel && <p className="eyebrow text-champagne">{sectionLabel}</p>}
          <h2 className="display-lg mt-4 text-ink-inverse">Experiential & Brand Solutions</h2>
        </div>

        {/* 3D Coverflow Stage */}
        <div
          className="relative w-full h-[520px] flex justify-center items-center mb-8"
          style={{ perspective: "1400px" }}
        >
          {items.map((item, idx) => {
            const offset = (idx - currentIndex + total) % total;

            let transform = "translateX(0px) scale(0.4) rotateY(0deg)";
            let opacity = 0;
            let zIndex = 0;
            let isCenter = false;

            if (offset === 0) {
              isCenter = true;
              transform = "translateX(0px) scale(1) rotateY(0deg)";
              opacity = 1;
              zIndex = 30;
            } else if (offset === 1) {
              transform = "translateX(285px) scale(0.86) rotateY(-20deg)";
              opacity = 0.85;
              zIndex = 20;
            } else if (offset === 2) {
              transform = "translateX(510px) scale(0.72) rotateY(-32deg)";
              opacity = 0.65;
              zIndex = 10;
            } else if (offset === total - 1) {
              transform = "translateX(-285px) scale(0.86) rotateY(20deg)";
              opacity = 0.85;
              zIndex = 20;
            } else if (offset === total - 2) {
              transform = "translateX(-510px) scale(0.72) rotateY(32deg)";
              opacity = 0.65;
              zIndex = 10;
            }

            return (
              <div
                key={idx}
                onClick={() => !isCenter && goToSlide(idx)}
                style={{
                  position: "absolute",
                  width: "330px",
                  height: "500px",
                  borderRadius: "18px",
                  overflow: "hidden",
                  backgroundColor: "#171311",
                  border: "1px solid rgba(255, 255, 255, 0.16)",
                  transform,
                  opacity,
                  zIndex,
                  transformOrigin: "center center",
                  transition: "all 800ms cubic-bezier(0.25, 1, 0.5, 1)",
                  boxShadow: isCenter
                    ? "0 25px 60px rgba(0,0,0,0.9), 0 0 35px rgba(197,168,128,0.25)"
                    : "0 15px 35px rgba(0,0,0,0.5)",
                  cursor: isCenter ? "default" : "pointer",
                }}
              >
                {/* Photo */}
                <img
                  src={item.img}
                  alt={item.titleLine1}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                {/* Bottom Legibility Gradient */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.78) 100%)",
                    pointerEvents: "none",
                    zIndex: 10,
                  }}
                />

                {/* Content Overlay */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    padding: "20px 18px 22px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    textAlign: "center",
                    zIndex: 20,
                    opacity: isCenter ? 1 : 0,
                    transform: isCenter ? "translateY(0px)" : "translateY(16px)",
                    transition: "opacity 500ms ease, transform 500ms ease",
                    pointerEvents: isCenter ? "auto" : "none",
                  }}
                >
                  {/* Tag */}
                  <div style={{ textAlign: "right", width: "100%", paddingRight: "4px" }}>
                    <span
                      style={{
                        display: "inline-block",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.95)",
                        textShadow: "0 2px 6px rgba(0,0,0,0.8)",
                      }}
                    >
                      {item.tag}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                      marginTop: "auto",
                      paddingBottom: "6px",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.85rem",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.03em",
                        color: "#ffffff",
                        margin: 0,
                        lineHeight: 1.12,
                        textShadow: "0 3px 12px rgba(0,0,0,0.95)",
                      }}
                    >
                      {item.titleLine1}
                    </h3>

                    {item.titleLine2 && (
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.4rem",
                          fontWeight: 500,
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                          color: "#f3f0ea",
                          lineHeight: 1.2,
                          textShadow: "0 3px 10px rgba(0,0,0,0.9)",
                        }}
                      >
                        {item.titleLine2}
                      </span>
                    )}

                    <div
                      style={{
                        width: "36px",
                        height: "2px",
                        backgroundColor: "#c5a880",
                        borderRadius: "2px",
                        margin: "6px auto 5px",
                        boxShadow: "0 0 8px rgba(197,168,128,0.7)",
                      }}
                    />

                    {item.desc && (
                      <p
                        style={{
                          fontSize: "0.88rem",
                          color: "rgba(255,255,255,0.92)",
                          maxWidth: "290px",
                          margin: "0 0 12px",
                          lineHeight: 1.4,
                          textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                        }}
                      >
                        {item.desc}
                      </p>
                    )}

                    {item.ctaText && (
                      <a
                        href={item.ctaUrl || "#"}
                        onClick={(e) => {
                          if (onCtaClick) {
                            e.preventDefault();
                            onCtaClick(item);
                          }
                        }}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "8px 20px",
                          borderRadius: "9999px",
                          background: "linear-gradient(135deg, #c5a880 0%, #a48256 100%)",
                          color: "#110d0c",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          textDecoration: "none",
                          boxShadow: "0 4px 14px rgba(0,0,0,0.4), 0 0 15px rgba(197,168,128,0.3)",
                          cursor: "pointer",
                          transition: "transform 200ms ease, box-shadow 200ms ease",
                        }}
                      >
                        <span>{item.ctaText}</span>
                        <ArrowRight size={13} strokeWidth={2.5} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          style={{
            position: "absolute",
            left: "24px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            backgroundColor: "rgba(0,0,0,0.55)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(8px)",
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            zIndex: 40,
            transition: "all 200ms ease",
          }}
        >
          <ChevronLeft size={20} strokeWidth={2.5} />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next slide"
          style={{
            position: "absolute",
            right: "24px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            backgroundColor: "rgba(0,0,0,0.55)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(8px)",
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            zIndex: 40,
            transition: "all 200ms ease",
          }}
        >
          <ChevronRight size={20} strokeWidth={2.5} />
        </button>

        {/* Pagination Dots */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            zIndex: 30,
          }}
        >
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{
                height: "8px",
                width: idx === currentIndex ? "28px" : "8px",
                borderRadius: "9999px",
                backgroundColor: idx === currentIndex ? "#c5a880" : "rgba(255,255,255,0.25)",
                border: "none",
                cursor: "pointer",
                boxShadow: idx === currentIndex ? "0 0 10px rgba(197,168,128,0.7)" : "none",
                transition: "all 300ms ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
