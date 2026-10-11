"use client";

import { useRef, type ReactNode } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  as?: "div" | "h1" | "h2" | "h3" | "p" | "span";
  by?: "lines" | "words" | "chars";
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  /** Play on mount instead of when scrolled into view. */
  immediate?: boolean;
  start?: string;
};

/**
 * Masked text reveal. Text is server-rendered and stays readable without JS;
 * the `data-split` hook only hides it once the html.js class is present.
 */
export default function SplitReveal({
  as: Tag = "div",
  by = "lines",
  children,
  className,
  delay = 0,
  stagger,
  duration = 1.1,
  immediate = false,
  start = "top 85%",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) {
        gsap.set(el, { autoAlpha: 1 });
        return;
      }

      SplitText.create(el, {
        type: by === "chars" ? "lines,chars" : by === "words" ? "lines,words" : "lines",
        mask: "lines",
        linesClass: "split-line",
        autoSplit: true,
        onSplit(self) {
          gsap.set(el, { autoAlpha: 1 });
          const targets = by === "chars" ? self.chars : by === "words" ? self.words : self.lines;
          return gsap.from(targets, {
            yPercent: 115,
            rotate: by === "lines" ? 2.5 : 0,
            duration,
            delay,
            ease: "expo.out",
            stagger: stagger ?? (by === "chars" ? 0.028 : by === "words" ? 0.045 : 0.1),
            scrollTrigger: immediate ? undefined : { trigger: el, start, once: true },
          });
        },
      });
    },
    { scope: ref }
  );

  // Typed as a div so one ref fits every heading level we render.
  const El = Tag as "div";
  return (
    <El ref={ref} data-split="" className={className}>
      {children}
    </El>
  );
}
