import type { Metadata } from "next";
import { Suspense } from "react";
import { contact, whatsappLink, instagramLink } from "@/lib/site";
import Topo from "@/components/Topo";
import SplitReveal from "@/components/motion/SplitReveal";
import DMForm from "@/components/contact/DMForm";

export const metadata: Metadata = {
  title: "Contact | Creator Bay",
  description: "Start a campaign with Creator Bay. Message us on WhatsApp, email or Instagram and we'll reply within 24 hours.",
};

const channels = [
  { label: "WhatsApp", value: contact.whatsappDisplay, href: whatsappLink("Hi Creator Bay! I'd like to talk about a campaign."), note: "Fastest for urgent campaigns" },
  { label: "Email", value: contact.email, href: `mailto:${contact.email}`, note: "For briefs and decks" },
  { label: "Instagram", value: `@${contact.instagram}`, href: instagramLink, note: "See what we're posting" },
];

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden bg-red text-ink" aria-label="Contact Creator Bay">
      <Topo alpha={0.2} seed={5.6} />
      <div className="gutter relative grid gap-14 pb-20 pt-36 grid-cols-[minmax(0,1fr)] md:grid-cols-12 md:gap-10 md:pb-28 md:pt-44">
        <div className="md:col-span-6">
          <p className="flex items-center gap-2 text-[15px] font-semibold">
            <span className="rec-dot h-2.5 w-2.5 rounded-full bg-ink" />
            Contact
          </p>
          <SplitReveal as="h1" by="chars" immediate delay={0.55} stagger={0.03} className="font-display mt-8 text-[clamp(4.4rem,11vw,12rem)]">
            Slide into our DMs.
          </SplitReveal>
          <p className="mt-8 max-w-[38ch] text-[18px] font-medium leading-snug md:text-[21px]">
            Have a brief, or just an idea? Send it over and we&apos;ll get back to you within 24 hours.
          </p>

          <ul className="mt-12 flex flex-col">
            {channels.map((c) => (
              <li key={c.label} className="border-t-2 border-ink/15">
                <a
                  href={c.href}
                  target={c.label === "Email" ? undefined : "_blank"}
                  rel={c.label === "Email" ? undefined : "noopener noreferrer"}
                  className="group flex items-baseline justify-between gap-4 py-5"
                >
                  <span>
                    <span className="block text-[14px] text-ink/65">{c.label}</span>
                    <span className="mt-1 block text-[20px] font-semibold md:text-[24px]">{c.value}</span>
                  </span>
                  <span className="hidden text-right text-[14px] text-ink/65 transition-colors duration-200 group-hover:text-ink sm:block">
                    {c.note}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-6 md:pl-4 lg:col-span-5 lg:col-start-8">
          <Suspense fallback={<div className="h-[640px] rounded-[30px] bg-paper/70" />}>
            <DMForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
