import { clientCategories, type Client, type ClientCategory } from "@/data/planbee";
import { MaskLine, Reveal, Rule } from "./Reveal";

// `sizing` controls the box: grids pass a fluid cell, the marquee a fixed track item.
function ClientLogo({ client, sizing }: { client: Client; sizing: string }) {
  return (
    <span
      className={`group flex cursor-default items-center justify-center rounded-md border border-border/60 bg-white p-3 transition-all duration-500 hover:border-champagne/60 ${sizing}`}
      title={client.name}
    >
      <img
        src={client.logo}
        alt={client.name}
        loading="lazy"
        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
      />
    </span>
  );
}

// Fluid cell that fills its grid column, so rows stay even at every width.
const CELL = "h-16 w-full sm:h-20";

// Even 2-up on phones, denser as the viewport grows.
const LOGO_GRID = "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4";

function Marquee({ clients }: { clients: Client[] }) {
  const row = [...clients, ...clients];
  return (
    <div className="relative overflow-hidden py-4">
      <div
        className="flex w-max gap-4 sm:gap-8"
        style={{ animation: "marquee-x 42s linear infinite" }}
      >
        {row.map((c, i) => (
          <ClientLogo
            key={`${c.name}-${i}`}
            client={c}
            sizing="h-20 w-32 flex-none sm:h-24 sm:w-48"
          />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-navy to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-navy to-transparent sm:w-16" />
    </div>
  );
}

function CategoryHeader({ cat }: { cat: ClientCategory }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
      <span className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-none text-champagne/35">
        {cat.num}
      </span>
      <h3 className="display-md max-w-[26ch] text-ink-inverse">
        <MaskLine>{cat.title}</MaskLine>
      </h3>
    </div>
  );
}

function Category({ cat }: { cat: ClientCategory }) {
  return (
    <div className="border-t border-ink-inverse/12 pt-12 pb-20 lg:pb-28">
      <CategoryHeader cat={cat} />

      {cat.layout === "marquee" && (
        <div className="mt-14">
          <Marquee clients={cat.groups[0]!.clients} />
        </div>
      )}

      {cat.layout === "two-column" && (
        <div className="mt-14 grid gap-14 md:grid-cols-2">
          {cat.groups.map((g) => (
            <Reveal key={g.title}>
              <p className="text-[0.7rem] lg:text-[0.65rem] uppercase tracking-[0.3em] text-champagne">{g.title}</p>
              <Rule tone="inverse" className="mt-5" />
              <div className={`mt-6 ${LOGO_GRID}`}>
                {g.clients.map((c) => (
                  <ClientLogo key={c.name} client={c} sizing={CELL} />
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      )}

      {cat.layout === "editorial" && (
        <div className="mt-14 grid gap-x-14 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {cat.groups.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.06}>
              <p className="text-[0.68rem] lg:text-[0.62rem] uppercase tracking-[0.3em] text-muted-inverse">
                {g.title}
              </p>
              <Rule tone="inverse" className="mt-4" />
              <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4">
                {g.clients.map((c) => (
                  <ClientLogo key={c.name} client={c} sizing={CELL} />
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      )}

      {cat.layout === "final" && (
        <div className="mt-14 space-y-14">
          {cat.groups.map((g) => (
            <Reveal key={g.title}>
              <p className="text-[0.7rem] lg:text-[0.65rem] uppercase tracking-[0.3em] text-champagne">{g.title}</p>
              <Rule tone="inverse" className="mt-5" />
              <div className={`mt-7 ${LOGO_GRID} lg:grid-cols-6`}>
                {g.clients.map((c) => (
                  <ClientLogo key={c.name} client={c} sizing={CELL} />
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
    <section id="clients" className="section-pad border-t border-ink-inverse/12 bg-navy">
      <div className="shell">
        <p className="eyebrow text-muted-inverse">Trusted Partnerships</p>
        <h2 className="display-lg mt-6 text-ink-inverse">
          <MaskLine>Our Clients</MaskLine>
        </h2>
        <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-inverse">
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
