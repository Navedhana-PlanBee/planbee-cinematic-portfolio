import { clientCategories, type Client, type ClientCategory } from "@/data/planbee";
import { MaskLine, Reveal, Rule } from "./Reveal";

function ClientLogo({ client, sizing }: { client: Client; sizing: string }) {
  return (
    <span
      className={`group flex cursor-default items-center justify-center rounded-lg border border-transparent bg-white p-4 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-champagne hover:shadow-md ${sizing}`}
      title={client.name}
    >
      <img
        src={client.logo}
        alt={client.name}
        loading="lazy"
        className="h-full w-full object-contain transition-all duration-500 md:filter md:grayscale md:opacity-80 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100"
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
      <div>
        <h3 className="display-md max-w-[26ch] text-ink-inverse">
          <MaskLine>{cat.title}</MaskLine>
        </h3>
        {cat.subtitle && (
          <Reveal delay={0.15}>
            <p className="mt-3 text-[0.7rem] sm:text-[0.8rem] uppercase tracking-[0.2em] text-champagne/90">
              {cat.subtitle}
            </p>
          </Reveal>
        )}
      </div>
    </div>
  );
}

function Category({ cat }: { cat: ClientCategory }) {
  return (
    <div className="border-t border-ink-inverse/12 pt-12 pb-20 lg:pb-28">
      <CategoryHeader cat={cat} />

      <div className="mt-14 space-y-12 lg:space-y-16">
        {cat.groups.map((g, i) => (
          <Reveal key={g.title || `group-${i}`} delay={i * 0.05}>
            {g.title && (
              <>
                <p className="text-[0.7rem] lg:text-[0.65rem] uppercase tracking-[0.3em] text-champagne">
                  {g.title}
                </p>
                <Rule tone="inverse" className="mt-4 lg:mt-5" />
              </>
            )}
            <div
              className={`${
                g.title ? "mt-6 lg:mt-8" : ""
              } grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6`}
            >
              {g.clients.map((c) => (
                <ClientLogo key={c.name} client={c} sizing="h-20 w-full sm:h-24" />
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function TrustedPartnerships() {
  return (
    <section id="clients" className="section-pad border-t border-ink-inverse/12 bg-navy">
      <div className="shell">
        <p className="eyebrow text-muted-inverse">TRUSTED PARTNERSHIPS</p>
        <h2 className="display-lg mt-6 text-ink-inverse">
          <MaskLine>Brands & Partners We've Worked With</MaskLine>
        </h2>
        <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-inverse sm:text-base">
          100+ brand partnerships across entertainment, real estate, media, government,
          education, healthcare, retail, hospitality, F&B and lifestyle.
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
