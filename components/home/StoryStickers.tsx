"use client";

import { useEffect, useState } from "react";

/* Instagram-story stickers, one per campaign step. Pure presentation. */

const card = "w-[min(78vw,320px)] rounded-[22px] shadow-[0_30px_60px_-18px_rgba(60,0,4,0.55)]";
const light = "bg-paper text-ink";

function Question() {
  return (
    <div className={`${card} ${light} -rotate-3 overflow-hidden`}>
      <p className="bg-ink px-5 pb-4 pt-5 text-center text-[15px] font-semibold text-paper">Ask us anything</p>
      <p className="px-5 py-5 text-center text-[17px] font-medium text-ink/55">What does success look like for you?</p>
    </div>
  );
}

function Poll() {
  return (
    <div className={`${card} ${light} rotate-2 p-5`}>
      <p className="text-center text-[17px] font-semibold">Who fits the brand?</p>
      <div className="mt-4 flex flex-col gap-2.5 text-[15px] font-semibold">
        <div className="relative overflow-hidden rounded-xl bg-fog px-4 py-3">
          <span className="absolute inset-y-0 left-0 w-[78%] origin-left bg-red [animation:grow_.9s_var(--ease-out)_.2s_both]" />
          <span className="relative flex justify-between">
            <span>@mumbai.foodie</span>
            <span>78%</span>
          </span>
        </div>
        <div className="relative overflow-hidden rounded-xl bg-fog px-4 py-3 text-ink/60">
          <span className="absolute inset-y-0 left-0 w-[22%] origin-left bg-ink/15 [animation:grow_.9s_var(--ease-out)_.3s_both]" />
          <span className="relative flex justify-between">
            <span>@random.reach</span>
            <span>22%</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function Countdown() {
  return (
    <div className={`${card} -rotate-2 bg-ink p-5 text-paper`}>
      <p className="text-center text-[15px] font-semibold text-paper/70">Campaign launch</p>
      <div className="font-display mt-2 flex justify-center gap-2 text-[64px] leading-none tabular">
        {["03", "14", "22"].map((d, i) => (
          <span key={i} className="flex items-center gap-2">
            <span className="rounded-xl bg-paper/10 px-2.5 py-1.5">{d}</span>
            {i < 2 && <span className="text-red">:</span>}
          </span>
        ))}
      </div>
      <p className="mt-3 text-center text-[13px] text-paper/60">days · hours · minutes</p>
    </div>
  );
}

function Live() {
  const [viewers, setViewers] = useState(2410);
  useEffect(() => {
    const id = window.setInterval(() => setViewers((v) => v + Math.round(Math.random() * 37)), 700);
    return () => window.clearInterval(id);
  }, []);
  return (
    <div className={`${card} ${light} relative rotate-3 p-5`}>
      <div className="flex items-center justify-between">
        <span className="rounded-md bg-red px-2.5 py-1 text-[13px] font-bold tracking-wide text-ink">LIVE</span>
        <span className="text-[14px] font-semibold tabular text-ink/70">{viewers.toLocaleString("en-US")} watching</span>
      </div>
      <p className="mt-4 text-[17px] font-semibold leading-snug">12 creators posting tonight, all on-brief.</p>
      <div aria-hidden className="pointer-events-none absolute -top-2 right-6 h-24 w-10">
        {[0, 1, 2].map((i) => (
          <svg
            key={i}
            viewBox="0 0 24 24"
            className="absolute bottom-0 left-1/2 h-6 w-6 text-red [animation:floatUp_1.8s_ease-out_infinite]"
            style={{ animationDelay: `${i * 0.6}s` }}
          >
            <path
              fill="currentColor"
              d="M12 21.2s-7.6-4.6-9.8-9.3C.7 8.6 2.6 4.3 6.6 4.3c2.3 0 3.9 1.3 5.4 3.2 1.5-1.9 3.1-3.2 5.4-3.2 4 0 5.9 4.3 4.4 7.6-2.2 4.7-9.8 9.3-9.8 9.3z"
            />
          </svg>
        ))}
      </div>
    </div>
  );
}

function Slider() {
  return (
    <div className={`${card} ${light} -rotate-2 p-5`}>
      <p className="text-center text-[17px] font-semibold">How did the campaign do?</p>
      <div className="relative mt-6 h-2 rounded-full bg-fog">
        <span className="absolute inset-y-0 left-0 w-[92%] origin-left rounded-full bg-gradient-to-r from-ink to-red [animation:grow_1.1s_var(--ease-out)_.2s_both]" />
        <span className="absolute top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-paper text-[22px] shadow-md [animation:slideKnob_1.1s_var(--ease-out)_.2s_both]" style={{ left: "92%" }}>
          🔥
        </span>
      </div>
      <p className="mt-6 text-center text-[13px] text-ink/55">3× bookings · 400K reach · 18% engagement</p>
    </div>
  );
}

export const stickers = [Question, Poll, Countdown, Live, Slider];
