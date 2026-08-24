import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const links = [
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Services", href: "#services" },
  { label: "Clients", href: "#clients" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          scrolled
            ? "border-b border-border bg-background/70 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <nav className="shell flex items-center justify-between py-5">
          <a
            href="#top"
            className="font-display text-xl tracking-[0.42em] text-foreground sm:text-2xl"
          >
            PLANBEE
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="group relative text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-champagne transition-all duration-500 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden border border-champagne/60 px-6 py-3 text-[0.68rem] uppercase tracking-[0.3em] text-champagne transition-colors duration-500 hover:bg-champagne hover:text-background sm:inline-block"
            >
              Let's Create
            </a>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 flex-col items-end justify-center gap-[6px] lg:hidden"
            >
              <span className="h-px w-7 bg-foreground" />
              <span className="h-px w-4 bg-foreground" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="shell flex items-center justify-between py-5">
              <span className="font-display text-xl tracking-[0.42em]">PLANBEE</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="font-display text-3xl leading-none"
              >
                ×
              </button>
            </div>
            <div className="shell mt-10 flex flex-col">
              {links.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-border py-6 font-display text-4xl text-foreground sm:text-5xl"
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-10 inline-block border border-champagne/60 px-8 py-4 text-center text-[0.7rem] uppercase tracking-[0.3em] text-champagne"
              >
                Let's Create
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
