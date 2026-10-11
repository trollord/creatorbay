import Link from "next/link";
import type { ReactNode } from "react";
import { contact, whatsappLink } from "@/lib/site";
import Topo from "@/components/Topo";
import SplitReveal from "@/components/motion/SplitReveal";

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-3 border-t border-ink/10 py-9 grid-cols-[minmax(0,1fr)] md:grid-cols-12 md:gap-8">
      <h2 className="text-[20px] font-semibold leading-snug md:col-span-4 md:text-[22px]">{title}</h2>
      <div className="space-y-3 text-[16px] leading-relaxed text-ink/75 md:col-span-8 md:text-[17px] [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}

export function LegalContact() {
  return (
    <div className="mt-2 flex flex-col gap-2">
      <a href={`mailto:${contact.email}`} className="font-medium text-ink underline decoration-red decoration-2 underline-offset-4">
        {contact.email}
      </a>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-ink underline decoration-red decoration-2 underline-offset-4"
      >
        WhatsApp {contact.whatsappDisplay}
      </a>
    </div>
  );
}

export default function LegalLayout({
  title,
  intro,
  related,
  children,
}: {
  title: string;
  intro: string;
  related: { href: string; label: string };
  children: ReactNode;
}) {
  return (
    <>
      <section className="relative overflow-hidden bg-red text-ink">
        <Topo alpha={0.18} seed={9.2} />
        <div className="gutter relative pb-16 pt-36 md:pb-24 md:pt-48">
          <SplitReveal as="h1" by="chars" immediate delay={0.6} className="font-display max-w-[12ch] text-[clamp(4rem,12vw,12rem)]">
            {title}
          </SplitReveal>
          <p className="mt-8 max-w-[44ch] text-[18px] font-medium md:text-[20px]">{intro}</p>
        </div>
      </section>
      <section className="bg-paper text-ink">
        <div className="gutter mx-auto max-w-[1200px] py-16 md:py-24">
          {children}
          <p className="border-t border-ink/10 pt-9 text-[15px] text-ink/70">
            Also see our{" "}
            <Link href={related.href} className="font-medium text-ink underline decoration-red decoration-2 underline-offset-4">
              {related.label}
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
