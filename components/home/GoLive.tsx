"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { contact, whatsappLink, instagramLink } from "@/lib/site";
import Topo from "@/components/Topo";
import SplitReveal from "@/components/motion/SplitReveal";
import Magnetic from "@/components/motion/Magnetic";

function useTimecode(running: boolean) {
  const [s, setS] = useState(0);
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setS((v) => v + 1), 1000);
    return () => window.clearInterval(id);
  }, [running]);
  const hh = String(Math.floor(s / 3600)).padStart(2, "0");
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

/** Closing call to action, framed like the moment before going live. */
export default function GoLive({
  title = "Let's go live.",
  body = "Have a brief, or just an idea? Tell us what you're launching and we'll reply within 24 hours.",
}: {
  title?: string;
  body?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const tc = useTimecode(inView);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden bg-red text-ink" aria-label="Start a campaign">
      <Topo alpha={0.22} seed={3.7} />
      <div className="gutter relative flex min-h-[92svh] flex-col justify-between py-24 md:py-28">
        <div className="flex items-center justify-between text-[14px] font-semibold tabular">
          <span className="flex items-center gap-2">
            <span className="rec-dot h-3 w-3 rounded-full bg-ink" />
            REC {tc}
          </span>
          <span className="hidden sm:inline">Creator Bay, Mumbai</span>
        </div>

        <div>
          <SplitReveal
            as="h2"
            by="chars"
            className={`font-display leading-[0.82] ${title.length <= 16 ? "text-[clamp(5rem,19vw,22rem)]" : "max-w-[14ch] text-[clamp(4rem,11vw,13rem)]"}`}
          >
            {title}
          </SplitReveal>
          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-[36ch] text-[18px] font-medium leading-snug md:text-[21px]">{body}</p>
            <div className="flex flex-wrap gap-3">
              <Magnetic>
                <Link
                  href="/contact"
                  className="inline-flex h-14 items-center rounded-full bg-ink px-8 text-[16px] font-semibold text-paper transition-transform duration-150 ease-out active:scale-[0.97] md:h-16 md:px-10 md:text-[17px]"
                >
                  Start a campaign
                </Link>
              </Magnetic>
              <a
                href={whatsappLink("Hi Creator Bay! I'd like to talk about a campaign.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center rounded-full border-2 border-ink px-7 text-[16px] font-semibold transition-colors duration-200 hover:bg-ink hover:text-paper md:h-16"
              >
                WhatsApp us
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap gap-x-8 gap-y-2 text-[15px] font-medium">
          <a href={`mailto:${contact.email}`} className="underline-offset-4 hover:underline">
            {contact.email}
          </a>
          <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
            @{contact.instagram}
          </a>
        </div>
      </div>
    </section>
  );
}
