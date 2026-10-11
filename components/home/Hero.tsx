"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRef, useState } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { heroState } from "@/lib/heroState";
import { whatsappLink } from "@/lib/site";
import Topo from "@/components/Topo";
import Magnetic from "@/components/motion/Magnetic";

const BMark = dynamic(() => import("@/components/three/BMark"), { ssr: false });

const notifications = [
  { who: "mumbai.foodie", what: "tagged you in a reel", tone: "bg-red" },
  { who: "12,480 people", what: "liked your post", tone: "bg-ink" },
  { who: "nightout.bom", what: "started following you", tone: "bg-red" },
  { who: "Your reel", what: "is trending in Mumbai", tone: "bg-ink" },
  { who: "the.style.edit", what: "wants to collab", tone: "bg-red" },
];

function Heart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M12 21.2s-7.6-4.6-9.8-9.3C.7 8.6 2.6 4.3 6.6 4.3c2.3 0 3.9 1.3 5.4 3.2 1.5-1.9 3.1-3.2 5.4-3.2 4 0 5.9 4.3 4.4 7.6-2.2 4.7-9.8 9.3-9.8 9.3z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [likes, setLikes] = useState(12480);
  const [liked, setLiked] = useState(false);
  const lastTap = useRef(0);

  const like = () => {
    window.dispatchEvent(new Event("cb:like"));
    setLikes((n) => n + 1);
    setLiked(true);
    const heart = root.current?.querySelector("[data-big-heart]");
    if (heart && !prefersReducedMotion()) {
      gsap.fromTo(
        heart,
        { scale: 0.2, autoAlpha: 0, rotate: -12 },
        {
          keyframes: [
            { scale: 1.15, autoAlpha: 1, rotate: 0, duration: 0.32, ease: "back.out(2.4)" },
            { scale: 1, duration: 0.18, ease: "power2.out" },
            { scale: 1.08, autoAlpha: 0, y: -40, duration: 0.45, delay: 0.35, ease: "power2.in" },
          ],
        }
      );
      gsap.set(heart, { y: 0, delay: 1.4 });
    }
  };

  // Double-tap on touch, double-click on desktop.
  const onPointerUp = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") return;
    const now = performance.now();
    if (now - lastTap.current < 320) like();
    lastTap.current = now;
  };

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();
      const q = gsap.utils.selector(root);

      // Pointer position, normalised to -1..1, for the 3D head-follow.
      const onMove = (e: PointerEvent) => {
        heroState.px = (e.clientX / window.innerWidth) * 2 - 1;
        heroState.py = (e.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      if (reduced) {
        heroState.intro = 1;
        gsap.set(q("[data-hero-fade], h1"), { autoAlpha: 1 });
        return () => window.removeEventListener("pointermove", onMove);
      }

      // ── Entrance ──────────────────────────────────────────────────────
      heroState.intro = 0;
      const lines = q<HTMLElement>("[data-line]");
      // background-clip:text doesn't survive transformed children, so the
      // brushed fill moves from each line onto each character.
      const split = SplitText.create(lines, { type: "chars", mask: "chars", charsClass: "type-brushed" });
      lines.forEach((l) => l.classList.remove("type-brushed"));
      gsap.set(q("h1"), { autoAlpha: 1 });
      const intro = gsap.timeline({ delay: 0.55 });
      intro
        .from(split.chars, { yPercent: 105, duration: 1.25, ease: "expo.out", stagger: 0.035 }, 0)
        .to(heroState, { intro: 1, duration: 2.2, ease: "power2.out" }, 0.15)
        .fromTo(
          q("[data-hero-fade]"),
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 1, ease: "expo.out", stagger: 0.08 },
          0.75
        );

      // ── Notification toasts: two slots, cycling ─────────────────────────
      const slots = q<HTMLElement>("[data-toast]");
      let n = 0;
      const show = (slot: HTMLElement) => {
        const item = notifications[n++ % notifications.length];
        slot.querySelector("[data-who]")!.textContent = item.who;
        slot.querySelector("[data-what]")!.textContent = item.what;
        const dot = slot.querySelector<HTMLElement>("[data-dot]")!;
        dot.className = `h-7 w-7 shrink-0 rounded-full ${item.tone}`;
        gsap.timeline()
          .fromTo(slot, { autoAlpha: 0, y: 14, scale: 0.94 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, ease: "back.out(1.6)" })
          .to(slot, { autoAlpha: 0, y: -10, scale: 0.97, duration: 0.35, ease: "power2.in" }, "+=2.6");
      };
      const timers: number[] = [];
      slots.forEach((slot, i) => {
        const run = () => show(slot);
        timers.push(window.setTimeout(() => {
          run();
          timers.push(window.setInterval(run, 4200));
        }, 2600 + i * 2100));
      });

      // ── Scroll: the B flies at the camera, ink floods in behind it ───────
      gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=100%",
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          onUpdate: (self) => (heroState.progress = self.progress),
        },
      })
        .to(q("[data-line-wrap='1']"), { xPercent: -55, ease: "none", duration: 0.7 }, 0)
        .to(q("[data-line-wrap='2']"), { xPercent: 55, ease: "none", duration: 0.7 }, 0)
        .to(q("[data-hero-ui]"), { autoAlpha: 0, y: 40, ease: "none", duration: 0.25 }, 0)
        .fromTo(
          q("[data-ink]"),
          { clipPath: "circle(0% at var(--bx) var(--by))" },
          { clipPath: "circle(140% at var(--bx) var(--by))", ease: "power1.in", duration: 0.5 },
          0.38
        )
        .to(q("[data-canvas]"), { autoAlpha: 0, ease: "none", duration: 0.14 }, 0.74);

      return () => {
        window.removeEventListener("pointermove", onMove);
        timers.forEach((t) => {
          clearTimeout(t);
          clearInterval(t);
        });
        heroState.progress = 0;
      };
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-red text-ink [--bx:50%] [--by:56.5%] md:[--bx:25%] md:[--by:55.5%]"
      aria-label="Introduction"
    >
      <Topo alpha={0.2} />

      {/* Headline sits behind the 3D mark */}
      <h1
        data-split=""
        aria-label="Stop the scroll."
        className="font-display pointer-events-none absolute inset-x-0 top-[13svh] z-[1] select-none gutter text-[min(21.5vw,33svh)] md:top-[14svh]"
      >
        <span data-line-wrap="1" className="block">
          <span data-line aria-hidden className="type-brushed block">
            Stop the
          </span>
        </span>
        <span data-line-wrap="2" className="block text-right">
          <span data-line aria-hidden className="type-brushed block">
            Scroll.
          </span>
        </span>
      </h1>

      {/* Ink flood for the hand-off into the next section */}
      <div data-ink aria-hidden className="absolute inset-0 z-[2] bg-ink" style={{ clipPath: "circle(0% at var(--bx) var(--by))" }} />

      <div data-canvas className="absolute inset-0 z-[3]">
        <BMark className="absolute inset-0 md:[filter:drop-shadow(0_40px_44px_rgba(90,0,8,0.38))]" />
      </div>

      {/* Double-tap target over the mark */}
      <button
        type="button"
        aria-label={`Like CreatorBay, ${likes.toLocaleString("en-US")} likes`}
        onDoubleClick={like}
        onPointerUp={onPointerUp}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), like())}
        className="absolute left-[var(--bx)] top-[var(--by)] z-[4] h-[30svh] w-[24svh] md:h-[40svh] md:w-[min(30vw,30svh)] md:min-w-[180px] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-[2rem] [touch-action:manipulation]"
      />
      <div data-big-heart aria-hidden className="pointer-events-none invisible absolute left-[var(--bx)] top-[var(--by)] z-[5] -ml-[11vmin] -mt-[11vmin] h-[22vmin] w-[22vmin] text-paper drop-shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
        <Heart className="h-full w-full" />
      </div>

      <div data-hero-ui className="pointer-events-none absolute inset-0 z-[5]">
        {/* Toast slots */}
        <div data-toast className="invisible absolute hidden md:left-[calc(var(--bx)+9vw)] md:top-[44svh] md:block">
          <Toast />
        </div>
        <div data-toast className="invisible absolute hidden md:right-[6vw] md:top-[13svh] md:block">
          <Toast />
        </div>

        {/* Like counter + hint */}
        <div data-hero-fade className="absolute left-[var(--bx)] top-[calc(var(--by)+22svh)] hidden -translate-x-1/2 md:block">
          <div className="flex items-center gap-2 whitespace-nowrap rounded-full bg-ink/90 px-3.5 py-2 text-[13px] font-medium text-paper shadow-[0_10px_30px_rgba(60,0,4,0.3)]">
            <Heart className={`h-4 w-4 transition-colors duration-300 ${liked ? "text-red" : "text-paper"}`} />
            <span className="tabular">{likes.toLocaleString("en-US")}</span>
            <span className="text-paper/60">{liked ? "liked" : "double-tap the B"}</span>
          </div>
        </div>

        {/* Bottom row */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-5 gutter pb-6 md:flex-row md:items-end md:justify-between md:pb-9">
          <p data-hero-fade className="max-w-[34ch] text-[15px] leading-snug font-medium md:text-[17px]">
            CreatorBay matches brands, events and restaurants with creators their audience already trusts. We run the
            whole campaign, from the brief to the final report.
          </p>
          <div data-hero-fade className="pointer-events-auto flex flex-wrap items-center gap-3">
            <Magnetic>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center rounded-full bg-ink px-6 text-[15px] font-semibold text-paper transition-transform duration-150 ease-out active:scale-[0.97] md:h-14 md:px-7"
              >
                Start a campaign
              </Link>
            </Magnetic>
            <a
              href={whatsappLink("Hi CreatorBay! I'd like to talk about a campaign.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center rounded-full border-2 border-ink px-5 text-[15px] font-semibold transition-colors duration-200 hover:bg-ink hover:text-paper md:h-14 md:px-6"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Toast() {
  return (
    <div className="flex w-[min(78vw,290px)] items-center gap-3 rounded-2xl bg-paper/95 px-3.5 py-3 text-ink shadow-[0_18px_40px_rgba(70,0,6,0.28)] backdrop-blur">
      <span data-dot className="h-7 w-7 shrink-0 rounded-full bg-red" />
      <p className="text-[13px] leading-tight">
        <span data-who className="font-semibold" /> <span data-what className="text-ink/70" />
      </p>
      <span className="ml-auto text-[11px] text-ink/40">now</span>
    </div>
  );
}
