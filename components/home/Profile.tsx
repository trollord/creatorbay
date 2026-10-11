"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { stats, contact, whatsappLink, niches } from "@/lib/site";
import SplitReveal from "@/components/motion/SplitReveal";
import Odometer from "@/components/motion/Odometer";
import BLogo from "@/components/BLogo";
import { PartyPopper, Shirt, Cpu, Dumbbell, Plane, Sparkles, type LucideIcon } from "lucide-react";

const highlightIcons: Record<string, LucideIcon> = {
  Events: PartyPopper,
  Fashion: Shirt,
  Tech: Cpu,
  Fitness: Dumbbell,
  Travel: Plane,
  Beauty: Sparkles,
};

/** Who we are, told as the agency's own social profile. */
export default function Profile() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // A big tilt clips the card's corners on narrow screens, so keep it gentle there.
      const mm = gsap.matchMedia();
      mm.add(
        { wide: "(min-width: 768px)", narrow: "(max-width: 767px)" },
        (ctx) => {
          const wide = !!ctx.conditions?.wide;
          gsap.fromTo(
            "[data-card]",
            { rotate: wide ? -5 : -1.5, y: wide ? 120 : 60 },
            {
              rotate: wide ? 2 : 0.8,
              y: wide ? -40 : -20,
              ease: "none",
              scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1 },
            }
          );
        }
      );
      gsap.from("[data-hl]", {
        scale: 0.6,
        autoAlpha: 0,
        duration: 0.7,
        ease: "back.out(2)",
        stagger: 0.06,
        scrollTrigger: { trigger: "[data-hls]", start: "top 90%", once: true },
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-paper py-24 text-ink md:py-36" aria-label="About Creator Bay">
      <div className="gutter grid items-center gap-16 grid-cols-[minmax(0,1fr)] md:grid-cols-12">
        <div className="md:col-span-6">
          <SplitReveal as="h2" by="lines" className="font-display text-[clamp(3.4rem,9vw,9.5rem)]">
            Built from the feed up.
          </SplitReveal>
          <p className="mt-8 max-w-[46ch] text-[18px] leading-relaxed text-ink/75 md:text-[20px]">
            We&apos;re a Mumbai influencer marketing and content agency for brands, events and digital pages,
            choosing creators by who actually follows them and briefing them so the content sounds like them, not like
            an ad.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 border-b-2 border-ink pb-1 text-[17px] font-semibold transition-colors duration-200 hover:border-red hover:text-red"
          >
            More about us
          </Link>
        </div>

        <div className="md:col-span-6 md:pl-6">
          <article
            data-card
            className="mx-auto max-w-[520px] rounded-[30px] bg-paper p-5 shadow-[0_40px_90px_-20px_rgba(29,29,29,0.35)] ring-1 ring-ink/10 md:p-8 [&>*]:min-w-0"
          >
            <header className="flex items-center gap-4 sm:gap-5">
              <div className="rounded-full bg-[conic-gradient(from_200deg,#fb3036,#1d1d1d,#fb3036)] p-[3px]">
                <div className="grid h-[68px] w-[68px] place-items-center rounded-full bg-red ring-4 ring-paper sm:h-[84px] sm:w-[84px] md:h-24 md:w-24">
                  <BLogo className="h-10 w-auto sm:h-12 md:h-14" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-center gap-x-1.5 text-[17px] font-semibold [overflow-wrap:anywhere] sm:text-[19px]">
                  {contact.instagram}
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] text-red" aria-label="Verified">
                    <path
                      fill="currentColor"
                      d="M12 1.5l2.6 1.9 3.2-.2 1 3.1 2.6 1.9-1 3.1 1 3.1-2.6 1.9-1 3.1-3.2-.2L12 22.5l-2.6-1.9-3.2.2-1-3.1L2.6 15.8l1-3.1-1-3.1 2.6-1.9 1-3.1 3.2.2z"
                    />
                    <path d="M8 12.2l2.6 2.6L16.2 9" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Link href="/contact" className="rounded-lg bg-red px-3.5 py-2.5 text-[14px] font-semibold text-ink transition-transform duration-150 active:scale-[0.97]">
                    Start a campaign
                  </Link>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-fog px-3.5 py-2.5 text-[14px] font-semibold transition-colors duration-200 hover:bg-ink hover:text-paper"
                  >
                    Message
                  </a>
                </div>
              </div>
            </header>

            <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-8 border-y border-ink/10 py-8">
              {stats.map((s, i) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-[clamp(3.4rem,9vw,4.6rem)] leading-[0.9]">
                    <Odometer value={s.value} suffix={s.suffix} delay={i * 0.12} />
                  </dd>
                  <dd aria-hidden className="mt-2 text-[14px] leading-tight text-ink/60">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 text-[15px] leading-snug">
              <p className="font-semibold">Creator Bay</p>
              <p className="text-ink/55">Influencer marketing agency</p>
              <p className="mt-1">Brands &amp; events, meet the right creators.</p>
              <p className="text-ink/70">Mumbai, India</p>
            </div>

            <ul data-hls className="-mx-1 mt-4 flex gap-3.5 overflow-x-auto px-1 py-2 [scrollbar-width:none]" aria-label="Niches we cover">
              {niches.slice(0, 6).map((n, i) => {
                const Icon = highlightIcons[n] ?? Sparkles;
                return (
                <li key={n} data-hl className="flex shrink-0 flex-col items-center gap-1.5">
                  <span className="grid h-[62px] w-[62px] place-items-center rounded-full ring-2 ring-ink/12 ring-offset-2">
                    <span
                      className={`grid h-full w-full place-items-center rounded-full ${
                        i % 2 ? "bg-ink text-red" : "bg-red text-ink"
                      }`}
                    >
                      <Icon size={24} strokeWidth={2.2} aria-hidden />
                    </span>
                  </span>
                  <span className="text-[12px] text-ink/70">{n}</span>
                </li>
                );
              })}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
