"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { values, contact } from "@/lib/site";
import BLogo from "@/components/BLogo";

const likeCounts = [1284, 962, 1107, 1530];

/** What we stand for, shown as pinned comments under our own post. */
export default function ValueComments() {
  const root = useRef<HTMLDivElement>(null);
  const [liked, setLiked] = useState<boolean[]>(values.map(() => false));

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-comment]", {
          y: 60,
          autoAlpha: 0,
          rotate: (i: number) => (i % 2 ? 2 : -2),
          duration: 1,
          ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <div ref={root} className="flex flex-col gap-4">
      {values.map((v, i) => (
        <article
          key={v.title}
          data-comment
          className={`flex gap-4 rounded-[24px] bg-paper p-5 text-ink shadow-[0_24px_60px_-28px_rgba(0,0,0,0.5)] md:p-7 ${i % 2 ? "md:ml-16" : "md:mr-16"}`}
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-red">
            <BLogo className="h-7 w-auto" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[14px]">
              <span className="font-semibold">{contact.instagram}</span>
              <span className="ml-2 text-ink/45">Pinned</span>
            </p>
            <h3 className="font-display mt-2 text-[clamp(2.2rem,4vw,3.6rem)]">{v.title}</h3>
            <p className="mt-2 max-w-[52ch] text-[16px] leading-relaxed text-ink/75 md:text-[17px]">{v.desc}</p>
            <p className="mt-3 text-[13px] font-semibold text-ink/45">Reply</p>
          </div>
          <button
            type="button"
            onClick={() => setLiked((l) => l.map((x, k) => (k === i ? !x : x)))}
            aria-pressed={liked[i]}
            aria-label={`Like “${v.title}”`}
            className="flex h-fit flex-col items-center gap-1 text-[12px] text-ink/55"
          >
            <svg
              viewBox="0 0 24 24"
              className={`h-6 w-6 transition-transform duration-200 ease-out active:scale-75 ${liked[i] ? "scale-110 text-red" : "text-ink/40"}`}
            >
              <path
                fill={liked[i] ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                d="M12 21.2s-7.6-4.6-9.8-9.3C.7 8.6 2.6 4.3 6.6 4.3c2.3 0 3.9 1.3 5.4 3.2 1.5-1.9 3.1-3.2 5.4-3.2 4 0 5.9 4.3 4.4 7.6-2.2 4.7-9.8 9.3-9.8 9.3z"
              />
            </svg>
            <span className="tabular">{(likeCounts[i] + (liked[i] ? 1 : 0)).toLocaleString("en-US")}</span>
          </button>
        </article>
      ))}
    </div>
  );
}
