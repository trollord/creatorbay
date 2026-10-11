"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { niches } from "@/lib/site";

function Row({ reverse = false, outline = false }: { reverse?: boolean; outline?: boolean }) {
  const items = [...niches, ...niches];
  return (
    <div className="flex w-max" style={{ animation: `marquee ${reverse ? 46 : 40}s linear infinite ${reverse ? "reverse" : ""}`, animationPlayState: "var(--play)" }}>
      {items.map((n, i) => (
        <span key={i} className="flex items-center">
          <span
            className={`font-display px-[2.2vw] text-[clamp(4rem,11vw,11rem)] ${
              outline ? "text-transparent [-webkit-text-stroke:2px_var(--paper)]" : "text-paper"
            }`}
          >
            {n}
          </span>
          <svg viewBox="0 0 24 24" className="h-[clamp(1.6rem,3.2vw,3.2rem)] w-auto text-red" aria-hidden>
            <path
              fill="currentColor"
              d="M12 21.2s-7.6-4.6-9.8-9.3C.7 8.6 2.6 4.3 6.6 4.3c2.3 0 3.9 1.3 5.4 3.2 1.5-1.9 3.1-3.2 5.4-3.2 4 0 5.9 4.3 4.4 7.6-2.2 4.7-9.8 9.3-9.8 9.3z"
            />
          </svg>
        </span>
      ))}
    </div>
  );
}

/** Niches we cover. Skews with scroll velocity and can be paused. */
export default function NicheMarquee() {
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
          onUpdate: (self) => skew(gsap.utils.clamp(-12, 12, self.getVelocity() / -300)),
          onLeave: () => skew(0),
          onLeaveBack: () => skew(0),
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="on-dark relative overflow-hidden bg-ink py-16 md:py-24"
      aria-label="Niches we cover"
      style={{ ["--play" as string]: paused ? "paused" : "running" }}
    >
      <p className="sr-only">Niches we cover: {niches.join(", ")}.</p>
      <div data-skew aria-hidden className="flex flex-col gap-2 motion-reduce:[--play:paused]">
        <Row />
        <Row reverse outline />
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
