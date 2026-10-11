import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown } from "lucide-react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { contact } from "@/data/planbee";
import { MaskLine, Reveal } from "./Reveal";

const fields = [
  { name: "name", label: "Name*", type: "text" },
  { name: "company", label: "Company / Brand*", type: "text" },
  { name: "email", label: "Email*", type: "email" },
  { name: "phone", label: "Phone*", type: "tel" },
];

const serviceOptions = [
  {
    value: "Events & Experiences",
    label: "Events & Experiences",
    desc: "Concerts, Live Shows & Large-Scale Festivals",
  },
  {
    value: "Brand Partnerships & Sponsorships",
    label: "Brand Partnerships & Sponsorships",
    desc: "Strategic Brand Deals & IP Sponsorships",
  },
  {
    value: "Brand Activations / BTL",
    label: "Brand Activations / BTL",
    desc: "On-Ground Experiential & Mall Setups",
  },
  {
    value: "Digital Marketing",
    label: "Digital Marketing",
    desc: "Growth, Social Media & Campaign Strategy",
  },
  {
    value: "Influencer Marketing",
    label: "Influencer Marketing",
    desc: "Creator Collaborations & PR Outreach",
  },
  {
    value: "Talent Management",
    label: "Talent Management",
    desc: "Artist Bookings & Celebrity Associations",
  },
  {
    value: "F&B Curation",
    label: "F&B Curation",
    desc: "Turnkey Food & Beverage Ecosystems",
  },
  {
    value: "Corporate Events",
    label: "Corporate Events",
    desc: "Conferences, Summits & Leadership Galas",
  },
  {
    value: "Other",
    label: "Other",
    desc: "Custom Engagements & Strategic Inquiries",
  },
];

export function Contact() {
  const [sending, setSending] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const service = (selectedService || String(data.get("service") ?? "")).trim();
    if (!service) {
      toast.error("Please select what you are interested in.");
      setIsDropdownOpen(true);
      return;
    }
    const details = String(data.get("details") ?? "").trim();

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();
    const publicKey = (
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY || import.meta.env.VITE_EMAILJS_USER_ID
    )?.trim();

    const isMissingConfig =
      !serviceId ||
      !templateId ||
      !publicKey ||
      serviceId === "your_service_id" ||
      templateId === "your_template_id" ||
      publicKey === "your_public_key";

    if (isMissingConfig) {
      console.warn(
        "[EmailJS] Environment variables missing or placeholder:\n" +
          "- VITE_EMAILJS_SERVICE_ID\n" +
          "- VITE_EMAILJS_TEMPLATE_ID\n" +
          "- VITE_EMAILJS_PUBLIC_KEY\n" +
          "Please configure these in your .env file.",
      );

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

      toast.info("EmailJS is not yet configured in .env. Opening your email client as fallback.");
      return;
    }

    setSending(true);

    const templateParams: Record<string, string> = {
      name,
      company,
      email,
      phone,
      service,
      details,
      // Common template aliases to match various EmailJS template setups
      from_name: name,
      from_email: email,
      reply_to: email,
      message: details,
      project_details: details,
      company_name: company,
      phone_number: phone,
      interested_in: service,
      subject: `New enquiry — ${name} (${company || "PlanBee"}) [${service}]`,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      toast.success("Thank you! Your enquiry has been sent successfully.");
      form.reset();
      setSelectedService("");
    } catch (error) {
      console.error("[EmailJS] Send Error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : typeof error === "object" && error !== null && "text" in error
            ? String((error as { text: unknown }).text)
            : "Failed to send message via EmailJS.";
      toast.error(`${errorMessage} Please try again or reach out on WhatsApp.`);
    } finally {
      setSending(false);
    }
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

        <form ref={formRef} onSubmit={onSubmit} className="flex flex-col lg:py-10">
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
            <div ref={dropdownRef} className="sm:col-span-2 relative">
              <label
                htmlFor="service-trigger"
                className="block text-xs font-semibold uppercase tracking-[0.16em] text-bone/75"
              >
                I'm Interested In*
              </label>

              <div className="relative mt-1 md:mt-2">
                <button
                  id="service-trigger"
                  type="button"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="group flex w-full items-center justify-between border-b border-bone/30 pb-2 text-left font-sans text-base text-bone outline-none transition-colors duration-300 hover:border-champagne/70 focus:border-champagne md:pb-2.5 cursor-pointer"
                  aria-haspopup="listbox"
                  aria-expanded={isDropdownOpen}
                >
                  <span
                    className={
                      selectedService ? "text-bone font-medium" : "text-bone/45 font-normal"
                    }
                  >
                    {selectedService
                      ? serviceOptions.find((o) => o.value === selectedService)?.label
                      : "Select an area of interest..."}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-bone/60 transition-transform duration-300 group-hover:text-champagne ${
                      isDropdownOpen ? "rotate-180 text-champagne" : ""
                    }`}
                  />
                </button>

                <input type="hidden" name="service" value={selectedService} />

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      data-lenis-prevent
                      initial={{ opacity: 0, y: -6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute left-0 right-0 top-full z-40 mt-2 max-h-80 overflow-y-auto rounded-2xl border border-bone/15 bg-[#fffaf3] p-2 shadow-2xl backdrop-blur-xl"
                    >
                      <ul role="listbox" className="space-y-1">
                        {serviceOptions.map((opt) => {
                          const isSelected = selectedService === opt.value;
                          return (
                            <li
                              key={opt.value}
                              role="option"
                              aria-selected={isSelected}
                              onClick={() => {
                                setSelectedService(opt.value);
                                setIsDropdownOpen(false);
                              }}
                              className={`group flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 transition-colors ${
                                isSelected
                                  ? "bg-champagne/15 text-bone"
                                  : "text-bone/85 hover:bg-champagne/10 hover:text-bone"
                              }`}
                            >
                              <div className="flex flex-col pr-2">
                                <span
                                  className={`text-sm tracking-tight ${
                                    isSelected ? "font-semibold text-champagne" : "font-medium"
                                  }`}
                                >
                                  {opt.label}
                                </span>
                                <span className="text-[11px] text-muted-foreground/80 mt-0.5">
                                  {opt.desc}
                                </span>
                              </div>
                              {isSelected && (
                                <Check className="h-4 w-4 text-champagne flex-shrink-0" />
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
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
              className="group inline-flex items-center gap-4 border border-champagne bg-champagne px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-background transition-colors duration-500 hover:bg-transparent hover:text-champagne disabled:cursor-not-allowed disabled:opacity-60 md:px-10 md:py-5"
            >
              {sending ? (
                <>
                  <span>SENDING...</span>
                  <span className="inline-block animate-spin font-mono">⟳</span>
                </>
              ) : (
                <>
                  <span>SUBMIT ENQUIRY</span>
                  <span className="transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </>
              )}
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
