import { clientCategories, type ClientCategory } from "@/data/planbee";
import { MaskLine, Reveal, Rule } from "./Reveal";

function ClientName({ name, size = "md" }: { name: string; size?: "md" | "lg" }) {
  return (
    <span
      className={`group inline-flex cursor-default items-baseline whitespace-nowrap font-display leading-none text-bone/70 transition-all duration-500 hover:text-bone ${
        size === "lg"
          ? "text-[clamp(1.4rem,3vw,2.6rem)]"
          : "text-[clamp(1.15rem,2vw,1.75rem)]"
      }`}
    >
      <span className="relative inline-block transition-transform duration-500 group-hover:-translate-y-1">
        {name}
        <span className="absolute -bottom-1 left-0 h-px w-0 bg-champagne transition-all duration-500 group-hover:w-full" />
      </span>
    </span>
  );
}

function Marquee({ names }: { names: string[] }) {
  const row = [...names, ...names];
  return (
    <div className="relative overflow-hidden py-4">
      <div
        className="flex w-max gap-14"
        style={{ animation: "marquee-x 42s linear infinite" }}
      >
        {row.map((n, i) => (
          <span key={`${n}-${i}`} className="flex items-center gap-14">
            <ClientName name={n} size="lg" />
            <span className="h-1 w-1 rounded-full bg-champagne/50" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}

function CategoryHeader({ cat }: { cat: ClientCategory }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
      <span className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-none text-champagne/25">
        {cat.num}
      </span>
      <h3 className="display-md max-w-[26ch] text-bone">
        <MaskLine>{cat.title}</MaskLine>
      </h3>
    </div>
  );
}

function Category({ cat }: { cat: ClientCategory }) {
  return (
    <div className="border-t border-border pt-12 pb-20 lg:pb-28">
      <CategoryHeader cat={cat} />

      {cat.layout === "marquee" && (
        <div className="mt-14">
          <Marquee names={cat.groups[0]!.names} />
        </div>
      )}

      {cat.layout === "two-column" && (
        <div className="mt-14 grid gap-14 md:grid-cols-2">
          {cat.groups.map((g) => (
            <Reveal key={g.title}>
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-champagne">{g.title}</p>
              <Rule className="mt-5" />
              <ul className="mt-6 space-y-4">
                {g.names.map((n) => (
                  <li key={n}>
                    <ClientName name={n} />
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      )}

      {cat.layout === "editorial" && (
        <div className="mt-14 grid gap-x-14 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {cat.groups.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.06}>
              <p className="text-[0.62rem] uppercase tracking-[0.3em] text-muted-foreground">
                {g.title}
              </p>
              <Rule className="mt-4" />
              <ul className="mt-5 space-y-3">
                {g.names.map((n) => (
                  <li key={n}>
                    <ClientName name={n} />
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      )}

      {cat.layout === "final" && (
        <div className="mt-14 space-y-14">
          {cat.groups.map((g) => (
            <Reveal key={g.title}>
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-champagne">{g.title}</p>
              <Rule className="mt-5" />
              <div className="mt-7 flex flex-wrap items-baseline gap-x-10 gap-y-5">
                {g.names.map((n) => (
                  <ClientName key={n} name={n} size="lg" />
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}

export function TrustedPartnerships() {
  return (
    <section id="clients" className="section-pad border-t border-border">
      <div className="shell">
        <p className="eyebrow">Trusted Partnerships</p>
        <h2 className="display-lg mt-6 text-bone">
          <MaskLine>Our Clients</MaskLine>
        </h2>
        <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
          49+ brand partnerships across live entertainment, real estate, media, government,
          healthcare, hospitality and food & beverage.
        </p>

        <div className="mt-24">
          {clientCategories.map((c) => (
            <Category key={c.num} cat={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
