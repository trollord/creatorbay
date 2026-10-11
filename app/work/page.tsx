import type { Metadata } from "next";
import { stats } from "@/lib/site";
import PageHero from "@/components/PageHero";
import Receipts from "@/components/home/Receipts";
import NicheMarquee from "@/components/home/NicheMarquee";
import GoLive from "@/components/home/GoLive";
import Odometer from "@/components/motion/Odometer";

export const metadata: Metadata = {
  title: "Work | Creator Bay",
  description: "Recent Creator Bay campaigns: a sold-out launch event and a reel series with 250K views.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        kicker="Our work"
        title="The receipts."
        seed={7.1}
      />
      <section className="on-dark bg-ink py-20 text-paper md:py-28" aria-label="Creator Bay in numbers">
        <dl className="gutter grid grid-cols-2 gap-y-12 md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className="border-l border-paper/15 pl-5">
              <dt className="text-[15px] text-paper/60">{s.label}</dt>
              <dd className="font-display mt-3 text-[clamp(3.6rem,8vw,8rem)] text-red">
                <Odometer value={s.value} suffix={s.suffix} delay={i * 0.1} />
              </dd>
            </div>
          ))}
        </dl>
      </section>
      <Receipts showHeading={false} />
      <NicheMarquee />
      <GoLive title="You could be next." />
    </>
  );
}
