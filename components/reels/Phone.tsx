"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion, isCoarsePointer } from "@/lib/gsap";
import s from "./phone.module.css";

// iPhone 17 Pro Max proportions: 78 × 163.4 × 8.75 mm.
const LAYERS = 14;

/**
 * A silver iPhone 17 Pro Max built in CSS 3D: aluminium rim, side buttons and
 * real depth (stacked edge layers), with a glare that slides as it tilts.
 * The screen is a size container, so reels scale with it.
 */
export default function Phone({
  children,
  className = "",
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  /** Tilt toward the pointer (desktop only). */
  interactive?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      const body = root.current?.querySelector<HTMLElement>("[data-body]");
      if (!body || !contextSafe) return;
      const base = { ry: -16, rx: 7 };
      gsap.set(body, { rotationY: base.ry, rotationX: base.rx, rotationZ: 0.6 });
      if (!interactive || prefersReducedMotion() || isCoarsePointer()) return;

      const ry = gsap.quickTo(body, "rotationY", { duration: 1.1, ease: "power3.out" });
      const rx = gsap.quickTo(body, "rotationX", { duration: 1.1, ease: "power3.out" });
      const glare = gsap.quickTo(body, "--gx", { duration: 1.1, ease: "power3.out" });
      const onMove = contextSafe((e: PointerEvent) => {
        const px = (e.clientX / window.innerWidth) * 2 - 1;
        const py = (e.clientY / window.innerHeight) * 2 - 1;
        ry(base.ry + px * 14);
        rx(base.rx - py * 8);
        glare(50 - px * 40);
      });
      window.addEventListener("pointermove", onMove, { passive: true });
      return () => window.removeEventListener("pointermove", onMove);
    },
    { scope: root, dependencies: [interactive] }
  );

  return (
    <div ref={root} className={`${s.phone} ${className}`}>
      <div className={s.float}>
        <div data-body className={s.body}>
          <div className={s.shadow} aria-hidden />

          {/* Aluminium edge: stacked slices give the frame its thickness */}
          {Array.from({ length: LAYERS }, (_, k) => (
            <div
              key={k}
              aria-hidden
              className={`${s.slice} ${k === LAYERS - 1 ? s.back : ""}`}
              style={{ ["--k" as string]: k + 1 }}
            >
              {k > 3 && k < 10 && (
                <>
                  <span className={`${s.btn} ${s.action}`} />
                  <span className={`${s.btn} ${s.volUp}`} />
                  <span className={`${s.btn} ${s.volDown}`} />
                  <span className={`${s.btn} ${s.power}`} />
                  <span className={`${s.btn} ${s.camera}`} />
                </>
              )}
            </div>
          ))}

          {/* Front: polished rim, then black border, then screen */}
          <div className={s.front}>
            <div className={s.bezel}>
              <div className={s.screen}>
                {children}
                <div className={s.island} aria-hidden>
                  <span />
                </div>
                <div className={s.glare} aria-hidden />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
