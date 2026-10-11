"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { brandRows, type Brand } from "@/lib/site";
import SplitReveal from "@/components/motion/SplitReveal";

/** Four-point sparkle between logos. */
function Spark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-[clamp(0.9rem,1.6vw,1.5rem)] w-auto shrink-0 text-red">
      <path
        fill="currentColor"
        d="M12 1.5c.7 5.9 4.6 9.8 10.5 10.5-5.9.7-9.8 4.6-10.5 10.5C11.3 16.6 7.4 12.7 1.5 12 7.4 11.3 11.3 7.4 12 1.5z"
      />
    </svg>
  );
}

function Row({ brands, reverse = false }: { brands: Brand[]; reverse?: boolean }) {
  // Four copies, shifted by half: the loop stays seamless even on very wide screens.
  const items = [...brands, ...brands, ...brands, ...brands];
  return (
    <div
      className="flex w-max items-center"
      style={{ animation: `marquee ${reverse ? 70 : 62}s linear infinite ${reverse ? "reverse" : ""}`, animationPlayState: "var(--play)" }}
    >
      {items.map((b, i) => {
        const h = `calc(var(--logo-h) * ${b.scale})`;
        return (
          <span key={i} className="flex items-center gap-[clamp(2rem,4.6vw,5.5rem)] pr-[clamp(2rem,4.6vw,5.5rem)]" aria-hidden={i >= brands.length ? true : undefined}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={b.src}
              alt={i < brands.length ? b.name : ""}
              height={64}
              width={Math.round(64 * b.ratio)}
              loading="eager"
              decoding="async"
              draggable={false}
              className="block w-auto max-w-none select-none opacity-[0.92] [filter:brightness(0)_invert(1)]"
              style={{ height: h, aspectRatio: String(b.ratio) }}
            />
            <Spark />
          </span>
        );
      })}
    </div>
  );
}

/** Brands we've worked with, in white on ink. Skews with scroll velocity and can be paused. */
export default function BrandMarquee() {
  const root = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const skew = gsap.quickTo("[data-skew]", "skewX", { duration: 0.5, ease: "power3.out" });
        ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => skew(gsap.utils.clamp(-8, 8, self.getVelocity() / -400)),
          onLeave: () => skew(0),
          onLeaveBack: () => skew(0),
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  const names = brandRows.flat().map((b) => b.name);

  return (
    <section
      ref={root}
      className="on-dark relative overflow-hidden bg-ink pb-16 pt-14 [--logo-h:clamp(1.9rem,3.1vw,2.9rem)] md:py-24"
      aria-label="Brands we've worked with"
      style={{ ["--play" as string]: paused ? "paused" : "running" }}
    >
      <div className="gutter mb-10 md:mb-14">
        <SplitReveal as="h2" by="lines" className="font-display max-w-[16ch] text-[clamp(2.4rem,5.4vw,5.6rem)] text-paper">
          Trusted by.
        </SplitReveal>
      </div>
      <p className="sr-only">Brands we&apos;ve worked with: {names.join(", ")}.</p>
      <div data-skew className="flex flex-col gap-[clamp(2.5rem,5vw,5rem)] motion-reduce:[--play:paused]">
        <Row brands={brandRows[0]} />
        <Row brands={brandRows[1]} reverse />
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        className="absolute bottom-4 right-[var(--gutter)] rounded-full border border-paper/25 px-3.5 py-1.5 text-[12px] font-medium text-paper/70 transition-colors duration-200 hover:text-paper"
      >
        {paused ? "Play" : "Pause"} motion
      </button>
    </section>
  );
}
