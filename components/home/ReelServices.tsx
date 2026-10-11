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
 * Services as a reels feed. One phone pins on every screen size and scrolling
 * swipes the feed; the copy beside (or under) it switches in step. With reduced
 * motion nothing pins and the reels are switched with the controls instead.
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
      mm.add("(prefers-reduced-motion: no-preference)", () => {
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
            // Bar i fills over exactly the scroll range in which reel i is the
            // active one, so it completes at the instant the next reel takes over.
            const shift = (1 - HOLD) / 2;
            fills.forEach((f) => {
              const i = Number(f.dataset.i);
              const from = i === 0 ? 0 : i - shift;
              const to = i === n - 1 ? tl.duration() : i + 1 - shift;
              f.style.setProperty("--p", String(Math.min(1, Math.max(0, (t - from) / (to - from)))));
            });
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
      // Reduced motion: leave the stage static, driven by the controls only.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        setPinned(false);
        tlRef.current = null;
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

      {/* Pinned stage: phone on the right (desktop) or on top (mobile) */}
      <div data-stage className="relative flex h-[100svh] min-h-[560px] items-center pb-5 pt-20 md:pb-0 md:pt-0">
        <div className="gutter grid w-full grid-cols-[minmax(0,1fr)] items-center gap-4 md:grid-cols-12 md:gap-6">
          <div className="order-2 min-w-0 md:order-1 md:col-span-5 md:min-h-[340px] md:pr-4">
            <p className="mb-2 text-[13px] tabular text-paper/55 md:mb-5 md:text-[14px]">
              Reel {active + 1} of {n}
            </p>
            <div className="grid items-end overflow-hidden [&>*]:[grid-area:1/1]">
              {services.map((s, i) => (
                <h3
                  key={s.slug}
                  aria-hidden={i !== active}
                  className="font-display min-w-0 text-[clamp(2rem,9.2vw,3rem)] md:text-[clamp(2.8rem,4.6vw,5.4rem)] transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{
                    transform: `translateY(${i === active ? 0 : i < active ? -110 : 110}%)`,
                    opacity: i === active ? 1 : 0,
                  }}
                >
                  {s.title}
                </h3>
              ))}
            </div>
            <p
              key={svc.slug}
              className="mt-3 max-w-[40ch] text-[15px] leading-snug text-paper/75 [animation:fadeUp_.6s_var(--ease-out)_both] md:mt-6 md:text-[17px] md:leading-relaxed"
            >
              <span className="md:hidden">{svc.short}</span>
              <span className="hidden md:inline">{svc.description}</span>
            </p>
            <ul key={`${svc.slug}-d`} className="mt-6 hidden max-w-[44ch] flex-wrap gap-2 md:flex">
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

            {/* Mobile: step bar, also tappable */}
            <ol className="mt-4 flex gap-1.5 md:hidden" aria-label="Reels">
              {services.map((s, i) => (
                <li key={s.slug} className="flex-1">
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={i === active}
                    aria-label={`Reel ${i + 1}: ${s.title}`}
                    className="flex h-9 w-full items-center"
                  >
                    <span className="block h-[3px] w-full overflow-hidden rounded-full bg-paper/15">
                      <span
                        data-fill
                        data-i={i}
                        className="block h-full origin-left bg-red [transform:scaleX(var(--p,0))]"
                        style={pinned ? undefined : ({ "--p": i === active ? 1 : 0 } as React.CSSProperties)}
                      />
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className="order-1 flex justify-center md:order-2 md:col-span-3 md:col-start-6">
            <Phone interactive className="h-[min(46svh,430px)] md:h-[76svh] md:max-h-[740px]">
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

          <ol className="order-3 hidden flex-col gap-4 md:col-span-3 md:col-start-10 md:flex">
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
                    <span data-fill data-i={i} className="block h-full origin-left bg-red [transform:scaleX(var(--p,0))]" style={pinned ? undefined : ({ "--p": i === active ? 1 : 0 } as React.CSSProperties)} />
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

      <div className="gutter pb-16 pt-2 md:hidden">
        <Link href="/services" className="inline-flex border-b-2 border-red pb-1 text-[15px] font-semibold">
          All services in detail
        </Link>
      </div>
    </section>
  );
}
