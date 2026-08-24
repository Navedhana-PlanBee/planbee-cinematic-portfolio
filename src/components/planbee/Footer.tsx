const links = [
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Services", href: "#services" },
  { label: "Clients", href: "#clients" },
  { label: "Past Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="grain relative border-t border-border pt-20">
      <div className="grain-overlay" />
      <div className="shell relative">
        <p className="font-display leading-[0.85] tracking-[0.06em] text-bone text-[clamp(3rem,15vw,13rem)]">
          PLANBEE
        </p>

        <div className="mt-12 grid gap-10 border-t border-border pt-10 md:grid-cols-12">
          <p className="max-w-sm font-display text-xl leading-snug text-muted-foreground md:col-span-5">
            Transforming Events Into Unforgettable Experiences
          </p>
          <nav className="md:col-span-4 md:col-start-9">
            <ul className="grid grid-cols-2 gap-y-3">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-champagne"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border py-8">
          <span className="text-[0.6rem] uppercase tracking-[0.35em] text-muted-foreground">
            Hyderabad · India
          </span>
          <span className="text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground/60">
            © {new Date().getFullYear()} PlanBee
          </span>
        </div>
      </div>
    </footer>
  );
}
