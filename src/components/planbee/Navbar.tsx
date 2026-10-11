import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import planbeeMarkDark from "@/assets/brand/planbee-icon-dark.png";
import planbeeMarkLight from "@/assets/brand/planbee-icon-white.png";

const links = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Partnerships", href: "#partnerships" },
  { label: "Work", href: "#work" },
  { label: "Clients", href: "#clients" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      setOpen(false);
      if (href === "#top") {
        if (lenis) {
          lenis.scrollTo(0, { duration: 1.2 });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        const target = document.querySelector(href);
        if (target) {
          if (lenis) {
            lenis.scrollTo(target as HTMLElement, { offset: -76, duration: 1.2 });
          } else {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
      history.pushState(null, "", href);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Before scrolling, the nav floats transparent over the dark hero and needs
          light text; once scrolled it sits on its own cream backdrop and needs dark text. */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          scrolled
            ? "border-b border-border bg-background/95 backdrop-blur-xl shadow-sm"
            : "border-b border-transparent"
        }`}
      >
        <nav className="shell relative flex items-center justify-between py-4 sm:py-5">
          <a
            href="#top"
            onClick={(e) => handleNavClick(e, "#top")}
            className="flex items-center gap-2.5 sm:gap-3 transition-opacity hover:opacity-90"
          >
            <img
              src={scrolled ? planbeeMarkDark : planbeeMarkLight}
              alt="PlanBee Logo"
              className="h-7 w-auto sm:h-8"
            />
          </a>

          <ul className="hidden items-center gap-7 xl:gap-9 lg:flex">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.href)}
                  className={`group relative text-xs uppercase tracking-[0.2em] font-medium transition-colors ${
                    scrolled
                      ? "text-muted-foreground hover:text-foreground"
                      : "text-muted-inverse hover:text-ink-inverse"
                  }`}
                >
                  {l.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-champagne transition-all duration-500 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="hidden sm:inline-block border border-champagne bg-champagne px-5 py-2.5 sm:px-6 sm:py-3 text-xs font-semibold uppercase tracking-[0.2em] text-background transition-colors duration-500 hover:bg-transparent hover:text-champagne"
            >
              Partner with us
            </a>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="-mr-2 flex h-11 w-11 flex-col items-end justify-center gap-[6px] lg:hidden"
            >
              <span className={`h-px w-7 ${scrolled ? "bg-foreground" : "bg-ink-inverse"}`} />
              <span className={`h-px w-4 ${scrolled ? "bg-foreground" : "bg-ink-inverse"}`} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            data-lenis-prevent
            className="fixed inset-0 z-[60] overflow-y-auto overscroll-contain bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="shell relative flex items-center justify-end py-5">
              <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2">
                <img
                  src={planbeeMarkDark}
                  alt="PlanBee Logo"
                  className="h-7 w-auto sm:h-9 lg:h-8"
                />
                <span className="font-display text-lg tracking-[0.2em] sm:text-2xl sm:tracking-[0.42em] lg:text-2xl">
                  PLANBEE
                </span>
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="font-display text-3xl leading-none"
              >
                ×
              </button>
            </div>
            <div className="shell mt-6 flex flex-col pb-10">
              {links.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.href)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-border py-4 text-center font-display text-3xl text-foreground sm:py-6 sm:text-5xl"
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="mt-8 inline-block border border-champagne bg-champagne px-8 py-4 text-center text-[0.7rem] uppercase tracking-[0.3em] text-background transition-colors hover:bg-transparent hover:text-champagne"
              >
                Partner with us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
