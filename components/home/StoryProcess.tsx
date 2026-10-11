"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { process, contact } from "@/lib/site";
import BLogo from "@/components/BLogo";
import { stickers } from "./StoryStickers";

/**
 * How a campaign runs, told as a five-part story: scroll fills the progress
 * bars, the step number fills with ink, and each step gets its own sticker.
 */
export default function StoryProcess() {
  const root = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  // Animated story by default; a plain list for reduced-motion visitors.
  const [animated, setAnimated] = useState(true);
  const n = process.length;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: reduce)", () => {
        setAnimated(false);
        return () => setAnimated(true);
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const el = root.current!;
        const fills = el.querySelectorAll<HTMLElement>("[data-seg]");
        gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => `+=${window.innerHeight * n * 0.8}`,
            pin: true,
            scrub: 0.3,
            anticipatePin: 1,
            onUpdate: (self) => {
              const v = Math.min(n - 0.0001, self.progress * n);
              const i = Math.floor(v);
              setStep(i);
              el.style.setProperty("--sp", String(v - i));
              fills.forEach((f, k) => (f.style.transform = `scaleX(${Math.min(1, Math.max(0, v - k))})`));
            },
          },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  // Old step leaves fast; the new one arrives a beat later.
  const swap = (on: boolean) =>
    on
      ? "opacity-100 translate-y-0 transition-[opacity,transform] duration-500 delay-150 ease-[cubic-bezier(0.23,1,0.32,1)]"
      : "pointer-events-none opacity-0 translate-y-6 transition-[opacity,transform] duration-150 ease-out";

  return (
    <section
      ref={root}
      className={`relative overflow-hidden bg-red text-ink ${animated ? "flex h-[100svh] min-h-[640px] flex-col" : "py-24"}`}
      aria-label="How a campaign runs"
    >
      <div className="gutter pt-24 md:pt-28">
        <div className="flex gap-1.5" aria-hidden>
          {process.map((_, i) => (
            <span key={i} className="h-[5px] flex-1 overflow-hidden rounded-full bg-ink/25">
              <span data-seg className={`block h-full origin-left bg-ink ${animated ? "scale-x-0" : ""}`} />
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-ink">
            <BLogo className="h-6 w-auto" body="#fb3036" />
          </span>
          <p className="text-[15px] font-semibold">
            {contact.instagram}
            <span className="ml-2 font-normal text-ink/65">How a campaign runs</span>
          </p>
        </div>
      </div>

      {animated ? (
        <div className="gutter grid flex-1 content-center items-center gap-6 pb-[6svh] md:grid-cols-12 md:gap-8">
          {/* Step number: outline, filled with ink as the step plays */}
          <div className="grid md:col-span-3 [&>*]:[grid-area:1/1]">
            {process.map((p, i) => (
              <span key={p.title} aria-hidden className={`relative ${swap(i === step)}`}>
                <span className="font-display block text-[clamp(6rem,19vw,19rem)] leading-[0.8] text-transparent [-webkit-text-stroke:2px_var(--ink)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="font-display absolute inset-0 block text-[clamp(6rem,19vw,19rem)] leading-[0.8] text-ink"
                  style={{ clipPath: i === step ? "inset(calc((1 - var(--sp, 0)) * 100%) 0 0 0)" : "inset(100% 0 0 0)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </span>
            ))}
          </div>

          <div className="grid md:col-span-6 [&>*]:[grid-area:1/1]">
            {process.map((p, i) => (
              <div key={p.title} aria-hidden={i !== step} className={swap(i === step)}>
                <h3 className="font-display text-[clamp(3.2rem,7.4vw,8.4rem)]">{p.title}</h3>
                <p className="mt-5 max-w-[36ch] text-[18px] leading-relaxed md:text-[21px]">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid justify-center md:col-span-3 [&>*]:[grid-area:1/1]">
            {stickers.map((Sticker, i) => (
              <div key={i} aria-hidden className={swap(i === step)}>
                {i === step && <Sticker />}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <ol className="gutter mt-12 grid gap-10 md:grid-cols-2">
          {process.map((p, i) => (
            <li key={p.title}>
              <span className="font-display text-[5rem] text-transparent [-webkit-text-stroke:2px_var(--ink)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display mt-2 text-[3rem]">{p.title}</h3>
              <p className="mt-3 max-w-[40ch] text-[17px] leading-relaxed">{p.desc}</p>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
