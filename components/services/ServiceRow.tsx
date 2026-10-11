"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { services } from "@/lib/site";
import Phone from "@/components/reels/Phone";
import ReelOverlay from "@/components/reels/ReelOverlay";
import { Scene, lightScenes } from "@/components/reels/Scenes";
import SplitReveal from "@/components/motion/SplitReveal";

type Service = (typeof services)[number];

/** One service: copy on one side, its reel playing on the other. */
export default function ServiceRow({ service, flip }: { service: Service; flip: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <article ref={ref} id={service.slug} className="gutter grid scroll-mt-24 items-center gap-12 py-20 md:grid-cols-12 md:gap-8 md:py-28">
      <div className={`md:col-span-6 ${flip ? "md:order-2 md:col-start-7" : ""}`}>
        <SplitReveal as="h2" by="lines" className="font-display text-[clamp(3.4rem,7.4vw,8rem)]">
          {service.title}
        </SplitReveal>
        <p className="mt-6 max-w-[34ch] text-[22px] font-semibold leading-snug md:text-[26px]">{service.short}</p>
        <p className="mt-5 max-w-[46ch] text-[17px] leading-relaxed text-paper/70 md:text-[18px]">{service.description}</p>
        <ul className="mt-8 grid max-w-[520px] gap-x-6 sm:grid-cols-2">
          {service.deliverables.map((d) => (
            <li key={d} className="flex items-center gap-3 border-t border-paper/15 py-3 text-[16px]">
              <span className="h-2 w-2 shrink-0 rounded-full bg-red" />
              {d}
            </li>
          ))}
        </ul>
        <Link
          href={`/contact?service=${service.slug}`}
          className="mt-9 inline-flex h-13 items-center rounded-full bg-red px-7 py-3.5 text-[16px] font-semibold text-ink transition-transform duration-150 ease-out active:scale-[0.97]"
        >
          Plan {service.title.toLowerCase()}
        </Link>
      </div>
      <div className={`flex justify-center md:col-span-5 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-8"}`}>
        <Phone interactive className="h-[min(76svh,700px)] max-w-[80vw]">
          <Scene slug={service.slug} active={inView} />
          <ReelOverlay caption={service.caption} likes={service.likes} light={lightScenes.has(service.slug)} />
        </Phone>
      </div>
    </article>
  );
}
