"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import BLogo from "@/components/BLogo";

/** Ink curtain with the B that lifts off every new page. */
export default function PageCurtain() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) {
        gsap.to(el, { autoAlpha: 0, duration: 0.3, onComplete: () => gsap.set(el, { display: "none" }) });
        return;
      }
      gsap
        .timeline({ onComplete: () => gsap.set(el, { display: "none" }) })
        .from("[data-curtain-mark]", { yPercent: 40, autoAlpha: 0, rotate: -8, duration: 0.45, ease: "expo.out" })
        .to("[data-curtain-mark]", { yPercent: -60, autoAlpha: 0, duration: 0.4, ease: "power3.in" }, 0.42)
        .to(el, { yPercent: -100, duration: 0.85, ease: "expo.inOut" }, 0.45)
        .to("[data-curtain-edge]", { scaleY: 1, duration: 0.6, ease: "power2.in" }, 0.45)
        .to("[data-curtain-edge]", { scaleY: 0, duration: 0.45, ease: "power2.out" }, 1.0);
    },
    { scope: ref }
  );

  return (
    <div ref={ref} aria-hidden className="fixed inset-0 z-[100] flex items-center justify-center bg-ink">
      <div data-curtain-mark>
        <BLogo className="h-24 w-auto md:h-28" body="#fb3036" face="#ffffff" />
      </div>
      {/* Curved trailing edge while the curtain moves */}
      <div
        data-curtain-edge
        className="absolute left-[-10%] top-full h-[18vh] w-[120%] origin-top scale-y-0 rounded-b-[50%] bg-ink"
      />
    </div>
  );
}
