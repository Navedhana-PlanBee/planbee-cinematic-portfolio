import { contact } from "@/data/planbee";
import planbeeMark from "@/assets/brand/planbee-icon-white.png";
import { Instagram, Linkedin, Phone, Mail, MapPin } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Services", href: "#services" },
  { label: "Clients", href: "#clients" },
  { label: "Our Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const columnHeading = "text-[0.68rem] lg:text-[0.62rem] uppercase tracking-[0.3em] text-champagne";
// Mobile keeps the readable 0.68rem size and gives up letter-spacing instead, so the
// long credit line stays on one line without dropping below legible size.
const bottomText =
  "text-[0.68rem] tracking-[0.06em] uppercase text-muted-inverse/70 sm:tracking-[0.24em] lg:text-[0.62rem]";

export function Footer() {
  return (
    <footer className="grain relative border-t border-ink-inverse/12 bg-navy overflow-hidden">
      <div className="grain-overlay" />
      
      <div className="shell relative pt-10 pb-4 lg:pt-12 lg:pb-6">
        {/* Brand · Navigate · Contact */}
        <div className="grid gap-10 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <img src={planbeeMark} alt="" className="h-8 w-auto" />
              <span className="font-display text-xl tracking-[0.42em] text-ink-inverse">
                PLANBEE
              </span>
            </div>
            <p className="mt-5 max-w-xs font-display text-2xl leading-snug text-ink-inverse/90 md:mt-7">
              Ideas. Partnerships. Experiences.
            </p>
            <p className="mt-4 text-[0.68rem] uppercase tracking-[0.3em] text-muted-inverse md:mt-5 lg:text-[0.62rem]">
              EVENTS · BRAND PARTNERSHIPS · ACTIVATIONS · MARKETING · TALENT
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-2 gap-y-8 text-center md:text-left md:col-span-7 md:col-start-6 sm:grid-cols-3">
            <nav>
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

            <div>
              <h3 className={columnHeading}>Get in Touch</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-inverse md:mt-6 md:space-y-4">
                <li>
                  <a
                    href={`tel:+918688075841`}
                    className="inline-flex items-center justify-center md:justify-start gap-2 transition-colors hover:text-champagne"
                  >
                    <Phone className="w-4 h-4" />
                    +91 86880 75841
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:hello@planbee.co`}
                    className="inline-flex items-center justify-center md:justify-start gap-2 break-all transition-colors hover:text-champagne"
                  >
                    <Mail className="w-4 h-4" />
                    hello@planbee.co
                  </a>
                </li>
                <li className="inline-flex items-center justify-center md:justify-start gap-2 leading-relaxed">
                  <MapPin className="w-4 h-4" />
                  Hyderabad, India
                </li>
                <li className="pt-2">
                  <a
                    href="https://wa.me/918688075841"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center md:justify-start gap-2 transition-colors hover:text-champagne"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                    </svg>
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h3 className={columnHeading}>Social</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-inverse md:mt-6 md:space-y-4">
                <li>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center md:justify-start gap-2 transition-colors hover:text-champagne">
                    <Instagram className="w-4 h-4" />
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center md:justify-start gap-2 transition-colors hover:text-champagne">
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Oversized closing wordmark */}
        <div className="border-t border-ink-inverse/12 pt-6 pb-2 mt-8 md:mt-10 md:pt-8">
          <p className="text-center font-display leading-[0.8] tracking-[0.06em] text-ink-inverse text-[clamp(3rem,15vw,13rem)]">
            PLANBEE
          </p>
          <p className="mt-4 text-center text-[0.68rem] tracking-[0.2em] lg:tracking-[0.28em] uppercase text-champagne/80">
            A Raising Aspires Group Company
          </p>
        </div>

        {/* Legal + credit */}
        <div className="mt-4 flex flex-col gap-2 border-t border-ink-inverse/12 py-4 sm:mt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:py-5 text-center sm:text-left">
          <span className={bottomText}>
            © {new Date().getFullYear()} Raising Aspires Group. All rights reserved.
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
