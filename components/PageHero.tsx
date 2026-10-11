import type { ReactNode } from "react";
import Topo from "@/components/Topo";
import SplitReveal from "@/components/motion/SplitReveal";

/** Red opening section shared by the inner pages. */
export default function PageHero({
  kicker,
  title,
  intro,
  aside,
  seed = 1.3,
}: {
  kicker: string;
  title: string;
  intro?: ReactNode;
  aside?: ReactNode;
  seed?: number;
}) {
  return (
    <section className="relative overflow-hidden bg-red text-ink">
      <Topo alpha={0.2} seed={seed} />
      <div className={`gutter relative flex min-h-[86svh] flex-col justify-end gap-10 pt-36 md:min-h-[92svh] ${intro || aside ? "pb-12 md:pb-16" : "pb-28 md:pb-[10.5rem]"}`}>
        <p className="flex items-center gap-2 text-[15px] font-semibold">
          <span className="rec-dot h-2.5 w-2.5 rounded-full bg-ink" />
          {kicker}
        </p>
        <SplitReveal as="h1" by="chars" immediate delay={0.55} stagger={0.03} className="font-display text-[clamp(4.2rem,15vw,17rem)]">
          {title}
        </SplitReveal>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          {intro && (
            <div className={`max-w-[44ch] text-[18px] font-medium leading-snug md:text-[21px] ${aside ? "" : "md:ml-auto"}`}>{intro}</div>
          )}
          {aside}
        </div>
      </div>
    </section>
  );
}
