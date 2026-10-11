"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { caseStudies } from "@/lib/site";
import SplitReveal from "@/components/motion/SplitReveal";
import Odometer from "@/components/motion/Odometer";

const tones = {
  red: "bg-red text-ink",
  ink: "on-dark bg-ink text-paper ring-1 ring-white/10",
  paper: "bg-fog text-ink",
} as const;

/** Case studies as a stack of cards that bury each other as you scroll. */
export default function Receipts({ showHeading = true }: { showHeading?: boolean }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-receipt]");
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          // Scale/rotate the card and fade a dim layer over it, all on one scrub.
          // (Tweening `filter` from "none" is parsed by GSAP as brightness(0),
          // which turned the whole card black.)
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: next, start: "top bottom", end: "top 14%", scrub: true },
          });
          tl.to(card.firstElementChild, { scale: 0.92, rotate: i % 2 ? 1.2 : -1.2 }, 0).to(
            card.querySelector("[data-dim]"),
            { opacity: 0.16 },
            0
          );
        });
        // Fonts change the card heights; re-measure so triggers stay aligned.
        document.fonts?.ready.then(() => ScrollTrigger.refresh());
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative bg-paper pb-24 pt-24 text-ink md:pb-36 md:pt-36" aria-label="Case studies">
      {showHeading && (
        <div className="gutter mb-14 flex flex-col justify-between gap-6 md:mb-20 md:flex-row md:items-end">
          <SplitReveal as="h2" by="chars" className="font-display text-[clamp(4rem,13vw,14rem)]">
            The receipts.
          </SplitReveal>
          <p className="max-w-[30ch] text-[18px] leading-snug text-ink/70 md:pb-4">
            A few recent campaigns, and the numbers they delivered.
          </p>
        </div>
      )}

      <div className="gutter flex flex-col gap-[6vh]">
        {caseStudies.map((c, i) => (
          <div key={c.title} data-receipt className="sticky" style={{ top: `calc(11svh + ${i * 18}px)` }}>
            <article
              className={`relative grid min-h-[72svh] origin-top gap-10 rounded-[clamp(22px,3vw,40px)] p-[clamp(22px,4vw,64px)] grid-cols-[minmax(0,1fr)] md:grid-cols-12 ${tones[c.tone]}`}
            >
              <div className="flex flex-col md:col-span-7">
                <p className="text-[15px] font-medium opacity-70">
                  {String(i + 1).padStart(2, "0")} / {c.category}
                </p>
                <h3 className="font-display mt-4 text-[clamp(3rem,7vw,7.5rem)]">{c.title}</h3>
                {"summary" in c && (
                  <p className="mt-5 max-w-[42ch] text-[17px] leading-relaxed opacity-80 md:text-[19px]">{c.summary}</p>
                )}
                <blockquote className="mt-auto pt-10">
                  <p className="max-w-[46ch] text-[19px] font-medium leading-snug md:text-[22px]">“{c.quote}”</p>
                </blockquote>
              </div>
              <div className="flex flex-col justify-between gap-8 md:col-span-5 md:items-end md:text-right">
                <div>
                  <p className="font-display text-[clamp(6rem,15vw,15rem)] leading-[0.8]">
                    <Odometer value={c.metric.value} suffix={c.metric.suffix} />
                  </p>
                  <p className="mt-3 text-[17px] font-medium opacity-75">{c.metric.label}</p>
                </div>
                <dl className="grid grid-cols-2 gap-6 md:text-right">
                  {c.secondary.map((m) => (
                    <div key={m.label}>
                      <dt className="text-[14px] opacity-65">{m.label}</dt>
                      <dd className="font-display text-[clamp(2.6rem,4.4vw,4.4rem)]">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <span
                data-dim
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[inherit] bg-black opacity-0"
              />
            </article>
          </div>
        ))}
      </div>

      {showHeading && (
        <div className="gutter mt-16 flex justify-center">
          <Link
            href="/work"
            className="inline-flex h-14 items-center rounded-full bg-ink px-8 text-[16px] font-semibold text-paper transition-transform duration-150 ease-out active:scale-[0.97]"
          >
            See all the work
          </Link>
        </div>
      )}
    </section>
  );
}
