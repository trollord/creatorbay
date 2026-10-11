"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { getLenis } from "@/components/motion/SmoothScroll";
import { services } from "@/lib/site";
import SplitReveal from "@/components/motion/SplitReveal";
import Phone from "@/components/reels/Phone";
import ReelOverlay from "@/components/reels/ReelOverlay";
import { Scene, lightScenes } from "@/components/reels/Scenes";

const HOLD = 0.55;

/**
 * Services as a reels feed. Desktop: the phone pins and scroll swipes the feed.
 * Mobile: a horizontal, snap-scrolling row of reels.
 */
export default function ReelServices() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const n = services.length;

  // Jump to a reel: scroll to its spot when pinned, otherwise just switch.
  const goTo = (i: number) => {
    const tl = tlRef.current;
    const st = tl?.scrollTrigger;
    if (!tl || !st) return setActive(i);
    const y = st.start + ((i + HOLD / 2) / tl.duration()) * (st.end - st.start);
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(y, { duration: 1.2 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ desktop: "(min-width: 768px)", reduce: "(prefers-reduced-motion: reduce)" }, (ctx) => {
        const { desktop, reduce } = ctx.conditions as { desktop: boolean; reduce: boolean };
        if (!desktop || reduce) {
          setPinned(false);
          tlRef.current = null;
          return;
        }
        setPinned(true);
        const track = root.current!.querySelector<HTMLElement>("[data-track]")!;
        const fills = root.current!.querySelectorAll<HTMLElement>("[data-fill]");

        // Read the scrubbed timeline's own time (not the trigger's), so the
        // copy switches exactly when the feed does.
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          onUpdate: () => {
            const t = tl.time();
            setActive(Math.min(n - 1, Math.floor(t + (1 - HOLD) / 2)));
            fills.forEach((f, i) => (f.style.transform = `scaleX(${Math.min(1, Math.max(0, t - i))})`));
          },
          scrollTrigger: {
            trigger: "[data-stage]",
            start: "top top",
            end: () => `+=${window.innerHeight * (n - 0.4)}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
          },
        });
        for (let i = 1; i < n; i++) {
          tl.to({}, { duration: HOLD })
            .to(track, { yPercent: (-100 / n) * i, duration: 1 - HOLD, ease: "power2.inOut" });
        }
        tl.to({}, { duration: HOLD });
        tlRef.current = tl;
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  const svc = services[active];

  return (
    <section ref={root} className="on-dark relative bg-ink text-paper" aria-label="Services">
      <div className="gutter pt-24 md:pt-32">
        <SplitReveal as="h2" by="lines" className="font-display max-w-[14ch] text-[clamp(3.2rem,8.5vw,9rem)]">
          Six ways to get talked about.
        </SplitReveal>
      </div>

      {/* Desktop: pinned stage */}
      <div data-stage className="relative hidden h-[100svh] items-center md:flex">
        <div className="gutter grid w-full grid-cols-12 items-center gap-6">
          <div className="col-span-5 min-h-[340px] pr-4">
            <p className="mb-5 text-[14px] tabular text-paper/50">
              Reel {active + 1} of {n}
            </p>
            <div className="grid items-end overflow-hidden [&>*]:[grid-area:1/1]">
              {services.map((s, i) => (
                <h3
                  key={s.slug}
                  aria-hidden={i !== active}
                  className="font-display text-[clamp(2.8rem,4.6vw,5.4rem)] transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{
                    transform: `translateY(${i === active ? 0 : i < active ? -110 : 110}%)`,
                    opacity: i === active ? 1 : 0,
                  }}
                >
                  {s.title}
                </h3>
              ))}
            </div>
            <p key={svc.slug} className="mt-6 max-w-[40ch] text-[17px] leading-relaxed text-paper/75 [animation:fadeUp_.6s_var(--ease-out)_both]">
              {svc.description}
            </p>
            <ul key={`${svc.slug}-d`} className="mt-6 flex max-w-[44ch] flex-wrap gap-2">
              {svc.deliverables.map((d, i) => (
                <li
                  key={d}
                  className="rounded-full border border-paper/20 px-3.5 py-1.5 text-[13.5px] text-paper/85 [animation:fadeUp_.5s_var(--ease-out)_both]"
                  style={{ animationDelay: `${0.08 + i * 0.05}s` }}
                >
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-3 col-start-6 flex justify-center">
            <Phone interactive className="h-[76svh] max-h-[740px]">
              <div data-track className="absolute inset-x-0 top-0" style={{ height: `${n * 100}%` }}>
                {services.map((s, i) => (
                  <div key={s.slug} className="relative" style={{ height: `${100 / n}%` }}>
                    <Scene slug={s.slug} active={pinned ? i === active : true} />
                    <ReelOverlay caption={s.caption} likes={s.likes} light={lightScenes.has(s.slug)} />
                  </div>
                ))}
              </div>
            </Phone>
          </div>

          <ol className="col-span-3 col-start-10 flex flex-col gap-4">
            {services.map((s, i) => (
              <li key={s.slug}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={i === active}
                  className={`w-full text-left transition-colors duration-300 hover:text-paper ${i === active ? "text-paper" : "text-paper/35"}`}
                >
                  <span className="text-[17px] font-medium">{s.title}</span>
                  <span className="mt-2 block h-[2px] overflow-hidden rounded-full bg-paper/12">
                    <span data-fill className={`block h-full origin-left bg-red ${pinned ? "scale-x-0" : i === active ? "scale-x-100" : "scale-x-0"}`} />
                  </span>
                </button>
              </li>
            ))}
            <li className="mt-4">
              <Link
                href="/services"
                className="inline-flex border-b-2 border-red pb-1 text-[15px] font-semibold transition-colors duration-200 hover:text-red"
              >
                All services in detail
              </Link>
            </li>
          </ol>
        </div>
      </div>

      {/* Mobile: swipeable reels */}
      <div className="pb-20 pt-10 md:hidden">
        <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none]" aria-label="Services">
          {services.map((s) => (
            <li key={s.slug} className="w-[min(74vw,33svh)] shrink-0 snap-center">
              <Phone className="w-full">
                <Scene slug={s.slug} active />
                <ReelOverlay caption={s.caption} likes={s.likes} light={lightScenes.has(s.slug)} />
              </Phone>
              <h3 className="font-display mt-5 text-[clamp(2.4rem,10vw,3.4rem)]">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-paper/75">{s.short}</p>
            </li>
          ))}
        </ul>
        <div className="px-4 pt-4">
          <Link href="/services" className="inline-flex border-b-2 border-red pb-1 text-[15px] font-semibold">
            All services in detail
          </Link>
        </div>
      </div>
    </section>
  );
}
