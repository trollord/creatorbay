"use client";

import { useRef, useEffect, useCallback, useState } from "react";

interface CardData {
  label: string;
  title: string;
  description: string;
  icon?: string;
}

interface StackedCardsProps {
  cards: CardData[];
}

const CARD_STEP = 500;
const DEAD_ZONE = 400;
// Responsive card height — set dynamically after mount
const CARD_H_MOBILE = 460;
const CARD_H_DESKTOP = 560;
const SLIDE_DIST_MOBILE = CARD_H_MOBILE + 40;
const SLIDE_DIST_DESKTOP = CARD_H_DESKTOP + 40;

const STAIRCASE_TOP = 20;
const DEPTH_SCALE = 0.08;
const DARKEN_PER_DEPTH = 0.25;

function easeOutBack(x: number): number {
  const c1 = 1.4;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

const CARD_COLORS = [
  "linear-gradient(135deg, #1a0533 0%, #0d0d0d 100%)",
  "linear-gradient(135deg, #0d001a 0%, #1a0533 100%)",
  "linear-gradient(135deg, #1a0020 0%, #0d0d0d 100%)",
  "linear-gradient(135deg, #0d1a00 0%, #0a0a0a 100%)",
  "linear-gradient(135deg, #001a1a 0%, #0d0d0d 100%)",
];

const CARD_ACCENT_COLORS = [
  "#8b5cf6",
  "#ec4899",
  "#a855f7",
  "#f59e0b",
  "#06b6d4",
];

export default function StackedCards({ cards }: StackedCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const CARD_H = isMobile ? CARD_H_MOBILE : CARD_H_DESKTOP;
  const SLIDE_DIST = isMobile ? SLIDE_DIST_MOBILE : SLIDE_DIST_DESKTOP;

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const scrolled = -container.getBoundingClientRect().top;
    const max = CARD_STEP * (cards.length - 1);
    if (scrolled <= 0) setProgress(0);
    else if (scrolled >= max) setProgress(cards.length - 1);
    else setProgress(scrolled / CARD_STEP);
  }, [cards.length]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollHeight = CARD_STEP * (cards.length - 1) + DEAD_ZONE + CARD_H;
  const activeIndex = Math.floor(Math.min(progress, cards.length - 1));

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: `${scrollHeight}px` }}>
      <div
        className="sticky top-20 md:top-28 w-full"
        style={{ height: `${CARD_H}px`, perspective: "1200px", perspectiveOrigin: "50% 30%" }}
      >
        {cards.map((card, i) => {
          const tRaw = i === 0 ? 1 : Math.max(0, Math.min(1, progress - (i - 1)));
          const t = tRaw;
          const tE = i === 0 ? 1 : easeOutBack(tRaw);

          const slideY = (1 - tE) * SLIDE_DIST;
          const rotateX = (1 - tE) * 6;
          const entryScale = 0.94 + tE * 0.06;

          const isStacked = t >= 1 && i < activeIndex;
          const depth = isStacked ? activeIndex - i : 0;

          const stackTopOffset = depth * STAIRCASE_TOP;
          const stackScale = 1 - depth * DEPTH_SCALE;
          const stackZ = -depth * 30;
          const darkenOpacity = isStacked ? Math.min(0.8, depth * DARKEN_PER_DEPTH) : 0;
          const opacity = i === 0 ? 1 : Math.min(1, t * 2.5);

          const isIncoming = t > 0 && t < 1;
          const topShadow = i > 0 && (isIncoming || t >= 1) ? `0 -8px 20px rgba(0,0,0,0.35)` : "none";
          const bottomShadow = isStacked
            ? `0 ${4 + depth * 2}px ${10 + depth * 4}px rgba(0,0,0,${0.15 + depth * 0.05})`
            : i === activeIndex
            ? "0 8px 24px rgba(0,0,0,0.3)"
            : "0 4px 12px rgba(0,0,0,0.2)";

          const accentColor = CARD_ACCENT_COLORS[i % CARD_ACCENT_COLORS.length];

          return (
            <div
              key={i}
              className="absolute left-0 right-0"
              style={{
                top: isStacked ? `${-stackTopOffset}px` : 0,
                bottom: isStacked ? `${stackTopOffset}px` : 0,
                height: isStacked ? undefined : "100%",
                opacity,
                transform: isStacked
                  ? `translateZ(${stackZ}px) scale(${stackScale})`
                  : `translateY(${slideY}px) rotateX(${rotateX}deg) scale(${entryScale})`,
                transformOrigin: "50% 0%",
                transformStyle: "preserve-3d",
                zIndex: i,
                willChange: "transform, opacity",
              }}
            >
              <div
                className="w-full h-full rounded-2xl p-6 sm:p-8 md:p-10 flex flex-col justify-between overflow-hidden relative"
                style={{
                  background: CARD_COLORS[i % CARD_COLORS.length],
                  boxShadow: `${topShadow !== "none" ? topShadow + ", " : ""}${bottomShadow}`,
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {/* Accent glow */}
                <div
                  className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${accentColor}20 0%, transparent 70%)`,
                    transform: "translate(30%, -30%)",
                  }}
                />

                {/* Top edge highlight */}
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `${accentColor}30` }} />

                {/* Darken overlay */}
                {darkenOpacity > 0 && (
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{ background: `rgba(0,0,0,${darkenOpacity})` }}
                  />
                )}

                {/* Card number watermark */}
                <div className="absolute top-8 right-10 pointer-events-none">
                  <span className="text-6xl sm:text-8xl font-black leading-none" style={{ color: `${accentColor}08` }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="relative z-10">
                  {card.icon && (
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-6"
                      style={{ background: `${accentColor}15`, border: `1px solid ${accentColor}25` }}
                    >
                      {card.icon}
                    </div>
                  )}
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.25em] mb-3 block"
                    style={{ color: `${accentColor}80` }}
                  >
                    {card.label}
                  </span>
                  <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-3 leading-tight">
                    {card.title}
                  </h3>
                  <div className="h-px w-16 mb-5" style={{ background: `${accentColor}30` }} />
                  <p className="leading-relaxed text-sm max-w-lg" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {card.description}
                  </p>
                </div>

                {/* Progress dots */}
                <div className="relative z-10 flex gap-1.5">
                  {cards.map((_, j) => (
                    <div
                      key={j}
                      className="h-1 rounded-full transition-all duration-300"
                      style={{
                        width: j === activeIndex ? "24px" : "6px",
                        background: j <= activeIndex ? accentColor : "rgba(255,255,255,0.08)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
