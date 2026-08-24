import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/planbee/Navbar";
import { Hero } from "@/components/planbee/Hero";
import { About } from "@/components/planbee/About";
import { Expertise } from "@/components/planbee/Expertise";
import { Services } from "@/components/planbee/Services";
import { TrustedPartnerships } from "@/components/planbee/TrustedPartnerships";
import { PastWork } from "@/components/planbee/PastWork";
import { WhyPlanbee } from "@/components/planbee/WhyPlanbee";
import { FinalCta } from "@/components/planbee/FinalCta";
import { Contact } from "@/components/planbee/Contact";
import { Footer } from "@/components/planbee/Footer";

const title = "PlanBee — Event Curation & Marketing Agency, Hyderabad";
const description =
  "PlanBee is a premier event curation and marketing agency in Hyderabad — events, marketing, activations and talent management across India.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Expertise />
      <Services />
      <TrustedPartnerships />
      <PastWork />
      <WhyPlanbee />
      <FinalCta />
      <Contact />
      <Footer />
      <Toaster />
    </main>
  );
}
