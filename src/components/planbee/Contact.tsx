import { useState } from "react";
import { toast } from "sonner";
import { contact } from "@/data/planbee";
import { MaskLine, Reveal } from "./Reveal";

const fields = [
  { name: "name", label: "Name", type: "text" },
  { name: "company", label: "Company", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone", type: "tel" },
  { name: "service", label: "Service Required", type: "text" },
];

export function Contact() {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const subject = `New enquiry — ${String(data.get("name") ?? "")}`;
    const body = fields
      .map((f) => `${f.label}: ${String(data.get(f.name) ?? "")}`)
      .concat(`Project Details: ${String(data.get("details") ?? "")}`)
      .join("\n");
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    toast.success("Opening your mail client to send this enquiry.");
    setSending(false);
  };

  return (
    <section id="contact" className="section-pad border-t border-border">
      <div className="shell grid gap-16 md:grid-cols-12 md:gap-14">
        <div className="md:col-span-5">
          <p className="eyebrow">Contact</p>
          <h2 className="display-lg mt-6 text-bone">
            <MaskLine>Let's Create</MaskLine>
          </h2>

          <dl className="mt-16 space-y-8">
            <Reveal>
              <dt className="text-[0.68rem] lg:text-[0.6rem] uppercase tracking-[0.32em] text-muted-foreground">
                Phone
              </dt>
              <dd className="mt-3">
                <a
                  href={`tel:${contact.phone}`}
                  className="font-display text-[clamp(1.5rem,2.6vw,2.2rem)] text-bone transition-colors hover:text-champagne"
                >
                  {contact.phone}
                </a>
              </dd>
            </Reveal>
            <Reveal delay={0.08}>
              <dt className="text-[0.68rem] lg:text-[0.6rem] uppercase tracking-[0.32em] text-muted-foreground">
                Email
              </dt>
              <dd className="mt-3">
                <a
                  href={`mailto:${contact.email}`}
                  className="break-all font-display text-[clamp(1.25rem,2.2vw,1.9rem)] text-bone transition-colors hover:text-champagne"
                >
                  {contact.email}
                </a>
              </dd>
            </Reveal>
            <Reveal delay={0.16}>
              <dt className="text-[0.68rem] lg:text-[0.6rem] uppercase tracking-[0.32em] text-muted-foreground">
                Address
              </dt>
              <dd className="mt-3 font-display text-[clamp(1.25rem,2.2vw,1.9rem)] text-bone">
                {contact.address}
              </dd>
            </Reveal>
          </dl>
        </div>

        <form onSubmit={onSubmit} className="md:col-span-6 md:col-start-7">
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {fields.map((f) => (
              <label key={f.name} className={f.name === "service" ? "sm:col-span-2" : ""}>
                <span className="text-[0.68rem] lg:text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
                  {f.label}
                </span>
                <input
                  required={f.name === "name" || f.name === "email"}
                  type={f.type}
                  name={f.name}
                  className="mt-3 w-full border-b border-border bg-transparent pb-3 text-base text-bone outline-none transition-colors duration-500 placeholder:text-muted-foreground/50 focus:border-champagne"
                />
              </label>
            ))}
            <label className="sm:col-span-2">
              <span className="text-[0.68rem] lg:text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
                Project Details
              </span>
              <textarea
                name="details"
                rows={4}
                className="mt-3 w-full resize-none border-b border-border bg-transparent pb-3 text-base text-bone outline-none transition-colors duration-500 focus:border-champagne"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={sending}
            className="group mt-12 inline-flex items-center gap-4 bg-bone px-10 py-5 text-[0.68rem] uppercase tracking-[0.3em] text-background transition-colors duration-500 hover:bg-champagne disabled:opacity-60"
          >
            Let's Talk
            <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </button>
        </form>
      </div>
    </section>
  );
}
