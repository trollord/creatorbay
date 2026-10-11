"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const DIGITS = "0123456789".split("");

/** Rolling digit counter: each column spins into place like a follower count. */
export default function Odometer({
  value,
  suffix = "",
  className,
  delay = 0,
}: {
  value: number;
  suffix?: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const text = value.toLocaleString("en-US");

  useGSAP(
    () => {
      const cols = Array.from(ref.current?.querySelectorAll<HTMLElement>("[data-col]") ?? []);
      if (prefersReducedMotion()) {
        cols.forEach((c) => gsap.set(c, { yPercent: -5 * Number(c.dataset.col) }));
        return;
      }
      gsap.to(cols, {
        yPercent: (_i: number, el: HTMLElement) => -5 * (Number(el.dataset.col) + 10),
        duration: 2.1,
        delay,
        ease: "expo.out",
        stagger: { each: 0.09, from: "end" },
        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
      });
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={className} aria-label={`${text}${suffix}`} role="img">
      <span aria-hidden className="inline-flex leading-none">
        {text.split("").map((ch, i) =>
          /\d/.test(ch) ? (
            <span key={i} className="relative inline-block h-[1em] overflow-hidden tabular">
              {/* Two stacks of digits so every column travels a full lap before landing. */}
              <span data-col={ch} className="flex flex-col">
                {[...DIGITS, ...DIGITS].map((d, j) => (
                  <span key={j} className="block h-[1em]">
                    {d}
                  </span>
                ))}
              </span>
            </span>
          ) : (
            <span key={i}>{ch}</span>
          )
        )}
        {suffix && <span>{suffix}</span>}
      </span>
    </span>
  );
}
