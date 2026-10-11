import { useState } from "react";
import { toast } from "sonner";
import { contact } from "@/data/planbee";
import { MaskLine, Reveal } from "./Reveal";

const fields = [
  { name: "name", label: "Name*", type: "text" },
  { name: "company", label: "Company / Brand*", type: "text" },
  { name: "email", label: "Email*", type: "email" },
  { name: "phone", label: "Phone*", type: "tel" },
];

export function Contact() {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const company = String(data.get("company") ?? "");
    const email = String(data.get("email") ?? "");
    const phone = String(data.get("phone") ?? "");
    const service = String(data.get("service") ?? "General Inquiry");
    const details = String(data.get("details") ?? "");

    const subject = `New enquiry — ${name} (${company || "PlanBee"}) [${service}]`;
    const body = [
      `Name: ${name}`,
      `Company / Brand: ${company}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Interested In: ${service}`,
      `Project Details: ${details}`,
    ].join("\n");

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(body).catch(() => {});
    }

    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    toast.success("Opening your email client with your enquiry details.");
    setSending(false);
  };

  return (
    <section id="contact" className="section-pad border-t border-border">
      <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col justify-center lg:py-10">
          <p className="eyebrow">GET IN TOUCH</p>
          <h2 className="display-lg mt-4 text-bone">
            <MaskLine>Let's Create</MaskLine>
            <MaskLine delay={0.1}>Something Together.</MaskLine>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground md:mt-8">
            Events, partnerships, activations, campaigns, or collaborations - tell us what you're
            planning.
          </p>

          <dl className="mt-10 space-y-6 md:space-y-8 lg:mt-12">
            <Reveal>
              <dt className="text-xs font-semibold uppercase tracking-[0.22em] text-champagne">
                Phone
              </dt>
              <dd className="mt-2 md:mt-3">
                <a
                  href={`tel:${contact.phone}`}
                  className="font-display font-normal text-[clamp(1.5rem,2.5vw,2.2rem)] text-bone transition-colors hover:text-champagne"
                >
                  {contact.phone}
                </a>
              </dd>
            </Reveal>
            <Reveal delay={0.08}>
              <dt className="text-xs font-semibold uppercase tracking-[0.22em] text-champagne">
                Email
              </dt>
              <dd className="mt-2 md:mt-3">
                <a
                  href={`mailto:${contact.email}`}
                  className="break-all font-display font-normal text-[clamp(1.25rem,2.2vw,1.9rem)] text-bone transition-colors hover:text-champagne"
                >
                  {contact.email}
                </a>
              </dd>
            </Reveal>
            <Reveal delay={0.16}>
              <dt className="text-xs font-semibold uppercase tracking-[0.22em] text-champagne">
                Location
              </dt>
              <dd className="mt-2 font-display font-normal md:mt-3 text-[clamp(1.25rem,2.2vw,1.9rem)] text-bone">
                {contact.address}
              </dd>
            </Reveal>
          </dl>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col lg:py-10">
          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {fields.map((f) => (
              <label key={f.name}>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-bone/75">
                  {f.label}
                </span>
                <input
                  required
                  type={f.type}
                  name={f.name}
                  className="mt-1 w-full border-b border-bone/30 bg-transparent pb-2 font-sans text-base text-bone outline-none transition-colors duration-500 placeholder:text-bone/40 focus:border-champagne md:mt-2 md:pb-2.5"
                />
              </label>
            ))}
            <label className="sm:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-bone/75">
                I'm Interested In*
              </span>
              <div className="relative mt-1 border-b border-bone/30 pb-2 md:mt-2 md:pb-2.5">
                <select
                  name="service"
                  required
                  className="w-full cursor-pointer appearance-none bg-transparent font-sans text-base text-bone outline-none transition-colors duration-500 focus:border-champagne"
                  defaultValue=""
                >
                  <option value="" disabled className="bg-[#fdf1e0] text-bone/60">
                    Select an option...
                  </option>
                  <option value="Events & Experiences" className="bg-[#fdf1e0] text-bone">
                    Events & Experiences
                  </option>
                  <option
                    value="Brand Partnerships & Sponsorships"
                    className="bg-[#fdf1e0] text-bone"
                  >
                    Brand Partnerships & Sponsorships
                  </option>
                  <option value="Brand Activations / BTL" className="bg-[#fdf1e0] text-bone">
                    Brand Activations / BTL
                  </option>
                  <option value="Digital Marketing" className="bg-[#fdf1e0] text-bone">
                    Digital Marketing
                  </option>
                  <option value="Influencer Marketing" className="bg-[#fdf1e0] text-bone">
                    Influencer Marketing
                  </option>
                  <option value="Talent Management" className="bg-[#fdf1e0] text-bone">
                    Talent Management
                  </option>
                  <option value="F&B Curation" className="bg-[#fdf1e0] text-bone">
                    F&B Curation
                  </option>
                  <option value="Corporate Events" className="bg-[#fdf1e0] text-bone">
                    Corporate Events
                  </option>
                  <option value="Other" className="bg-[#fdf1e0] text-bone">
                    Other
                  </option>
                </select>
                <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-xs text-bone/60">
                  ▼
                </div>
              </div>
            </label>
            <label className="sm:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-bone/75">
                Tell Us About Your Requirement*
              </span>
              <textarea
                name="details"
                required
                rows={3}
                className="mt-1 w-full resize-none border-b border-bone/30 bg-transparent pb-2 font-sans text-base text-bone outline-none transition-colors duration-500 focus:border-champagne md:mt-2 md:pb-2.5"
              />
            </label>
          </div>

          <div className="mt-8 flex flex-col items-start gap-5 md:mt-10">
            <button
              type="submit"
              disabled={sending}
              className="group inline-flex items-center gap-4 border border-champagne bg-champagne px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-background transition-colors duration-500 hover:bg-transparent hover:text-champagne disabled:opacity-60 md:px-10 md:py-5"
            >
              SUBMIT ENQUIRY
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </button>
            <a
              href={`https://wa.me/91${contact.phone.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-bone/70 transition-colors hover:text-champagne"
            >
              Prefer WhatsApp? Chat with us
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
