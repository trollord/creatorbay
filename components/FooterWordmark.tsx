"use client";

import { useEffect, useRef, useState } from "react";

const WORD = "CREATOR BAY";
const RED = "251,48,54";
const PAPER = "255,255,255";

type Drop = { x: number; y: number; vx: number; vy: number; life: number };

/**
 * The footer's name, set in pixels. The pointer is a wet brush: it paints the
 * pixels brand red with a white-hot core, the paint dries back over a second
 * or so, and quick strokes flick droplets that splat where they land. With no
 * pointer around, a brush stroke paints through the name every few seconds.
 * Reduced motion (or no JS) keeps the plain red wordmark.
 */
export default function FooterWordmark() {
  const host = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = host.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const word = box.querySelector<HTMLElement>("[data-wordmark]")!;

    let w = 0, h = 0, step = 7, cols = 0, rows = 0;
    // Per grid cell: is it part of a letter, how much paint it holds, how hot it is.
    let letter = new Uint8Array(0);
    let paint = new Float32Array(0);
    let heat = new Float32Array(0);
    let drops: Drop[] = [];
    let raf = 0, last = 0, visible = false, disposed = false;
    let px = -1e4, py = -1e4, lx = -1e4, ly = -1e4, pointerAt = -1e4, clock = 0, intro = 0;
    let started = false;
    let top = 0, bottom = 0;

    const layout = async () => {
      const style = getComputedStyle(word);
      const family = style.fontFamily;
      await document.fonts.load(`900 100px ${family}`).catch(() => {});
      if (disposed) return;
      const r = box.getBoundingClientRect();
      w = r.width;
      h = r.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      step = Math.max(5, Math.round(w / 230));
      cols = Math.ceil(w / step);
      rows = Math.ceil(h / step);

      // Draw the word the way the DOM sets it (justified, condensed, heavy) into
      // a scratch canvas, then read which grid cells it covers.
      const off = document.createElement("canvas");
      off.width = Math.ceil(w);
      off.height = Math.ceil(h);
      const o = off.getContext("2d")!;
      const fs = parseFloat(style.fontSize);
      o.font = `900 ${fs}px ${family}`;
      (o as CanvasRenderingContext2D & { fontStretch: string }).fontStretch = "extra-condensed";
      const padX = parseFloat(style.paddingLeft);
      const padB = parseFloat(style.paddingBottom);
      const glyphs = WORD.replace(" ", "").split("");
      const widths = glyphs.map((g) => o.measureText(g).width);
      const gapSpace = fs * 0.32;
      const free = w - padX * 2 - widths.reduce((a, b) => a + b, 0) - gapSpace;
      const gap = free / (glyphs.length - 1);
      const m = o.measureText("B");
      const base = h - padB - m.actualBoundingBoxDescent;
      let x = padX;
      glyphs.forEach((g, i) => {
        o.fillText(g, x, base);
        x += widths[i] + gap + (i === 6 ? gapSpace : 0); // after "CREATOR"
      });
      const data = o.getImageData(0, 0, off.width, off.height).data;

      letter = new Uint8Array(cols * rows);
      paint = new Float32Array(cols * rows);
      heat = new Float32Array(cols * rows);
      top = rows;
      bottom = 0;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const sx = Math.min(off.width - 1, Math.floor(col * step + step / 2));
          const sy = Math.min(off.height - 1, Math.floor(row * step + step / 2));
          if (data[(sy * off.width + sx) * 4 + 3] > 128) {
            letter[row * cols + col] = 1;
            top = Math.min(top, row);
            bottom = Math.max(bottom, row);
          }
        }
      }
      setLive(true);
      wake();
    };

    // Lay paint around (x, y): full near the middle, feathered at the edge.
    const brush = (x: number, y: number, radius: number, strength = 1) => {
      const c0 = Math.max(0, Math.floor((x - radius) / step));
      const c1 = Math.min(cols - 1, Math.ceil((x + radius) / step));
      const r0 = Math.max(0, Math.floor((y - radius) / step));
      const r1 = Math.min(rows - 1, Math.ceil((y + radius) / step));
      const core = step * 3.2;
      for (let row = r0; row <= r1; row++) {
        for (let col = c0; col <= c1; col++) {
          const dx = col * step + step / 2 - x;
          const dy = row * step + step / 2 - y;
          const d = Math.hypot(dx, dy);
          if (d > radius) continue;
          const i = row * cols + col;
          const f = (1 - d / radius) ** 0.55 * strength;
          if (f > paint[i]) paint[i] = f;
          if (d < core) heat[i] = Math.max(heat[i], 1 - d / core);
        }
      }
    };

    const frame = (dt: number) => {
      clock += dt;
      intro = Math.min(1, intro + dt / 1.4);
      ctx.clearRect(0, 0, w, h);

      const pointerLive = clock - pointerAt < 0.05;
      // Autopilot: a stroke through the word every few seconds when nobody paints.
      const idleFor = clock - pointerAt - 1.1;
      const idle = idleFor > 0;
      const PERIOD = 5, RUN = 1.9;
      const q = (idleFor % PERIOD) / RUN;
      if (idle && q <= 1) {
        const ax = -w * 0.06 + q * w * 1.12;
        const mid = ((top + bottom) / 2) * step;
        const ay = mid + Math.sin(q * Math.PI * 2.4) * (bottom - top) * step * 0.32;
        brush(ax, ay, step * 9, 0.95);
      }

      // The live brush: wider when moving fast, flicking droplets along the stroke.
      if (pointerLive || clock - pointerAt < 0.12) {
        const vx = px - lx, vy = py - ly, speed = Math.hypot(vx, vy);
        const radius = step * (8.5 + Math.min(5, speed / (step * 3)));
        // Fill the gap between frames so quick strokes stay continuous.
        const n = Math.max(1, Math.ceil(speed / (step * 2)));
        for (let k = 1; k <= n; k++) brush(lx + (vx * k) / n, ly + (vy * k) / n, radius);
        if (speed > step * 4 && drops.length < 60) {
          for (let k = 0; k < 2; k++) {
            const a = Math.atan2(vy, vx) + (Math.random() - 0.5) * 1.2;
            const v = speed * (0.35 + Math.random() * 0.5);
            drops.push({ x: px, y: py, vx: Math.cos(a) * v * 9, vy: Math.sin(a) * v * 9, life: 0.35 + Math.random() * 0.3 });
          }
        }
      }
      lx = px;
      ly = py;

      // Droplets fly, slow down and splat.
      drops = drops.filter((d) => {
        d.life -= dt;
        d.x += d.vx * dt;
        d.y += d.vy * dt;
        d.vx *= 0.9;
        d.vy *= 0.9;
        if (d.life <= 0) {
          brush(d.x, d.y, step * (1.6 + Math.random() * 1.6), 1);
          return false;
        }
        return true;
      });

      // Paint dries slowly, heat fades fast.
      const dry = dt * 0.42, cool = dt * 2.4;
      let wet = false;
      for (let i = 0; i < paint.length; i++) {
        if (paint[i] > 0) { paint[i] = Math.max(0, paint[i] - dry); wet = true; }
        if (heat[i] > 0) heat[i] = Math.max(0, heat[i] - cool);
      }

      // Draw: quiet canvas texture, then letter pixels bucketed by paint level.
      const buckets: number[][] = [[], [], [], [], [], [], []];
      const hot: number[] = [];
      const ground: number[] = [];
      for (let i = 0; i < letter.length; i++) {
        const col = i % cols;
        if (letter[i]) {
          // The first time it shows, the word fills in left to right.
          if (intro < 1 && col / cols > intro * 1.25) continue;
          if (heat[i] > 0.35) hot.push(i);
          else buckets[Math.min(6, Math.round(paint[i] * 6))].push(i);
        } else if (paint[i] > 0.04) {
          ground.push(i);
        }
      }

      // Paint on the bare ground: a faint red wash where the brush went.
      for (const i of ground) {
        const col = i % cols, row = (i / cols) | 0;
        ctx.fillStyle = `rgba(${RED},${paint[i] * 0.45})`;
        const s = step * (0.3 + paint[i] * 0.3);
        ctx.fillRect(col * step + (step - s) / 2, row * step + (step - s) / 2, s, s);
      }

      buckets.forEach((list, lvl) => {
        if (!list.length) return;
        const v = lvl / 6;
        // Dry: small, dim pixels. Wet: full red, plump enough to merge into solid paint.
        ctx.fillStyle = `rgba(${RED},${0.58 + v * 0.42})`;
        const s = step * (0.6 + v * 0.46);
        const r = s * (0.5 - v * 0.45);
        // Wet paint glows a little.
        ctx.shadowColor = `rgba(${RED},0.7)`;
        ctx.shadowBlur = v > 0.5 ? step * 1.6 * v : 0;
        ctx.beginPath();
        for (const i of list) {
          const col = i % cols, row = (i / cols) | 0;
          ctx.roundRect(col * step + (step - s) / 2, row * step + (step - s) / 2 - v * step * 0.25, s, s, r);
        }
        ctx.fill();
      });

      ctx.shadowBlur = 0;
      if (hot.length) {
        ctx.fillStyle = `rgb(${PAPER})`;
        const s = step * 0.96;
        ctx.beginPath();
        for (const i of hot) {
          const col = i % cols, row = (i / cols) | 0;
          ctx.roundRect(col * step + (step - s) / 2, row * step + (step - s) / 2 - step * 0.25, s, s, step * 0.12);
        }
        ctx.fill();
      }

      for (const d of drops) {
        ctx.fillStyle = `rgba(${RED},0.95)`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, step * 0.45, 0, Math.PI * 2);
        ctx.fill();
      }

      return wet || drops.length > 0 || intro < 1 || idle;
    };

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0);
      last = now;
      const more = frame(dt);
      raf = visible && more ? requestAnimationFrame(loop) : 0;
    };
    function wake() {
      if (!raf && visible && w) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const nx = e.clientX - r.left, ny = e.clientY - r.top;
      if (clock - pointerAt > 0.2) { lx = nx; ly = ny; } // fresh stroke: don't streak from the last spot
      px = nx;
      py = ny;
      pointerAt = clock;
      wake();
    };
    const onLeave = () => {
      pointerAt = clock - 0.06;
    };

    box.addEventListener("pointermove", onMove);
    box.addEventListener("pointerleave", onLeave);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !started) {
        started = true;
        intro = 0;
      }
      if (visible) wake();
    });
    io.observe(box);
    let t: number | undefined;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(t);
      t = window.setTimeout(layout, 120);
    });
    ro.observe(box);
    layout();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
      io.disconnect();
      ro.disconnect();
      box.removeEventListener("pointermove", onMove);
      box.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={host} aria-hidden className="relative select-none [touch-action:pan-y]">
      {/* Sets the size, and is the wordmark itself for reduced motion / no JS. */}
      <p
        data-wordmark
        className={`font-display flex justify-between px-[1vw] pb-[1.5vw] pt-[3vw] text-[14.6vw] leading-[0.8] text-red ${live ? "invisible" : ""}`}
      >
        {WORD.split("").map((c, i) =>
          c === " " ? <span key={i} className="inline-block w-[0.32em]" /> : <span key={i}>{c}</span>
        )}
      </p>
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 block h-full w-full" />
    </div>
  );
}
