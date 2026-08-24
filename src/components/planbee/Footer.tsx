import { contact } from "@/data/planbee";
import planbeeMark from "@/assets/brand/planbee-icon-white.png";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Services", href: "#services" },
  { label: "Clients", href: "#clients" },
  { label: "Past Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const columnHeading = "text-[0.68rem] lg:text-[0.62rem] uppercase tracking-[0.3em] text-champagne";
// Mobile keeps the readable 0.68rem size and gives up letter-spacing instead, so the
// long credit line stays on one line without dropping below legible size.
const bottomText =
  "text-[0.68rem] tracking-[0.06em] uppercase text-muted-inverse/70 sm:tracking-[0.24em] lg:text-[0.62rem]";

export function Footer() {
  return (
    <footer className="grain relative border-t border-ink-inverse/12 bg-navy">
      <div className="grain-overlay" />
      <div className="shell relative">
        {/* Brand · Navigate · Contact */}
        <div className="grid gap-9 py-12 md:grid-cols-12 md:gap-8 md:py-16 lg:py-20">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <img src={planbeeMark} alt="" className="h-8 w-auto" />
              <span className="font-display text-xl tracking-[0.42em] text-ink-inverse">
                PLANBEE
              </span>
            </div>
            <p className="mt-5 max-w-xs font-display text-2xl leading-snug text-ink-inverse/90 md:mt-7">
              Transforming Events Into Unforgettable Experiences
            </p>
            <p className="mt-4 text-[0.68rem] uppercase tracking-[0.3em] text-muted-inverse md:mt-5 lg:text-[0.62rem]">
              Events · Marketing · Talent Management
            </p>
          </div>

          <nav className="md:col-span-3 md:col-start-7">
            <h3 className={columnHeading}>Navigate</h3>
            <ul className="mt-4 space-y-0.5 md:mt-6 md:space-y-1">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="inline-block py-1.5 text-sm text-muted-inverse transition-colors hover:text-champagne"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3 md:col-start-10">
            <h3 className={columnHeading}>Get in Touch</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-inverse md:mt-6 md:space-y-4">
              <li>
                <a
                  href={`tel:${contact.phone}`}
                  className="transition-colors hover:text-champagne"
                >
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="break-all transition-colors hover:text-champagne"
                >
                  {contact.email}
                </a>
              </li>
              <li className="leading-relaxed">{contact.address}</li>
            </ul>
          </div>
        </div>

        {/* Oversized closing wordmark */}
        <div className="border-t border-ink-inverse/12 pt-8 md:pt-10">
          <p className="text-center font-display leading-[0.8] tracking-[0.06em] text-ink-inverse text-[clamp(3rem,15vw,13rem)]">
            PLANBEE
          </p>
        </div>

        {/* Legal + credit */}
        <div className="mt-8 flex flex-col gap-2 border-t border-ink-inverse/12 py-6 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:py-7">
          <span className={bottomText}>
            © {new Date().getFullYear()} PlanBee · Hyderabad, India
          </span>
          <a
            href="https://navedhana.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`${bottomText} transition-colors hover:text-champagne`}
          >
            Developed by Navedhana Software Services
          </a>
        </div>
      </div>
    </footer>
  );
}
