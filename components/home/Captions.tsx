"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const LINE =
  "People skip ads. They don't skip the creators they follow. We put your brand in those feeds and turn that attention into footfall, bookings and sold-out nights.";

const fmt = (s: number) => `0:${String(Math.floor(s)).padStart(2, "0")}`;

/**
 * Manifesto read out like auto-captions on a reel: scroll is the playhead,
 * the current word gets the red caption box.
 */
export default function Captions() {
  const root = useRef<HTMLElement>(null);
  const words = LINE.split(" ");
  const DURATION = 24;

  useGSAP(
    () => {
      const el = root.current!;
      const spans = Array.from(el.querySelectorAll<HTMLElement>("[data-word]"));
      const time = el.querySelector<HTMLElement>("[data-time]")!;
      const bar = el.querySelector<HTMLElement>("[data-bar]")!;

      if (prefersReducedMotion()) {
        spans.forEach((s) => (s.dataset.state = "past"));
        gsap.set(bar, { scaleX: 1 });
        time.textContent = fmt(DURATION);
        return;
      }

      let last = -2;
      const paint = (p: number) => {
        const idx = Math.min(spans.length - 1, Math.floor(p * spans.length * 1.04) - 1);
        bar.style.transform = `scaleX(${p})`;
        time.textContent = fmt(p * DURATION);
        if (idx === last) return;
        last = idx;
        spans.forEach((s, i) => (s.dataset.state = i < idx ? "past" : i === idx ? "active" : "next"));
      };
      paint(0);

      gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${Math.max(window.innerHeight * 1.6, spans.length * 42)}`,
          pin: true,
          scrub: 0.4,
          anticipatePin: 1,
          onUpdate: (self) => paint(self.progress),
        },
      }).fromTo(el.querySelector("[data-cap]"), { y: 40 }, { y: -20, ease: "none" });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="on-dark relative flex h-[100svh] min-h-[560px] flex-col bg-ink text-paper" aria-label="What we believe">
      <div className="gutter flex items-center justify-between pt-24 text-[13px] text-paper/55 md:pt-28">
        <span className="inline-flex items-center gap-2">
          <span className="rounded-[4px] border border-paper/40 px-1.5 py-0.5 text-[11px] font-bold leading-none text-paper/80">CC</span>
          Auto-captions on
        </span>
        <span className="tabular">
          <span data-time>0:00</span> / {fmt(DURATION)}
        </span>
      </div>

      <div className="gutter flex flex-1 items-center justify-center">
        <p
          data-cap
          aria-label={LINE}
          className="font-display max-w-[19ch] text-center text-[min(10.5vw,7.4svh)] leading-[0.98] md:max-w-[26ch] md:text-[min(5.6vw,8.6svh)]"
        >
          {words.map((w, i) => (
            <span key={i} aria-hidden>
              <span
                data-word
                data-state="past"
                className="relative inline-block rounded-[0.12em] px-[0.08em] transition-[color,background-color,transform,opacity] duration-200 ease-out data-[state=active]:-rotate-2 data-[state=active]:scale-[1.06] data-[state=active]:bg-red data-[state=active]:text-ink data-[state=next]:opacity-[0.16]"
              >
                {w}
              </span>{" "}
            </span>
          ))}
        </p>
      </div>

      <div className="gutter pb-8 md:pb-10">
        <div className="h-[3px] w-full overflow-hidden rounded-full bg-paper/15">
          <div data-bar className="h-full origin-left scale-x-0 rounded-full bg-red" />
        </div>
      </div>
    </section>
  );
}
