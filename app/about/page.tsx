import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Captions from "@/components/home/Captions";
import Profile from "@/components/home/Profile";
import GoLive from "@/components/home/GoLive";
import ValueComments from "@/components/about/ValueComments";
import SplitReveal from "@/components/motion/SplitReveal";

export const metadata: Metadata = {
  title: "About | CreatorBay",
  description:
    "CreatorBay is a Mumbai-based influencer marketing and creative campaign agency for brands, events, restaurants and digital pages.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About CreatorBay"
        title="Built in the feed."
        seed={2.2}
        intro="CreatorBay started with a simple idea: people buy what the creators they follow recommend, so pair brands with the right ones."
      />

      <section className="bg-paper py-24 text-ink md:py-36" aria-label="Our story">
        <div className="gutter grid gap-12 md:grid-cols-12">
          <SplitReveal as="h2" by="lines" className="font-display text-[clamp(3rem,6.6vw,7.4rem)] md:col-span-7">
            We spend our days inside the feed.
          </SplitReveal>
          <div className="space-y-6 text-[18px] leading-relaxed text-ink/75 md:col-span-5 md:pt-4 md:text-[19px]">
            <p>
              We&apos;re an influencer marketing and content agency working with brands, events, restaurants,
              hospitality businesses and digital pages. We pick creators using audience data, then help them tell your
              story in a way their followers will recognise as theirs.
            </p>
            <p>
              Launching a product, filling an event or growing your page? We handle the whole job: the idea, the
              creators, the content and the report at the end.
            </p>
          </div>
        </div>
      </section>

      <Captions />

      <section className="on-dark bg-ink py-24 text-paper md:py-36" aria-label="What we stand for">
        <div className="gutter grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="md:sticky md:top-32">
              <SplitReveal as="h2" by="lines" className="font-display text-[clamp(3.2rem,7vw,7.6rem)]">
                What we stand for.
              </SplitReveal>
              <p className="mt-6 max-w-[34ch] text-[18px] leading-relaxed text-paper/70">
                Four rules we follow on every campaign. Feel free to like them.
              </p>
            </div>
          </div>
          <div className="md:col-span-7">
            <ValueComments />
          </div>
        </div>
      </section>

      <Profile />
      <GoLive title="Let's build something." body="Tell us what you're working on and we'll come back with a plan." />
    </>
  );
}
