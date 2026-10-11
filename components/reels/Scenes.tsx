"use client";

import { useEffect, useState } from "react";
import type { ServiceScene } from "@/lib/site";
import s from "./scenes.module.css";

function EventScene() {
  return (
    <div className={`${s.scene} ${s.event}`}>
      <div className={s.beam} />
      <div className={s.beam} />
      <div className={s.beam} />
      <div className={s.tickets}>
        Tickets left
        <div className={s.ticketBar}>
          <i />
        </div>
      </div>
      <div className={`${s.stamp} font-display`}>Sold out</div>
      <div className={s.crowd}>
        {Array.from({ length: 9 }, (_, i) => (
          <span key={i} className={s.head} style={{ animationDelay: `${(i * 137) % 600}ms`, height: `${12 + ((i * 7) % 5)}cqh` }} />
        ))}
      </div>
    </div>
  );
}

function CollabScene() {
  return (
    <div className={`${s.scene} ${s.collab}`}>
      <div className={`${s.disc} ${s.discA} font-display`}>Brand</div>
      <div className={`${s.disc} ${s.discB} font-display`}>Creator</div>
      <div className={`${s.times} font-display`}>×</div>
      <div className={`${s.equation} font-display`}>1 + 1 = 3</div>
    </div>
  );
}

function RestaurantScene() {
  const rows = [
    ["Fri 7:30 pm", "Table for 4"],
    ["Fri 8:00 pm", "Table for 2"],
    ["Sat 8:30 pm", "Table for 6"],
    ["Sat 9:00 pm", "Table for 2"],
    ["Sun 1:00 pm", "Brunch for 8"],
  ];
  return (
    <div className={`${s.scene} ${s.restaurant}`}>
      <p className={`${s.boardTitle} font-display`}>This weekend</p>
      <div>
        {rows.map(([when, what]) => (
          <div key={when} className={s.row}>
            <span>
              <b className="font-semibold">{when}</b>
              <span className="opacity-60"> · {what}</span>
            </span>
            <span className={s.booked}>Booked</span>
          </div>
        ))}
      </div>
      <span className={`${s.full} font-display`}>Fully booked</span>
    </div>
  );
}

function ReelScene() {
  const [frames, setFrames] = useState(12 * 30 + 8);
  useEffect(() => {
    const id = window.setInterval(() => setFrames((f) => f + 1), 1000 / 30);
    return () => window.clearInterval(id);
  }, []);
  const sec = Math.floor(frames / 30);
  const tc = `00:00:${String(sec % 60).padStart(2, "0")}:${String(frames % 30).padStart(2, "0")}`;
  return (
    <div className={`${s.scene} ${s.reel}`}>
      <div className={s.subject} />
      <div className={s.thirds} />
      <span className={s.bracket} />
      <span className={s.bracket} />
      <span className={s.bracket} />
      <span className={s.bracket} />
      <div className={s.focus} />
      <div className={s.recBar}>
        <span>
          <span className={s.recDot} />
          REC
        </span>
        <span>{tc}</span>
        <span>4K 60</span>
      </div>
    </div>
  );
}

const frameFills = [
  "linear-gradient(160deg,#fb3036,#8f0f16)",
  "linear-gradient(200deg,#1d1d1d,#4a4a4a)",
  "radial-gradient(circle at 40% 30%,#ffb3b5,#fb3036)",
  "linear-gradient(180deg,#fff,#d9d4d4)",
  "radial-gradient(circle at 60% 60%,#fb3036,#1d1d1d)",
  "linear-gradient(120deg,#2a2a2a,#fb3036)",
  "linear-gradient(0deg,#fb3036,#ffd0d1)",
  "radial-gradient(circle at 50% 40%,#fff,#1d1d1d 70%)",
  "linear-gradient(90deg,#8f0f16,#fb3036)",
];

function ProductionScene() {
  return (
    <div className={`${s.scene} ${s.production}`}>
      <p className="font-display mb-[2cqh] text-[11cqw] leading-[0.9] text-ink">Contact sheet</p>
      <div className={s.sheet}>
        {frameFills.map((bg, i) => (
          <div key={i} className={s.frame} style={{ background: bg, animationDelay: `${0.15 + i * 0.09}s` }}>
            {i === 4 && (
              <svg className={s.circle} viewBox="0 0 100 100" aria-hidden>
                <path d="M50 6 C78 4 96 24 95 50 C94 78 74 96 48 95 C22 94 4 74 6 48 C8 24 26 8 54 9" />
              </svg>
            )}
          </div>
        ))}
      </div>
      <div className={s.flash} />
    </div>
  );
}

function StrategyScene() {
  return (
    <div className={`${s.scene} ${s.strategy}`}>
      <p className="text-[4cqw] font-semibold opacity-60">Engagement rate</p>
      <p className={`${s.bigStat} font-display`}>18%</p>
      <svg className={s.chart} viewBox="0 0 200 120" aria-hidden>
        <g stroke="rgba(29,29,29,0.12)" strokeWidth="1">
          <line x1="0" y1="30" x2="200" y2="30" />
          <line x1="0" y1="60" x2="200" y2="60" />
          <line x1="0" y1="90" x2="200" y2="90" />
        </g>
        <path className={s.area} d="M4 104 L36 96 L68 100 L100 74 L132 70 L164 38 L196 14 L196 120 L4 120 Z" />
        <path className={s.line} d="M4 104 L36 96 L68 100 L100 74 L132 70 L164 38 L196 14" />
      </svg>
      <div>
        <span className={s.chip}>400K reach</span>
        <span className={s.chip}>3× bookings</span>
        <span className={s.chip}>+12 creators</span>
      </div>
    </div>
  );
}

export const scenes: Record<ServiceScene, () => React.ReactElement> = {
  event: EventScene,
  collab: CollabScene,
  restaurant: RestaurantScene,
  reel: ReelScene,
  production: ProductionScene,
  strategy: StrategyScene,
};

/** Scenes with a light background need dark app chrome on top. */
export const lightScenes = new Set<ServiceScene>(["production", "strategy"]);

/** Renders a scene; remounts on activation so its CSS animations replay. */
export function Scene({ slug, active }: { slug: ServiceScene; active: boolean }) {
  const C = scenes[slug];
  return <C key={active ? "on" : "off"} />;
}
